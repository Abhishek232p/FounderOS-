"use client"

import { useState, useEffect } from "react"
import { Check, CheckCircle2, AlertCircle, TrendingUp, Navigation } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RoadmapPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [roadmap, setRoadmap] = useState<any>(null)
    const [error, setError] = useState("")

    const handleGenerate = async () => {
        setLoading(true)
        setError("")

        try {
            // For this MVP, we pick the most recent idea automatically if ideaId isn't passed
            const res = await fetch("/api/ai/generate-roadmap", {
                method: "POST"
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to generate roadmap")
            }

            setRoadmap(data.roadmap)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto animate-in space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Execution Roadmap</h1>
                <p className="text-[var(--muted-foreground)] mt-1">
                    Generate a tailored, step-by-step roadmap for your most recent startup idea.
                </p>
            </div>

            {!roadmap && (
                <div className="card text-center py-16">
                    <Navigation size={48} className="mx-auto mb-4 text-[var(--accent)] opacity-50" />
                    <h2 className="text-xl font-semibold mb-2">Ready to plan your execution?</h2>
                    <p className="text-[var(--muted-foreground)] mb-6 max-w-md mx-auto">
                        Our AI will analyze your most recent validated idea and create a multi-phase checklist to take you from MVP to launch.
                    </p>

                    {error && (
                        <div className="mb-4 text-sm text-[var(--danger)]">
                            {error}
                        </div>
                    )}

                    <button onClick={handleGenerate} disabled={loading} className="btn-primary">
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating Roadmap...
                            </span>
                        ) : "Generate Roadmap"}
                    </button>
                </div>
            )}

            {roadmap && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
                        <span className="font-medium text-[var(--foreground)] flex items-center">
                            <Check className="text-green-500 mr-2" />
                            Roadmap successfully generated
                        </span>
                        <button onClick={() => setRoadmap(null)} className="btn-secondary text-sm">
                            Generate Again
                        </button>
                    </div>

                    <div className="relative border-l border-[var(--border)] ml-3 space-y-8 py-4">
                        {roadmap.map((phase: any, index: number) => (
                            <div key={index} className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-[var(--background)] border-2 border-[var(--accent)] rounded-full -left-[8.5px] top-1"></div>
                                <h3 className="text-lg font-bold mb-4">{phase.phase}</h3>

                                <div className="space-y-3">
                                    {phase.tasks.map((task: string, taskIdx: number) => (
                                        <div key={taskIdx} className="card p-4 hover:border-[var(--accent)] cursor-pointer transition-colors group">
                                            <div className="flex items-start">
                                                <div className="h-5 w-5 rounded border border-[var(--border)] mr-3 flex-shrink-0 mt-0.5 group-hover:border-[var(--accent)] transition-colors"></div>
                                                <span className="text-[var(--foreground)]">{task}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
