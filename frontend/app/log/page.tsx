"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function LogPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])
  const [intakeMl, setIntakeMl] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const dailyGoal = 2000
  const currentIntake = parseInt(intakeMl) || 0
  const progress = Math.min((currentIntake / dailyGoal) * 100, 100)

  useEffect(() => {
    const saved = localStorage.getItem("userId")
    if (saved) setName(saved)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/water-log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, intakeMl: currentIntake, userId: name }),
      })

      if (!res.ok) throw new Error()

      localStorage.setItem("userId", name)
      setSuccess(true)
      setIntakeMl("")

      setTimeout(() => router.push("/summary"), 1200)
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="container py-6 px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Log Water Intake</h1>
          <p className="text-muted-foreground">Record your water intake for today and track your hydration progress.</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 font-semibold text-lg text-primary">{currentIntake} ml / 2000 ml</div>
            <Progress value={progress} className="h-3" />
            {currentIntake >= dailyGoal && (
              <div className="mt-2 text-sm text-green-600">Goal achieved! 🎉</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log Intake</CardTitle>
            <CardDescription>Enter your water intake amount in milliliters.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    localStorage.setItem("userId", e.target.value)
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="intake">Water Intake (ml)</Label>
                <Input
                  id="intake"
                  type="number"
                  placeholder="e.g. 500"
                  value={intakeMl}
                  onChange={(e) => setIntakeMl(e.target.value)}
                  min={0}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging..." : "Log Water Intake"}
              </Button>

              {success && (
                <div className="text-center text-green-600 mt-3 font-medium">Logged successfully!</div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
