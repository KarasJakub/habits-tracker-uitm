// app/(tabs)/calendar.tsx
import React, { useEffect, useState } from "react"
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { Calendar } from "react-native-calendars"
import { Habit, loadHabits } from "../../storage/habitsStorage"

export default function CalendarScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtruj nawyk:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonsRow}
      >
        <TouchableOpacity
          style={[
            styles.filterBtn,
            selectedId === null && styles.filterBtnActive,
          ]}
          onPress={() => setSelectedId(null)}
        >
          <Text
            style={[
              styles.filterText,
              selectedId === null && styles.filterTextActive,
            ]}
          >
            Wszystkie
          </Text>
        </TouchableOpacity>

        {habits.map((h) => (
          <TouchableOpacity
            key={h.id}
            style={[
              styles.filterBtn,
              selectedId === h.id && styles.filterBtnActive,
            ]}
            onPress={() => setSelectedId(selectedId === h.id ? null : h.id)}
          >
            <Text
              style={[
                styles.filterText,
                selectedId === h.id && styles.filterTextActive,
              ]}
            >
              {h.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.calendarWrapper}>
        <Calendar
          markedDates={markedDates}
          theme={{
            todayTextColor: "#10b981",
            dotColor: "#10b981",
            arrowColor: "#10b981",
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 12,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  buttonsScroll: {
    maxHeight: 50,
    marginVertical: 8,
  },
  buttonsRow: {
    marginTop: 8,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: "#10b981",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  calendarWrapper: {
    margin: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
})
