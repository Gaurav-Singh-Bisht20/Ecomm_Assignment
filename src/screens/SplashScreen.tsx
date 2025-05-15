import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function SplashScreenPage({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
      onFinish();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require('../assets/shopping.png')}
        className="w-40 h-40"
        resizeMode="contain"
      />
    </View>
  );
}