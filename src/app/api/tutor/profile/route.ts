import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "TUTOR") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Tutor login required." },
        { status: 401 }
      );
    }

    const tutor = DB.findTutorByUserId(session.userId);
    if (!tutor) {
      return NextResponse.json(
        { success: false, message: "Tutor profile not found." },
        { status: 404 }
      );
    }

    const applications = DB.getApplicationsByTutorId(tutor.id);

    // Calculate profile completeness score
    let score = 20; // base for phone & name
    if (tutor.bio) score += 15;
    if (tutor.institution && tutor.department) score += 15;
    if (tutor.education && tutor.education.length > 0) score += 20;
    if (tutor.preferredLocations && tutor.preferredLocations.length > 0) score += 15;
    if (tutor.documents && tutor.documents.length > 0) score += 15;

    return NextResponse.json({
      success: true,
      profile: {
        ...tutor,
        completenessScore: Math.min(score, 100),
        stats: {
          totalApplications: applications.length,
          shortlisted: applications.filter((a) => a.status === "SHORTLISTED").length,
          demoScheduled: applications.filter((a) => a.status === "DEMO_SCHEDULED").length,
          appointed: applications.filter((a) => a.status === "APPOINTED").length,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tutor profile." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "TUTOR") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Tutor login required." },
        { status: 401 }
      );
    }

    const tutor = DB.findTutorByUserId(session.userId);
    if (!tutor) {
      return NextResponse.json(
        { success: false, message: "Tutor profile not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      name,
      gender,
      bio,
      institution,
      department,
      dateOfBirth,
      bloodGroup,
      emergencyContact,
      emergencyName,
      emergencyContactNumber,
      emergencyRelation,
      emergencyAddress,
      facebook,
      hearAboutUs,
      presentAddress,
      permanentAddress,
      expectedMinimumSalary,
      preferredCities,
      preferredLocations,
      preferredCategories,
      availableDays,
      availableTime,
      tutoringExperience,
      religion,
      preferredClasses,
      preferredSubjects,
    } = body;

    const updated = DB.updateTutorProfile(tutor.id, {
      ...(name && { name }),
      ...(gender && { gender }),
      ...(bio !== undefined && { bio }),
      ...(tutoringExperience !== undefined && { tutoringExperience }),
      ...(institution && { institution }),
      ...(department && { department }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(bloodGroup && { bloodGroup }),
      ...(religion && { religion }),
      ...(emergencyContact && { emergencyContact }),
      ...(emergencyName && { emergencyName }),
      ...(emergencyContactNumber && { emergencyContactNumber }),
      ...(emergencyRelation && { emergencyRelation }),
      ...(emergencyAddress && { emergencyAddress }),
      ...(facebook && { facebook }),
      ...(hearAboutUs && { hearAboutUs }),
      ...(presentAddress && { presentAddress }),
      ...(permanentAddress && { permanentAddress }),
      ...(expectedMinimumSalary && { expectedMinimumSalary: Number(expectedMinimumSalary) }),
      ...(preferredCities && { preferredCities }),
      ...(preferredLocations && { preferredLocations }),
      ...(preferredCategories && { preferredCategories }),
      ...(preferredClasses && { preferredClasses }),
      ...(preferredSubjects && { preferredSubjects }),
      ...(availableDays && { availableDays: Number(availableDays) }),
      ...(availableTime && { availableTime }),
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully!",
      profile: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update profile." },
      { status: 500 }
    );
  }
}
