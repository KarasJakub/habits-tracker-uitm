// import { Image } from "expo-image"
// import { Platform, StyleSheet } from "react-native"

// import { HelloWave } from "@/components/HelloWave"
// import ParallaxScrollView from "@/components/ParallaxScrollView"
// import { ThemedText } from "@/components/ThemedText"
// import { ThemedView } from "@/components/ThemedView"

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/partial-react-logo.png")}
//           style={styles.reactLogo}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try iti</ThemedText>
//         <ThemedText>
//           Edit{" "}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
//           to see changes. Press{" "}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: "cmd + d",
//               android: "cmd + m",
//               web: "F12",
//             })}
//           </ThemedText>{" "}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">
//             npm run reset-project
//           </ThemedText>{" "}
//           to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//           directory. This will move the current{" "}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// })
import HabitCard from "@/components/ui/HabitCard"
import { Habit, loadHabits, saveHabits } from "@/storage/habitsStorage"
import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([])
  const router = useRouter()

  useEffect(() => {
    loadHabits().then(setHabits)
  }, [])

  const persist = (newHabits: Habit[]) => {
    setHabits(newHabits)
    saveHabits(newHabits)
  }

  const toggle = (id: string) => {
    const today = new Date().toISOString().split("T")[0]
    const updated = habits.map((h) =>
      h.id === id
        ? {
            ...h,
            checkedDates: h.checkedDates.includes(today)
              ? h.checkedDates.filter((d) => d !== today)
              : [...h.checkedDates, today],
          }
        : h
    )
    persist(updated)
  }

  const remove = (id: string) => persist(habits.filter((h) => h.id !== id))

  return (
    <View className="flex-1">
      <FlatList
        data={habits}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onCheck={() => toggle(item.id)}
            onEdit={() =>
              router.push({ pathname: "../add-edit", params: { id: item.id } })
            }
            onDelete={() => remove(item.id)}
          />
        )}
      />
      <TouchableOpacity
        className="absolute bottom-16 right-4 bg-green-500 p-4 rounded-full"
        onPress={() => router.push("../add-edit")}
      >
        <Text className="text-white text-2xl">+</Text>
      </TouchableOpacity>
    </View>
  )
}
