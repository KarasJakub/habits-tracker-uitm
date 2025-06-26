import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Habit {
  id: string
  name: string
  startDate: string
  time: string
  description?: string
  checkedDates: string[]
}

interface Props {
  habit?: Habit
  onCheck?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-")
  return `${day}.${month}.${year}`
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
  title: { fontSize: 20, fontWeight: "bold" },
  subTitle: { fontSize: 14, fontWeight: "bold", marginTop: 4 },
  description: { color: "#666", marginVertical: 4 },
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
  label: {
    marginTop: 12,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
})

export default function HabitCard({ habit, onCheck, onEdit, onDelete }: Props) {
  const today = new Date().toISOString().split("T")[0]
  const done = habit?.checkedDates.includes(today)

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{habit?.name}</Text>
      <Text style={styles.subTitle}>Why am I doing it?</Text>
      {!!habit?.description && (
        <Text style={styles.description}>{habit.description}</Text>
      )}
      <Text style={styles.description}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 4,
            color: "#000",
          }}
        >
          Habit start date:{" "}
        </Text>
        {formatDate(habit?.startDate as string)} {habit?.time}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={onCheck}
          style={[styles.btn, styles.btnCheck]}
          disabled={done}
        >
          <Text style={styles.btnText}>{done ? "✔" : "Mark as done"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={[styles.btn, styles.btnEdit]}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.btn, styles.btnDel]}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
