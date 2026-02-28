import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// Initialize Stripe if key is present
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!stripe) {
            // Mock successful checkout behavior for MVP testing
            console.log("No Stripe key found. Mocking checkout success and upgrading user locally.");

            await prisma.user.update({
                where: { email: session.user.email },
                data: { subscriptionPlan: "pro" }
            });

            const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
            return NextResponse.json({ url: `${baseUrl}/dashboard/billing?success=true` });
        }

        // Real Stripe Integration Path
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer_email: user.email!,
            line_items: [
                {
                    price: process.env.STRIPE_PRO_PRICE_ID || "price_mock_123", // Replace with real price ID
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXTAUTH_URL}/dashboard/billing?success=true`,
            cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/billing?canceled=true`,
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("Stripe Checkout error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
