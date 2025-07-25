"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import dynamic from "next/dynamic"

const WaterBarChart = dynamic(() => import("@/components/ui/chart"), { ssr: false })

interface WaterSummary {
  date: string
  totalIntake: number
  percentageOfGoal: number
}

export default function SummaryPage() {
  const router = useRouter()
  const [data, setData] = useState<WaterSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const id = localStorage.getItem("userId")
    if (id) {
      setUserId(id)
    } else {
      setError("User not found. Please enter your name on the log page.")
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchSummary = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/water-summary/${userId}`)
        if (!res.ok) throw new Error()
        const json = await res.json()
        setData(json)
      } catch {
        setError("Unable to fetch summary. Try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [userId])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

  const dailyGoal = 2000
  const totalIntake = data.reduce((sum, d) => sum + d.totalIntake, 0)
  const average = data.length ? Math.round(totalIntake / data.length) : 0
  const metGoal = data.filter((d) => d.totalIntake >= dailyGoal).length
  const achievementRate = data.length ? Math.round((metGoal / data.length) * 100) : 0
  const bestDay = data.reduce((max, d) => (d.totalIntake > max.totalIntake ? d : max), data[0] || { date: "", totalIntake: 0 })

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground text-lg">Loading summary...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-medium">{error}</p>
          <Link href="/log">
            <Button>Go to Log Page</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="container py-6 px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Weekly Hydration Summary</h1>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Here's your progress over the last 7 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Intake</CardTitle>
              <CardDescription>Across all days this week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{totalIntake.toLocaleString()} ml</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Daily Intake</CardTitle>
              <CardDescription>Your daily hydration average</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{average.toLocaleString()} ml</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Goal Achievement Rate</CardTitle>
              <CardDescription>Days you met your goal</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{achievementRate}%</p>
              <p className="text-sm text-muted-foreground">{metGoal} of {data.length} days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Day</CardTitle>
              <CardDescription>Highest single-day intake</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{bestDay.totalIntake.toLocaleString()} ml</p>
              <p className="text-sm text-muted-foreground">{formatDate(bestDay.date)}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daily Breakdown</CardTitle>
            <CardDescription>Progress for each day (bar chart below)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mb-6">
              <WaterBarChart data={data.map(d => ({ date: d.date.slice(5), totalIntake: d.totalIntake }))} goal={dailyGoal} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
