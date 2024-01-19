module.exports = () => {
  return {
    expo: {
      name: "happy",
      slug: "happy",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      plugins: [
        [
          "expo-location",
          {
            "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
          }
        ]
      ],
      splash: {
        image: "./assets/splash.png",
        resizeMode: "cover",
        backgroundColor: "#00C7C7"
      },
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.gustavosorati.happy",
        config: {
          googleMapsApiKey: process.env.GOOGLE_MAPS_KEY
        },
        infoPlist: {
          "UIBackgroundModas": ["location"]
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        config: {
          googleMaps: {
            apiKey: process.env.GOOGLE_MAPS_KEY
          }
        },
        package: "com.gustavosorati.happy"
      },
      web: {
        favicon: "./assets/favicon.png"
      }
    }
  }
}
