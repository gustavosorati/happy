import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateOrphanageModel } from "../models/create-orphanage-schema";
import { StepOneOrphanageSchemaType, stepOneOrphanageSchema } from "../models/step-one-orphanage-schema";

interface Props {
  orphanageData: CreateOrphanageModel;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setOrphanageData: React.Dispatch<React.SetStateAction<CreateOrphanageModel>>
}

export function useStepOneCreateOrphanageForm({
  orphanageData,
  setStep,
  setOrphanageData
}: Props) {
  const [images, setImages] = useState<string[]>(orphanageData.images?.length > 0 ? [...orphanageData.images] : []);

  const { control, handleSubmit, formState: { isValid, errors } } = useForm<StepOneOrphanageSchemaType>({
    resolver: zodResolver(stepOneOrphanageSchema),
    defaultValues: {
      name: orphanageData.name,
      about: orphanageData.about
    }
  });

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

  function handleDeleteImage(imageId: number) {
    const updatedImages = [...images];
    updatedImages.splice(imageId, 1);

    setImages(updatedImages);
};

  async function handleNextStep(data: StepOneOrphanageSchemaType) {
    if(images.length === 0) {
      Alert.alert(
        "Erro na criação do orfanato",
        "Insira pelo menos uma imagem para o orfanato",
      )
      return
    }

    setOrphanageData({
      ...orphanageData,
      ...data,
      images
    });

    setStep(2);
  }

  return {
    control,
    isValid,
    images,
    handleSubmit,
    handleDeleteImage,
    handleSelectImages,
    handleNextStep
  }
}



// async function handleCreateOrphanage(data: CreateOrphanageSchemaType) {
//   if(images.length === 0) {
//     Alert.alert(
//       "Erro na criação do orfanato",
//       "Insira pelo menos uma imagem para o orfanato",
//     )
//   }

//   try {
//     const orphanageFormData = new FormData();

//     orphanageFormData.append("name", data.name);
//     orphanageFormData.append("about", data.about);
//     orphanageFormData.append("latitude", String(position.latitude));
//     orphanageFormData.append("longitude", String(position.longitude));
//     orphanageFormData.append("instructions", data.instructions);
//     orphanageFormData.append("opening_hours", data.opening_hours);
//     orphanageFormData.append("open_on_weekends", data.opening_on_weekends ? "true" : "false");

//     images.forEach((image, index) => {
//       orphanageFormData.append("images", {
//         name: `image_${index}.jpeg`,
//         type: "image/jpeg",
//         uri: image
//       } as any)
//     });

//     await api.post("/orphanages", orphanageFormData)

//     navigation.navigate("Home");
//   } catch (error) {
//     if(error instanceof AxiosError) {
//       console.log(error.response.data)
//     }
//     Alert.alert(
//       "Erro ao criar orfanato",
//       "Ocorreu um erro ao criar o orfanato, tente novamente",
//     )
//   }
// }
