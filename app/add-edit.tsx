import { router } from "expo-router"
import React from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useHabitEditor } from "../hooks/useHabitEditor"
import { AddEditViewStyles as styles } from "../styles/AddEditViewStyles"

export default function AddEdit() {
  const {
    name,
    setName,
    dateStr,
    setDateStr,
    timeStr,
    setTimeStr,
    desc,
    setDesc,
    onSave,
  } = useHabitEditor()

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
          onPress={() => router.push("../")}
          style={[styles.btn, styles.btnCancel]}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={[styles.btn, styles.btnSave]}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
