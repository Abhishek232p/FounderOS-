import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { analyzeWebsiteConversion } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { websiteUrl } = await req.json();

        if (!websiteUrl) {
            return NextResponse.json({ error: "Website URL is required" }, { status: 400 });
        }

        // Call AI Wrapper
        const analysis = await analyzeWebsiteConversion(websiteUrl);

        // Save to database
        const report = await prisma.websiteReport.create({
            data: {
                userId: session.user.id,
                websiteUrl,
                conversionScore: analysis.conversionScore,
                uxScore: analysis.uxQualityScore,
                trustScore: analysis.trustScore,
                speedScore: analysis.speedScore,
                recommendations: JSON.stringify(analysis.recommendations),
            },
        });

        return NextResponse.json({ report }, { status: 200 });
    } catch (error) {
        console.error("Error analyzing website:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
