import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import mapMarkerImg from '../../assets/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { styles } from './styles';
import { api } from '../../core/api/common/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    id: number;
    url: string;
  }[];
}

type Props = NativeStackScreenProps<RootStackParamList, 'OrphanageDetails'>;

export function OrphanageDetails({ navigation, route }: Props) {
  const [orphanage, setOrphanage] = useState<Orphanage>({} as Orphanage);
  const [isLoadingOrphanageDetails, setIsLoadingOrphanageDetails] = useState(true);

  function handleOpenGoogleMapsRoutes() {
    Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=" + orphanage?.latitude + "," + orphanage?.longitude);
  }

  useEffect(() => {
    setIsLoadingOrphanageDetails(true);
    api.get(`/orphanages/${route.params.orphanageId}`)
      .then(response => {
        setOrphanage(response.data);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoadingOrphanageDetails(false));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoadingOrphanageDetails ? <ActivityIndicator /> : (
        <>
          <View style={styles.imagesContainer}>
            <ScrollView horizontal pagingEnabled>
              {orphanage.images.map(image => (
                <Image
                  key={image.id}
                  source={{ uri: image.url }}
                  style={styles.image}
                />

              ))}
            </ScrollView>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{orphanage.name}</Text>
            <Text style={styles.description}>{orphanage.about}</Text>

            <View style={styles.mapContainer}>
              <MapView
                initialRegion={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.008,
                }}
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                rotateEnabled={false}
                style={styles.mapStyle}
              >
                <Marker
                  icon={mapMarkerImg}
                  coordinate={{
                    latitude: orphanage.latitude,
                    longitude: orphanage.longitude,
                  }}
                />
              </MapView>

              <TouchableOpacity
                onPress={handleOpenGoogleMapsRoutes}
                style={styles.routesContainer}
              >
                <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            <Text style={styles.title}>Instruções para visita</Text>
            <Text style={styles.description}>{orphanage.instructions}</Text>

            <View style={styles.scheduleContainer}>
              <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                <Feather name="clock" size={40} color="#2AB5D1" />
                <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{orphanage.opening_hours}</Text>
              </View>

              {orphanage.open_on_weekends ? (
                <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                <Feather name="info" size={40} color="#39CC83" />
                <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                  Atendemos no fim de semana
                </Text>
              </View>
              ) : (
                <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                  <Feather name="info" size={40} color="#FF669D" />
                  <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                    Não atendemos no fim de semana
                  </Text>
              </View>
              )}

            </View>

            <RectButton style={styles.contactButton} onPress={() => {}}>
              <FontAwesome name="whatsapp" size={24} color="#FFF" />
              <Text style={styles.contactButtonText}>Entrar em contato</Text>
            </RectButton>
          </View>
        </>
      )}
    </ScrollView>
  )
}
