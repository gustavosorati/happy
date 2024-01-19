import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 72,
    color: "#fff",
    letterSpacing: -4,
    top: -8
  },

  localization: {
    position: "absolute",
    bottom: 90,
    alignItems: "center"
  },

  city: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
    color: "#fff",
    marginBottom: 6
  },

  state: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 20,
    color: "#fff",
  }
})
