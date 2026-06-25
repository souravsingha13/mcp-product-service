import { mongodb } from '../services/mongodb.js';
import { embeddings } from '../services/embeddings.js';
import { Product, SearchProductsInput } from '../types.js';
import mongoose from 'mongoose';

/**
 * Implements Hybrid Search (Vector + Keyword) for products.
 * Uses Reciprocal Rank Fusion (RRF) to combine results.
 */
export async function searchProducts(args: SearchProductsInput): Promise<Product[]> {
  const { query, categoryUid, minPrice, maxPrice, limit = 5 } = args;
  const collection = mongodb.getProductsCollection();

  // 1. Generate Vector Embedding for Semantic Search
  const queryVector = await embeddings.createEmbedding(query);

  // 2. Vector Search Stage
  // Note: In a production environment, you might run these in parallel or use $facet.
  // For clarity and RRF implementation, we fetch candidates from both.
  const vectorCandidates = await collection.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "searchMeta.embedding",
        queryVector: queryVector,
        numCandidates: 50,
        limit: 20
      }
    },
    {
      $match: {
        isActive: true,
        ...(categoryUid && { "category.uid": categoryUid }),
        ...( (minPrice !== undefined || maxPrice !== undefined) && {
          "variants.mrpPrice": {
            ...(minPrice !== undefined && { $gte: minPrice }),
            ...(maxPrice !== undefined && { $lte: maxPrice })
          }
        })
      }
    },
    { $project: { _id: 1, uid: 1 } }
  ]).toArray();

  // 3. Keyword Search Stage (Atlas Search)
  const keywordCandidates = await collection.aggregate([
    {
      $search: {
        index: "default", // Standard Atlas Search index
        compound: {
          should: [
            {
              text: {
                query: query,
                path: ["enName", "bnName", "searchMeta.keyword"],
                fuzzy: { maxEdits: 1 }
              }
            },
            {
              text: {
                query: query,
                path: "uid",
                boost: { value: 10 }
              }
            }
          ],
          filter: [
            { equals: { value: true, path: "isActive" } }
          ]
        }
      }
    },
    {
      $match: {
        ...(categoryUid && { "category.uid": categoryUid }),
        ...( (minPrice !== undefined || maxPrice !== undefined) && {
          "variants.mrpPrice": {
            ...(minPrice !== undefined && { $gte: minPrice }),
            ...(maxPrice !== undefined && { $lte: maxPrice })
          }
        })
      }
    },
    { $project: { _id: 1, uid: 1 } }
  ]).toArray();

  // 4. Reciprocal Rank Fusion (RRF)
  const k = 60; // Smoothing constant
  const scores: Record<string, number> = {};

  const processCandidates = (candidates: any[], weight: number) => {
    candidates.forEach((c, index) => {
      const id = c._id.toString();
      const rank = index + 1;
      const score = 1 / (rank + k);
      scores[id] = (scores[id] || 0) + (score * weight);
    });
  };

  processCandidates(vectorCandidates, 1);
  processCandidates(keywordCandidates, 1);

  // 5. Fetch Final Hydrated Documents
  const sortedIds = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([id]) => id);

  if (sortedIds.length === 0) return [];

  const finalProducts = await collection.find({
    _id: { $in: sortedIds.map(id => new mongoose.Types.ObjectId(id)) }
  }).toArray();

  // Re-sort to maintain RRF order
  return finalProducts.sort((a, b) => {
    return sortedIds.indexOf(a._id.toString()) - sortedIds.indexOf(b._id.toString());
  });
}
