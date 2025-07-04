import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { Habit, loadHabits, saveHabits } from "../storage/habitsStorage"

export function useHabitInterface() {
  const [habits, setHabits] = useState<Habit[]>([])
  const router = useRouter()

  useEffect(() => {
    loadHabits()
      .then(setHabits)
      .catch((e) => {
        console.warn("loadHabits error", e)
        Alert.alert("Error", "Failed to load habits")
      })
  }, [])

  const persist = async (newHabits: Habit[]) => {
    setHabits(newHabits)
    try {
      await saveHabits(newHabits)
    } catch (e) {
      console.warn("saveHabits error", e)
      Alert.alert("Error", "Failed to save habits")
    }
  }

  const toggleCheck = (id: string) => {
    const today = new Date().toISOString().split("T")[0]
    const updated = habits.map((h) => {
      if (h.id !== id) return h
      const done = h.checkedDates.includes(today)
      return {
        ...h,
        checkedDates: done
          ? h.checkedDates.filter((d) => d !== today)
          : [...h.checkedDates, today],
      }
    })
    persist(updated)
  }

  const deleteHabit = (id: string) => {
    Alert.alert("Delete habit", "Are you sure you want delete this habit?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => persist(habits.filter((h) => h.id !== id)),
      },
    ])
  }
  return {
    habits,
    setHabits,
    toggleCheck,
    deleteHabit,
    onAdd: () => router.push("/add-edit"),
    onEdit: (id: string) => router.push(`/add-edit?id=${id}`),
  }
}
