"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function StripeCheckoutButton() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleUpgrade = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST"
            })

            const data = await res.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error(data.error || "Something went wrong")
            }
        } catch (err) {
            console.error(err)
            alert("Error initiating checkout. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleUpgrade}
            disabled={loading}
            className="btn-primary w-full"
        >
            {loading ? "Processing..." : "Upgrade to Pro"}
        </button>
    )
}
