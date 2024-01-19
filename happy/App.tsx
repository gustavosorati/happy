import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';

import Routes from './src/navigation';
import { useCallback } from 'react';
import { OnboardingProvider } from './src/core/contexts/onboarding-context';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !fontsError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if(!fontsLoaded || fontsError) {
    return null;
  }

  return (
    <GestureHandlerRootView
      onLayout={onLayoutRootView}
      style={{ flex: 1 }}
    >
      <OnboardingProvider>
        <Routes />
      </OnboardingProvider>
    </GestureHandlerRootView>
  );
}
