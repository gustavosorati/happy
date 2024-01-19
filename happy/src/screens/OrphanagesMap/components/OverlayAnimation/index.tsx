import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useEffect } from "react";


export function OverlayAnimation() {
  const logoAnimation = useSharedValue(1);
  const logoScaleAnimation = useSharedValue(1);
  const opacityAnimation = useSharedValue(1);

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: logoAnimation.value }
      ],
    }
  }, []);

  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(
          logoScaleAnimation.value,
          [1, .4],
          [1.4, 0],
          Extrapolate.CLAMP
        )}
      ],
      marginTop: interpolate(
        logoScaleAnimation.value,
        [1, .4],
        [0, 320],
        Extrapolate.CLAMP
      )
    }
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        opacityAnimation.value,
        [0, 1],
        [0, 1],
        Extrapolate.CLAMP
      )
    }
  }, []);

  useEffect(() => {
    logoAnimation.value = withTiming(1.4, {
      duration: 1400,
      easing: Easing.bounce,
    }, (finished) => {
      if(finished) {
        logoScaleAnimation.value = withTiming(.4, {
          duration: 400,
          easing: Easing.ease,
        }, (finished) => {
          if(finished) {
            opacityAnimation.value = withTiming(0, {
              duration: 400,
              easing: Easing.ease
            });
          }
        });
      }
    });
  })


  return (
    <Animated.View
      pointerEvents={'none'}
      style={[
        styles.container,
        animatedContainerStyle
      ]}
    >
      <LinearGradient
        colors={['#00c7c7', '#2AB5D1']}
        start={{x: 0, y: .2}}
        end={{x: .2, y: 1}}
        style={styles.gradient}
      >
        <Animated.Image
          source={require('../../../../assets/map-marker.png')}
          style={[
            { width: 78, height: 88 },
            animatedLogoStyle,
            animatedScaleStyle
          ]}
        />
    </LinearGradient>
    </Animated.View>
  )
}
