import 'dotenv/config';
import { pipeline } from '@xenova/transformers';

export class EmbeddingService {
  private extractor: any = null;
  private model: string;

  constructor() {
    // We'll use a standard, lightweight model that runs locally
    this.model = 'Xenova/all-MiniLM-L6-v2';
  }

  /**
   * Initializes the local model if not already loaded.
   */
  private async init() {
    if (!this.extractor) {
      console.error('Loading local embedding model (free)...');
      this.extractor = await pipeline('feature-extraction', this.model);
    }
  }

  /**
   * Generates a vector embedding for a given text query locally.
   */
  async createEmbedding(text: string): Promise<number[]> {
    try {
      await this.init();
      
      const output = await this.extractor(text, {
        pooling: 'mean',
        normalize: true,
      });

      // Convert the tensor to a standard array
      return Array.from(output.data);
    } catch (error) {
      console.error('Error creating local embedding:', error);
      throw new Error('Failed to generate local embedding');
    }
  }
}

export const embeddings = new EmbeddingService();
