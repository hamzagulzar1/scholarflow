import { connectToDatabase } from "@/lib/mongodb";
import bcryptjs from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const dbName = "test"; // Set the database name

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('users');

    // Check if the user already exists in the "test" database
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user in the "test" database
    await collection.insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
