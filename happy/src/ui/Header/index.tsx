import { Text, View, ViewBase } from "react-native";
import { styles } from "./styles";
import { HeaderProps } from "./header-model";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton} from "react-native-gesture-handler";

export function Header({
  title,
  showCancel = true,
  customHandleBack,
  customHandleCancel,
  ...rest
}: HeaderProps) {

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={customHandleBack ? customHandleBack : rest.navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
          <BorderlessButton
            onPress={customHandleCancel
              ? customHandleCancel : () => rest.navigation.navigate("Home")
            }
          >
            <Feather name="x" size={24} color="#ff669d" />
          </BorderlessButton>
        )
        : <View />
      }

    </View>
  )
}
