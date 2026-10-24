import React from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { SMALL_SCREEN_FULL_SCREEN, ALWAYS_FULL_SCREEN } from '../constants/screenConstants';

import WebLargeLayout from './WebLargeLayout';

export const withScreenLayout = (WrappedComponent, routeName) => {
  return (props) => {
    const { width } = useWindowDimensions(); // ✅ live width, updates on resize
    const isWeb = Platform.OS === 'web';
    const shouldHideNavigation = SMALL_SCREEN_FULL_SCREEN.includes(routeName);
    const isAlwaysFullScreen = ALWAYS_FULL_SCREEN.includes(routeName);

    // ✅ Decide layout on every render (not once)
    let layout = 'small';

    if (isAlwaysFullScreen) {
      layout = 'fullscreen';
    } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // Native mobile — always small
      layout = 'small';
    } else if (isWeb) {
      // ✅ Tablets + phones → small, desktop only → web large
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

  };
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});