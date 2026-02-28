"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"

export default function IdeaValidatorPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const [formData, setFormData] = useState({
        ideaTitle: "",
        ideaDescription: "",
        targetAudience: "",
        problemStatement: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/ai/validate-idea", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                throw new Error("Failed to validate idea")
            }

            const data = await res.json()
            setResult(data.idea)
            router.refresh()
        } catch (err) {
            console.error(err)
            alert("Error validating idea")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto animate-in space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">AI Idea Validator</h1>
                <p className="text-[var(--muted-foreground)] mt-1">
                    Submit your startup idea for instant analysis on demand, feasibility, and competition.
                </p>
            </div>

            {!result ? (
                <div className="card">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="label">Startup Name / Idea Title (Max 50 characters)</label>
                            <input
                                type="text"
                                required
                                maxLength={50}
                                className="input"
                                placeholder="e.g. FounderOS"
                                value={formData.ideaTitle}
                                onChange={e => setFormData({ ...formData, ideaTitle: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="label">What does your product do?</label>
                            <textarea
                                required
                                className="input"
                                rows={4}
                                placeholder="An AI-powered Operating System for founders..."
                                value={formData.ideaDescription}
                                onChange={e => setFormData({ ...formData, ideaDescription: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">Who is the specific target audience?</label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    placeholder="e.g. Solo SaaS Builders, Tech Students"
                                    value={formData.targetAudience}
                                    onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="label">What is the core problem you solve?</label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    placeholder="e.g. Building startup foundation takes too long"
                                    value={formData.problemStatement}
                                    onChange={e => setFormData({ ...formData, problemStatement: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[var(--border)]">
                            <button disabled={loading} type="submit" className="btn-primary">
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing Idea...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <Lightbulb size={18} className="mr-2" />
                                        Validate Idea
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="space-y-6 animate-in">
                    <div className="flex gap-4">
                        <button className="btn-secondary text-sm" onClick={() => setResult(null)}>
                            Restart
                        </button>
                        <button className="btn-primary text-sm flex gap-2 items-center" onClick={() => router.push(`/dashboard/roadmap`)}>
                            Generate Roadmap <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {result.ideaScore}/100
                            </div>
                            <h3 className="font-semibold px-3 py-1 bg-[var(--muted)] rounded-full text-sm">Market Demand</h3>
                        </div>
                        <div className="card p-6 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                {result.feasibilityScore}/100
                            </div>
                            <h3 className="font-semibold px-3 py-1 bg-[var(--muted)] rounded-full text-sm">Feasibility</h3>
                        </div>
                        <div className="card p-6 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                                {result.competitionScore}/100
                            </div>
                            <h3 className="font-semibold px-3 py-1 bg-[var(--muted)] rounded-full text-sm">Competition Risk</h3>
                        </div>
                    </div>

                    <div className="card border-l-4 border-l-blue-500">
                        <h3 className="text-lg font-semibold flex items-center mb-4 text-[var(--foreground)]">
                            <AlertCircle size={20} className="text-blue-500 mr-2" />
                            Strategic Recommendations
                        </h3>
                        <ul className="space-y-3">
                            {JSON.parse(result.recommendations).map((rec: string, idx: number) => (
                                <li key={idx} className="flex items-start text-[var(--muted-foreground)]">
                                    <CheckCircle2 size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                    <span>{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
