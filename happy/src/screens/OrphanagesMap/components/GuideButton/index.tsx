import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"

type Props = TouchableOpacityProps;

export function GuideButton({ ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      {...rest}
    >
      <FontAwesome5 name="question-circle" size={24} color="#fff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    position: 'absolute',
    top: 60,
    right: 24,
    padding: 4,
    width: 34,
    height: 34,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFD152"
  }
})
