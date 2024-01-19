import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Feather } from '@expo/vector-icons';
import { StepOneOrphanageSchemaType, stepOneOrphanageSchema } from "../../models/step-one-orphanage-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { ImageUploaded } from "../../../../../ui/ImageUploaded";
import { CreateOrphanageModel } from "../../models/create-orphanage-schema";
import { useStepOneCreateOrphanageForm } from "../../hooks/use-step-one-create-orphanage-form";
import Animated, { Easing, SlideInRight } from "react-native-reanimated";

interface Props {
  orphanageData: CreateOrphanageModel;
  setStep: React.Dispatch<React.SetStateAction<number>>
  setOrphanageData: React.Dispatch<React.SetStateAction<CreateOrphanageModel>>
}

export function OrphanageDataStepOne({
  orphanageData,
  setStep,
  setOrphanageData,
}: Props) {
  const {
    control,
    isValid,
    images,
    handleSubmit,
    handleNextStep,
    handleDeleteImage,
    handleSelectImages,
  } = useStepOneCreateOrphanageForm({
    orphanageData,
    setOrphanageData,
    setStep,
  });

  return (
    <Animated.View
      entering={SlideInRight.easing(Easing.ease)}
      style={{ flex: 1, paddingBottom: 24 }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Dados</Text>

          <View style={styles.pages}>
            <Text style={styles.textPageActive}>01</Text>
            <Text style={styles.textPageInactive}>-</Text>
            <Text style={styles.textPageInactive}>02</Text>
          </View>
        </View>

        <Text style={styles.label}>Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({
              field: { onChange, value },
              fieldState: { error}
            }) => (
              <View style={{ gap: 4, marginBottom: 16 }}>
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  style={[styles.input, !!error && styles.inputError]}
                />

                <Text style={styles.errorText}>{error?.message}</Text>
              </View>
          )}
        />

        <Text style={styles.label}>Sobre</Text>
        <Controller
          control={control}
          name="about"
          render={({
              field: { onChange, value },
              fieldState: { error}
            }) => (
              <View style={{ gap: 4, marginBottom: 16 }}>
                <TextInput
                  style={[styles.input, { height: 110 }, !!error && styles.inputError ]}
                  multiline
                  onChangeText={onChange}
                  value={value}
                />

                <Text style={styles.errorText}>{error?.message}</Text>
            </View>
          )}
        />

        <Text style={styles.label}>Fotos</Text>

        {images.length > 0 && (
          <View style={{ gap: 8, marginBottom: 8 }}>
            {images.map((image, index) => (
              <ImageUploaded
                key={image}
                path={image}
                name="x"
                size="242kb"
                handleDeleteImage={() => handleDeleteImage(index)}
              />
            ))}
          </View>
        )}

        <TouchableOpacity
          onPress={handleSelectImages}
          style={styles.imagesInput}
        >
          <Feather name="plus" size={24} color="#15B6D6" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(handleNextStep)}
        disabled={!isValid}
        style={[
          styles.nextButton,
          !isValid ? { opacity: 0.5 } : {},
        ]}
      >
          <Text style={styles.nextButtonText}>Próximo</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
