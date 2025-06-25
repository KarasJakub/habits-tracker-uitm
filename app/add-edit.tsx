import { useLocalSearchParams, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import uuid from "react-native-uuid"
import { Habit, loadHabits, saveHabits } from "../storage/habitsStorage"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
    color: "#333",
  },
  input: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonWrapper: {
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#10b981",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  btnCancel: { backgroundColor: "#ef4444" },
  btnSave: { backgroundColor: "#10b981" },
  btnText: { color: "#fff", fontSize: 18 },
})

export default function AddEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const router = useRouter()
  const [name, setName] = useState("")
  const [dateStr, setDateStr] = useState(new Date().toISOString().split("T")[0]) //YYYY-MM-DD
  const [timeStr, setTimeStr] = useState(
    new Date().toISOString().substring(11, 16)
  ) // HH:MM
  const [desc, setDesc] = useState("")
  const [existing, setExisting] = useState<Habit | null>(null)

  useEffect(() => {
    if (id) {
      loadHabits().then((hs) => {
        const h = hs.find((x: { id: string }) => x.id === id)
        if (h) {
          setExisting(h)
          setName(h.name)
          setDateStr(h.startDate)
          setTimeStr(h.time)
          setDesc(h.description || "")
        }
      })
    }
  }, [id])

  const onSave = async () => {
    if (!name.trim()) {
      Alert.alert("Błąd", "Musisz podać nazwę nawyku")
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
        ? hs.map((x: Habit) => (x.id === existing.id ? habit : x))
        : [...hs, habit]

      await saveHabits(updated)
      router.back()
    } catch (e) {
      console.warn("saveHabits error", e)
      Alert.alert("Błąd", "Nie udało się zapisać nawyku")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Habit name</Text>
      <TextInput
        style={styles.input}
        placeholder="Example: Morning walk"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Start date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-06-24"
        value={dateStr}
        onChangeText={(text) => {
          const filtered = text.replace(/[^0-9-]/g, "")
          setDateStr(filtered)
        }}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Start hour (HH:MM):</Text>
      <TextInput
        style={styles.input}
        placeholder="07:00"
        value={timeStr}
        onChangeText={(text) => {
          const filtered = text.replace(/[^0-9-::]/g, "")
          setTimeStr(filtered)
        }}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Why do you want to do this?"
        value={desc}
        onChangeText={setDesc}
        multiline
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          // onPress={onDelete}
          onPress={() => router.push("../")}
          style={[styles.btn, styles.btnCancel]}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSave}
          // onPress={alert.bind(null, "Save functionality not implemented yet")}
          style={[styles.btn, styles.btnSave]}
        >
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
