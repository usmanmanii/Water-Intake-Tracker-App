"use client"

import type React from "react"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { jest } from "@jest/globals"

function WaterLogForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit({
      date: formData.get("date"),
      intakeMl: Number.parseInt(formData.get("intakeMl") as string),
    })
  }

  return (
    <form onSubmit={handleSubmit} data-testid="water-log-form">
      <input name="date" type="date" defaultValue="2024-01-01" />
      <input name="intakeMl" type="number" placeholder="Enter amount in ml" />
      <button type="submit">Log Water Intake</button>
    </form>
  )
}

describe("WaterLogForm", () => {
  it("should render form elements", () => {
    const mockSubmit = jest.fn()
    render(<WaterLogForm onSubmit={mockSubmit} />)

    expect(screen.getByDisplayValue("2024-01-01")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter amount in ml")).toBeInTheDocument()
    expect(screen.getByText("Log Water Intake")).toBeInTheDocument()
  })

  it("should call onSubmit with correct data", async () => {
    const mockSubmit = jest.fn()
    render(<WaterLogForm onSubmit={mockSubmit} />)

    const intakeInput = screen.getByPlaceholderText("Enter amount in ml")
    const submitButton = screen.getByText("Log Water Intake")

    fireEvent.change(intakeInput, { target: { value: "1500" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        date: "2024-01-01",
        intakeMl: 1500,
      })
    })
  })
})
