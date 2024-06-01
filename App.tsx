import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const App = () => {
  const [coords, setCoords] = useState<LocationObject>({} as LocationObject);

  const getUserLocation = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();

      setCoords(currentPosition);

      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${currentPosition.coords.latitude}&lon=${currentPosition.coords.longitude}`);
      const data = await response.json();
      const formattedAddress = data;
      console.log(formattedAddress);
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Olá</Text>

      {coords.coords && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: Number(coords.coords.latitude),
            longitude: Number(coords.coords.longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(coords.coords.latitude),
              longitude: Number(coords.coords.longitude)
            }}
          />
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: '100%',
    height: 400
  }
})

export default App;