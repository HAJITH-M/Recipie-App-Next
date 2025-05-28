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
    console.log("Login API: Initializing data file at:", DATA_FILE);
    
    if (!fs.existsSync(DATA_DIR)) {
      console.log("Login API: Creating directory:", DATA_DIR);
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    if (!fs.existsSync(DATA_FILE)) {
      console.log("Login API: Creating users file:", DATA_FILE);
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }
    
  } catch (error) {
    console.error("Login API: Failed to initialize data file:", error);
    throw new Error(`File system initialization failed: ${(error as Error).message}`);
  }
};

const readUsers = (): { email: string; password: string }[] => {
  try {
    initializeDataFile();
    console.log("Login API: Reading from:", DATA_FILE);
    
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    console.log("Login API: Raw file data length:", data.length);
    
    const users = JSON.parse(data);
    console.log("Login API: Found users count:", users.length);
    
    return users;
  } catch (error) {
    console.error("Login API: Error reading users file:", error);
    return [];
  }
};

export async function POST(request: Request) {
  try {
    console.log("Login API: POST request received");
    
    const { email, password } = await request.json();
    console.log("Login API: Request data:", { email, password: "[REDACTED]" });

    if (!email || !password) {
      console.log("Login API: Missing email or password");
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Login API: Invalid email format");
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const users = readUsers();
    console.log("Login API: Total users in system:", users.length);
    
    const user = users.find((user) => user.email === email);
    console.log("Login API: User found:", !!user);

    if (!user) {
      console.log("Login API: User not found for email:", email);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare hashed password
    console.log("Login API: Comparing passwords...");
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Login API: Password match:", passwordMatch);
    
    if (!passwordMatch) {
      console.log("Login API: Password does not match");
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("Login API: Login successful for:", email);
    
    return NextResponse.json(
      {
        message: "Login successful",
        email: email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API: Login error:", error);
    console.error("Login API: Error stack:", (error as Error).stack);
    
    return NextResponse.json(
      { 
        message: "An error occurred during login",
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

// Add GET method for debugging
export async function GET() {
  try {
    console.log("Login API: GET request received");
    
    const users = readUsers();
    
    // Don't expose passwords, even hashed ones
    const safeUsers = users.map(user => ({ email: user.email }));
    
    return NextResponse.json({ 
      message: "Login API working", 
      users: safeUsers,
      count: users.length,
      dataFile: DATA_FILE
    }, { status: 200 });
  } catch (error) {
    console.error("Login API: GET error:", error);
    return NextResponse.json(
      { 
        message: "Error reading users",
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      }, 
      { status: 500 }
    );
  }
}