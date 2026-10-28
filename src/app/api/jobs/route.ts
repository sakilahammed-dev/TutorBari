import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession, signToken, setAuthCookie, hashPassword } from "@/lib/auth";
import { checkRateLimit, sanitizeInput } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const location = searchParams.get("location") || undefined;
  const category = searchParams.get("category") || undefined;
  const tuitionType = searchParams.get("tuitionType") || undefined;
  const gender = searchParams.get("gender") || undefined;

  const session = await getSession();

  let jobs = DB.getAllJobs({
    city,
    location,
    category,
    tuitionType,
    gender,
  });

  // If user is a tutor, check which jobs they have already applied to
  if (session && session.role === "TUTOR") {
    const tutor = DB.findTutorByUserId(session.userId);
    if (tutor) {
      jobs = jobs.map((j) => {
        const apps = DB.getApplicationsByJobId(j.id);
        const hasApplied = apps.some((a) => a.tutorId === tutor.id);
        return { ...j, applied: hasApplied };
      });
    }
  }

  return NextResponse.json({
    success: true,
    total: jobs.length,
    jobs,
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const {
      title,
      tuitionType,
      category,
      className,
      subjects,
      studentGender,
      preferredTutorGender,
      tutoringDaysPerWeek,
      tutoringTime,
      noOfStudents,
      salary,
      city,
      location,
      detailedAddress,
      otherRequirements,
      guardianName,
      guardianPhone,
      guardianEmail,
      studentName,
      instituteName,
      preferredTutorUniversity,
      hireDate,
      curriculumDetails,
    } = body;

    let guardianUser: any = null;
    let guardianProfile: any = null;

    if (session) {
      if (session.role !== "GUARDIAN") {
        return NextResponse.json(
          { success: false, message: "Signed in account is not a Guardian. Please switch or sign in as Guardian." },
          { status: 403 }
        );
      }
      guardianUser = DB.findUserById(session.userId);
      guardianProfile = DB.findGuardianByUserId(session.userId);
    } else {
      // Guest posting - validate phone
      if (!guardianPhone || guardianPhone.length < 11) {
        return NextResponse.json(
          { success: false, message: "Valid 11-digit phone number is required to post tuition." },
          { status: 400 }
        );
      }

      guardianUser = DB.findUserByPhone(guardianPhone);
      if (!guardianUser) {
        // Auto-create Guardian user
        const passwordHash = await hashPassword("123456");
        const newUserId = `usr_${Date.now()}`;
        guardianUser = DB.createUser({
          id: newUserId,
          name: guardianName || "Guardian",
          phone: guardianPhone,
          email: guardianEmail || undefined,
          passwordHash,
          role: "GUARDIAN",
          isPhoneVerified: true,
          isActive: true,
          createdAt: new Date().toISOString(),
        });

        guardianProfile = DB.createGuardianProfile({
          id: `grd_${newUserId}`,
          userId: newUserId,
          city: city || "Dhaka",
          location: location || "Dhaka",
          detailedAddress: detailedAddress || "",
        });
      } else {
        guardianProfile = DB.findGuardianByUserId(guardianUser.id);
        if (!guardianProfile) {
          guardianProfile = DB.createGuardianProfile({
            id: `grd_${guardianUser.id}`,
            userId: guardianUser.id,
            city: city || "Dhaka",
            location: location || "Dhaka",
            detailedAddress: detailedAddress || "",
          });
        }
      }

      // Log the guardian in automatically
      const token = signToken({
        userId: guardianUser.id,
        name: guardianUser.name,
        phone: guardianUser.phone,
        email: guardianUser.email,
        role: "GUARDIAN",
      });
      await setAuthCookie(token);
    }

    const sanitizedTitle = sanitizeInput(title);
    const sanitizedAddress = sanitizeInput(detailedAddress);
    const sanitizedReqs = sanitizeInput(otherRequirements);
    const sanitizedGuardianName = sanitizeInput(guardianName);
    const sanitizedStudentName = sanitizeInput(studentName);
    const sanitizedInstitute = sanitizeInput(instituteName);
    const sanitizedUnivPref = sanitizeInput(preferredTutorUniversity);
    const sanitizedHireDate = sanitizeInput(hireDate);
    const sanitizedCurriculum = sanitizeInput(curriculumDetails);

    const resolvedTitle =
      sanitizedTitle || `Need ${category || "General"} Tutor For ${className || "Student"} (${tuitionType || "Home Tutoring"})`;

    const newJob = DB.createJob({
      title: resolvedTitle,
      guardianId: guardianProfile ? guardianProfile.id : `grd_${guardianUser.id}`,
      guardianName: guardianUser.name || sanitizedGuardianName,
      guardianPhone: guardianUser.phone,
      studentName: sanitizedStudentName || undefined,
      instituteName: sanitizedInstitute || undefined,
      preferredTutorUniversity: sanitizedUnivPref || undefined,
      hireDate: sanitizedHireDate || undefined,
      curriculumDetails: sanitizedCurriculum || undefined,
      tuitionType: tuitionType || "Home Tutoring",
      category: category || "General",
      className: className || "Class 1",
      subjects: subjects || "All Subjects",
      studentGender: studentGender || "Male",
      preferredTutorGender: preferredTutorGender || "Any",
      tutoringDaysPerWeek: Number(tutoringDaysPerWeek) || 3,
      tutoringTime: tutoringTime || "Evening",
      noOfStudents: Number(noOfStudents) || 1,
      salary: salary ? (salary.toString().includes("BDT") ? salary : `${salary} BDT`) : "Negotiable",
      city: city || "Dhaka",
      location: location || "Dhaka",
      detailedAddress: sanitizedAddress || location,
      otherRequirements: sanitizedReqs || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Tuition job posted successfully!",
        job: newJob,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job posting error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to post tuition job." },
      { status: 500 }
    );
  }
}
