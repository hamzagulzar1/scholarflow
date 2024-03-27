import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/userModel";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

connectToDatabase();

export default async function handler(req, res) {
	const { email, password } = req.body;

	try {
		// Check if the user exists
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Compare the provided password with the hashed password in the database
		const passwordMatch = await bcryptjs.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

		res.status(200).json({ message: "Login successful", token: token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
}
