import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MapaScreen from './screens/MapaScreen'
import AddMarkScreen from './screens/AddMarkScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MapaScreen" component={MapaScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="AddMarkScreen"
          component={AddMarkScreen}
          options={{ title: 'Adicionar Marcador' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
