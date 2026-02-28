import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateStartupIdea } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { ideaTitle, ideaDescription, targetAudience, problemStatement } = body;

        if (!ideaTitle || !ideaDescription) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Call AI Wrapper
        const analysis = await validateStartupIdea({
            ideaTitle,
            ideaDescription,
            targetAudience,
            problemStatement
        });

        // Save to database
        const idea = await prisma.idea.create({
            data: {
                userId: session.user.id,
                ideaTitle,
                ideaDescription,
                targetAudience,
                problemStatement,
                ideaScore: analysis.demandScore,
                feasibilityScore: analysis.feasibilityScore,
                competitionScore: analysis.competitionScore,
                recommendations: JSON.stringify(analysis.recommendations),
                // roadmap will be generated later
            },
        });

        return NextResponse.json({ idea }, { status: 200 });
    } catch (error) {
        console.error("Error validating idea:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
