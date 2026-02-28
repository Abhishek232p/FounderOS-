import OpenAI from "openai";

// If the key is not set, we'll gracefully handle it or just let the SDK throw an error.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export async function validateStartupIdea(input: {
    ideaTitle: string;
    ideaDescription: string;
    targetAudience: string;
    problemStatement: string;
}) {
    const prompt = `
  You are an expert startup advisor and VC. Analyze the following startup idea and return a JSON object with your analysis.
  
  Startup Name: ${input.ideaTitle}
  Description: ${input.ideaDescription}
  Target Audience: ${input.targetAudience}
  Problem Statement: ${input.problemStatement}
  
  Respond ONLY with a JSON object in this exact format:
  {
    "demandScore": 85, // Integer 0-100 indicating market demand
    "feasibilityScore": 70, // Integer 0-100 indicating technical/operational feasibility
    "competitionScore": 60, // Integer 0-100 indicating how crowded the market is
    "recommendations": [
      "String recommendation 1",
      "String recommendation 2",
      "String recommendation 3",
      "String recommendation 4"
    ],
    "riskAnalysis": "A 1-2 sentence summary of the biggest execution risk."
  }
  `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(response.choices[0].message.content || "{}");
        return result;
    } catch (error) {
        console.error("OpenAI Validation Error:", error);
        throw new Error("Failed to validate idea using AI");
    }
}

export async function generateExecutionRoadmap(ideaId: string, ideaDetails: any) {
    const prompt = `
  You are an expert startup accelerator director. Create an execution roadmap for this validated startup idea. 
  
  Startup Name: ${ideaDetails.ideaTitle}
  Description: ${ideaDetails.ideaDescription}
  Target Audience: ${ideaDetails.targetAudience}
  
  Respond ONLY with a JSON object containing an array called "roadmap" in this exact format:
  {
    "roadmap": [
      {
        "phase": "Validation Phase",
        "tasks": ["Task 1", "Task 2", "Task 3"]
      },
      {
        "phase": "MVP Build Phase",
        "tasks": ["Task 1", "Task 2", "Task 3"]
      },
      {
        "phase": "Launch Phase",
        "tasks": ["Task 1", "Task 2", "Task 3"]
      },
      {
        "phase": "Scaling Phase",
        "tasks": ["Task 1", "Task 2", "Task 3"]
      }
    ]
  }
  `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(response.choices[0].message.content || "{}");
        return result.roadmap || [];
    } catch (error) {
        console.error("OpenAI Roadmap Error:", error);
        throw new Error("Failed to generate roadmap using AI");
    }
}

export async function analyzeWebsiteConversion(url: string) {
    const prompt = `
  You are an expert conversion rate optimization (CRO) consultant. I am giving you a URL of a startup landing page: ${url}
  
  Assume the standard structure of a SaaS landing page for this URL based on its name if you cannot browse it directly.
  Analyze the URL and provide a detailed JSON response grading the website.
  
  Respond ONLY with a JSON object in this exact format:
  {
    "conversionScore": 75, // Integer 0-100 indicating conversion readiness
    "uxQualityScore": 80, // Integer 0-100 indicating UX quality
    "trustScore": 65, // Integer 0-100 indicating trust signals
    "speedScore": 90, // Integer 0-100 indicating estimated technical performance
    "recommendations": [
      "Actionable recommendation 1",
      "Actionable recommendation 2",
      "Actionable recommendation 3",
      "Actionable recommendation 4"
    ]
  }
  `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(response.choices[0].message.content || "{}");
        return {
            conversionScore: result.conversionScore || 50,
            uxQualityScore: result.uxQualityScore || 50,
            trustScore: result.trustScore || 50,
            speedScore: result.speedScore || 50,
            recommendations: result.recommendations || ["Could not generate detailed recommendations. Please try again."]
        };
    } catch (error) {
        console.error("OpenAI Website Analysis Error:", error);
        throw new Error("Failed to analyze website using AI");
    }
}
