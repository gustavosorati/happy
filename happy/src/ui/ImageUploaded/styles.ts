import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },


  uploadedImagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 12
  },

  uploadImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  uploadImageText: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: "#37C77F"
  },

  uploadImageTextSize: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: "#8FA7B2"
  },
})
