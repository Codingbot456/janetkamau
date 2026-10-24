# Keep Google Play Services and Maps intact
-keep class com.google.android.gms.maps.** { *; }
-keep interface com.google.android.gms.maps.** { *; }
-keep class com.google.android.gms.common.** { *; }

# Keep React Native Maps framework components
-keep class com.rnmaps.maps.** { *; }

# Keep Expo Location framework native modules
-keep class expo.modules.location.** { *; }
