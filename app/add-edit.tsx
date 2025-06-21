// import DateTimePicker from "@react-native-community/datetimepicker"
// import { useLocalSearchParams, useRouter } from "expo-router"
// import React, { useEffect, useState } from "react"
// import { Button, TextInput, View } from "react-native"
// import uuid from "react-native-uuid"
// import { Habit, loadHabits, saveHabits } from "../storage/habitsStorage"

// export default function AddEdit() {
//   const { id } = useLocalSearchParams<{ id?: string }>()
//   const router = useRouter()
//   const [name, setName] = useState("")
//   const [date, setDate] = useState(new Date())
//   const [time, setTime] = useState("07:00")
//   const [desc, setDesc] = useState("")
//   const [existing, setExisting] = useState<Habit | null>(null)

//   useEffect(() => {
//     if (id) {
//       loadHabits().then((hs) => {
//         const h = hs.find((x) => x.id === id)
//         if (h) {
//           setExisting(h)
//           setName(h.name)
//           setDate(new Date(h.startDate))
//           setTime(h.time)
//           setDesc(h.description || "")
//         }
//       })
//     }
//   }, [id])

//   const save = async () => {
//     const hs = await loadHabits()
//     const h: Habit = existing
//       ? {
//           ...existing,
//           name,
//           startDate: date.toISOString().split("T")[0],
//           time,
//           description: desc,
//         }
//       : {
//           id: uuid.v4() as string,
//           name,
//           startDate: date.toISOString().split("T")[0],
//           time,
//           description: desc,
//           checkedDates: [],
//         }
//     const updated = existing
//       ? hs.map((x) => (x.id === existing.id ? h : x))
//       : [...hs, h]
//     await saveHabits(updated)
//     router.back()
//   }

//   return (
//     <View className="p-4">
//       <TextInput
//         className="border p-2 mb-2"
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <DateTimePicker
//         mode="date"
//         value={date}
//         onChange={(_event, selectedDate) => {
//           if (selectedDate) setDate(selectedDate)
//         }}
//       />
//       <DateTimePicker
//         mode="time"
//         value={new Date()}
//         onChange={(_event, selectedDate) => {
//           if (selectedDate) setTime(selectedDate.toTimeString().slice(0, 5))
//         }}
//       />
//       <TextInput
//         className="border p-2 mb-4"
//         placeholder="Description (opt.)"
//         value={desc}
//         onChangeText={setDesc}
//         multiline
//       />
//       <Button title="Save" onPress={save} />
//     </View>
//   )
// }
