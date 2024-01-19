import { Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

type OrphanageDataCancelProps = ModalProps & {
  handleCancel: () => void;
  handleNavigateToOrphanagesMap: () => void;
}

export function OrphanageDataCancel({
  handleNavigateToOrphanagesMap,
  handleCancel,
  ...rest
}: OrphanageDataCancelProps) {

  return (
    <Modal
      animationType="fade"
      style={{ flex: 1 }}
      {...rest}
    >
        <View style={styles.container}>

          <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", }}>
            <Feather name="x" size={32} color="#FF669D" />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Cancelar cadastro</Text>
            <Text style={styles.description}>
              Tem certeza que quer {"\n"}cancelar esse cadastro?
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.buttonCancel}
            >
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNavigateToOrphanagesMap}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )
}
