import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {

  return (
    <NavigationContainer>
      <PaperProvider>
        <StatusBar style='dark' backgroundColor='#fff'/>
        <FlashMessage position="top" />
        <StackNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
