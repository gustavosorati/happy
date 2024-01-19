import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

import mapMarkerImg from "../../../assets/map-marker.png";
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectMapPosition'>;

export function SelectMapPosition({ navigation }: Props) {
  // const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0});

  function handleSelectMapPosition(event: MapPressEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
        style={styles.mapStyle}
      >
        { !!position.latitude && (
          <Marker
            icon={mapMarkerImg}
            coordinate={position}
          />
        )}
      </MapView>

      { !!position.latitude && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}
