// useSafeNav.js - navigate by route name (with optional params), only to screens that exist.
// Pages can then be added step by step without broken buttons crashing the app.
import { useNavigation } from '@react-navigation/native';

export const useSafeNav = () => {
  const navigation = useNavigation();
  return (name, params) => {
    const names = (navigation.getState && navigation.getState() && navigation.getState().routeNames) || [];
    if (names.includes(name)) navigation.navigate(name, params);
    else if (__DEV__) console.warn(`[nav] Route "${name}" is not registered in MainNavigator, so the click did nothing.`);
  };
};