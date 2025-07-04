import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import uuid from "react-native-uuid"
import { Habit, loadHabits, saveHabits } from "../storage/habitsStorage"

export function useHabitEditor() {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const router = useRouter()

  const [name, setName] = useState("")
  const [dateStr, setDateStr] = useState(new Date().toISOString().split("T")[0])
  const [timeStr, setTimeStr] = useState(
    new Date().toISOString().substring(11, 16)
  )
  const [desc, setDesc] = useState("")
  const [existing, setExisting] = useState<Habit | null>(null)

  useEffect(() => {
    if (!id) return
    loadHabits()
      .then((hs) => {
        const h = hs.find((x) => x.id === id)
        if (h) {
          setExisting(h)
          setName(h.name)
          setDateStr(h.startDate)
          setTimeStr(h.time)
          setDesc(h.description || "")
        } else {
          Alert.alert("Habit did not found", "Returning to habits list", [
            { text: "OK", onPress: () => router.back() },
          ])
        }
      })
      .catch((e) => {
        console.warn("loadHabits error", e)
        Alert.alert("Error", "Failed to load habits")
      })
  }, [id, router])

  const onSave = async () => {
    if (!name.trim()) {
      Alert.alert("Fill the form", "Please enter a habit name")
      return
    }
    try {
      const hs = await loadHabits()
      const habit: Habit = existing
        ? {
            ...existing,
            name,
            startDate: dateStr,
            time: timeStr,
            description: desc,
          }
        : {
            id: uuid.v4() as string,
            name,
            startDate: dateStr,
            time: timeStr,
            description: desc,
            checkedDates: [],
          }
      const updated = existing
        ? hs.map((x) => (x.id === existing.id ? habit : x))
        : [...hs, habit]
      await saveHabits(updated)
      router.back()
    } catch (e) {
      console.warn("saveHabits error", e)
      Alert.alert("Error", "Failed to save habit")
    }
  }

  const onCancel = () => {
    router.back()
  }

  return {
    name,
    setName,
    dateStr,
    setDateStr,
    timeStr,
    setTimeStr,
    desc,
    setDesc,
    onSave,
    onCancel,
  }
}
