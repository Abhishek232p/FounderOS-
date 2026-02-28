import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) return null;

    return (
        <div className="max-w-3xl mx-auto animate-in space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-[var(--muted-foreground)] mt-1">
                    Manage your account preferences and profile.
                </p>
            </div>

            <div className="card space-y-6">
                <div>
                    <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Full Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    defaultValue={user.name || ""}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="label">Email Address</label>
                                <input
                                    type="email"
                                    className="input text-[var(--muted-foreground)] bg-[var(--muted)] border-none"
                                    defaultValue={user.email || ""}
                                    disabled
                                />
                                <p className="text-xs text-[var(--muted-foreground)] mt-1">Email cannot be changed.</p>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="pt-6 border-t border-[var(--border)]">
                    <h2 className="text-lg font-semibold mb-4">Danger Zone</h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-[var(--danger)] rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div>
                            <h3 className="font-medium text-[var(--danger)]">Delete Account</h3>
                            <p className="text-sm text-[var(--danger)] opacity-80 mt-1">
                                Permanently delete all your ideas, roadmaps, and reports.
                            </p>
                        </div>
                        <button className="mt-4 sm:mt-0 px-4 py-2 bg-[var(--danger)] rounded-md text-white font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
