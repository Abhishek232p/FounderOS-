import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateExecutionRoadmap } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const ideaId = searchParams.get("ideaId");

        let idea;

        if (ideaId) {
            idea = await prisma.idea.findUnique({
                where: { id: ideaId, userId: session.user.id },
            });
        } else {
            // Find the most recent idea
            idea = await prisma.idea.findFirst({
                where: { userId: session.user.id },
                orderBy: { createdAt: "desc" },
            });
        }

        if (!idea) {
            return NextResponse.json({ error: "No idea found to generate roadmap for. Please validate an idea first." }, { status: 404 });
        }

        // Call AI Wrapper
        const roadmap = await generateExecutionRoadmap(idea.id, idea);

        // Save to database
        const updatedIdea = await prisma.idea.update({
            where: { id: idea.id },
            data: {
                roadmap: JSON.stringify(roadmap),
            },
        });

        return NextResponse.json({ idea: updatedIdea, roadmap }, { status: 200 });
    } catch (error) {
        console.error("Error generating roadmap:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
