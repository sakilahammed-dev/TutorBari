import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "GUARDIAN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Guardian login required." },
        { status: 401 }
      );
    }

    const user = DB.findUserById(session.userId);
    const guardian = DB.findGuardianByUserId(session.userId);
    if (!guardian) {
      return NextResponse.json(
        { success: false, message: "Guardian profile not found." },
        { status: 404 }
      );
    }

    // Completeness percentage
    let score = 30; // base for phone & name
    if (guardian.gender) score += 10;
    if (guardian.city && guardian.location) score += 20;
    if (guardian.detailedAddress) score += 15;
    if (guardian.profession) score += 10;
    if (guardian.emergencyContactNumber) score += 15;

    return NextResponse.json({
      success: true,
      profile: {
        ...guardian,
        name: guardian.name || user?.name || "Guardian",
        phone: guardian.phone || user?.phone,
        email: guardian.email || user?.email,
        profilePercentage: Math.min(score, 100),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch guardian profile." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "GUARDIAN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Guardian login required." },
        { status: 401 }
      );
    }

    const guardian = DB.findGuardianByUserId(session.userId);
    if (!guardian) {
      return NextResponse.json(
        { success: false, message: "Guardian profile not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      name,
      gender,
      city,
      location,
      detailedAddress,
      profession,
      emergencyName,
      emergencyContactNumber,
      emergencyRelation,
      emergencyAddress,
      facebook,
      hearAboutUs,
      profilePhoto,
    } = body;

    const updated = DB.updateGuardianProfile(guardian.id, {
      ...(name && { name }),
      ...(gender && { gender }),
      ...(city && { city }),
      ...(location && { location }),
      ...(detailedAddress !== undefined && { detailedAddress }),
      ...(profession !== undefined && { profession }),
      ...(emergencyName !== undefined && { emergencyName }),
      ...(emergencyContactNumber !== undefined && { emergencyContactNumber }),
      ...(emergencyRelation !== undefined && { emergencyRelation }),
      ...(emergencyAddress !== undefined && { emergencyAddress }),
      ...(facebook !== undefined && { facebook }),
      ...(hearAboutUs !== undefined && { hearAboutUs }),
      ...(profilePhoto !== undefined && { profilePhoto }),
    });

    return NextResponse.json({
      success: true,
      message: "Guardian profile updated successfully!",
      profile: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update guardian profile." },
      { status: 500 }
    );
  }
}
