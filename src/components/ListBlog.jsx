import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/theme";
import { useNavigation } from "@react-navigation/native"; 
import * as Animatable from 'react-native-animatable';

export default function ListBlog({ data = [], onDelete, bookmarks = [], onToggleBookmark }) {
  const isBookmarked = (id) => bookmarks.some((b) => b.id === id);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite" 
          duration={2000}
          style={styles.emptyWrap}
        >
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.empty}>Belum ada produk</Text>
        </Animatable.View>
      ) : (
        data.map((item, index) => (
          <Animatable.View 
            key={item.id}
            animation="fadeInUp" 
            duration={600}      
            delay={index * 150}  
            useNativeDriver      
          >
          <TouchableOpacity 
            key={item.id} 
            style={styles.card}
            activeOpacity={0.9} // Efek redup sedikit saat ditekan
            onPress={() => navigation.navigate("BlogDetail", { item: item })} // Pindah ke layar detail
          >
            <View style={styles.imgWrap}>
              <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" transition={300} />
              <View style={styles.overlay}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.kategori}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  
                  {/* TOMBOL BOOKMARK */}
                  <TouchableOpacity
                    style={[styles.iconBtn, isBookmarked(item.id) && styles.iconBtnActive]}
                    onPress={() => onToggleBookmark(item)}
                  >
                    <Ionicons name={isBookmarked(item.id) ? "bookmark" : "bookmark-outline"} size={15} color="#fff" />
                  </TouchableOpacity>

                  {/* TOMBOL HAPUS */}
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
                    <Text style={styles.deleteText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <Text style={styles.nama} numberOfLines={1}>{item.nama}</Text>
              {item.deskripsi && <Text style={styles.desc} numberOfLines={1}>{item.deskripsi}</Text>}
              <View style={styles.footer}>
                <Text style={styles.harga}>{item.harga}</Text>
                <View style={styles.rentBtn}>
                  <Text style={styles.rentText}>Sewa</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          </Animatable.View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 4 },
  emptyWrap: { alignItems: "center", paddingTop: 50, gap: 8 },
  emptyIcon: { fontSize: 40 },
  empty: { textAlign: "center", color: "#bbb", fontFamily: "Poppins-Regular", fontSize: 13 },
  card: { backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", marginBottom: 14, borderWidth: 0.5, borderColor: "#eee" },
  imgWrap: { width: "100%", height: 150, position: "relative" },
  image: { width: "100%", height: "100%" },
  overlay: { position: "absolute", inset: 0, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", padding: 10 },
  categoryBadge: { backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  categoryText: { fontSize: 10, fontFamily: "Poppins-SemiBold", color: colors.forestGreen() },
  iconBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(0,0,0,0.3)", alignItems: "center", justifyContent: "center" },
  iconBtnActive: { backgroundColor: colors.forestGreen() },
  deleteBtn: { backgroundColor: "rgba(224,82,82,0.85)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  deleteText: { fontSize: 10, fontFamily: "Poppins-SemiBold", color: "#fff" },
  body: { padding: 12, gap: 6 },
  nama: { fontSize: 15, fontFamily: "Poppins-Bold", color: colors.earthBrown() },
  desc: { fontSize: 11, fontFamily: "Poppins-Regular", color: "#bbb" },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  harga: { fontSize: 14, fontFamily: "Poppins-SemiBold", color: colors.forestGreen() },
  rentBtn: { backgroundColor: "#F0FAF0", paddingHorizontal: 14, paddingVertical: 5, borderRadius: 8 },
  rentText: { fontSize: 11, fontFamily: "Poppins-SemiBold", color: colors.forestGreen() },
});