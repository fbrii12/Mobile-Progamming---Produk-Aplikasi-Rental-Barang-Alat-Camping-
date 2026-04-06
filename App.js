import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function App() {

  const menuCamping = [
    { id: "1", nama: "Tenda 4 Orang", harga: "Rp 50.000 / hari" },
    { id: "2", nama: "Sleeping Bag", harga: "Rp 20.000 / hari" },
    { id: "3", nama: "Kompor Portable", harga: "Rp 25.000 / hari" },
    { id: "4", nama: "Carrier 60L", harga: "Rp 40.000 / hari" },
    { id: "5", nama: "Matras Camping", harga: "Rp 15.000 / hari" },
    { id: "6", nama: "Headlamp", harga: "Rp 10.000 / hari" },
    { id: "7", nama: "Meja Lipat Camping", harga: "Rp 30.000 / hari" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nama}>{item.nama}</Text>
      <Text style={styles.harga}>{item.harga}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rental Alat Camping</Text>

      <FlatList
        data={menuCamping}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    marginTop: 40
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3
  },

  nama: {
    fontSize: 18,
    fontWeight: "bold"
  },

  harga: {
    fontSize: 16,
    color: "green"
  }
});