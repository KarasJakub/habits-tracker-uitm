import { StyleSheet } from "react-native"

export const AddEditViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
    color: "#333",
  },
  input: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonWrapper: {
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#10b981",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  btnCancel: { backgroundColor: "#ef4444" },
  btnSave: { backgroundColor: "#10b981" },
  btnText: { color: "#fff", fontSize: 18 },
})