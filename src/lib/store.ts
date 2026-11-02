import {
  User,
  JobPost,
  TutorProfile,
  TutorEducation,
  TutorDocument,
  GuardianProfile,
  JobApplication,
  Lead,
  ConfirmationLetter,
  Invoice,
  JobStatus,
  ApplicationStatus,
  JobComment,
  ApplicationMessage,
  TutorReview,
} from "./types";

// In-Memory Seed Storage for Instant Interaction & Testing
interface DBState {
  users: (User & { passwordHash: string })[];
  guardians: GuardianProfile[];
  tutors: TutorProfile[];
  jobs: JobPost[];
  applications: JobApplication[];
  leads: Lead[];
  confirmations: ConfirmationLetter[];
  invoices: Invoice[];
  comments: JobComment[];
  applicationMessages: ApplicationMessage[];
  reviews: TutorReview[];
}

declare global {
  // eslint-disable-next-line no-var
  var __TB_DATABASE__: DBState | undefined;
}

function getInitialDB(): DBState {
  return {
    users: [
      {
        id: "usr_admin_1",
        name: "Head of Operations",
        phone: "01700000001",
        email: "admin@tutorbari.com",
        passwordHash: "$2b$10$R9DydRaBH29osdAeHBv6EuhTUUMWZsNr17cbfWFqERgg3O393r0eO", // hashed "123456"
        role: "ADMIN",
        isPhoneVerified: true,
        isActive: true,
        createdAt: "2026-10-01T08:00:00Z",
      },
      {
        id: "usr_guardian_1",
        name: "Nasreen Sultana",
        phone: "01711000001",
        email: "nasreen@example.com",
        passwordHash: "$2b$10$R9DydRaBH29osdAeHBv6EuhTUUMWZsNr17cbfWFqERgg3O393r0eO", // hashed "123456"
        role: "GUARDIAN",
        isPhoneVerified: true,
        isActive: true,
        createdAt: "2026-10-01T10:00:00Z",
      },
      {
        id: "usr_tutor_1",
        name: "Tanvir Ahmed (BUET CSE)",
        phone: "01722000002",
        email: "tanvir.buet@example.com",
        passwordHash: "$2b$10$R9DydRaBH29osdAeHBv6EuhTUUMWZsNr17cbfWFqERgg3O393r0eO", // hashed "123456"
        role: "TUTOR",
        isPhoneVerified: true,
        isActive: true,
        createdAt: "2026-10-02T11:00:00Z",
      },
      {
        id: "usr_tutor_2",
        name: "Nusrat Jahan",
        phone: "01722000003",
        email: "nusrat.du@example.com",
        passwordHash: "$2b$10$R9DydRaBH29osdAeHBv6EuhTUUMWZsNr17cbfWFqERgg3O393r0eO", // hashed "123456"
        role: "TUTOR",
        isPhoneVerified: true,
        isActive: true,
        createdAt: "2026-10-03T11:00:00Z",
      },
      {
        id: "usr_tutor_3",
        name: "Dr. Sadia Afrin",
        phone: "01722000004",
        email: "sadia.dmc@example.com",
        passwordHash: "$2b$10$R9DydRaBH29osdAeHBv6EuhTUUMWZsNr17cbfWFqERgg3O393r0eO", // hashed "123456"
        role: "TUTOR",
        isPhoneVerified: true,
        isActive: true,
        createdAt: "2026-10-04T11:00:00Z",
      },
      {
        id: "usr_tutor_4",
        name: "Farhan Chowdhury",
        phone: "01722000005",
        email: "farhan.iba@example.com",
        passwordHash: "$2b$10$R9DydRaBH29osdAeHBv6EuhTUUMWZsNr17cbfWFqERgg3O393r0eO", // hashed "123456"
        role: "TUTOR",
        isPhoneVerified: true,
        isActive: true,
        createdAt: "2026-10-05T11:00:00Z",
      },
    ],
    guardians: [
      {
        id: "grd_1",
        userId: "usr_guardian_1",
        city: "Dhaka",
        location: "Dhanmondi",
        detailedAddress: "House 42, Road 7/A, Dhanmondi, Dhaka",
        emergencyPhone: "01811000001",
      },
    ],
    tutors: [
      {
        id: "tut_1",
        userId: "usr_tutor_1",
        name: "Tanvir Ahmed",
        phone: "01722000002",
        email: "tanvir.buet@example.com",
        gender: "Male",
        bio: "Senior undergraduate student at BUET (CSE Department). 4+ years of tutoring experience in Cambridge Mathematics, Physics, and ICT.",
        institution: "BUET",
        department: "Computer Science & Engineering",
        rating: 5.0,
        totalReviews: 24,
        tuitionsCompleted: 18,
        isVerified: true,
        verificationLevel: "PREMIUM_VERIFIED",
        expectedMinimumSalary: 7000,
        education: [
          {
            id: "edu_1",
            level: "GRADUATION",
            institution: "Bangladesh University of Engineering and Technology (BUET)",
            department: "Computer Science & Engineering",
            passingYear: 2026,
            isCurrent: true,
            gpa: 3.88,
          },
          {
            id: "edu_2",
            level: "HSC",
            institution: "Notre Dame College, Dhaka",
            department: "Science",
            passingYear: 2022,
            isCurrent: false,
            gpa: 5.0,
          },
        ],
        preferredCities: ["Dhaka"],
        preferredLocations: ["Dhanmondi", "Mohammadpur", "Lalmatia", "Panthapath"],
        preferredCategories: ["English Medium", "English Version", "Bangla Medium"],
      },
      {
        id: "tut_2",
        userId: "usr_tutor_2",
        name: "Nusrat Jahan",
        phone: "01722000003",
        email: "nusrat.du@example.com",
        gender: "Female",
        bio: "Master's in English Literature from University of Dhaka. 5+ years of successful track record tutoring English Medium (Cambridge/Edexcel) students from Play to Standard 8.",
        institution: "University of Dhaka",
        department: "Department of English",
        rating: 4.9,
        totalReviews: 32,
        tuitionsCompleted: 26,
        isVerified: true,
        verificationLevel: "PREMIUM_VERIFIED",
        expectedMinimumSalary: 7000,
        education: [
          {
            id: "edu_2_1",
            level: "POST_GRADUATION",
            institution: "University of Dhaka",
            department: "English Literature",
            passingYear: 2025,
            isCurrent: false,
            gpa: 3.75,
          },
          {
            id: "edu_2_2",
            level: "GRADUATION",
            institution: "University of Dhaka",
            department: "English",
            passingYear: 2024,
            isCurrent: false,
            gpa: 3.7,
          },
        ],
        preferredCities: ["Dhaka"],
        preferredLocations: ["Dhanmondi", "Mohammadpur", "Lalmatia", "Mirpur 2"],
        preferredCategories: ["English Medium", "English Version"],
      },
      {
        id: "tut_3",
        userId: "usr_tutor_3",
        name: "Dr. Sadia Afrin",
        phone: "01722000004",
        email: "sadia.dmc@example.com",
        gender: "Female",
        bio: "Final Year MBBS Student at Dhaka Medical College (DMC). Specializes in Biology, General Science, and Junior English Medium curricula.",
        institution: "Dhaka Medical College (DMC)",
        department: "MBBS (Final Year)",
        rating: 4.8,
        totalReviews: 19,
        tuitionsCompleted: 14,
        isVerified: true,
        verificationLevel: "BASIC_VERIFIED",
        expectedMinimumSalary: 7500,
        education: [
          {
            id: "edu_3_1",
            level: "GRADUATION",
            institution: "Dhaka Medical College",
            department: "MBBS",
            passingYear: 2027,
            isCurrent: true,
            gpa: 3.85,
          },
        ],
        preferredCities: ["Dhaka"],
        preferredLocations: ["Dhanmondi", "Mohammadpur", "Shahbagh", "Bakshibazar"],
        preferredCategories: ["English Medium", "Bangla Medium", "English Version"],
        documents: [
          {
            id: "doc_seed_1",
            tutorId: "tut_3",
            documentType: "STUDENT_ID",
            fileName: "DMC_Student_Card_2026.jpg",
            fileUrl: "/uploads/docs/DMC_Student_Card_2026.jpg",
            status: "PENDING_VERIFICATION",
            uploadedAt: "2026-10-28T14:00:00Z",
          },
        ],
      },
      {
        id: "tut_4",
        userId: "usr_tutor_4",
        name: "Farhan Chowdhury",
        phone: "01722000005",
        email: "farhan.iba@example.com",
        gender: "Male",
        bio: "BBA student at Institute of Business Administration (IBA), University of Dhaka. High academic honors in O/A Levels (6A*s, 3As).",
        institution: "IBA - University of Dhaka",
        department: "BBA (Finance & Marketing)",
        rating: 4.9,
        totalReviews: 28,
        tuitionsCompleted: 20,
        isVerified: true,
        verificationLevel: "PREMIUM_VERIFIED",
        expectedMinimumSalary: 8000,
        education: [
          {
            id: "edu_4_1",
            level: "GRADUATION",
            institution: "IBA, University of Dhaka",
            department: "BBA",
            passingYear: 2026,
            isCurrent: true,
            gpa: 3.92,
          },
        ],
        preferredCities: ["Dhaka"],
        preferredLocations: ["Gulshan", "Banani", "Dhanmondi", "Uttara"],
        preferredCategories: ["English Medium", "Admission Test"],
      },
    ],
    jobs: [
      {
        id: 243138,
        title: "Need English Medium (Cambridge) Tutor For Standard 3 Student-4 Days/Week",
        guardianId: "grd_1",
        guardianName: "Mrs. Nasreen Sultana",
        tuitionType: "Home Tutoring",
        category: "English Medium",
        className: "Standard 3",
        subjects: "English, Mathematics, Science",
        studentGender: "Male",
        preferredTutorGender: "Female",
        tutoringDaysPerWeek: 4,
        tutoringTime: "Evening (After 5:30 PM)",
        noOfStudents: 1,
        salary: "7,000 BDT",
        city: "Dhaka",
        location: "Mohammadpur",
        detailedAddress: "Japan Garden City, Mohammadpur",
        otherRequirements: "Tutor must be from English Medium background (Cambridge or Edexcel O/A Levels) or public university.",
        status: "LIVE",
        postedDate: "Oct 28, 2026",
        applicantsCount: 6,
      },
      {
        id: 243056,
        title: "Need Bangla Medium Tutor For HSC 2nd Year Student-3 Days/Week",
        guardianId: "grd_1",
        guardianName: "Engr. Rafiqul Islam",
        tuitionType: "Home Tutoring",
        category: "Bangla Medium",
        className: "HSC 2nd Year",
        subjects: "Physics, Chemistry, Higher Mathematics",
        studentGender: "Male",
        preferredTutorGender: "Male",
        tutoringDaysPerWeek: 3,
        tutoringTime: "Night (After 7:00 PM)",
        noOfStudents: 1,
        salary: "8,500 BDT",
        city: "Dhaka",
        location: "Mirpur 2",
        detailedAddress: "Section 2, Block H, Mirpur",
        otherRequirements: "Preferably BUET or Dhaka University Science faculty student.",
        status: "LIVE",
        postedDate: "Oct 27, 2026",
        applicantsCount: 9,
      },
      {
        id: 242811,
        title: "Need English Version Tutor For Class 7 Student-4 Days/Week",
        guardianId: "grd_1",
        guardianName: "Dr. Nazmul Huda",
        tuitionType: "Home Tutoring",
        category: "English Version",
        className: "Class 7",
        subjects: "General Science, Mathematics, English",
        studentGender: "Female",
        preferredTutorGender: "Female",
        tutoringDaysPerWeek: 4,
        tutoringTime: "Afternoon (4:00 PM)",
        noOfStudents: 1,
        salary: "6,500 BDT",
        city: "Dhaka",
        location: "Dhanmondi",
        detailedAddress: "Road 8, Dhanmondi",
        otherRequirements: "Must have good English fluency and patience with young learners.",
        status: "LIVE",
        postedDate: "Oct 26, 2026",
        applicantsCount: 5,
      },
      {
        id: 242469,
        title: "Need Quran & Tajweed Tutor For 2 Kids (Online 1-on-1)",
        guardianId: "grd_1",
        guardianName: "Md. Alamgir Hossain",
        tuitionType: "Online Tutoring",
        category: "Religious Studies",
        className: "Noorani & Nazira",
        subjects: "Holy Quran, Tajweed, Basic Islamic Studies",
        studentGender: "Male",
        preferredTutorGender: "Male",
        tutoringDaysPerWeek: 4,
        tutoringTime: "Morning (7:00 AM - 8:00 AM)",
        noOfStudents: 2,
        salary: "5,000 BDT",
        city: "Chattogram",
        location: "Online",
        otherRequirements: "Hafiz-e-Quran or Madrasha graduate with clear pronunciation and sound Tajweed rules.",
        status: "LIVE",
        postedDate: "Oct 25, 2026",
        applicantsCount: 14,
      },
      {
        id: 242069,
        title: "Need Admission Test Tutor For Engineering Aspirant (BUET/CKRUET)",
        guardianId: "grd_1",
        guardianName: "Kazi Moniruzzaman",
        tuitionType: "Home Tutoring",
        category: "Admission Test",
        className: "Admission 2026-27",
        subjects: "Concept Clearing, Physics, Higher Math Shortcuts",
        studentGender: "Male",
        preferredTutorGender: "Male",
        tutoringDaysPerWeek: 3,
        tutoringTime: "Flexible Evening",
        noOfStudents: 1,
        salary: "12,000 BDT",
        city: "Dhaka",
        location: "Uttara Sector 4",
        otherRequirements: "Tutor must be currently studying in BUET Engineering departments.",
        status: "LIVE",
        postedDate: "Oct 24, 2026",
        applicantsCount: 12,
      },
      {
        id: 241580,
        title: "Need O Level (Edexcel) Tutor For Mathematics B & Pure Math",
        guardianId: "grd_1",
        guardianName: "Mrs. Shahnaz Begum",
        tuitionType: "Home Tutoring",
        category: "English Medium",
        className: "O Level",
        subjects: "Mathematics B, Pure Math",
        studentGender: "Female",
        preferredTutorGender: "Any",
        tutoringDaysPerWeek: 3,
        tutoringTime: "6:00 PM",
        noOfStudents: 1,
        salary: "9,000 BDT",
        city: "Dhaka",
        location: "Gulshan 1",
        otherRequirements: "Must have past paper solving experience and track record of A* grades in O Levels.",
        status: "LIVE",
        postedDate: "Oct 23, 2026",
        applicantsCount: 8,
      },
      {
        id: 243145,
        title: "Need Spoken English & IELTS Tutor for HSC Graduate",
        guardianId: "grd_1",
        guardianName: "Mizanur Rahman",
        guardianPhone: "01855667788",
        tuitionType: "Online Tutoring",
        category: "Language Learning",
        className: "IELTS & Spoken",
        subjects: "IELTS Speaking, Listening, Writing, Pronunciation",
        studentGender: "Male",
        preferredTutorGender: "Any",
        tutoringDaysPerWeek: 3,
        tutoringTime: "Evening",
        noOfStudents: 1,
        salary: "8,000 BDT",
        city: "Dhaka",
        location: "Dhanmondi",
        detailedAddress: "Road 27, Dhanmondi",
        otherRequirements: "Tutor must have band score 7.5+ in IELTS.",
        status: "PENDING_APPROVAL",
        postedDate: "Oct 28, 2026",
        applicantsCount: 0,
      },
    ],
    applications: [
      {
        id: "app_seed_1",
        jobId: 243138,
        tutorId: "tut_2",
        tutorName: "Nusrat Jahan",
        tutorPhone: "01722000003",
        tutorInstitution: "University of Dhaka (English Dept)",
        tutorDepartment: "English Literature",
        tutorRating: 4.9,
        tutorVerified: true,
        expectedSalary: 7000,
        coverNote: "I have 5 years experience teaching Cambridge Primary curriculum (Checkers, Cambridge Primary English) to junior school kids in Mohammadpur and Dhanmondi.",
        status: "SHORTLISTED",
        appliedAt: "2026-10-28T09:15:00Z",
      },
      {
        id: "app_seed_2",
        jobId: 243138,
        tutorId: "tut_3",
        tutorName: "Dr. Sadia Afrin",
        tutorPhone: "01722000004",
        tutorInstitution: "Dhaka Medical College (DMC)",
        tutorDepartment: "MBBS",
        tutorRating: 4.8,
        tutorVerified: true,
        expectedSalary: 7500,
        coverNote: "Experienced in standard 3-5 all subjects with special care for Science, English, and Mathematics. Available on evenings as requested.",
        status: "DEMO_SCHEDULED",
        demoDate: "Oct 30, 2026",
        demoTime: "5:30 PM",
        demoNotes: "Demo class agreed at Japan Garden City, Mohammadpur.",
        appliedAt: "2026-10-28T10:30:00Z",
      },
      {
        id: "app_seed_3",
        jobId: 243138,
        tutorId: "tut_1",
        tutorName: "Tanvir Ahmed",
        tutorPhone: "01722000002",
        tutorInstitution: "BUET (CSE)",
        tutorDepartment: "Computer Science & Engineering",
        tutorRating: 5.0,
        tutorVerified: true,
        expectedSalary: 8000,
        coverNote: "Strong foundation in conceptual mathematics and science. Experienced in teaching English medium junior grades.",
        status: "APPLIED",
        appliedAt: "2026-10-28T11:45:00Z",
      },
    ],
    leads: [],
    confirmations: [
      {
        id: "cl_243138",
        jobId: 243138,
        jobTitle: "Need English Medium (Cambridge) Tutor For Standard 3 Student-4 Days/Week",
        guardianId: "grd_1",
        guardianName: "Mrs. Nasreen Sultana",
        guardianPhone: "01711000001",
        tutorId: "tut_1",
        tutorName: "Tanvir Ahmed",
        tutorInstitution: "BUET (CSE)",
        monthlySalary: 7000,
        daysPerWeek: 4,
        startDate: "Nov 01, 2026",
        platformChargeRate: 55,
        platformChargeAmount: 3850,
        paymentStatus: "UNPAID",
        dueDate: "Nov 07, 2026",
        issuedAt: "2026-10-28T10:00:00Z",
      },
    ],
    invoices: [],
    comments: [
      {
        id: "comm_1",
        jobId: 243138,
        userId: "usr_tutor_1",
        authorName: "Tanvir Ahmed (BUET CSE)",
        authorRole: "TUTOR",
        authorInstitution: "BUET",
        message: "আসসালামু আলাইকুম। শনি-সোম-বুধবার কি ক্লাস নেওয়া যাবে? আমি ও-লেভেল ফিজিক্স ও হায়ার ম্যাথে স্পেশালাইজড।",
        createdAt: "2026-10-28T14:30:00Z",
        likes: 2,
      },
      {
        id: "comm_2",
        jobId: 243138,
        userId: "usr_guardian_1",
        authorName: "Nasreen Sultana (Guardian)",
        authorRole: "GUARDIAN",
        message: "ওয়ালাইকুম আসসালাম। হ্যাঁ, শনি-সোম-বুধবার বিকেল ৫:৩০ টায় সুবিধা হবে। আপনি আবেদন করতে পারেন।",
        parentId: "comm_1",
        createdAt: "2026-10-28T15:10:00Z",
        likes: 1,
      },
      {
        id: "comm_3",
        jobId: 243056,
        userId: "usr_tutor_2",
        authorName: "Nusrat Jahan (DU English)",
        authorRole: "TUTOR",
        authorInstitution: "Dhaka University",
        message: "Hi, I have 3+ years experience teaching English Medium students from Scholastica and Sunbeams. Is offline tuition preferred?",
        createdAt: "2026-10-27T11:20:00Z",
        likes: 3,
      },
    ],
    applicationMessages: [
      {
        id: "msg_1",
        applicationId: "app_1",
        jobId: 243138,
        senderId: "usr_guardian_1",
        senderName: "Mrs. Nasreen Sultana",
        senderRole: "GUARDIAN",
        message: "আসসালামু আলাইকুম তানভীর। আপনার প্রোফাইল ও রেজাল্ট খুব ভালো লেগেছে। আগামী শুক্রবার বিকেলে কি ডেমো ক্লাস নিতে পারবেন?",
        createdAt: "2026-10-28T16:00:00Z",
        isRead: true,
      },
      {
        id: "msg_2",
        applicationId: "app_1",
        jobId: 243138,
        senderId: "usr_tutor_1",
        senderName: "Tanvir Ahmed",
        senderRole: "TUTOR",
        message: "ওয়ালাইকুম আসসালাম ম্যাম। জি ইনশাআল্লাহ, শুক্রবার বিকেল ৫:৩০ টায় আমি সরাসরি এসে ১ ঘণ্টার ট্রায়াল ডেমো ক্লাস নেব।",
        createdAt: "2026-10-28T16:25:00Z",
        isRead: true,
      },
    ],
    reviews: [
      {
        id: "rev_1",
        tutorId: "tut_1",
        guardianId: "grd_1",
        guardianName: "Mrs. Nasreen Sultana",
        rating: 5,
        comment: "তানভীর ভাই অত্যন্ত দায়িত্বশীল ও যত্নবান শিক্ষক। আমার ছেলের ম্যাথ এবং ফিজিক্সের বেসিক ২ মাসেই অনেক উন্নত হয়েছে। হাইলি রিকমেন্ডেড!",
        subjects: "Physics, Pure Mathematics",
        className: "Class 8 / O Level",
        createdAt: "2026-10-20T10:00:00Z",
      },
      {
        id: "rev_2",
        tutorId: "tut_1",
        guardianId: "grd_2",
        guardianName: "Engr. Rafiqul Islam",
        rating: 5,
        comment: "Excellent tutor from BUET. Very punctual, clear concept explanation, and friendly with students.",
        subjects: "Higher Math, ICT",
        className: "Class 9",
        createdAt: "2026-10-15T12:00:00Z",
      },
    ],
  };
}

