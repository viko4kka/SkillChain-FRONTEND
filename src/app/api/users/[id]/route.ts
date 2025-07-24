import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
        location: true,
      },
    })) as {
      id: number;
      firstName: string;
      lastName: string;
      email: string | null;
      imgUrl: string | null;
      job: string | null;
      description: string | null;
      location: { id: number; name: string } | null;
      skills: { skill: { name: string } }[];
    } | null;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Transform data to match your frontend interface
    const transformedUser = {
      id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatar: user.imgUrl,
      title: user.job,
      location: user.location ? user.location.name : "Remote",
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
