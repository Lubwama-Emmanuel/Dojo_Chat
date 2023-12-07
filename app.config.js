import "dotenv/config";

export default {
  expo: {
    name: "dojoChat",
    slug: "dojoChat",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      appId: process.env.APP_ID,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      authDomain: process.env.AUTH_DOMAIN,
    },
  },
};
