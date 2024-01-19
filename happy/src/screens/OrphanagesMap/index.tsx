import { Alert, Platform, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import mapMarker from "../../assets/map-marker.png";
import { styles } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { useEffect, useState } from 'react';
import { api } from '../../core/api/common/api';
import { useFocusEffect } from '@react-navigation/native';
import { OverlayAnimation } from './components/OverlayAnimation';
import { GuideButton } from './components/GuideButton';
import { GuideOverlay } from './components/GuidOverlay';
import Location, { LocationAccuracy, LocationObjectCoords, LocationSubscription, useForegroundPermissions, watchPositionAsync} from 'expo-location';
import { getAddressLocation } from '../../core/utils/get-address-location';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function OrphanagesMap({ navigation }: Props) {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [showGuide, setShowGuide] = useState(false);

  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const [locationForegroundPermission, requestLocationForegroundPermission ] = useForegroundPermissions();

  function handleNavigateToOrphanageDetails(orphanageId: number) {
    navigation.navigate('OrphanageDetails', { orphanageId });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if(!locationForegroundPermission?.granted) {
      return
    }

    let subscription: LocationSubscription;

    watchPositionAsync({
        accuracy: LocationAccuracy.High,
        timeInterval: 1000
      },
      (location) => {
        setCurrentCoords(location.coords);
        getAddressLocation(location.coords)
          .then((address) => {
            if(address) {
              setCurrentAddress(address);
            }
          })
          .finally(() => setIsLoadingLocation(false))
      })
        .then((response) => subscription = response);

    return () => {
      if(subscription) {
        subscription.remove();
      }
    }
  }, [locationForegroundPermission])

  useFocusEffect(() => {
    api.get("orphanages")
      .then(response => {
        setOrphanages(response.data);
      })
      .catch(err => console.log(err))
  });

  if(!locationForegroundPermission?.granted) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          Você precisa permitir que o aplicativo tenha acesso a localizaçaão, por favor acesse as configurações do dispositivo para dar permissão ao usuário.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <GuideButton onPress={() => setShowGuide(!showGuide)} />

      {currentCoords?.latitude && (
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          initialRegion={{
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }}

          style={styles.map}
        >
          {orphanages.map(orphanage => (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{ x: 3, y: 0.8 }}
              coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude }}
            >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton
          onPress={handleNavigateToCreateOrphanage}
          style={styles.createOrphanageButton}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>

      <OverlayAnimation />
      {showGuide && <GuideOverlay setShowGuide={setShowGuide} />}
    </View>
  );
}
