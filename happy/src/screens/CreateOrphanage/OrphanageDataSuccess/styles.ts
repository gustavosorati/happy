import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#39CC83",
  },

  content: {
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 40,
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
    width: 120,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#19C06D"
  },

  buttonText: {
    fontSize: 15,
    fontFamily: "Nunito_800ExtraBold",
    color: "#fff"
  }

})
