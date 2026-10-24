export default {
  expo: {
    name: "MtaaniMall",
    slug: "MtaaniMall",
    version: "4.0.6", // Incremented to overwrite the crashing Play Store buildd
    orientation: "portrait",
    icon: "./src/assets/logo.jpg",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    scheme: "mtaanimall",

    splash: {
      image: "./src/assets/logo.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/logo.jpg",
        backgroundColor: "#FFFFFF"
      },
      package: "com.mtaanimall.app",
      edgeToEdgeEnabled: true,
      versionCode: 21, // Incremented to force Google Play to process the updated package
      permissions: [
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.MODIFY_AUDIO_SETTINGS",
        "android.permission.BLUETOOTH"
      ],
      // Link the new ProGuard rule structure to stop R8 from stripping maps libraries
      proguardRuleOrders: ["./proguard-rules.pro"],
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "mtaanimall",
              host: "*"
            }
          ],
          category: ["BROWSABLE", "DEFAULT"]
        }
      ],
      config: {
        googleMaps: {
          apiKey: "AIzaSyDWgvJcL4nhZldkpUZHNBM4cS78Vy8ldAI"
        }
      }
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.mtaanimall.app",
      infoPlist: {
        NSCameraUsageDescription: "This app needs camera access for video calls",
        NSMicrophoneUsageDescription: "This app needs microphone access for audio and video calls",
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: ["mtaanimall"]
          }
        ]
      },
      config: {
        googleMapsApiKey: "AIzaSyDsOhTBIPdQNf4YRKLrar4HHG9Mk24"
      }
    },

    web: {
      favicon: "./src/assets/logo2.jpg",
      experiments: {
        baseUrl: "/danielKimari",
  },
      
    },

    extra: {
      eas: {
        projectId: "5acef150-2a7b-48c2-af73-6e13884caf7f"
      },
      WEB_BASE_URL: process.env.WEB_BASE_URL,
      MOBILE_BASE_URL: process.env.MOBILE_BASE_URL,
      WEB_IMAGE_URL: process.env.WEB_IMAGE_URL,
      MOBILE_IMAGE_URL: process.env.MOBILE_IMAGE_URL,
      SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
      Mobile_Socket_server_URL: process.env.Mobile_Socket_server_URL,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      GOOGLE_MAPS_API_KEY_ANDROID: process.env.GOOGLE_MAPS_API_KEY_ANDROID,
      GOOGLE_MAPS_API_KEY_IOS: process.env.GOOGLE_MAPS_API_KEY_IOS,
    },
  },
};