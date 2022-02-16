import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Constants from 'expo-constants'

export default function AddMarkScren({}) {
  //const { id } = route.params
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [markers, setMarkers] = useState([])

  async function adicionar() {
    const json = {
      title,
      description
    }

    const headerOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json) //Recebe em formato json, mas converte p str
    }
    //   const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions)
  }

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
      <TouchableOpacity style={styles.mapTouch} onPress={() => {}}>
        <MapView
          style={styles.map}
          onPress={event => {
            setLatitude(event.nativeEvent.coordinate.latitude)
            setLongitude(event.nativeEvent.coordinate.longitude)
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
      </TouchableOpacity>
      <View style={styles.form}>
        <Text>Título:</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        <Text>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => adicionar()}>
          <Text>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  mapTouch: {
    //height: '60%',
    width: 'auto'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  form: {
    height: 560,
    width: 'auto',
    padding: 20
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 10
  },
  addButton: {
    paddingLeft: '41%',
    paddingRight: '41%',
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center'
  }
})
