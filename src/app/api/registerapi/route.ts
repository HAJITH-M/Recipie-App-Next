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
    
    // Test write permissions
    const testData = JSON.stringify([{ test: true }], null, 2);
    fs.writeFileSync(DATA_FILE, testData);
    const readBack = fs.readFileSync(DATA_FILE, "utf-8");
    console.log("File system test successful. Read back:", readBack);
    
    // Reset to empty array
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    
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
    console.log("Raw file data:", data);
    
    const users = JSON.parse(data);
    console.log("Parsed users:", users);
    
    return users;
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

const writeUsers = (users: { email: string; password: string }[]) => {
  try {
    console.log("Writing users to:", DATA_FILE);
    console.log("Users data:", users);
    
    const jsonData = JSON.stringify(users, null, 2);
    console.log("JSON data to write:", jsonData);
    
    fs.writeFileSync(DATA_FILE, jsonData);
    
    // Verify the write
    const verification = fs.readFileSync(DATA_FILE, "utf-8");
    console.log("Verification read:", verification);
    
    console.log("Successfully wrote users file");
  } catch (error) {
    console.error("Error writing to users file:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: error instanceof Error && 'code' in error ? error.code : undefined,
      path: error instanceof Error && 'path' in error ? error.path : undefined
    });
    throw new Error(`Failed to save user data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export async function POST(request: Request) {
  try {
    console.log("POST request received");
    
    const { email, password } = await request.json();
    console.log("Request data:", { email, password: "[REDACTED]" });

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const users = readUsers();
    console.log("Current users count:", users.length);

    if (users.find((user) => user.email === email)) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = { email, password: hashedPassword };
    users.push(newUser);
    
    console.log("Adding new user. Total users will be:", users.length);
    
    writeUsers(users);

    console.log("User registration completed successfully");

    return NextResponse.json(
      { message: "User registered successfully", email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace available");
    
    return NextResponse.json(
      { 
        message: "An error occurred during registration",
        error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("GET request received");
    
    const users = readUsers();
    
    // Don't expose passwords, even hashed ones
    const safeUsers = users.map(user => ({ email: user.email }));
    
    return NextResponse.json({ 
      message: "Route register working", 
      users: safeUsers,
      count: users.length,
      dataFile: DATA_FILE
    }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { 
        message: "Error reading users",
        error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      }, 
      { status: 500 }
    );
  }
}