import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { DB } from "@/lib/store";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const user = DB.findUserById(session.userId);
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    let profile = null;
    if (user.role === "TUTOR") {
      profile = DB.findTutorByUserId(user.id);
    } else if (user.role === "GUARDIAN") {
      profile = DB.findGuardianByUserId(user.id);
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        isPhoneVerified: user.isPhoneVerified,
      },
      profile,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Session invalid" }, { status: 500 });
  }
}
