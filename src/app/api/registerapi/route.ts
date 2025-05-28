import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT email FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await sql`
      INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})
    `;

    return NextResponse.json(
      { message: "User registered successfully", email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 });
  }
}
