import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: "Koala",
    slug: "koala-garden",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "fr.lamobilery.koalagarden",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "fr.lamobilery.koalagarden",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "@react-native-voice/voice",
        {
          microphonePermission:
            "CUSTOM: Allow $(PRODUCT_NAME) to access the microphone",
          speechRecognitionPermission:
            "CUSTOM: Allow $(PRODUCT_NAME) to securely recognize user speech",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  };
};
