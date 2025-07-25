"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="container px-4 py-10 md:py-14 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Water Intake Tracker</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Track your hydration and meet your wellness goals with simplicity.
          </p>
        </div>

        <div className="row g-4 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-md-6">
            <Link
              href="/log"
              className="block rounded-lg border shadow-sm bg-[hsl(var(--chart-2))] text-white p-6 hover:shadow-md transition"
            >
              <div className="d-flex flex-column justify-between h-100">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Log Water Intake</h3>
                  <p className="text-sm opacity-90">Add today’s water intake manually.</p>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-white text-[hsl(var(--chart-2))] text-sm font-semibold px-3 py-1 rounded">
                    Log Intake
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link
              href="/summary"
              className="block rounded-lg border shadow-sm bg-[hsl(var(--chart-1))] text-white p-6 hover:shadow-md transition"
            >
              <div className="d-flex flex-column justify-between h-100">
                <div>
                  <h3 className="text-xl font-semibold mb-1">View Weekly Summary</h3>
                  <p className="text-sm opacity-90">Check your last 7 days’ hydration history.</p>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-white text-[hsl(var(--chart-1))] text-sm font-semibold px-3 py-1 rounded">
                    View Summary
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="rounded-lg border bg-muted p-5">
          <h2 className="text-xl font-semibold text-primary mb-2">Daily Goal</h2>
          <p className="text-muted-foreground mb-1">
              Aim to drink at least <span className="font-bold">2,000 ml</span> daily.
          </p>
          <p className="text-muted-foreground">Build consistency to stay hydrated and healthy.</p>
        </div>
      </section>
    </main>
  )
}
