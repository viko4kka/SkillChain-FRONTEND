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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get users with their skills
    const users = (await prisma.user.findMany({
      skip,
      take: limit,
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    })) as UserWithSkills[];

    // Get total count for pagination
    const totalUsers = await prisma.user.count();
    const hasMore = skip + limit < totalUsers;

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
    const transformedUsers = users.map((user: UserWithSkills) => ({
      id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatar: user.imgUrl,
      title: user.job,
      location: getLocationForUser(user.id),
      experience: "Experienced",
      verified: Math.random() > 0.5, // Random verification status
      skills: user.skills.map((userSkill) => userSkill.skill.name),
    }));

    return NextResponse.json({
      users: transformedUsers,
      hasMore,
      nextCursor: hasMore ? (page + 1).toString() : undefined,
      total: totalUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
