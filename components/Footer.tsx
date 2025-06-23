import React from "react"
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
})

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Jakub Karaś — nr albumu: 70844</Text>
    </View>
  )
}
