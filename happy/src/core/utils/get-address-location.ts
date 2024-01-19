import { reverseGeocodeAsync, LocationObjectCoords } from "expo-location";


export async function getAddressLocation({longitude, latitude}: LocationObjectCoords) {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });

    return addressResponse[0]?.street;
  } catch (error) {

  }
}
