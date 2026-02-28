"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import styles from "./dashboard.module.css"

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="p-2 text-[var(--muted-foreground)] hover:text-[var(--danger)] hover:bg-[var(--muted)] rounded-md transition-colors"
            title="Log out"
        >
            <LogOut size={18} />
        </button>
    )
}
