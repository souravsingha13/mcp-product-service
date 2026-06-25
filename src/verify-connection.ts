import 'dotenv/config';
import { mongodb } from './services/mongodb.js';
import ProductModel from './models/product.js';

async function verify() {
  console.log('--- Database Connection Verification ---');
  try {
    await mongodb.connect();
    
    const count = await ProductModel.countDocuments();
    console.log(`Successfully connected!`);
    console.log(`Database Name: ${process.env.MONGODB_DB_NAME}`);
    console.log(`Total Products in Collection: ${count}`);

    if (count > 0) {
      const sample = await ProductModel.findOne({}, { enName: 1, uid: 1 });
      console.log(`Sample Product Found: ${sample?.enName} (${sample?.uid})`);
    } else {
      console.warn('Connection successful, but the products collection is empty.');
    }

  } catch (error) {
    console.error('FAILED to connect to the database.');
    console.error('Error details:', error instanceof Error ? error.message : error);
  } finally {
    await mongodb.close();
    console.log('--- Verification Complete ---');
    process.exit();
  }
}

verify();
