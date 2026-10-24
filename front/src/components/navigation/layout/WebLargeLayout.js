import React from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { SMALL_SCREEN_FULL_SCREEN, ALWAYS_FULL_SCREEN } from '../constants/screenConstants';
import WebLargeLayout from './WebLargeLayout';

export const withScreenLayout = (WrappedComponent, routeName) => {
  return (props) => {
    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === 'web';
    const isAlwaysFullScreen = ALWAYS_FULL_SCREEN.includes(routeName);

    let layout = 'small';

    if (isAlwaysFullScreen) {
      layout = 'fullscreen';
    } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
      layout = 'small';
    } else if (isWeb) {
      layout = width >= 1024 ? 'weblarge' : 'small';
    }

    if (layout === 'fullscreen') {
      return (
        <View style={styles.fullScreenContainer}>
          <WrappedComponent {...props} />
        </View>
      );
    }

    if (layout === 'weblarge') {
      return (
        <WebLargeLayout routeName={routeName}>
          <WrappedComponent {...props} />
        </WebLargeLayout>
      );
    }

    // ✅ MISSING BRANCH — small layout (mobile, and web < 1024px)
    return (
      <View style={styles.smallContainer}>
        <WrappedComponent {...props} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  smallContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});