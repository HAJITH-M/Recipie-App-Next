import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

// Use /tmp for production or data for local development
const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? path.join('/tmp', 'data') 
  : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "users.json");

const initializeDataFile = () => {
  try {
    console.log("Initializing data file at:", DATA_FILE);
    if (!fs.existsSync(DATA_DIR)) {
      console.log("Creating directory:", DATA_DIR);
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      console.log("Creating users file:", DATA_FILE);
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error("Failed to initialize data file:", error);
    throw new Error(`File system initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const readUsers = (): { email: string; password: string }[] => {
  try {
    initializeDataFile();
    console.log("Reading from:", DATA_FILE);
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    console.log("Users file content:", data);
    const users = JSON.parse(data);
    console.log("Parsed users:", users);
    return users;
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

export async function POST(request: Request) {
  try {
    console.log("POST request received");
    const { email, password } = await request.json();
    console.log("Request data:", { email, password: "[REDACTED]" });

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const users = readUsers();
    console.log("Current users count:", users.length);
    const user = users.find((user) => user.email === email);

    if (!user) {
      console.log("User not found for email:", email);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", passwordMatch);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("Login successful for user:", email);
    return NextResponse.json(
      {
        message: "Login successful",
        email: email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        message: "An error occurred during login",
        error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      },
      { status: 500 }
    );
  }
}