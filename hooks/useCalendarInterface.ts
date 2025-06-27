import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { Habit, loadHabits } from "../storage/habitsStorage"

export function useCalendarInterface() {
    const [markedDates, setMarkedDates] = useState<
      Record<string, { marked: boolean }>
    >({})
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [habits, setHabits] = useState<Habit[]>([])

    useEffect(() => {
      loadHabits()
        .then(setHabits)
        .catch((e) => {
          console.warn("loadHabits error", e)
          Alert.alert("Błąd", "Failed to load habits")
        })
    }, [])

    useEffect(() => {
      const marks: Record<string, { marked: boolean }> = {}
      const list = selectedId ? habits.filter((h) => h.id === selectedId) : habits

      list.forEach((h) => {
        h.checkedDates.forEach((date) => {
          marks[date] = { marked: true }
        })
      })
      setMarkedDates(marks)
    }, [selectedId, habits])

  return {
    markedDates,
      setMarkedDates,
      selectedId,
      setSelectedId,
      habits,
      setHabits,
  }
}
