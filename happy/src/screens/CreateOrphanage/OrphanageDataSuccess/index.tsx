import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation";

type OrphanageDataSuccessProps = NativeStackScreenProps<RootStackParamList, "OrphanageDataSuccess">;


export function OrphanageDataSuccess({ navigation }: OrphanageDataSuccessProps) {

  function handleNavigateToOrphanagesMap() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/success.png")}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Ebaaa!</Text>
        <Text style={styles.description}>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleNavigateToOrphanagesMap}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ok</Text>
      </TouchableOpacity>

    </View>
  )
}
