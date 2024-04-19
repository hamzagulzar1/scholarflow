// File: /pages/api/programDetails.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  const { university, program } = req.query;
  
  try {
    await client.connect();
    const db = client.db('test');
    const programsCollection = db.collection('programs');
    
    // Assume the document structure includes an array of programs for each university
    const universityDoc = await programsCollection.findOne({ university_name: university });
    if (!universityDoc) {
      return res.status(404).json({ message: 'University not found' });
    }

    // Find the program within the university's programs
    const programDetails = universityDoc.programs.find(p => p.field_of_study === program);
    if (!programDetails) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json(programDetails.degrees_offered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching program details' });
  } finally {
    await client.close();
  }
}
