import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF669D",
  },

  content: {
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontFamily: "Nunito_800ExtraBold",
    color: "#fff",
    textAlign: "center"
  },

  description: {
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold",
    color: "#fff",
    textAlign: "center"
  },

  button: {
    width: 128,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#D6487B"
  },

  buttonCancel: {
    width: 128,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "#D6487B",
    borderWidth: 2
  },

  buttonText: {
    fontSize: 15,
    fontFamily: "Nunito_800ExtraBold",
    color: "#fff"
  }

})
