import { getCollection } from '@/lib/mongodb';

export default async function handler(req, res) {
  const { term } = req.query;

  if (!term) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  try {
    const collection = await getCollection('programs');
    const regex = new RegExp(`^${term}`, 'i'); // Starts with the term, case-insensitive
    const predictions = await collection.find(
      { university_name: regex },
      { projection: { university_name: 1, _id: 0 } }
    ).toArray();

    res.status(200).json({ predictions: predictions.map(pred => pred.university_name) });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    res.status(500).json({ error: error.message });
  }
}
