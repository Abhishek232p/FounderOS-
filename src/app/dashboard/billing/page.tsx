import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Check } from "lucide-react";
import StripeCheckoutButton from "./StripeCheckoutButton";

export default async function BillingPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const isPro = user?.subscriptionPlan === "pro";

    return (
        <div className="max-w-5xl mx-auto animate-in space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Billing & Plans</h1>
                <p className="text-[var(--muted-foreground)] mt-1">
                    Manage your subscription and upgrade for unlimited AI access.
                </p>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold mb-1">Current Plan: <span className="text-[var(--accent)] font-bold">{isPro ? "Pro" : "Free"} Founder</span></h2>
                    <p className="text-sm text-[var(--muted-foreground)]">
                        {isPro
                            ? "You have unlimited access to all AI features."
                            : "You are currently on the free tier with limited AI generations."}
                    </p>
                </div>
                {isPro ? (
                    <button className="btn-secondary">Manage Subscription</button>
                ) : (
                    <div className="w-48">
                        <StripeCheckoutButton />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Free Tier */}
                <div className={`card p-8 relative ${!isPro ? "border-[var(--accent)] shadow-md shadow-blue-900/10" : "opacity-80"}`}>
                    {!isPro && <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Current</div>}
                    <h3 className="text-xl font-bold mb-2">Free Founder</h3>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold tracking-tight">$0</span>
                        <span className="text-[var(--muted-foreground)] ml-1 font-medium">/month</span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mb-6">Enough to validate your first startup idea.</p>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm text-[var(--foreground)]">
                            <Check className="text-green-500 mr-3 shrink-0" size={18} /> 3 Idea Validations per month
                        </li>
                        <li className="flex items-center text-sm text-[var(--foreground)]">
                            <Check className="text-green-500 mr-3 shrink-0" size={18} /> 1 Execution Roadmap
                        </li>
                        <li className="flex items-center text-sm text-[var(--foreground)]">
                            <Check className="text-green-500 mr-3 shrink-0" size={18} /> Basic Website Analyzer
                        </li>
                        <li className="flex items-center text-sm text-[var(--muted-foreground)] opacity-50">
                            <Check className="text-[var(--border)] mr-3 shrink-0" size={18} /> Priority AI queuing
                        </li>
                    </ul>

                    {!isPro ? (
                        <button className="btn-secondary w-full cursor-default" disabled>Currently Active</button>
                    ) : (
                        <button className="btn-secondary w-full">Downgrade</button>
                    )}
                </div>

                {/* Pro Tier */}
                <div className={`card p-8 relative ${isPro ? "border-[var(--accent)] shadow-md shadow-blue-900/10" : ""}`}>
                    {isPro && <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active</div>}
                    <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Pro Founder</h3>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold tracking-tight">$29</span>
                        <span className="text-[var(--muted-foreground)] ml-1 font-medium">/month</span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mb-6">Everything you need to scale multiple ideas.</p>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm text-[var(--foreground)] font-medium">
                            <Check className="text-green-500 mr-3 shrink-0" size={18} /> Unlimited Idea Validations
                        </li>
                        <li className="flex items-center text-sm text-[var(--foreground)] font-medium">
                            <Check className="text-green-500 mr-3 shrink-0" size={18} /> Unlimited AI Roadmaps
                        </li>
                        <li className="flex items-center text-sm text-[var(--foreground)] font-medium">
                            <Check className="text-green-500 mr-3 shrink-0" size={18} /> Advanced Website Analyzer
                        </li>
                        <li className="flex items-center text-sm text-[var(--foreground)] font-medium">
                            <Check className="text-green-500 mr-3 shrink-0" size={18} /> Priority AI queuing (Faster results)
                        </li>
                    </ul>

                    {isPro ? (
                        <button className="btn-secondary w-full">Manage in Stripe</button>
                    ) : (
                        <StripeCheckoutButton />
                    )}
                </div>
            </div>
        </div>
    );
}
