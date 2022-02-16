import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function MapScreen({ navigation }) {
  const [myLatitude, setMyLatitude] = useState(0)
  const [myLongitude, setMyLongitude] = useState(0)
  const [myTitle, setMyTitle] = useState('')
  const [myDescription, setMyDescription] = useState('')

  const [markers, setMarkers] = useState([])
  const token = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF'

  useEffect(() => {
    async function getData() {
      const headerOption = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOption)
      const markers = await response.json()
      //console.log(markers)
      setMarkers(markers)
    }
    getData()
  }, [])

  const headerOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude: myLatitude,
      longitude: myLongitude,
      title: myTitle,
      description: myDescription
    })
  }

  async function adicionar() {
    //const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOption)
    const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions)
    // Qdo a resposta é 200 a solicitação foi atendida c sucesso
    // Se status for 401 não foi possivel ACESSAR API UFRN
    if (response.status === 200) {
      Alert.alert('Marcador inserido com sucesso.')
    } else {
      Alert.alert('Erro: ' + response.status)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mapTouch} onPress={() => {}}>
        <MapView
          style={styles.map}
          onPress={event => {
            setMyLatitude(event.nativeEvent.coordinate.latitude)
            setMyLongitude(event.nativeEvent.coordinate.longitude)
          }}
        >
          <Marker
            coordinate={{ latitude: myLatitude, longitude: myLongitude }}
            title={myTitle}
            description={myDescription}
          />
          {markers.map((marker, id) => (
            <Marker
              key={id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </ScrollView>
      <ScrollView style={styles.form}>
        <Text>Título:</Text>
        <TextInput style={styles.input} value={myTitle} onChangeText={setMyTitle} />
        <Text>Descrição:</Text>
        <TextInput style={styles.input} value={myDescription} onChangeText={setMyDescription} />
        <TouchableOpacity style={styles.addButton} onPress={() => adicionar()}>
          <Text style={styles.btnText}>Adicionar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  mapTouch: {
    width: 'auto'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  form: {
    height: 380,
    width: 'auto',
    padding: 20
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white'
  },
  addButton: {
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center'
  },
  btnText: {
    color: 'white'
  }
})
