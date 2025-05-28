import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "users.json");

// Ensure data directory and file exist
const initializeDataFile = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
};

// Read users from file
const readUsers = (): { email: string; password: string }[] => {
  try {
    initializeDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

// Write users to file
const writeUsers = (users: { email: string; password: string }[]) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing to users file:", error);
    throw new Error("Failed to save user data");
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Basic validation
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const users = readUsers();

      // Check if email already exists
      if (users.find((user) => user.email === email)) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Store user data
      users.push({ email, password });
      writeUsers(users);

      console.log("Registered users:", users);

      return res.status(201).json({
        message: "User registered successfully",
        accessToken: email,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "An error occurred during registration" });
    }
  } else if (req.method === "GET") {
    const users = readUsers();
    return res.status(200).json({ message: "Route register working", users });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}