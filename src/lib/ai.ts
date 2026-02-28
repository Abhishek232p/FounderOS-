// This is a wrapper for AI generation. 
// For this MVP without a provided OpenAI API key, we will use a mock implementation that returns realistic startup analysis data.

export async function validateStartupIdea(input: {
    ideaTitle: string;
    ideaDescription: string;
    targetAudience: string;
    problemStatement: string;
}) {
    // Simulate AI latency
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Predictably random scores based on input length/content
    const seed = input.ideaTitle.length + input.ideaDescription.length;
    const demandScore = 65 + (seed % 30);
    const feasibilityScore = 55 + (seed % 40);
    const competitionScore = 40 + (seed % 50);

    return {
        demandScore,
        feasibilityScore,
        competitionScore,
        recommendations: [
            `Your idea "${input.ideaTitle}" has strong potential for ${input.targetAudience} but needs tighter positioning.`,
            "Focus your initial MVP exclusively on the core problem: " + (input.problemStatement.slice(0, 50) + "..."),
            "The market seems crowded, consider finding a niche segment to dominate first.",
            "Pricing power will be key—avoid a race to the bottom by emphasizing premium features."
        ],
        riskAnalysis: "High execution risk due to generic market positioning. Lower this by doing 20 user interviews before writing code.",
    };
}

export async function generateExecutionRoadmap(ideaId: string, ideaDetails: any) {
    // Simulate AI latency
    await new Promise(resolve => setTimeout(resolve, 2500));

    return [
        {
            phase: "Validation Phase",
            tasks: [
                "Create a simple landing page using FounderOS tools",
                "Conduct 15 customer discovery interviews",
                "Collect $100 in pre-sales to validate willingness to pay"
            ]
        },
        {
            phase: "MVP Build Phase",
            tasks: [
                "Focus only on one core feature that solves the immediate pain point",
                "Use low-code or a starter template to launch within 14 days",
                "Implement basic auth and secure Stripe payments"
            ]
        },
        {
            phase: "Launch Phase",
            tasks: [
                "Launch on ProductHunt immediately",
                "Post in 3 targeted Reddit communities where your audience hangs out",
                "Reach back out to the 15 people interviewed in phase 1"
            ]
        },
        {
            phase: "Scaling Phase",
            tasks: [
                "Set up an automated cold email sequence",
                "Start writing SEO content for bottom-of-funnel keywords",
                "Optimize onboarding flow to increase activation by 20%"
            ]
        }
    ];
}

export async function analyzeWebsiteConversion(url: string) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const seed = url.length;

    return {
        conversionScore: 40 + (seed % 45),
        uxQualityScore: 50 + (seed % 35),
        trustScore: 45 + (seed % 40),
        speedScore: 70 + (seed % 25),
        recommendations: [
            "The headline is generic. Change it from what the product is to the value it provides.",
            "Call-to-action button color blends in too much. Make it high-contrast.",
            "Add social proof (testimonials, logos) immediately below the fold.",
            "Remove navbar links on the landing page to reduce bounce rates."
        ]
    };
}
