// File: /pages/api/programs.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  const { university, term } = req.query;

  try {
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('programs');

    // Use regex to match term with program names within a specific university
    const regex = new RegExp(term, 'i'); // Case-insensitive matching
    const query = {
      university_name: university,
      'programs.field_of_study': { $regex: regex }
    };
    const projection = {
      'programs.$': 1,
      _id: 0
    };
    
    const universityDoc = await collection.findOne(query, { projection });
    if (!universityDoc) {
      return res.status(404).json({ message: 'No programs found' });
    }

    // Extract the program names for the autocomplete suggestions
    const suggestions = universityDoc.programs.map(prog => prog.field_of_study);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for programs' });
  } finally {
    await client.close();
  }
}
