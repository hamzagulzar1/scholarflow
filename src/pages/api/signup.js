import bcryptjs from "bcrypt";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/userModel";

connectToDatabase();

export default async function handler(req, res) {
	const { email, password } = req.body;

	try {
		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		// Hash the password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// Create a new user
		const newUser = new User({
			email,
			password: hashedPassword,
		});

		// Save the user to the database
		await newUser.save();

		res.status(201).json({ message: "Signup successful" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
}
