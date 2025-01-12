import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Splash({ onFinish }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ToDone</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6B6B", // Menggunakan warna coral yang modern
  },
  text: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
});