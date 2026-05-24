import { ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { colors, fontType } from './assets/theme';
import ListBlog from './src/components/ListBlog';
import { useFonts } from 'expo-font';
import { useState } from 'react';

export default function App() {
  const [loaded] = useFonts(fontType);

  const [barang, setBarang] = useState([
    {
      id: 1,
      nama: "Tenda 4 Orang",
      kategori: "Tenda",
      harga: "Rp50.000/hari",
      image: "https://images.unsplash.com/photo-1504280390368-397e1d58e4f0?w=800",
    },
    {
      id: 2,
      nama: "Carrier 60L",
      kategori: "Tas & Carrier",
      harga: "Rp40.000/hari",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    },
    {
      id: 3,
      nama: "Kompor Portable",
      kategori: "Peralatan Masak",
      harga: "Rp25.000/hari",
      image: "https://images.unsplash.com/photo-1505575967455-40e256f73376?w=800",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // ✅ TAMBAH PRODUK
  const tambahProduk = () => {
    const produkBaru = {
      id: Date.now(),
      nama: "Produk Baru",
      kategori: "Aksesoris",
      harga: "Rp20.000/hari",
      image: "https://picsum.photos/300",
    };

    setBarang([...barang, produkBaru]);
  };

  // ✅ HAPUS PRODUK
  const hapusProduk = (id) => {
    const dataBaru = barang.filter((item) => item.id !== id);
    setBarang(dataBaru);
  };

  const filteredBarang =
    selectedCategory === "Semua"
      ? barang
      : barang.filter(item => item.kategori === selectedCategory);

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.sand()} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>CampRent</Text>
        <Bell color={colors.forestGreen()} size={24} />
      </View>

      {/* Kategori */}
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Semua","Tenda","Tas & Carrier","Peralatan Masak","Penerangan","Aksesoris","Paket Camping"]
          .map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(item)}
              style={{
                ...category.item,
                marginLeft: index === 0 ? 24 : 5,
                marginRight: index === 6 ? 24 : 5,
                backgroundColor:
                  selectedCategory === item
                    ? colors.forestGreen()
                    : colors.olive(0.15)
              }}
            >
              <Text
                style={{
                  ...category.title,
                  color:
                    selectedCategory === item
                      ? colors.white()
                      : colors.forestGreen()
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 🔥 TOMBOL TAMBAH */}
      <TouchableOpacity
        onPress={tambahProduk}
        style={{
          marginHorizontal: 24,
          marginVertical: 10,
          backgroundColor: colors.forestGreen(),
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.white(), fontFamily: "Pjs-Bold" }}>
          + Tambah Produk
        </Text>
      </TouchableOpacity>

      {/* List */}
      <ListBlog 
        styles={styles} 
        data={filteredBarang} 
        onDelete={hapusProduk}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand(),
  },

  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: colors.sand(),
  },

  title: {
    fontSize: 20,
    fontFamily: 'Pjs-ExtraBold',
    color: colors.earthBrown(),
  },

  listCategory: {
    paddingVertical: 10,
  },

  listBlog: {
    paddingVertical: 10,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  title: {
    fontFamily: 'Pjs-SemiBold',
    fontSize: 14,
  },
});