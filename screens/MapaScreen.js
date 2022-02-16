import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Constants from 'expo-constants'

export default function App({ navigation }) {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    async function getData() {
      const token = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF'
      const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const markers = await response.json()
      setMarkers(markers)
      //console.log(markers)
    }
    getData()
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -5.84,
          longitude: -35.2,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09
        }}
      >
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
        size={40}
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
    marginTop: 650,
    marginLeft: 300
  }
})
