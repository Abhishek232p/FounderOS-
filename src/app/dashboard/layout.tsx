import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { LogOut, Home, Lightbulb, TrendingUp, BarChart, Settings, CreditCard } from "lucide-react";
import styles from "./dashboard.module.css";
import LogoutButton from "./LogoutButton";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: Home },
        { name: "Idea Validator", href: "/dashboard/idea-validator", icon: Lightbulb },
        { name: "Execution Roadmap", href: "/dashboard/roadmap", icon: TrendingUp },
        { name: "Website Analyzer", href: "/dashboard/website-analyzer", icon: BarChart },
        { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <div className={styles.layout}>
            {/* Sidebar navigation */}
            <aside className={styles.sidebar}>
                <Link href="/dashboard" className={styles.brand}>
                    <div className={styles.logoIcon}>F</div>
                    <span className={styles.brandName}>FounderOS</span>
                </Link>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className={styles.navItem}>
                            <item.icon className={styles.navIcon} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{session.user.name || "Founder"}</div>
                        <div className={styles.userEmail}>{session.user.email}</div>
                    </div>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main content */}
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.headerTitle}>Dashboard</div>
                    <div>
                        <span className="text-sm font-medium bg-[var(--muted)] px-3 py-1 rounded-full text-[var(--muted-foreground)]">
                            Free Plan
                        </span>
                    </div>
                </header>
                <div className={styles.pageContainer}>
                    {children}
                </div>
            </main>
        </div>
    );
}
