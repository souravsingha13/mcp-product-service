import 'dotenv/config';
import mongoose from 'mongoose';
import { Product } from '../types.js';

export class MongoDBService {
  private uri: string;
  private dbName: string;

  constructor() {
    this.uri = process.env.MONGODB_URI || '';
    this.dbName = process.env.MONGODB_DB_NAME || '';

    if (!this.uri || !this.dbName) {
      console.warn('MONGODB_URI or MONGODB_DB_NAME not defined in environment variables');
    }
  }

  async connect(): Promise<void> {
    try {
      if (mongoose.connection.readyState >= 1) return;

      await mongoose.connect(this.uri, {
        dbName: this.dbName,
      });
      console.error('Connected to MongoDB via Mongoose');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  getProductsCollection() {
    if (mongoose.connection.readyState < 1) {
      throw new Error('MongoDB is not connected. Call connect() first.');
    }
    return mongoose.connection.db!.collection<Product>('products');
  }

  async close(): Promise<void> {
    await mongoose.connection.close();
  }
}

export const mongodb = new MongoDBService();
