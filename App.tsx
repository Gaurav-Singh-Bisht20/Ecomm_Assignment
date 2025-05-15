import React from 'react';
import { NavigationContainer,NavigationContainerRef } from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function App() {
  return(
     <Provider store={store}>
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
    </Provider>
  ) 
}