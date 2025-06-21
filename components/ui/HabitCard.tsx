import { Habit } from "@/storage/habitsStorage"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

interface Props {
  habit: Habit
  onCheck: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function HabitCard({ habit, onCheck, onEdit, onDelete }: Props) {
  const today = new Date().toISOString().split("T")[0]
  const done = habit.checkedDates.includes(today)
  return (
    <View className="bg-white p-4 m-2 rounded-lg shadow">
      <Text className="text-xl font-bold">{habit.name}</Text>
      <Text className="text-gray-500">{habit.time}</Text>
      <View className="flex-row mt-2 space-x-2">
        <TouchableOpacity
          onPress={onCheck}
          className="px-3 py-1 bg-blue-500 rounded"
        >
          <Text className="text-white">{done ? "✔" : "Check"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onEdit}
          className="px-3 py-1 bg-yellow-400 rounded"
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          className="px-3 py-1 bg-red-500 rounded"
        >
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
