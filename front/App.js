// App.js (Janet Kamau): light theme + Manrope font
import React, { useMemo } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { HelmetProvider } from 'react-helmet-async';
import { linking } from './src/components/navigation/linkingConfig';
import MainNavigator from './src/components/navigation/MainNavigator';
import { colors } from './src/styles/globalStyles';

// Runs once at load, before React renders, so Safari sees the page color early
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const setMeta = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = name;
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  setMeta('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
  setMeta('theme-color', colors.bg);
  setMeta('color-scheme', 'light');
  setMeta('apple-mobile-web-app-capable', 'yes');
  setMeta('apple-mobile-web-app-status-bar-style', 'default');

  let style = document.getElementById('safe-area-styles');
  if (!style) {
    style = document.createElement('style');
    style.id = 'safe-area-styles';
    document.head.appendChild(style);
  }
  style.textContent = `
    html, body { margin: 0; padding: 0; background-color: ${colors.bg}; }
    #root { min-height: 100vh; background-color: ${colors.bg}; }
  `;
}

const AppContent = React.memo(() => {
  const navigator = useMemo(
    () => (
      <NavigationContainer key="navigation-container" linking={linking}>
        <MainNavigator />
      </NavigationContainer>
    ),
    []
  );
  return <>{navigator}</>;
});
AppContent.displayName = 'AppContent';

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <HelmetProvider>
      <SafeAreaProvider style={{ backgroundColor: colors.bg }}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['left', 'right']}>
          <AppContent />
        </SafeAreaView>
      </SafeAreaProvider>
    </HelmetProvider>
  );
}