import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get users with their skills (removing location for now)
    const users = await prisma.user.findMany({
      skip,
      take: limit,
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        location: true, // Include location relation
      },
      orderBy: {
        id: "asc",
      },
    });

    // Get total count for pagination
    const totalUsers = await prisma.user.count();
    const hasMore = skip + limit < totalUsers;

    // Transform data to match your frontend interface
    const transformedUsers = users.map((user) => ({
      id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatar: user.imgUrl,
      title: user.job,
      location: user.location ? user.location.name : "Remote",
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
