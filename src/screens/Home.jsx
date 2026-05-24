import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/theme";
import ListBlog from "../components/ListBlog";

export default function Home({
  dataBarang = [],
  onDelete,
  onAdd,
  bookmarks = [],
  onToggleBookmark,
  onOpenBookmark,
  navigation
}) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const kategoriList = [
    "Semua",
    "Tenda",
    "Tas & Carrier",
    "Peralatan Masak",
    "Penerangan",
    "Aksesoris",
  ];

  const filteredBarang =
    selectedCategory === "Semua"
      ? dataBarang
      : dataBarang.filter((item) => item.kategori === selectedCategory);

  const totalKategori = [...new Set(dataBarang.map((i) => i.kategori))].length;
  const handleToggleBookmark = (barang) => {
    // Cek apakah barang sudah ada di bookmark
    const isBookmarked = bookmarks.find((item) => item.id === barang.id);

    if (isBookmarked) {
      // Kalau sudah ada, hapus dari bookmark
      setBookmarks(bookmarks.filter((item) => item.id !== barang.id));
    } else {
      // Kalau belum ada, tambahkan ke bookmark
      setBookmarks([...bookmarks, barang]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              Camp<Text style={{ color: colors.forestGreen() }}>Rent</Text>
            </Text>
            <Text style={styles.subtitle}>
              Sewa peralatan camping terpercaya
            </Text>
          </View>
          
          {/* Kumpulan Tombol di Kanan Header */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            {/* TOMBOL BUKA BOOKMARK */}
            <TouchableOpacity style={styles.iconBtn} onPress={onOpenBookmark}>
              <Ionicons name="bookmark-outline" size={20} color="#555" />
              {/* Badge Jumlah Item yang Disimpan */}
              {bookmarks.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{bookmarks.length}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* TOMBOL NOTIFIKASI */}
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color="#555" />
            </TouchableOpacity>
          </View>
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerSub}>Promo minggu ini</Text>
            <Text style={styles.bannerTitle}>
              {"Sewa 3 hari\ngratis 1 hari"}
            </Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}onPress={() => navigation.navigate("Discover")}>Lihat promo</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 60 }}>⛺</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{dataBarang.length}</Text>
            <Text style={styles.statLabel}>Total Produk</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{totalKategori}</Text>
            <Text style={styles.statLabel}>Kategori</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>⭐ 4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* SECTION HEADER */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Daftar Produk</Text>
          <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
            <Ionicons name="add" size={14} color="#E8F5E9" />
            <Text style={styles.addBtnText}>Tambah</Text>
          </TouchableOpacity>
        </View>

        {/* KATEGORI CHIPS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
        >
          {kategoriList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.chip,
                selectedCategory === item && styles.chipAktif,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === item && styles.chipTextAktif,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LIST PRODUK */}
        <ListBlog
          data={filteredBarang}
          onDelete={onDelete}
          onToggleBookmark={onToggleBookmark} // 🔥 Tambahkan baris ini!
          bookmarks={bookmarks}
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F2",
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  logo: {
    fontSize: 22,
    fontFamily: "Pjs-ExtraBold",
    color: colors.earthBrown(),
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Pjs-Regular",
    marginTop: 2,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F7F6F2",
    borderWidth: 0.5,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  // BANNER
  banner: {
    margin: 16,
    backgroundColor: colors.forestGreen(),
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerSub: {
    fontSize: 11,
    color: "#9FC9A8",
    fontFamily: "Pjs-Regular",
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 18,
    fontFamily: "Pjs-Bold",
    color: "#E8F5E9",
    lineHeight: 26,
    marginBottom: 12,
  },
  bannerBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  bannerBtnText: {
    fontSize: 11,
    fontFamily: "Pjs-Bold",
    color: colors.forestGreen(),
  },

  // STATS
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#eee",
    alignItems: "center",
  },
  statNum: {
    fontSize: 18,
    fontFamily: "Pjs-Bold",
    color: colors.forestGreen(),
  },
  statLabel: {
    fontSize: 10,
    color: "#999",
    fontFamily: "Pjs-Regular",
    marginTop: 2,
    textAlign: "center",
  },

  // SECTION
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.forestGreen(),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addBtnText: {
    fontSize: 11,
    fontFamily: "Pjs-Bold",
    color: "#E8F5E9",
  },

  // CHIPS
  chipsContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#F7F6F2",
  },
  chipAktif: {
    backgroundColor: colors.forestGreen(),
    borderColor: colors.forestGreen(),
  },
  chipText: {
    fontSize: 12,
    fontFamily: "Pjs-SemiBold",
    color: "#888",
  },
  chipTextAktif: {
    color: "#D4EDDA",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.forestGreen(),
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 9,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
});
