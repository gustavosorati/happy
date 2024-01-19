import { ActivityIndicator, Alert, Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Controller } from "react-hook-form";
import Animated, { Easing, SlideInRight } from "react-native-reanimated";
import { useStepTwoCreateOrphanageForm } from "../../hooks/use-step-two-create-orphanage-form";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../navigation";

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  position: {
    latitude: number;
    longitude: number;
  };
  orphanageData: any;
  setOrphanageData: React.Dispatch<React.SetStateAction<{}>>;
}

export function OrphanageDataStepTwo({
  position,
  navigation,
  orphanageData,
  setOrphanageData,
}: Props) {
  const {
    control,
    isValid,
    isCreatingOrphanage,
    handleSubmit,
    handleCreateOrphanage
  } = useStepTwoCreateOrphanageForm({
    orphanageData,
    position,
    navigation,
    setOrphanageData,
  });

  return (
    <Animated.View
      entering={SlideInRight.easing(Easing.ease)}
      style={{ flex: 1, paddingBottom: 24 }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Visitação</Text>

          <View style={styles.pages}>
            <Text style={styles.textPageInactive}>01</Text>
            <Text style={styles.textPageInactive}>-</Text>
            <Text style={styles.textPageActive}>02</Text>
          </View>
        </View>

        <Text style={styles.label}>Instruções</Text>
        <Controller
          control={control}
          name="instructions"
          render={({
              field: { onChange, value },
              fieldState: { error}
            }) => (
              <View style={{ gap: 4, marginBottom: 16 }}>
                <TextInput
                  style={[styles.input, { height: 110 }, !!error && styles.inputError]}
                  multiline
                  onChangeText={onChange}
                  value={value}
                />

                <Text style={styles.errorText}>{error?.message}</Text>
              </View>
            )
          }
        />

        <Text style={styles.label}>Horário de visitas</Text>
        <Controller
          control={control}
          name="opening_hours"
          render={({
              field: { onChange, value },
              fieldState: { error}
            }) => (
              <View style={{ gap: 4, marginBottom: 16 }}>
                <TextInput
                  style={[styles.input, !!error && styles.inputError]}
                  onChangeText={onChange}
                  value={value}
                />

                <Text style={styles.errorText}>{error?.message}</Text>
              </View>
          )}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Atende final de semana?</Text>
          <Controller
            control={control}
            name="opening_on_weekends"
            render={({
                field: { onChange, value },
                fieldState: { error}
              }) => (
              <Switch
                thumbColor="#fff"
                trackColor={{ false: '#ccc', true: '#39CC83' }}
                value={value}
                onValueChange={onChange}
              />
            )}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(handleCreateOrphanage)}
        disabled={!isValid || isCreatingOrphanage}
        style={[
          styles.nextButton,
          !isValid ? { opacity: 0.5 } : {},
        ]}
      >
        {isCreatingOrphanage
          ? <ActivityIndicator color={'#FFF'} size="small" />
          : <Text style={styles.nextButtonText}>Confirmar</Text>
        }

      </TouchableOpacity>
    </Animated.View>
  )
}



