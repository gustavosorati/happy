import { Image, ImageSourcePropType, Text, View } from "react-native";
import { styles } from "./styles";
import Animated, { Easing, SlideInLeft, SlideInRight } from "react-native-reanimated";

interface OnboardingStepProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

interface OnboardingStepOneProps {
  layout: OnboardingStepProps;
}

export function OnboardingStepOne({ layout: { image, title, description }} : OnboardingStepOneProps) {
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

      <Text style={styles.description}>{description}</Text>
    </Animated.View>
  )
}
