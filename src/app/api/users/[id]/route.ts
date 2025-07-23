import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Type definition for user with skills
type UserWithSkills = {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  imgUrl: string | null;
  job: string | null;
  description: string | null;
  skills: {
    skill: {
      name: string;
    };
  }[];
};

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    // Convert string id to number
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = (await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    })) as UserWithSkills | null;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Simple location mapping based on user ID
    const getLocationForUser = (userId: number): string => {
      const locations = [
        "San Francisco, CA",
        "New York, NY",
        "Austin, TX",
        "Seattle, WA",
        "Denver, CO",
        "Boston, MA",
        "Los Angeles, CA",
        "Chicago, IL",
        "Phoenix, AZ",
        "Miami, FL",
        "Portland, OR",
        "San Diego, CA",
        "Atlanta, GA",
        "Nashville, TN",
        "Salt Lake City, UT",
      ];
      return locations[(userId - 1) % locations.length] || "Remote";
    };

    // Transform data to match your frontend interface
    const transformedUser = {
      id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatar: user.imgUrl,
      title: user.job,
      location: getLocationForUser(user.id),
      experience: "Experienced",
      verified: Math.random() > 0.5, // Random verification status
      skills: user.skills.map((userSkill) => userSkill.skill.name),
    };

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
