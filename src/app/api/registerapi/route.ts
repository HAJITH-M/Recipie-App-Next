import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "users.json");

const initializeDataFile = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
};

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

const writeUsers = (users: { email: string; password: string }[]) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing to users file:", error);
    throw new Error("Failed to save user data");
  }
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const users = readUsers();

    if (users.find((user) => user.email === email)) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    users.push({ email, password });
    writeUsers(users);

    console.log("Registered users:", users);

    return NextResponse.json(
      { message: "User registered successfully", accessToken: email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 });
  }
}

export async function GET() {
  const users = readUsers();
  return NextResponse.json({ message: "Route register working", users }, { status: 200 });
}