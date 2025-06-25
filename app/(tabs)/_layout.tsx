import { Tabs } from "expo-router"
import React from "react"
import { Text } from "react-native"

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerRight: () => <Text className="mr-4"></Text> }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
    </Tabs>
  )
}
