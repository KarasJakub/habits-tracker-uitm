import HabitCard from "@/components/ui/HabitCard"
import { Habit } from "@/storage/habitsStorage"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import {
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
    padding: 16,
    borderRadius: 50,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
})

const habitss: Habit[] = [
  {
    id: "1",
    name: "Morning walk",
    startDate: "2023-10-01",
    time: "07:00",
    description: "To stay healthy",
    checkedDates: ["2023-10-01", "2023-10-02"],
  },
  {
    id: "2",
    name: "Read a book",
    startDate: "2023-10-01",
    time: "20:00",
    description: "To improve knowledge",
    checkedDates: ["2023-10-01"],
  },
]

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([])
  const router = useRouter()

  // useEffect(() => {
  //   loadHabits().then(setHabits)
  // }, [])

  // const persist = (newHabits: Habit[]) => {
  //   setHabits(newHabits)
  //   saveHabits(newHabits)
  // }

  // const toggle = (id: string) => {
  //   const today = new Date().toISOString().split("T")[0]
  //   const updated = habits.map((h) =>
  //     h.id === id
  //       ? {
  //           ...h,
  //           checkedDates: h.checkedDates.includes(today)
  //             ? h.checkedDates.filter((d) => d !== today)
  //             : [...h.checkedDates, today],
  //         }
  //       : h
  //   )
  //   persist(updated)
  // }

  // const remove = (id: string) => persist(habits.filter((h) => h.id !== id))

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          data={habits}
          keyExtractor={(h) => h.id}
          renderItem={({ item }) => (
            <HabitCard
            //  habit={item}
            // onCheck={() => toggle(item.id)}
            // onEdit={() =>
            //   router.push({ pathname: "../add-edit", params: { id: item.id } })
            // }
            // onDelete={() => remove(item.id)}
            />
          )}
        />

        {habitss.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            // onCheck={() => toggle(habit.id)}
            // onEdit={() => router.push({ pathname: "../add-edit", params: { id: habit.id } })}
            // onDelete={() => remove(habit.id)}
          />
        ))}
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
