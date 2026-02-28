"use client"

import { useState } from "react"
import { BarChart, Globe, Zap, Shield, CheckCircle2, AlertCircle } from "lucide-react"

export default function WebsiteAnalyzerPage() {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState<any>(null)
    const [url, setUrl] = useState("")

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/ai/analyze-website", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ websiteUrl: url }),
            })

            if (!res.ok) {
                throw new Error("Failed to analyze website")
            }

            const data = await res.json()
            setReport(data.report)
        } catch (err) {
            console.error(err)
            alert("Error analyzing website")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto animate-in space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Website Conversion Analyzer</h1>
                <p className="text-[var(--muted-foreground)] mt-1">
                    Paste your landing page URL to get an instant AI teardown of your UX, copy, and conversion readiness.
                </p>
            </div>

            <div className="card">
                <form onSubmit={handleAnalyze} className="flex gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="text-[var(--muted-foreground)]" size={20} />
                        </div>
                        <input
                            type="url"
                            required
                            className="input pl-10"
                            placeholder="https://yourstartup.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap">
                        {loading ? "Analyzing..." : "Analyze Website"}
                    </button>
                </form>
            </div>

            {report && (
                <div className="space-y-6 animate-in">
                    <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2">Results for {report.websiteUrl}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="card p-5 text-center flex flex-col items-center">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3">
                                <BarChart size={20} />
                            </div>
                            <div className="text-3xl font-bold mb-1">{report.conversionScore}</div>
                            <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">Conversion</p>
                        </div>
                        <div className="card p-5 text-center flex flex-col items-center">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3">
                                <Globe size={20} />
                            </div>
                            <div className="text-3xl font-bold mb-1">{report.uxScore}</div>
                            <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">UX Quality</p>
                        </div>
                        <div className="card p-5 text-center flex flex-col items-center">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3">
                                <Shield size={20} />
                            </div>
                            <div className="text-3xl font-bold mb-1">{report.trustScore}</div>
                            <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">Trust Factor</p>
                        </div>
                        <div className="card p-5 text-center flex flex-col items-center">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-3">
                                <Zap size={20} />
                            </div>
                            <div className="text-3xl font-bold mb-1">{report.speedScore}</div>
                            <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">Speed</p>
                        </div>
                    </div>

                    <div className="card mt-6">
                        <h3 className="text-lg font-semibold flex items-center mb-5 border-b border-[var(--border)] pb-3">
                            <AlertCircle size={20} className="text-[var(--accent)] mr-2" />
                            Key Actions
                        </h3>
                        <ul className="space-y-4">
                            {JSON.parse(report.recommendations).map((rec: string, idx: number) => (
                                <li key={idx} className="flex text-[var(--foreground)]">
                                    <CheckCircle2 size={20} className="text-green-500 mr-3 flex-shrink-0" />
                                    <span className="leading-snug">{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
