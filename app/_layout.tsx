// import Footer from "@/components/Footer"
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native"
// import { useFonts } from "expo-font"
// import { Stack } from "expo-router"
// import { StatusBar } from "expo-status-bar"
// import "react-native-reanimated"

// import { useColorScheme } from "@/hooks/useColorScheme"

// export default function RootLayout() {
//   const colorScheme = useColorScheme()
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   })

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//       <Footer />
//     </ThemeProvider>
//   )
// }
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
