import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create some skills first
  const skills = await Promise.all([
    prisma.skill.create({ data: { name: "React" } }),
    prisma.skill.create({ data: { name: "TypeScript" } }),
    prisma.skill.create({ data: { name: "Node.js" } }),
    prisma.skill.create({ data: { name: "Python" } }),
    prisma.skill.create({ data: { name: "PostgreSQL" } }),
    prisma.skill.create({ data: { name: "Docker" } }),
    prisma.skill.create({ data: { name: "AWS" } }),
    prisma.skill.create({ data: { name: "JavaScript" } }),
    prisma.skill.create({ data: { name: "CSS" } }),
    prisma.skill.create({ data: { name: "HTML" } }),
    prisma.skill.create({ data: { name: "Next.js" } }),
    prisma.skill.create({ data: { name: "Vue.js" } }),
    prisma.skill.create({ data: { name: "Angular" } }),
    prisma.skill.create({ data: { name: "MongoDB" } }),
    prisma.skill.create({ data: { name: "GraphQL" } }),
    prisma.skill.create({ data: { name: "Figma" } }),
    prisma.skill.create({ data: { name: "Adobe XD" } }),
    prisma.skill.create({ data: { name: "Java" } }),
    prisma.skill.create({ data: { name: "C#" } }),
    prisma.skill.create({ data: { name: "Swift" } }),
    prisma.skill.create({ data: { name: "Tailwind CSS" } }),
    prisma.skill.create({ data: { name: "Git" } }),
    prisma.skill.create({ data: { name: "Express.js" } }),
    prisma.skill.create({ data: { name: "Django" } }),
    prisma.skill.create({ data: { name: "Flask" } }),
    prisma.skill.create({ data: { name: "Redis" } }),
    prisma.skill.create({ data: { name: "Kubernetes" } }),
    prisma.skill.create({ data: { name: "Jenkins" } }),
    prisma.skill.create({ data: { name: "TensorFlow" } }),
    prisma.skill.create({ data: { name: "PyTorch" } }),
  ]);

  console.log("Created skills:", skills.length);

  // Create sample users - updated to match your database schema
  const users = [
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
      job: "Senior Frontend Developer",
      description:
        "Experienced frontend developer with 5+ years building modern web applications",
      skillNames: [
        "React",
        "TypeScript",
        "JavaScript",
        "CSS",
        "Next.js",
        "HTML",
        "Tailwind CSS",
        "Git",
      ],
    },
    {
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      job: "Full Stack Engineer",
      description:
        "Full stack developer specializing in Python and Node.js with 3+ years experience",
      skillNames: [
        "Python",
        "Node.js",
        "PostgreSQL",
        "React",
        "Docker",
        "Express.js",
        "MongoDB",
        "AWS",
      ],
    },
    {
      firstName: "Carol",
      lastName: "Davis",
      email: "carol@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      job: "UX Designer",
      description:
        "Creative UX designer with 4+ years of experience in user-centered design",
      skillNames: [
        "Figma",
        "Adobe XD",
        "CSS",
        "HTML",
        "JavaScript",
        "React",
        "Vue.js",
        "TypeScript",
      ],
    },
    {
      firstName: "David",
      lastName: "Wilson",
      email: "david@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      job: "Backend Developer",
      description:
        "Senior backend developer with 6+ years experience in scalable systems",
      skillNames: [
        "Java",
        "PostgreSQL",
        "AWS",
        "Docker",
        "MongoDB",
        "Python",
        "Node.js",
        "Redis",
      ],
    },
    {
      firstName: "Eva",
      lastName: "Martinez",
      email: "eva@example.com",
      imgUrl: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150",
      job: "DevOps Engineer",
      description:
        "DevOps specialist with 4+ years experience in cloud infrastructure",
      skillNames: [
        "AWS",
        "Docker",
        "PostgreSQL",
        "Python",
        "Node.js",
        "Kubernetes",
        "Jenkins",
        "Git",
      ],
    },
    {
      firstName: "Frank",
      lastName: "Thompson",
      email: "frank@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150",
      job: "Data Scientist",
      description:
        "Data scientist with 5+ years experience in machine learning and analytics",
      skillNames: [
        "Python",
        "PostgreSQL",
        "AWS",
        "TensorFlow",
        "Node.js",
        "TypeScript",
        "PyTorch",
        "MongoDB",
      ],
    },
    {
      firstName: "Grace",
      lastName: "Lee",
      email: "grace@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
      job: "Product Manager",
      description:
        "Experienced product manager with 7+ years leading cross-functional teams",
      skillNames: [
        "JavaScript",
        "CSS",
        "Figma",
        "HTML",
        "React",
        "TypeScript",
        "Vue.js",
        "Angular",
      ],
    },
    {
      firstName: "Henry",
      lastName: "Brown",
      email: "henry@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      job: "Mobile Developer",
      description:
        "Mobile app developer with 4+ years experience in iOS and Android",
      skillNames: [
        "React",
        "TypeScript",
        "Swift",
        "JavaScript",
        "CSS",
        "Java",
        "C#",
        "Git",
      ],
    },
    {
      firstName: "Ivy",
      lastName: "Chen",
      email: "ivy@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      job: "Security Engineer",
      description:
        "Cybersecurity expert with 6+ years experience in application security",
      skillNames: [
        "Python",
        "Java",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Node.js",
        "Kubernetes",
        "Git",
      ],
    },
    {
      firstName: "Jack",
      lastName: "Rodriguez",
      email: "jack@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150",
      job: "Cloud Architect",
      description:
        "Senior cloud architect with 8+ years designing scalable cloud solutions",
      skillNames: [
        "AWS",
        "Docker",
        "Python",
        "PostgreSQL",
        "Node.js",
        "Kubernetes",
        "Jenkins",
        "MongoDB",
      ],
    },
    {
      firstName: "Karen",
      lastName: "White",
      email: "karen@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      job: "Frontend Developer",
      description:
        "Frontend developer with 3+ years experience in modern JavaScript frameworks",
      skillNames: [
        "Vue.js",
        "JavaScript",
        "CSS",
        "HTML",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Git",
      ],
    },
    {
      firstName: "Liam",
      lastName: "Garcia",
      email: "liam@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
      job: "Game Developer",
      description:
        "Game developer with 5+ years experience in Unity and Unreal Engine",
      skillNames: [
        "C#",
        "JavaScript",
        "TypeScript",
        "CSS",
        "HTML",
        "Java",
        "Python",
        "Git",
      ],
    },
    {
      firstName: "Maya",
      lastName: "Patel",
      email: "maya@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
      job: "AI Engineer",
      description:
        "AI engineer with 4+ years experience in deep learning and computer vision",
      skillNames: [
        "Python",
        "TypeScript",
        "PostgreSQL",
        "AWS",
        "Node.js",
        "TensorFlow",
        "PyTorch",
        "MongoDB",
      ],
    },
    {
      firstName: "Noah",
      lastName: "Johnson",
      email: "noah@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150",
      job: "Blockchain Developer",
      description:
        "Blockchain developer with 3+ years experience in DeFi and smart contracts",
      skillNames: [
        "JavaScript",
        "TypeScript",
        "Node.js",
        "React",
        "CSS",
        "Python",
        "MongoDB",
        "Git",
      ],
    },
    {
      firstName: "Olivia",
      lastName: "Anderson",
      email: "olivia@example.com",
      imgUrl:
        "https://images.unsplash.com/photo-1502767089025-6572583495b6?w=150",
      job: "QA Engineer",
      description:
        "Quality assurance engineer with 5+ years experience in automated testing",
      skillNames: [
        "JavaScript",
        "TypeScript",
        "Python",
        "PostgreSQL",
        "Docker",
        "Java",
        "Node.js",
        "Git",
      ],
    },
  ];

  for (const userData of users) {
    const { skillNames, ...userInfo } = userData;

    // Create user with the correct field names
    const user = await prisma.user.create({
      data: userInfo,
    });

    // Link user to skills
    for (const skillName of skillNames) {
      const skill = skills.find((s) => s.name === skillName);
      if (skill) {
        await prisma.userSkill.create({
          data: {
            userId: user.id,
            skillId: skill.id,
          },
        });
      }
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
