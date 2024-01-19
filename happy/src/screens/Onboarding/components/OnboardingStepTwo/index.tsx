import { Image, ImageSourcePropType, Text, View } from "react-native";
import { styles } from "./styles";
import Animated, { Easing, SlideInLeft, SlideInRight } from "react-native-reanimated";

interface OnboardingStepProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

interface OnboardingStepTwoProps {
  layout: OnboardingStepProps;
}

export function OnboardingStepTwo({ layout: { image, title, description }} : OnboardingStepTwoProps) {
  return (
    <Animated.View
      entering={SlideInRight.easing(Easing.ease)}
      style={styles.container}
    >
      <Image
        source={image}
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  )
}
