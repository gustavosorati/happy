import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import OrphanagesMap from "../screens/OrphanagesMap";
import { OrphanageDetails } from "../screens/OrphanageDetails";
import { Header } from "../ui/Header";
import { SelectMapPosition } from "../screens/CreateOrphanage/SelectMapPosition";
import { OrphanageData } from "../screens/CreateOrphanage/OrphanageData";
import { SplashScreen } from "../screens/SplashScreen";
import { Onboarding } from "../screens/Onboarding";
import { OrphanageDataSuccess } from "../screens/CreateOrphanage/OrphanageDataSuccess";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Home: undefined
  OrphanageDetails: {
    orphanageId: number;
  }
  SelectMapPosition: undefined
  OrphanageData: {
    position: {
      latitude: number,
      longitude: number
    }
  }
  OrphanageDataSuccess: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Screen
          name="Splash"
          component={SplashScreen}
        />

        <Screen
          name="Home"
          component={OrphanagesMap}
        />

        <Screen
          name="Onboarding"
          component={Onboarding}
        />

        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: (props) => <Header title="Orfanato" {...props} showCancel={false} />
          }}
        />

        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: (props) => <Header title="Adicione um orfanato" {...props} />
          }}
        />

        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: (props) => <Header title="Adicione um orfanato" {...props}  />
          }}
        />

        <Screen
          name="OrphanageDataSuccess"
          component={OrphanageDataSuccess}
          options={{
            headerShown: false
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}
