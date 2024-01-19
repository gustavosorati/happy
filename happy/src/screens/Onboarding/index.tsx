import { Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import { steps } from "./schema/onboarding-steps";
import { useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons"
import { OnboardingStepOne } from "./components/OnboardingStepOne";
import { OnboardingStepTwo } from "./components/OnboardingStepTwo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { StatusBar } from "expo-status-bar";
import { useOnBoarding } from "../../core/hooks/useOnboarding";

type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>

export function Onboarding({ navigation, route }: OnboardingProps) {
  const { handleDisplayOnboarding } = useOnBoarding();
  const [onboardingStep, setOnboardingStep] = useState(0);

  function handleNextStep() {
    if(onboardingStep < steps.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      handleDisplayOnboarding();
      navigation.navigate('Home');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.container}>
        {onboardingStep === 0 && (
          <OnboardingStepOne layout={steps[onboardingStep]} />
        )}

        {onboardingStep === 1 && (
          <OnboardingStepTwo layout={steps[onboardingStep]} />
        )}

        <View style={styles.footer}>
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setOnboardingStep(index)}
                style={{ paddingVertical: 8, paddingHorizontal: 4}}
              >
                <View
                  key={index}
                  style={[
                    styles.step,
                    index === onboardingStep && styles.activeStep
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <RectButton
            onPress={handleNextStep}
            style={styles.button}
          >
            <Feather name="arrow-right" size={24} color="#15B6D6" />
          </RectButton>
        </View>
      </View>
    </SafeAreaView>
  )
}
