import { StyleSheet } from "react-native"

export const CalendarViewStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 12,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  buttonsScroll: {
    maxHeight: 50,
    marginVertical: 8,
  },
  buttonsRow: {
    marginTop: 8,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: "#10b981",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  calendarWrapper: {
    margin: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
})