if (!global.__TB_DATABASE__) {
  global.__TB_DATABASE__ = getInitialDB();
}

const db = global.__TB_DATABASE__;

export const DB = {
  // Users
  findUserByPhone: (phone: string) => {
    const clean = phone.replace(/[^0-9]/g, "");
    return db.users.find((u) => u.phone.replace(/[^0-9]/g, "") === clean);
  },
  findUserByEmail: (email: string) => db.users.find((u) => u.email === email),
  findUserById: (id: string) => db.users.find((u) => u.id === id),
  createUser: (user: User & { passwordHash: string }) => {
    db.users.push(user);
    return user;
  },

  // Tutors
  findTutorByUserId: (userId: string) => db.tutors.find((t) => t.userId === userId),
  findTutorById: (id: string) => db.tutors.find((t) => t.id === id),
  createTutorProfile: (profile: TutorProfile) => {
    db.tutors.push(profile);
    return profile;
  },
  updateTutorProfile: (tutorId: string, updates: Partial<TutorProfile>) => {
    const tutor = db.tutors.find((t) => t.id === tutorId);
    if (!tutor) return null;
    Object.assign(tutor, updates);
    return tutor;
  },
  addTutorEducation: (tutorId: string, edu: Omit<TutorEducation, "id">) => {
    const tutor = db.tutors.find((t) => t.id === tutorId);
    if (!tutor) return null;
    if (!tutor.education) tutor.education = [];
    const newEdu: TutorEducation = {
      ...edu,
      id: `edu_${Date.now()}`,
    };
    tutor.education.push(newEdu);
    return newEdu;
  },
  removeTutorEducation: (tutorId: string, eduId: string) => {
    const tutor = db.tutors.find((t) => t.id === tutorId);
    if (!tutor || !tutor.education) return false;
    tutor.education = tutor.education.filter((e) => e.id !== eduId);
    return true;
  },
  addTutorDocument: (
    tutorId: string,
    doc: Omit<TutorDocument, "id" | "uploadedAt" | "status" | "tutorId">
  ) => {
    const tutor = db.tutors.find((t) => t.id === tutorId);
    if (!tutor) return null;
    if (!tutor.documents) tutor.documents = [];
    const newDoc: TutorDocument = {
      ...doc,
      tutorId,
      id: `doc_${Date.now()}`,
      status: "PENDING_VERIFICATION",
      uploadedAt: new Date().toISOString(),
    };
    tutor.documents.push(newDoc);
    // Upgrade verification level to BASIC_VERIFIED if first document uploaded
    if (tutor.verificationLevel === "UNVERIFIED") {
      tutor.verificationLevel = "BASIC_VERIFIED";
    }
    return newDoc;
  },

  // Guardians
  findGuardianByUserId: (userId: string) => db.guardians.find((g) => g.userId === userId),
  findGuardianById: (id: string) => db.guardians.find((g) => g.id === id),
  createGuardianProfile: (profile: GuardianProfile) => {
    db.guardians.push(profile);
    return profile;
  },
  updateGuardianProfile: (guardianId: string, updates: Partial<GuardianProfile>) => {
    const guardian = db.guardians.find((g) => g.id === guardianId || g.userId === guardianId);
    if (!guardian) return null;
    Object.assign(guardian, updates);
    return guardian;
  },

  // Jobs
  getJobsByGuardianId: (guardianId: string) => db.jobs.filter((j) => j.guardianId === guardianId),
  updateJob: (jobId: number, updates: Partial<JobPost>) => {
    const job = db.jobs.find((j) => j.id === jobId);
    if (!job) return null;
    Object.assign(job, updates);
    return job;
  },
  incrementJobViews: (jobId: number) => {
    const job = db.jobs.find((j) => j.id === jobId);
    if (!job) return 0;
    job.views = (job.views || 0) + 1;
    return job.views;
  },
  updateJobStatus: (jobId: number, status: JobStatus) => {
    const job = db.jobs.find((j) => j.id === jobId);
    if (!job) return null;
    job.status = status;
    return job;
  },
  getAllJobs: (filters?: {
    city?: string;
    location?: string;
    category?: string;
    tuitionType?: string;
    gender?: string;
  }) => {
    let list = db.jobs.filter((j) => j.status === "LIVE");
    if (!filters) return list;

    if (filters.city && filters.city !== "All") {
      list = list.filter((j) => j.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.location && filters.location !== "All") {
      list = list.filter((j) => j.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    if (filters.category && filters.category !== "All") {
      list = list.filter((j) => j.category.toLowerCase().includes(filters.category!.toLowerCase()));
    }
    if (filters.tuitionType && filters.tuitionType !== "All") {
      list = list.filter((j) => j.tuitionType.toLowerCase().includes(filters.tuitionType!.toLowerCase()));
    }
    if (filters.gender && filters.gender !== "Any") {
      list = list.filter((j) => j.preferredTutorGender === filters.gender || j.preferredTutorGender === "Any");
    }
    return list;
  },

  getJobById: (id: number) => db.jobs.find((j) => j.id === id),

  createJob: (job: Omit<JobPost, "id" | "postedDate" | "applicantsCount" | "status">) => {
    const newId = 243140 + db.jobs.length;
    const newJob: JobPost = {
      ...job,
      id: newId,
      postedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      applicantsCount: 0,
      status: "LIVE",
    };
    db.jobs.unshift(newJob);
    return newJob;
  },

  // Applications
  applyToJob: (app: Omit<JobApplication, "id" | "appliedAt" | "status">) => {
    const existing = db.applications.find((a) => a.jobId === app.jobId && a.tutorId === app.tutorId);
    if (existing) return existing;

    const newApp: JobApplication = {
      ...app,
      id: `app_${Date.now()}`,
      status: "APPLIED",
      appliedAt: new Date().toISOString(),
    };
    db.applications.push(newApp);

    // Increment job count
    const job = db.jobs.find((j) => j.id === app.jobId);
    if (job) job.applicantsCount += 1;

    return newApp;
  },

  getApplicationsByJobId: (jobId: number) => db.applications.filter((a) => a.jobId === jobId),
  getApplicationsByTutorId: (tutorId: string) => db.applications.filter((a) => a.tutorId === tutorId),
  getApplicationById: (id: string) => db.applications.find((a) => a.id === id),
  undoApplication: (jobId: number, tutorId: string) => {
    const idx = db.applications.findIndex((a) => a.jobId === jobId && a.tutorId === tutorId);
    if (idx === -1) return false;
    db.applications.splice(idx, 1);
    const job = db.jobs.find((j) => j.id === jobId);
    if (job && job.applicantsCount > 0) {
      job.applicantsCount -= 1;
    }
    return true;
  },
  updateApplicationStatus: (
    applicationId: string,
    status: ApplicationStatus,
    demoDetails?: { demoDate?: string; demoTime?: string; demoNotes?: string }
  ) => {
    const app = db.applications.find((a) => a.id === applicationId);
    if (!app) return null;
    app.status = status;
    if (demoDetails) {
      if (demoDetails.demoDate) app.demoDate = demoDetails.demoDate;
      if (demoDetails.demoTime) app.demoTime = demoDetails.demoTime;
      if (demoDetails.demoNotes) app.demoNotes = demoDetails.demoNotes;
    }
    return app;
  },

  // Leads (from hire-a-tutor early funnel)
  createLead: (lead: Omit<Lead, "id" | "createdAt" | "status">) => {
    const newLead: Lead = {
      ...lead,
      id: `lead_${Date.now()}`,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };
    db.leads.unshift(newLead);
    return newLead;
  },

  // Confirmations
  getConfirmationByJobId: (jobId: number) => db.confirmations.find((c) => c.jobId === jobId),
  getConfirmationById: (id: string) => db.confirmations.find((c) => c.id === id),
  createConfirmation: (
    letter: Omit<ConfirmationLetter, "id" | "issuedAt" | "dueDate" | "platformChargeAmount" | "paymentStatus">
  ) => {
    const existing = db.confirmations.find((c) => c.jobId === letter.jobId);
    if (existing) return existing;

    const rate = letter.platformChargeRate || 55;
    const amount = Math.round((letter.monthlySalary * rate) / 100);

    const now = new Date();
    const dueDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newConf: ConfirmationLetter = {
      ...letter,
      id: `cl_${letter.jobId}`,
      platformChargeAmount: amount,
      paymentStatus: "UNPAID",
      issuedAt: now.toISOString(),
      dueDate: dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    db.confirmations.push(newConf);
    return newConf;
  },
  updateConfirmationPaymentStatus: (id: string, status: "PAID" | "REFUNDED") => {
    const conf = db.confirmations.find((c) => c.id === id);
    if (!conf) return null;
    conf.paymentStatus = status;
    return conf;
  },

  // Invoices
  createInvoice: (
    inv: Omit<Invoice, "id" | "invoiceNumber" | "paidAt" | "status">
  ) => {
    const newInvoice: Invoice = {
      ...inv,
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      paidAt: new Date().toISOString(),
      status: "PAID",
    };
    db.invoices.push(newInvoice);

    // Mark confirmation as PAID
    const conf = db.confirmations.find((c) => c.id === inv.confirmationId);
    if (conf) {
      conf.paymentStatus = "PAID";
    }

    return newInvoice;
  },
  getInvoiceById: (id: string) => db.invoices.find((i) => i.id === id || i.invoiceNumber === id),
  getInvoiceByConfirmationId: (confirmationId: string) =>
    db.invoices.find((i) => i.confirmationId === confirmationId),

  // Admin Backoffice Methods
  getAllJobsAdmin: () => db.jobs,
  getAllTutorsAdmin: () => db.tutors,
  getAllInvoices: () => db.invoices,
  verifyTutorDocument: (
    tutorId: string,
    docId: string,
    status: "VERIFIED" | "REJECTED",
    level?: "BASIC_VERIFIED" | "PREMIUM_VERIFIED"
  ) => {
    const tutor = db.tutors.find((t) => t.id === tutorId);
    if (!tutor) return null;
    if (tutor.documents) {
      const doc = tutor.documents.find((d) => d.id === docId);
      if (doc) doc.status = status;
    }
    if (status === "VERIFIED") {
      tutor.isVerified = true;
      tutor.verificationLevel = level || "PREMIUM_VERIFIED";
    }
    return tutor;
  },

  getLeads: () => db.leads,

  // Comments & Discussions on Jobs
  getJobComments: (jobId: number) => (db.comments || []).filter((c) => c.jobId === jobId),
  addJobComment: (comment: Omit<JobComment, "id" | "createdAt" | "likes">) => {
    if (!db.comments) db.comments = [];
    const newComment: JobComment = {
      ...comment,
      id: `comm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    db.comments.push(newComment);
    return newComment;
  },
  likeJobComment: (commentId: string) => {
    if (!db.comments) return null;
    const comm = db.comments.find((c) => c.id === commentId);
    if (comm) {
      comm.likes = (comm.likes || 0) + 1;
    }
    return comm;
  },

  // Private Application Messages & Feedback (Tutor <-> Guardian)
  getApplicationMessages: (applicationId: string) =>
    (db.applicationMessages || []).filter((m) => m.applicationId === applicationId),
  addApplicationMessage: (msg: Omit<ApplicationMessage, "id" | "createdAt" | "isRead">) => {
    if (!db.applicationMessages) db.applicationMessages = [];
    const newMsg: ApplicationMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    db.applicationMessages.push(newMsg);
    return newMsg;
  },

  // Tutor Reviews & Feedback
  getTutorReviews: (tutorId: string) => (db.reviews || []).filter((r) => r.tutorId === tutorId),
  addTutorReview: (review: Omit<TutorReview, "id" | "createdAt">) => {
    if (!db.reviews) db.reviews = [];
    const newRev: TutorReview = {
      ...review,
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    db.reviews.push(newRev);

    // Update tutor's rating
    const tutor = db.tutors.find((t) => t.id === review.tutorId);
    if (tutor) {
      const tutorRevs = db.reviews.filter((r) => r.tutorId === review.tutorId);
      const avg = tutorRevs.reduce((sum, r) => sum + r.rating, 0) / tutorRevs.length;
      tutor.rating = Number(avg.toFixed(1));
      tutor.totalReviews = tutorRevs.length;
    }
    return newRev;
  },
};
