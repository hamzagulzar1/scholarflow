// C:\Users\Gulzar\scholarflow2\src\pages\api\testdb.js
const { getCollection } = require('../../lib/mongodb');

export default async function testdb(req, res) {
  try {
    const programsCollection = await getCollection('programs');
    // If you want to perform a find operation, you can do it here
    const documents = await programsCollection.find({}).toArray(); // This will find all documents in the programs collection
    
    res.status(200).json({
      message: 'Connected to programs collection successfully',
      data: documents // This will send the found documents as a response
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to programs collection', error: error.message });
  }
}
