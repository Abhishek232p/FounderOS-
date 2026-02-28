import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <div className="h-8 w-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold font-serif">F</span>
              </div>
              <span className="font-bold text-xl tracking-tight">FounderOS</span>
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            {session ? (
              <Link href="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold leading-6 text-[var(--foreground)] hover:text-gray-600 transition">
                  Log in
                </Link>
                <Link href="/signup" className="btn-primary ml-2">
                  Get Started <span aria-hidden="true" className="ml-1">&rarr;</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1 isolate">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56 px-6 text-center animate-in" style={{ animationDelay: '100ms', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-[var(--muted-foreground)] ring-1 ring-[var(--border)] hover:ring-gray-300">
              Announcing FounderOS Version 1.0 <Link href="/signup" className="font-semibold text-blue-600 dark:text-blue-400"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-7xl mb-8" style={{ lineHeight: 1.1 }}>
            The Operating System<br />for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Startup Execution</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Go from idea to validation, generate an execution roadmap, and analyze your launch readiness using AI. The complete toolkit for indie hackers and solo SaaS builders.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              Start building for free
            </Link>
            <Link href="#features" className="text-sm font-semibold leading-6 text-[var(--foreground)] hover:text-gray-600 transition">
              Learn more <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 sm:py-32 bg-[var(--card)] border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Idea to Exit</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">Everything you need to launch</p>
              <p className="mt-6 text-lg leading-8 text-[var(--muted-foreground)]">
                Our suite of AI tools analyzes your ideas, crafts your execution path, and optimizes your launch.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
              <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="flex flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--background)] border border-[var(--border)] shadow-sm">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-[var(--foreground)] mb-2">AI Idea Validator</h3>
                  <p className="flex-auto text-base leading-7 text-[var(--muted-foreground)]">
                    Stop guessing. Get instant data on demand, feasibility, and competition for your startup idea before you write a single line of code.
                  </p>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--background)] border border-[var(--border)] shadow-sm">
                    <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-[var(--foreground)] mb-2">Execution Roadmaps</h3>
                  <p className="flex-auto text-base leading-7 text-[var(--muted-foreground)]">
                    Generate a clear, step-by-step roadmap from MVP to launch based on your specific idea and target audience.
                  </p>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--background)] border border-[var(--border)] shadow-sm">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-[var(--foreground)] mb-2">Website Conversion Analyzer</h3>
                  <p className="flex-auto text-base leading-7 text-[var(--muted-foreground)]">
                    Paste your landing page URL and get an AI teardown of your UX, copy, and conversion readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--border)] py-12 text-center text-[var(--muted-foreground)] text-sm">
        <p>&copy; {new Date().getFullYear()} FounderOS. All rights reserved.</p>
      </footer>
    </div>
  );
}
