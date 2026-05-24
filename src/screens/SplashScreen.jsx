import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
        navigation.replace("Login");
      }, 1500);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Camp<Text style={{ color: colors.forestGreen() }}>Rent</Text>
      </Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, { fontFamily: "Pjs-Regular" }]}>
          Presented By
        </Text>
        <Text
          style={[
            styles.info,
            { fontFamily: "Pjs-SemiBold", textAlign: "center" },
          ]}
        >
          Mobile Programming
        </Text>
        <Text
          style={[
            styles.info,
            { fontFamily: "Pjs-SemiBold", textAlign: "center" },
          ]}
        >
          Laboratory
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    justifyContent: "center",
  },
  logo: {
    fontSize: 48,
    fontFamily: "Pjs-ExtraBold",
    color: colors.earthBrown(),
    alignSelf: "center",
  },
  infoContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
  },
  info: {
    fontSize: 12,
    color: colors.grey(0.6),
  },
});
