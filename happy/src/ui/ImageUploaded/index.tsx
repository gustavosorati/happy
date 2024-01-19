import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

interface Props {
  name: string;
  path: string;
  size: string;
  handleDeleteImage: () => void;
}

export function ImageUploaded({
  name,
  path,
  size,
  handleDeleteImage
}: Props) {


  return(
    <View style={styles.imagesInput}>
      <LinearGradient
        colors={['#A1E9C5', '#FFC2D8']}
        start={{ x: .5, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: "100%", height: "100%", borderRadius: 20, alignItems: "center", justifyContent: "center" }}
      >
        <LinearGradient
          colors={['#EDFFF6', '#FCF0F4']}
          start={{ x: .5, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: "99%", height: "96%", borderRadius: 20, justifyContent: "center", paddingHorizontal: 6 }}
        >
          <View style={styles.uploadedImagesContainer}>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
              <Image
                source={{ uri: path }}
                style={styles.uploadImage}
              />

              <View>
                <Text style={styles.uploadImageText}>testes</Text>
                <Text style={styles.uploadImageTextSize}>242 kb</Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleDeleteImage}>
              <Feather name="x" size={24} color="#FF669D" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  )
}
