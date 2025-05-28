import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Initialize users from file or create empty array
let users: { email: string; password: string }[] = [];
try {
  if (fs.existsSync(DATA_FILE)) {
    users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users));
  }
} catch (error) {
  console.error('Error reading users file:', error);
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (users.find((user) => user.email === email)) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Store user data and persist to file
    users.push({ email, password });
    fs.writeFileSync(DATA_FILE, JSON.stringify(users));

    // Log the stored users (for debugging)
    console.log('Registered users:', users);

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        accessToken: email 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}

// Optional: Handle other methods to prevent 405 errors
export async function GET() {
  return NextResponse.json(
    { 
      message: 'route register working',
      users: users 
    },
    { status: 200 }
  );
}