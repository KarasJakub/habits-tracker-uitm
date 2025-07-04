import { CalendarViewStyles as styles } from "@/styles/CalendarViewStyles"
import React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Calendar } from "react-native-calendars"
import { useCalendarInterface } from "../../hooks/useCalendarInterface"

export default function CalendarScreen() {
  const { markedDates, selectedId, setSelectedId, habits } =
    useCalendarInterface()

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select habit:</Text>
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
            All
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
