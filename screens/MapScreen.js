import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Constants from 'expo-constants'

export default function MapScreen({ navigation }) {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    async function getData() {
      const token = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF'

      const headerOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions)
      const markers = await response.json()
      //console.log(markers)
      setMarkers(markers)
    }
    getData()
  }, [])

  const natalRegion = {
    latitude: -5.8,
    longitude: -35.2,
    latitudeDelta: 0.19912,
    longitudeDelta: 0.199101
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={natalRegion}>
        {markers.map((marker, id) => (
          <Marker
            key={id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <FontAwesome5
        style={styles.plus}
        name="plus-circle"
        size={45}
        color="green"
        onPress={() => navigation.navigate('AddMarkScreen')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute'
  },
  plus: {
    marginTop: 545,
    marginLeft: 300
  }
})
