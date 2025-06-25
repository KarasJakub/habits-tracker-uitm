import { Slot } from "expo-router"
import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import Footer from "../components/Footer"

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Slot />
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})
