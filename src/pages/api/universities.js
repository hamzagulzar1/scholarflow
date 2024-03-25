// File: /pages/api/universities.js

import { MongoClient } from 'mongodb';

// Replace the below URI with your actual MongoDB URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function handler(req, res) {
  const { name } = req.query;

  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('test1');
    
    // Assuming `university_name` is the field in your documents
    const query = { university_name: name };
    const universityData = await collection.findOne(query);

    if (!universityData) {
      return res.status(404).json({ message: 'University not found' });
    }

    res.status(200).json(universityData);
  } catch (error) {
    console.error('Database connection error', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
}

export default handler;
