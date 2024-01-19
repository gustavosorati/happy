import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { Image, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { useOnBoarding } from "../../core/hooks/useOnboarding";

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>

export function SplashScreen({ navigation, route }: SplashScreenProps) {
  const logoAnimation = useSharedValue(1);
  const { shouldOnboardingBeDisplayed } = useOnBoarding();

  function handleNavigateToHome() {
      navigation.navigate('Onboarding');

    if(!__DEV__) {
      if(shouldOnboardingBeDisplayed) {
        navigation.navigate('Onboarding');
      } else {
        navigation.navigate('Home');
      }
    }
  }

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: logoAnimation.value }
      ]
    }
  });

  useEffect(() => {
    logoAnimation.value = withTiming(1.2, {
      duration: 1400,
      easing: Easing.bounce,
    }, (finished) => {
      if(finished) {
        runOnJS(handleNavigateToHome)();
      }
    });
  })

  return (
    <LinearGradient
      colors={['#00c7c7', '#2AB5D1']}
      start={{x: 0, y: .2}}
      end={{x: .2, y: 1}}
      style={styles.container}
    >
      <View style={{ top: -30, alignItems: "center" }}>
        <Animated.Image
          source={require('../../assets/map-marker.png')}
          style={[
            { width: 78, height: 88 },
            animatedLogoStyle
          ]}
        />
        <Text style={styles.title}>happy</Text>
      </View>


      <View style={styles.localization}>
        <Text style={styles.city}>Orlândia</Text>
        <Text style={styles.state}>São Paulo</Text>
      </View>
    </LinearGradient>
  )
}
