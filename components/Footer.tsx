import React from "react"
import { Text, View } from "react-native"

export default function Footer() {
  return (
    <View
      className="p-4 bg-gray-100 items-center text-center"
      style={{ alignContent: "center" }}
    >
      <Text className="text-gray-600">Jakub Karaś — nr albumu: 70844</Text>
    </View>
  )
}
