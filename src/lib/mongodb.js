// C:\Users\Gulzar\scholarflow2\src\lib\mongodb.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // Retrieve the URI from your .env file
const dbName = "test"; // This should match the database name in your Atlas cluster

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log('Using cached database instance');
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;

    console.log('Successfully connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error; // rethrow the error for further handling
  }
}

async function getCollection(collectionName) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}

module.exports = {
  connectToDatabase,
  getCollection,
};
