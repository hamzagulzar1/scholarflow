require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function handler(req, res) {
  const { name } = req.query;

  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('admissions');

    // Replace this logic with the appropriate Jaccard similarity check
    // This is a placeholder for the actual implementation
    const query = { university_name: { $regex: name, $options: 'i' } };
    const admissionsData = await collection.findOne(query);

    if (!admissionsData) {
      return res.status(404).json({ message: 'Admissions data not found' });
    }

    res.status(200).json(admissionsData);
  } catch (error) {
    console.error('Database connection error', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
}

export default handler;
