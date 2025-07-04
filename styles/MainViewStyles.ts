import { StyleSheet } from "react-native"

export const MainViewStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  sub: { color: "#666", marginVertical: 4 },
  row: { flexDirection: "row", marginTop: 8 },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  btnCheck: { backgroundColor: "#3b82f6" },
  btnEdit: { backgroundColor: "#facc15" },
  btnDel: { backgroundColor: "#ef4444" },
  btnText: { color: "#fff" },
  addBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#34d399",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 50,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
  },
  empty: { textAlign: "center", marginTop: 32, color: "#666" },
})
