// C:\Users\Gulzar\scholarflow2\src\pages\api\testdb.js
const { getCollection } = require('../../lib/mongodb');

export default async function testdb(req, res) {
  try {
    const test1Collection = await getCollection('test1');
    // If you want to perform a find operation, you can do it here
    const documents = await test1Collection.find({}).toArray(); // This will find all documents in the test1 collection
    
    res.status(200).json({
      message: 'Connected to test1 collection successfully',
      data: documents // This will send the found documents as a response
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to test1 collection', error: error.message });
  }
}
