import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, ArrowRight, Lightbulb, TrendingUp, BarChart } from "lucide-react";

export default async function DashboardOverview() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            ideas: {
                orderBy: { createdAt: "desc" },
                take: 3
            },
            reports: {
                orderBy: { createdAt: "desc" },
                take: 3
            }
        }
    });

    if (!user) return null;

    return (
        <div className="animate-in space-y-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name || "Founder"}</h1>
                    <p className="text-[var(--muted-foreground)] mt-1">Here is the overview of your startup journey.</p>
                </div>
                <Link href="/dashboard/idea-validator" className="btn-primary">
                    <Plus size={18} className="mr-2" />
                    New Idea
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card text-center p-6 bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-[var(--border)]">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
                        <Lightbulb size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{user.ideas.length}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Ideas Validated</p>
                </div>
                <div className="card text-center p-6 bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-[var(--border)]">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{user.ideas.filter(i => i.roadmap).length}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Roadmaps Generated</p>
                </div>
                <div className="card text-center p-6 bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-[var(--border)]">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4">
                        <BarChart size={24} />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{user.reports.length}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Websites Analyzed</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Ideas */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Recent Ideas</h2>
                        <Link href="/dashboard/idea-validator" className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                            View all <ArrowRight size={14} className="ml-1" />
                        </Link>
                    </div>
                    {user.ideas.length === 0 ? (
                        <div className="card text-center py-12">
                            <p className="text-[var(--muted-foreground)] mb-4">You haven't validated any ideas yet.</p>
                            <Link href="/dashboard/idea-validator" className="btn-secondary">
                                Submit your first idea
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {user.ideas.map(idea => (
                                <div key={idea.id} className="card p-5 hover:border-[var(--accent)] transition-colors cursor-pointer block">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{idea.ideaTitle}</h3>
                                        {idea.ideaScore && (
                                            <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                Score: {idea.ideaScore}/100
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
                                        {idea.ideaDescription}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Website Reports */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Website Reports</h2>
                        <Link href="/dashboard/website-analyzer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                            View all <ArrowRight size={14} className="ml-1" />
                        </Link>
                    </div>
                    {user.reports.length === 0 ? (
                        <div className="card text-center py-12">
                            <p className="text-[var(--muted-foreground)] mb-4">You haven't analyzed any websites yet.</p>
                            <Link href="/dashboard/website-analyzer" className="btn-secondary">
                                Analyze a website
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {user.reports.map(report => (
                                <div key={report.id} className="card p-5 hover:border-green-500 transition-colors cursor-pointer block">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{report.websiteUrl}</h3>
                                        {report.conversionScore && (
                                            <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                                Score: {report.conversionScore}/100
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-[var(--muted-foreground)]">
                                        Created on {new Date(report.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
