import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/theme";

export default function BlogDetail({ route, navigation }) {
  // Menerima data produk yang dikirim dari ListBlog
  const { item } = route.params; 

  return (
    <View style={styles.container}>
      {/* GAMBAR FULL SCREEN & TOMBOL BACK */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
          contentFit="cover" 
          transition={300} 
        />
        
        {/* Tombol Back */}
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.earthBrown()} />
        </TouchableOpacity>
      </View>

      {/* DETAIL PRODUK */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.kategori}</Text>
        </View>

        <Text style={styles.title}>{item.nama}</Text>
        <Text style={styles.price}>{item.harga}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
        <Text style={styles.desc}>
          {item.deskripsi || "Peralatan camping berkualitas tinggi yang siap menemani petualangan alam bebas Anda. Terawat dengan baik dan selalu dibersihkan setelah disewa. Sangat cocok untuk pemula maupun profesional."}
        </Text>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* FOOTER TOMBOL SEWA */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerTotal}>Total Sewa</Text>
          <Text style={styles.footerPrice}>{item.harga}</Text>
        </View>
        <TouchableOpacity style={styles.rentBtn}>
          <Text style={styles.rentBtnText}>Sewa Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageContainer: { width: "100%", height: 350, position: "relative" },
  image: { width: "100%", height: "100%" },
  backBtn: {
    position: "absolute",
    top: 50, left: 20,
    width: 40, height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: { padding: 20, marginTop: -20, backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  categoryBadge: { alignSelf: "flex-start", backgroundColor: "#F0FAF0", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 12 },
  categoryText: { fontSize: 12, fontFamily: "Poppins-SemiBold", color: colors.forestGreen() },
  title: { fontSize: 24, fontFamily: "Poppins-Bold", color: colors.earthBrown(), marginBottom: 4 },
  price: { fontSize: 18, fontFamily: "Poppins-SemiBold", color: colors.forestGreen(), marginBottom: 16 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 16 },
  sectionTitle: { fontSize: 16, fontFamily: "Poppins-Bold", color: colors.earthBrown(), marginBottom: 8 },
  desc: { fontSize: 14, fontFamily: "Poppins-Regular", color: "#666", lineHeight: 22 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#eee", paddingBottom: 30 },
  footerTotal: { fontSize: 12, fontFamily: "Poppins-Regular", color: "#888" },
  footerPrice: { fontSize: 18, fontFamily: "Poppins-Bold", color: colors.forestGreen() },
  rentBtn: { backgroundColor: colors.forestGreen(), paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  rentBtnText: { color: "#fff", fontFamily: "Poppins-Bold", fontSize: 14 },
});