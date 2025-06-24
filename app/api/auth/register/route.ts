import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // awaited cause in next because of edge functions and them being distributed it is required to be async
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password are required." },
        { status: 400 }
      );
    }
    // since the distributed nature we need to check if there is a connection present if not then to make sure there is one
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }
    await User.create({ email, password });
    return NextResponse.json(
      { message: "User successfully registered." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error : ", error);
    return NextResponse.json(
      { error: "Error Registering new User. " },
      { status: 400 }
    );
  }
}
