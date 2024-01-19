import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },

  image: {
    alignSelf: "center",
    marginBottom: 32
  },

  title: {
    fontSize: 48,
    fontFamily: "Nunito_800ExtraBold",
    color: "#0089A5",
    marginBottom: 24
  },

  description: {
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold",
    color: "#5C8599"
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  stepsContainer: {
    flexDirection: "row",
  },

  step: {
    backgroundColor: "#BECFD8",
    width: 8,
    height: 4,
    borderRadius: 4
  },

  activeStep: {
    backgroundColor: "#FFD152",
    width: 16,
    height: 4,
    borderRadius: 4
  },

  button: {
    width: 56,
    height: 56,
    backgroundColor: "#D1EDF2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  }
})
