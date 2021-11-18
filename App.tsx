import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Home } from './src/screens/Home';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <Home/>
      <StatusBar style="light" backgroundColor="#333" translucent={false} />
    </>
  );
}