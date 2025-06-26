import { FontAwesome } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"
import { Text, View } from "react-native"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "index") {
            return <FontAwesome name="home" size={size} color={color} />
          } else if (route.name === "calendar") {
            return <FontAwesome name="calendar" size={size} color={color} />
          }
          return null
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View
              style={{
                width: "100%",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Home</Text>
              <Text style={{ fontSize: 18 }}>Jakub Karaś W70844</Text>
            </View>
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          headerTitle: () => (
            <View
              style={{
                width: "100%",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Calendar</Text>
              <Text style={{ fontSize: 18 }}>Jakub Karaś W70844</Text>
            </View>
          ),
          tabBarLabel: "Calendar",
        }}
      />
    </Tabs>
  )
}
