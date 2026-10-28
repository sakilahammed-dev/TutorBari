export type UserRole = "GUARDIAN" | "TUTOR" | "ADMIN";

export type Gender = "Male" | "Female" | "Any";

export type TuitionType =
  | "Home Tutoring"
  | "Online Tutoring"
  | "Group Tutoring"
  | "Package Tutoring"
  | "Shadow Tutoring";

export type JobStatus = "PENDING_APPROVAL" | "LIVE" | "APPOINTED" | "CANCELLED";

export type ApplicationStatus =
  | "APPLIED"
  | "SHORTLISTED"
  | "DEMO_SCHEDULED"
  | "APPOINTED"
  | "REJECTED"
  | "WITHDRAWN";

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  isPhoneVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface GuardianProfile {
  id: string;
  userId: string;
  name?: string;
  gender?: Gender;
  phone?: string;
  email?: string;
  emergencyPhone?: string;
  city: string;
  location: string;
  detailedAddress?: string;
  profession?: string;
  emergencyName?: string;
  emergencyContactNumber?: string;
  emergencyRelation?: string;
  emergencyAddress?: string;
  facebook?: string;
  hearAboutUs?: string;
  profilePhoto?: string;
  notes?: string;
}

export interface TutorEducation {
  id: string;
  level: "SSC" | "HSC" | "GRADUATION" | "POST_GRADUATION";
  institution: string;
  curriculum?: string;
  department?: string;
  gpa?: number;
  passingYear: number;
  isCurrent: boolean;
}

export interface TutorDocument {
  id: string;
  tutorId: string;
  documentType: "NID" | "STUDENT_ID" | "CERTIFICATE" | "UTILITY_BILL";
  fileUrl: string;
  fileName: string;
  status: "PENDING_VERIFICATION" | "VERIFIED" | "REJECTED";
  uploadedAt: string;
}

export interface TutorProfile {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email?: string;
  gender: Gender;
  bio?: string;
  tutoringExperience?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  religion?: string;
  emergencyContact?: string;
  emergencyName?: string;
  emergencyContactNumber?: string;
  emergencyRelation?: string;
  emergencyAddress?: string;
  facebook?: string;
  hearAboutUs?: string;
  profilePercentage?: number;
  totalCvView?: number;
  presentAddress?: string;
  permanentAddress?: string;
  institution?: string;
  department?: string;
  rating: number;
  totalReviews: number;
  tuitionsCompleted: number;
  isVerified: boolean;
  verificationLevel: "UNVERIFIED" | "BASIC_VERIFIED" | "PREMIUM_VERIFIED";
  expectedMinimumSalary: number;
  education?: TutorEducation[];
  preferredCities?: string[];
  preferredLocations?: string[];
  preferredCategories?: string[];
  preferredClasses?: string[];
  preferredSubjects?: string[];
  availableDays?: number;
  availableTime?: string;
  documents?: TutorDocument[];
}

export interface JobPost {
  id: number;
  title: string;
  guardianId: string;
  guardianName?: string;
  guardianPhone?: string;
  studentName?: string;
  instituteName?: string;
  preferredTutorUniversity?: string;
  hireDate?: string;
  curriculumDetails?: string;
  tuitionType: TuitionType;
  category: string;
  className: string;
  subjects: string;
  studentGender: Gender;
  preferredTutorGender: Gender;
  tutoringDaysPerWeek: number;
  tutoringTime?: string;
  noOfStudents: number;
  salary: string;
  city: string;
  location: string;
  detailedAddress?: string;
  otherRequirements?: string;
  status: JobStatus;
  postedDate: string;
  applicantsCount: number;
  applied?: boolean;
  views?: number;
  totalApplied?: number;
}

export interface JobApplication {
  id: string;
  jobId: number;
  tutorId: string;
  tutorName?: string;
  tutorPhone?: string;
  tutorInstitution?: string;
  tutorDepartment?: string;
  tutorRating?: number;
  tutorVerified?: boolean;
  expectedSalary?: number;
  availableFrom?: string;
  availableDays?: number;
  convenientTime?: string;
  coverNote?: string;
  agreementAccepted?: boolean;
  status: ApplicationStatus;
  demoDate?: string;
  demoTime?: string;
  demoNotes?: string;
  appliedAt: string;
}

export interface ConfirmationLetter {
  id: string;
  jobId: number;
  jobTitle: string;
  guardianId: string;
  guardianName: string;
  guardianPhone: string;
  tutorId: string;
  tutorName: string;
  tutorInstitution: string;
  monthlySalary: number;
  daysPerWeek: number;
  startDate: string;
  platformChargeRate: number; // 55% or 35%
  platformChargeAmount: number;
  paymentStatus: "UNPAID" | "PAID" | "REFUNDED";
  dueDate: string; // 7 days from issue
  issuedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  confirmationId: string;
  jobId: number;
  jobTitle: string;
  tutorId: string;
  tutorName: string;
  tutorPhone: string;
  amount: number;
  paymentMethod: "bKash" | "Nagad" | "Rocket" | "Upay" | "Card";
  transactionId: string;
  paidAt: string;
  status: "PAID" | "REFUNDED";
}

export interface Lead {
  id: string;
  phone: string;
  name?: string;
  address?: string;
  description?: string;
  source?: string;
  status: "NEW" | "CONTACTED" | "CONVERTED" | "DROPPED";
  createdAt: string;
}
