import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { DB } from "@/lib/store";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";
import { UserRole } from "@/lib/types";
import { checkRateLimit, sanitizeInput } from "@/lib/rateLimit";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Please enter a valid 11-digit Bangladeshi mobile number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["GUARDIAN", "TUTOR"]).default("GUARDIAN"),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local_client";
    const rateCheck = checkRateLimit(`register:${ip}`, 25, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many registration requests. Please wait ${rateCheck.resetInSeconds} seconds before retrying.`,
        },
        { status: 429, headers: { "Retry-After": String(rateCheck.resetInSeconds) } }
      );
    }

    const body = await req.json();
    const result = RegisterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const rawName = result.data.name;
    const name = sanitizeInput(rawName);
    const { phone, email, password, role } = result.data;

    // Check duplicate phone
    const existingPhone = DB.findUserByPhone(phone);
    if (existingPhone) {
      return NextResponse.json(
        { success: false, message: "An account with this phone number already exists. Please sign in." },
        { status: 409 }
      );
    }

    // Check duplicate email
    if (email) {
      const existingEmail = DB.findUserByEmail(email);
      if (existingEmail) {
        return NextResponse.json(
          { success: false, message: "An account with this email already exists." },
          { status: 409 }
        );
      }
    }

    const passwordHash = await hashPassword(password);
    const userId = `usr_${Date.now()}`;

    const newUser = DB.createUser({
      id: userId,
      name,
      phone,
      email: email || undefined,
      passwordHash,
      role: role as UserRole,
      isPhoneVerified: false,
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    if (role === "TUTOR") {
      DB.createTutorProfile({
        id: `tut_${Date.now()}`,
        userId,
        name,
        phone,
        email: email || undefined,
        gender: "Male",
        rating: 5.0,
        totalReviews: 0,
        tuitionsCompleted: 0,
        isVerified: false,
        verificationLevel: "UNVERIFIED",
        expectedMinimumSalary: 5000,
      });
    } else {
      DB.createGuardianProfile({
        id: `grd_${Date.now()}`,
        userId,
        city: "Dhaka",
        location: "Dhaka",
      });
    }

    const token = signToken({
      userId,
      name,
      phone,
      email: email || undefined,
      role: role as UserRole,
    });

    await setAuthCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: { id: userId, name, phone, email, role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
