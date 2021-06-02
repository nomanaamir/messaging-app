import React, { useEffect } from 'react';
import {
  StyleSheet,
  BackHandler
} from 'react-native';

// provider, store
import { Provider } from 'react-redux';
import store from './src/Store/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import PhoneAuth from './src/screens/phone-auth/index';
import Home from './src/screens/home/index';
import ChatRoom from './src/screens/chat-room/index';




// LogBox.ignoreLogs(['Setting a timer for a long period of time'])
const Stack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
function App() {
  useEffect(() => {
    // BackHandler.addEventListener('hardwareBackPress', () => true)
    // return () =>
    //   BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="phoneAuth" component={PhoneAuth} options={{ headerShown: false, cardStyleInterpolator: forFade, }} />
          <Stack.Screen name="home" component={Home} options={{ headerShown: false, cardStyleInterpolator: forFade, }} />
          <Stack.Screen name="chatRoom" component={ChatRoom} options={{ headerShown: false, cardStyleInterpolator: forFade, }} />

          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: 'red',
    flex: 1,
  }
});

export default App;