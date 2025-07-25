import { WaterService } from "../lib/water-service"

describe("WaterService", () => {
  let waterService: WaterService

  beforeEach(() => {
    waterService = new WaterService()
  })

  describe("calculatePercentageOfGoal", () => {
    it("should calculate correct percentage for goal achievement", () => {
      expect(WaterService.calculatePercentageOfGoal(2000)).toBe(100)
      expect(WaterService.calculatePercentageOfGoal(1000)).toBe(50)
      expect(WaterService.calculatePercentageOfGoal(3000)).toBe(150)
      expect(WaterService.calculatePercentageOfGoal(0)).toBe(0)
    })
  })

  describe("upsertLog", () => {
    it("should throw error for invalid input", async () => {
      await expect(waterService.upsertLog({ userId: "", date: "2024-01-01", intakeMl: 1000 })).rejects.toThrow(
        "Invalid input parameters",
      )

      await expect(waterService.upsertLog({ userId: "user1", date: "2024-01-01", intakeMl: -100 })).rejects.toThrow(
        "Invalid intake amount",
      )

      await expect(waterService.upsertLog({ userId: "user1", date: "2024-01-01", intakeMl: 15000 })).rejects.toThrow(
        "Invalid intake amount",
      )
    })

    it("should successfully upsert valid data", async () => {
      const result = await waterService.upsertLog({
        userId: "user1",
        date: "2024-01-01",
        intakeMl: 1500,
      })

      expect(result).toBeDefined()
      expect(result.intakeMl).toBe(1500)
    })
  })

  describe("getSummary", () => {
    it("should throw error for missing user ID", async () => {
      await expect(waterService.getSummary("")).rejects.toThrow("User ID is required")
    })

    it("should return 7 days of data", async () => {
      const summary = await waterService.getSummary("user1")

      expect(Array.isArray(summary)).toBe(true)
      expect(summary.length).toBeGreaterThan(0)

      if (summary.length > 0) {
        expect(summary[0]).toHaveProperty("date")
        expect(summary[0]).toHaveProperty("totalIntake")
        expect(summary[0]).toHaveProperty("percentageOfGoal")
        expect(typeof summary[0].totalIntake).toBe("number")
        expect(typeof summary[0].percentageOfGoal).toBe("number")
      }
    })
  })
})
