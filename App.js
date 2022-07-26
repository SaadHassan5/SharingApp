
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Stack from './src/navigators/StackNavigator';
import { store } from './src/root/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </Provider>
  )
}
export default App;