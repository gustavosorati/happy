import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateOrphanageModel } from "../models/create-orphanage-schema";
import { StepTwoOrphanageSchemaType, stepTwoOrphanageSchema } from "../models/step-two-orphanage-schema";
import { AxiosError } from "axios";
import { api } from "../../../../core/api/common/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation";

interface Props {
  orphanageData: CreateOrphanageModel;
  position: {
    latitude: number;
    longitude: number;
  };
  navigation: NativeStackNavigationProp<RootStackParamList>;
  setOrphanageData: React.Dispatch<React.SetStateAction<CreateOrphanageModel>>
}

export function useStepTwoCreateOrphanageForm({
  position,
  navigation,
  orphanageData,
  setOrphanageData
}: Props) {
  const [isCreatingOrphanage, setIsCreatingOrphanage] = useState(false);

  const { control, handleSubmit, formState: { isValid } } = useForm<StepTwoOrphanageSchemaType>({
    resolver: zodResolver(stepTwoOrphanageSchema),
    defaultValues: {
      instructions: orphanageData.instructions,
      opening_hours: orphanageData.opening_hours,
      opening_on_weekends: orphanageData.opening_on_weekends
    }
  });

  async function handleCreateOrphanage(data: StepTwoOrphanageSchemaType) {
    setIsCreatingOrphanage(true);
    setOrphanageData({
      ...orphanageData,
      ...data,
    });

    await handleSubmitOrphanage();
  }


  async function handleSubmitOrphanage() {
    try {

      const orphanageFormData = new FormData();

      orphanageFormData.append("name", orphanageData.name);
      orphanageFormData.append("about", orphanageData.about);
      orphanageFormData.append("latitude", String(position.latitude));
      orphanageFormData.append("longitude", String(position.longitude));
      orphanageFormData.append("instructions", orphanageData.instructions);
      orphanageFormData.append("opening_hours", orphanageData.opening_hours);
      orphanageFormData.append("open_on_weekends", orphanageData.opening_on_weekends ? "true" : "false");

      orphanageData.images.forEach((image, index) => {
        orphanageFormData.append("images", {
          name: `image_${index}.jpeg`,
          type: "image/jpeg",
          uri: image
        } as any)
      });

      await api.post("/orphanages", orphanageFormData)

      navigation.navigate("OrphanageDataSuccess");
    } catch (error) {
      if(error instanceof AxiosError) {
        console.log(error.response.data)
      }
      Alert.alert(
        "Erro ao criar orfanato",
        "Ocorreu um erro ao criar o orfanato, tente novamente",
      )
    } finally {
      setIsCreatingOrphanage(false);
    }
  }

  return {
    control,
    isValid,
    isCreatingOrphanage,
    handleSubmit,
    handleCreateOrphanage
  }
}



