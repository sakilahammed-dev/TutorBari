import { JobPost, TutorProfile } from "./types";
import { DB } from "./store";

export interface TutorMatchResult {
  tutor: TutorProfile;
  matchScore: number; // 0 - 100
  reasons: string[];
  distanceEstimate: string;
}

export function matchTutorsForJob(jobId: number): TutorMatchResult[] {
  const job = DB.getJobById(jobId);
  if (!job) return [];

  const tutors = DB.getAllTutorsAdmin();

  const results: TutorMatchResult[] = tutors.map((tutor) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Location / Proximity Matching (Max 30 pts)
    const tutorLocations = tutor.preferredLocations?.map((l) => l.toLowerCase()) || [];
    const jobLoc = job.location.toLowerCase();

    let distanceEstimate = "Approx. 4-6 km away";

    if (tutorLocations.some((loc) => loc.includes(jobLoc) || jobLoc.includes(loc))) {
      score += 30;
      distanceEstimate = "Within 1-2 km (Direct Area Match)";
      reasons.push(`Direct location match: Operates in ${job.location}`);
    } else {
      // Adjacent check
      const adjacentAreas: Record<string, string[]> = {
        dhanmondi: ["mohammadpur", "lalmatia", "panthapath", "shankar"],
        mohammadpur: ["dhanmondi", "lalmatia", "adabor", "shyamoli"],
        gulshan: ["banani", "baridhara", "badda", "niketan"],
        uttara: ["airport", "nikunja", "khilkhet"],
      };

      const matchedAdjacent = Object.entries(adjacentAreas).find(([base, adjacents]) => {
        return (
          (jobLoc.includes(base) && tutorLocations.some((l) => adjacents.some((a) => l.includes(a)))) ||
          (tutorLocations.some((l) => l.includes(base)) && adjacents.some((a) => jobLoc.includes(a)))
        );
      });

      if (matchedAdjacent) {
        score += 22;
        distanceEstimate = "Approx. 2-3 km (Adjacent Neighborhood)";
        reasons.push(`Nearby neighborhood: Quick commute to ${job.location}`);
      } else {
        score += 10;
        reasons.push("Available in the same metropolitan city");
      }
    }

    // 2. Curriculum & Category Matching (Max 25 pts)
    const tutorCategories = tutor.preferredCategories?.map((c) => c.toLowerCase()) || [];
    const jobCategory = job.category.toLowerCase();

    if (tutorCategories.some((cat) => cat.includes(jobCategory) || jobCategory.includes(cat))) {
      score += 25;
      reasons.push(`Curriculum expertise in ${job.category}`);
    } else {
      score += 8;
    }

    // 3. Department & Subject Relevance (Max 25 pts)
    const dept = tutor.department?.toLowerCase() || "";
    const subjects = job.subjects.toLowerCase();

    if (
      (subjects.includes("math") || subjects.includes("physic") || subjects.includes("ict")) &&
      (dept.includes("computer") || dept.includes("engineering") || dept.includes("math") || dept.includes("physic"))
    ) {
      score += 25;
      reasons.push(`Strong academic alignment: ${tutor.institution} (${tutor.department})`);
    } else if (
      subjects.includes("english") &&
      (dept.includes("english") || tutor.institution?.includes("IBA") || tutor.institution?.includes("Cambridge"))
    ) {
      score += 25;
      reasons.push(`Language & literature mastery from ${tutor.institution}`);
    } else if (
      (subjects.includes("biology") || subjects.includes("science")) &&
      (dept.includes("mbbs") || dept.includes("medical") || dept.includes("bio"))
    ) {
      score += 25;
      reasons.push(`Medical & biological sciences specialist from ${tutor.institution}`);
    } else {
      score += 15;
      reasons.push("Versatile multi-subject tutoring foundation");
    }

    // 4. Gender Preference (Max 10 pts)
    if (job.preferredTutorGender === "Any" || job.preferredTutorGender === tutor.gender) {
      score += 10;
      if (job.preferredTutorGender !== "Any") {
        reasons.push(`Matches guardian preference for ${tutor.gender} tutor`);
      }
    }

    // 5. Rating & Verification Bonus (Max 10 pts)
    if (tutor.rating >= 4.8 && tutor.isVerified) {
      score += 10;
      reasons.push(`High parent trust rating: ★ ${tutor.rating} (${tutor.totalReviews} reviews)`);
    } else if (tutor.isVerified) {
      score += 6;
      reasons.push("Identity verified with official credentials");
    }

    return {
      tutor,
      matchScore: Math.min(score, 99),
      reasons,
      distanceEstimate,
    };
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
