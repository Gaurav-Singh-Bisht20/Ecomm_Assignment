import React, { useState } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
import { ActivityIndicator, View } from 'react-native';

import SplashScreenPage from '@/screens/SplashScreen';

export default function App() {
   const [isAppReady, setAppReady] = useState(false);

  if (!isAppReady) {
    return <SplashScreenPage onFinish={() => setAppReady(true)} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<View><ActivityIndicator /></View>} persistor={persistor}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}