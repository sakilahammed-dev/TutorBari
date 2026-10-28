import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { DB } from "@/lib/store";
import { verifyPassword, signToken, setAuthCookie } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rateLimit";

const LoginSchema = z.object({
  identifier: z.string().min(3, "Please enter your phone number or email"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local_client";
    const rateCheck = checkRateLimit(`login:${ip}`, 20, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many login attempts. Please wait ${rateCheck.resetInSeconds} seconds before retrying.`,
        },
        { status: 429, headers: { "Retry-After": String(rateCheck.resetInSeconds) } }
      );
    }
    const body = await req.json();
    const result = LoginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { identifier, password } = result.data;

    // Search by phone or email
    let user = DB.findUserByPhone(identifier);
    if (!user) {
      user = DB.findUserByEmail(identifier);
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Please check your phone/email and password." },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Incorrect password." },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: "Signed in successfully",
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
