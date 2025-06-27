import HabitCard from "@/components/ui/HabitCard"
import { useHabitInterface } from "@/hooks/useHabitInterface"
import { MainViewStyles as styles } from "@/styles/MainViewStyles"
import { router } from "expo-router"
import React from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

export default function Home() {
  const { habits, toggleCheck, deleteHabit } = useHabitInterface()

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
