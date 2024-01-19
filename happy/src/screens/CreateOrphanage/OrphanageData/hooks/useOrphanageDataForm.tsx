import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Alert } from "react-native";
import { api } from "../../../../core/api/common/api";
import { RootStackParamList } from "../../../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AxiosError } from "axios";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

const createOrphanageSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  about: z.string().min(1, "A descrição é obrigatória"),
  instructions: z.string().min(1, "Informe as instruções"),
  opening_hours: z.string().min(1, "Informe se o estabelecimento abre ou não aos fins de semana"),
  opening_on_weekends: z.boolean().default(false),
});

type CreateOrphanageSchemaType = z.infer<typeof createOrphanageSchema>;

interface Props {
  position: {
    latitude: number;
    longitude: number;
  };
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export function useOrphanageDataForm({
  position,
  navigation
}: Props) {
  const { control, handleSubmit } = useForm<CreateOrphanageSchemaType>({
    resolver: zodResolver(createOrphanageSchema),
  });

  const [step, setStep] = useState(0);
  const [images, setImages] = useState<string[]>([]);


  async function handleNextStep(data: Omit<CreateOrphanageSchemaType, "opening_hours" | "opening_on_weekends">) {
    if(images.length === 0) {
      Alert.alert(
        "Erro na criação do orfanato",
        "Insira pelo menos uma imagem para o orfanato",
      )
    }

    setStep(1);
  }

  async function handleCreateOrphanage(data: CreateOrphanageSchemaType) {
    if(images.length === 0) {
      Alert.alert(
        "Erro na criação do orfanato",
        "Insira pelo menos uma imagem para o orfanato",
      )
    }

    try {
      const orphanageFormData = new FormData();

      orphanageFormData.append("name", data.name);
      orphanageFormData.append("about", data.about);
      orphanageFormData.append("latitude", String(position.latitude));
      orphanageFormData.append("longitude", String(position.longitude));
      orphanageFormData.append("instructions", data.instructions);
      orphanageFormData.append("opening_hours", data.opening_hours);
      orphanageFormData.append("open_on_weekends", data.opening_on_weekends ? "true" : "false");

      images.forEach((image, index) => {
        orphanageFormData.append("images", {
          name: `image_${index}.jpeg`,
          type: "image/jpeg",
          uri: image
        } as any)
      });

      await api.post("/orphanages", orphanageFormData)

      navigation.navigate("Home");
    } catch (error) {
      if(error instanceof AxiosError) {
        console.log(error.response.data)
      }
      Alert.alert(
        "Erro ao criar orfanato",
        "Ocorreu um erro ao criar o orfanato, tente novamente",
      )
    }
  }

  async function handleSelectImages() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        alert('Eita! Precisamos de acesso às suas fotos...');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });

      if(result.canceled) return;

      const { uri: image } = result.assets[0];

      setImages([...images, image]);
    } catch (error) {
      console.log(error)
    }
  }

  return {
    control,
    images,
    handleSubmit,
    handleCreateOrphanage,
    handleSelectImages,
    handleNextStep
  }
}
