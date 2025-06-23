// import { Habit } from "@/storage/habitsStorage"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Habit {
  id: string
  name: string
  startDate: string // YYYY-MM-DD
  time: string // HH:mm
  description?: string
  checkedDates: string[]
}

interface Props {
  habit?: Habit
  onCheck?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

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
})

export default function HabitCard({ habit, onCheck, onEdit, onDelete }: Props) {
  const today = new Date().toISOString().split("T")[0]
  // const done = habit.checkedDates.includes(today)
  const done = true
  return (
    // <View className="bg-white p-4 m-2 rounded-lg shadow">
    //   <Text className="text-xl font-bold">{habit.name}</Text>
    //   <Text className="text-gray-500">{habit.time}</Text>
    //   <View className="flex-row mt-2 space-x-2">
    //     <TouchableOpacity
    //       onPress={onCheck}
    //       className="px-3 py-1 bg-blue-500 rounded"
    //     >
    //       <Text className="text-white">{done ? "✔" : "Check"}</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={onEdit}
    //       className="px-3 py-1 bg-yellow-400 rounded"
    //     >
    //       <Text>Edit</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={onDelete}
    //       className="px-3 py-1 bg-red-500 rounded"
    //     >
    //       <Text className="text-white">Delete</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View style={styles.card}>
      <Text style={styles.title}>{habit?.name}</Text>
      <Text style={styles.sub}>{habit?.time}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          // onPress={onCheck}
          style={[styles.btn, styles.btnCheck]}
        >
          <Text style={styles.btnText}>{done ? "✔" : "Check"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={onEdit}
          style={[styles.btn, styles.btnEdit]}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={onDelete}
          style={[styles.btn, styles.btnDel]}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
