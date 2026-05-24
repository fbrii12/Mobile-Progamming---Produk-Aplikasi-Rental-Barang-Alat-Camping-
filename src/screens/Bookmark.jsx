import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/theme";

export default function Bookmark({ dataBookmark = [], onToggleBookmark, onClose }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onClose}>
          <Ionicons name="arrow-back" size={20} color="#555" />
        </TouchableOpacity>
        <Text style={styles.title}>Favorit Saya</Text>
        <Text style={styles.count}>{dataBookmark.length} item</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {dataBookmark.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔖</Text>
            <Text style={styles.emptyTitle}>Belum ada favorit</Text>
            <Text style={styles.emptySub}>
              Tekan ikon bookmark di produk untuk menyimpannya di sini
            </Text>
          </View>
        ) : (
          dataBookmark.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.imgWrap}>
                <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" transition={300} />
                <View style={styles.overlay}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.kategori}</Text>
                  </View>
                  <TouchableOpacity style={styles.bookmarkBtn} onPress={() => onToggleBookmark(item)}>
                    <Ionicons name="bookmark" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.body}>
                <Text style={styles.nama} numberOfLines={1}>{item.nama}</Text>
                <View style={styles.footer}>
                  <Text style={styles.harga}>{item.harga}</Text>
                  <TouchableOpacity style={styles.sewaBtn}>
                    <Text style={styles.sewaText}>Sewa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F6F2" },
  header: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: "#eee" },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F7F6F2", borderWidth: 0.5, borderColor: "#eee", alignItems: "center", justifyContent: "center" },
  title: { flex: 1, fontSize: 18, fontFamily: "Poppins-Bold", color: colors.black() },
  count: { fontSize: 12, fontFamily: "Poppins-Regular", color: "#aaa" },
  content: { padding: 14 },
  empty: { alignItems: "center", paddingTop: 80, gap: 10, paddingHorizontal: 30 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontSize: 15, fontFamily: "Poppins-Bold", color: "#bbb" },
  emptySub: { fontSize: 12, fontFamily: "Poppins-Regular", color: "#ccc", textAlign: "center", lineHeight: 18 },
  card: { backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", marginBottom: 14, borderWidth: 0.5, borderColor: "#eee" },
  imgWrap: { width: "100%", height: 140, position: "relative" },
  image: { width: "100%", height: "100%" },
  overlay: { position: "absolute", inset: 0, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", padding: 10 },
  categoryBadge: { backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  categoryText: { fontSize: 10, fontFamily: "Poppins-SemiBold", color: colors.forestGreen() },
  bookmarkBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.forestGreen(), alignItems: "center", justifyContent: "center" },
  body: { padding: 12, gap: 8 },
  nama: { fontSize: 15, fontFamily: "Poppins-Bold", color: colors.earthBrown() },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  harga: { fontSize: 14, fontFamily: "Poppins-SemiBold", color: colors.forestGreen() },
  sewaBtn: { backgroundColor: "#F0FAF0", paddingHorizontal: 14, paddingVertical: 5, borderRadius: 8 },
  sewaText: { fontSize: 11, fontFamily: "Poppins-SemiBold", color: colors.forestGreen() },
});