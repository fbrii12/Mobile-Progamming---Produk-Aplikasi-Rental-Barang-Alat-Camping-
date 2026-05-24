import { useState } from "react";
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, StyleSheet, Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/theme";
import ItemBookmark from "../components/ItemBookmark"; // sesuaikan path
import {useNavigation} from '@react-navigation/native';

const KATEGORI = ["Semua", "Tenda", "Tas & Carrier", "Masak", "Aksesoris"];

export default function Discover({ dataBarang = [], onDelete }) {
  const [search, setSearch] = useState("");
  const [aktif, setAktif] = useState("Semua");
const navigation = useNavigation();
  const filtered = dataBarang.filter((item) => {
    const cocokKategori = aktif === "Semua" || item.kategori === aktif;
    const cocokSearch = item.nama.toLowerCase().includes(search.toLowerCase());
    return cocokKategori && cocokSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Selamat datang 👋</Text>
            <Text style={styles.title}>Jelajahi Peralatan</Text>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="cart-outline" size={20} color="#555" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}
        <Pressable onPress={() => navigation.navigate("SearchPage")}>
          <View style={styles.searchBar} pointerEvents="none">
            <Ionicons name="search-outline" size={16} color="#aaa" />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari peralatan camping..."
              placeholderTextColor="#aaa"
              value={search}
              onChangeText={setSearch}
              editable={false}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={16} color="#aaa" />
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </View>

      {/* FILTER CHIPS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {KATEGORI.map((k) => (
          <TouchableOpacity
            key={k}
            style={[styles.chip, aktif === k && styles.chipAktif]}
            onPress={() => setAktif(k)}
          >
            <Text style={[styles.chipText, aktif === k && styles.chipTextAktif]}>
              {k}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* BANNER */}
        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerSub}>Promo weekend</Text>
            <Text style={styles.bannerTitle}>
              Gratis ongkir{"\n"}min. sewa 3 hari
            </Text>
          </View>
          <Text style={{ fontSize: 44 }}>⛺</Text>
        </View>

        {/* SECTION LABEL */}
        <Text style={styles.sectionLabel}>
          {filtered.length} produk tersedia
        </Text>

        {/* LIST BARANG — pakai komponen ItemBookmark yang sudah ada */}
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>Produk tidak ditemukan</Text>
          </View>
        ) : (
          filtered.map((item) => (
            <ItemBookmark
              key={item.id}
              item={item}
              onDelete={onDelete}
            />
          ))
        )}
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
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  greeting: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Pjs-Regular",
  },
  title: {
    fontSize: 20,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },
  iconRow: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: "#F7F6F2",
    borderWidth: 0.5,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  // SEARCH
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F7F6F2",
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Pjs-Regular",
    color: colors.black(),
  },

  // FILTER
  filterRow: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
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

  // CONTENT
  content: {
    padding: 16,
    paddingBottom: 32,
  },

  // BANNER
  banner: {
    backgroundColor: colors.forestGreen(),
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  bannerSub: {
    fontSize: 12,
    color: "#9FC9A8",
    fontFamily: "Pjs-Regular",
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 17,
    fontFamily: "Pjs-Bold",
    color: "#E8F5E9",
    lineHeight: 24,
  },

  // SECTION LABEL
  sectionLabel: {
    fontSize: 11,
    fontFamily: "Pjs-SemiBold",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  // EMPTY
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#ccc",
    fontFamily: "Pjs-Regular",
  },
});