import HabitCard from "@/components/ui/HabitCard"
import { Habit, loadHabits, saveHabits } from "@/storage/habitsStorage"
import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  sub: { color: "#666", marginVertical: 4 },
  row: { flexDirection: "row", marginTop: 8 },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  btnCheck: { backgroundColor: "#3b82f6" },
  btnEdit: { backgroundColor: "#facc15" },
  btnDel: { backgroundColor: "#ef4444" },
  btnText: { color: "#fff" },
  addBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#34d399",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 50,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
  },
  empty: { textAlign: "center", marginTop: 32, color: "#666" },
})

export default function Home() {
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

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          data={habits}
          keyExtractor={(h) => h.id}
          renderItem={({ item }) => (
            <HabitCard
              habit={item}
              onCheck={() => toggleCheck(item.id)}
              onEdit={() =>
                router.push({
                  pathname: "/add-edit",
                  params: { id: item.id },
                })
              }
              onDelete={() => deleteHabit(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              You did not already created any habit
            </Text>
          }
        />
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("../add-edit")}
      >
        <Text style={styles.addBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}
