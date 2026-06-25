import 'dotenv/config';
import mongoose from 'mongoose';
import { embeddings } from './services/embeddings.js';
import { mongodb } from './services/mongodb.js';
import ProductModel from './models/product.js';
import { Product } from './types.js';

/**
 * Builds a rich text string from product data for embedding.
 * This combines multiple fields to give the AI context about the product.
 */
function buildEmbeddingContext(product: Product): string {
  const parts: string[] = [];

  // 1. Basic Identity
  parts.push(`Name: ${product.enName}`);
  if (product.bnName) parts.push(`Bengali Name: ${product.bnName}`);

  // 2. Category Hierarchy
  const categories = [
    ...(product.parentCategories || []).map(c => c.enName),
    product.category?.enName
  ].filter(Boolean);
  if (categories.length > 0) {
    parts.push(`Categories: ${categories.join(' > ')}`);
  }

  // 3. Metadata & SEO
  if (product.searchMeta?.description) parts.push(`Description: ${product.searchMeta.description}`);
  if (product.searchMeta?.keyword) parts.push(`Keywords: ${product.searchMeta.keyword}`);
  if (product.searchSynonym?.en) parts.push(`Synonyms: ${product.searchSynonym.en}`);
  if (product.searchSuggestionTag) parts.push(`Tags: ${product.searchSuggestionTag}`);

  // 4. Searchable Attributes
  // We include attributes explicitly marked as searchable or commonly important ones
  const importantLabels = ['brand', 'model', 'technology', 'color', 'capacity', 'material'];
  
  product.productAttributes?.forEach(attr => {
    const isImportant = importantLabels.includes(attr.enLabel.toLowerCase());
    if (attr.isSearchAble || isImportant) {
      const values = attr.values.map(v => v.enName).filter(Boolean).join(', ');
      if (values) {
        parts.push(`${attr.enLabel}: ${values}`);
      }
    }
  });

  // 5. Bengali Metadata (Optional but helpful for multilingual search)
  if (product.searchSynonym?.bn) parts.push(`Bengali Synonyms: ${product.searchSynonym.bn}`);

  return parts.filter(p => p.trim().length > 0).join(' | ');
}

async function run() {
  try {
    await mongodb.connect();
    console.log('--- Starting Embedding Generation ---');

    // 1. Find products that don't have embeddings yet
    const query = { 
      $or: [
        { 'searchMeta.embedding': { $exists: false } },
        { 'searchMeta.embedding': { $size: 0 } },
        { 'searchMeta.embedding': null }
      ]
    };

    const totalToProcess = await ProductModel.countDocuments(query);
    console.log(`Found ${totalToProcess} products needing embeddings.`);

    if (totalToProcess === 0) {
      console.log('All products already have embeddings. Nothing to do.');
      return;
    }

    const batchSize = 20;
    let processedCount = 0;

    while (true) {
      // Fetch a batch
      const products = await ProductModel.find(query).limit(batchSize);
      
      if (products.length === 0) break;

      console.log(`Processing batch of ${products.length} products... (${processedCount}/${totalToProcess})`);

      await Promise.all(products.map(async (product) => {
        try {
          const context = buildEmbeddingContext(product as any);
          const vector = await embeddings.createEmbedding(context);
          
          await ProductModel.updateOne(
            { _id: product._id },
            { $set: { 'searchMeta.embedding': vector } }
          );
        } catch (err) {
          console.error(`Error processing product ${product.uid}:`, err instanceof Error ? err.message : err);
        }
      }));

      processedCount += products.length;
      
      // Small pause to be gentle on OpenAI API
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('--- Embedding Generation Complete ---');
    console.log(`Successfully updated ${processedCount} products.`);

  } catch (error) {
    console.error('Fatal error during embedding generation:', error);
  } finally {
    await mongodb.close();
    process.exit();
  }
}

run();
