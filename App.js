import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Bookmark from "./src/screens/Bookmark";
import Router from "./src/Navigation/Router"; 

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmark, setShowBookmark] = useState(false);
  
  // Data dummy dan fungsi tetap dipertahankan
  const [barang, setBarang] = useState([
    { id: 1, nama: "Tenda 4 Orang", kategori: "Tenda", harga: "Rp50.000/hari", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600" },
    { id: 2, nama: "Carrier 60L", kategori: "Tas & Carrier", harga: "Rp40.000/hari", image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600" },
    { id: 3, nama: "Peralatan Masak camping", kategori: "Peralatan Masak", harga: "Rp40.000/hari", image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=600" },
    { id: 4, nama: "Lampu/Lentera camping", kategori: "Penerangan & Aksesoris", harga: "Rp40.000/hari", image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=600" },
  ]);

  const tambahProduk = () => {
    const produkBaru = { id: Date.now(), nama: "Produk Baru", kategori: "Aksesoris", harga: "Rp20.000/hari", image: "https://picsum.photos/300" };
    setBarang([...barang, produkBaru]);
  };

  const hapusProduk = (id) => {
    setBarang(barang.filter((item) => item.id !== id));
  };

  const toggleBookmark = (itemBarang) => {
    const isBookmarked = bookmarks.some((item) => item.id === itemBarang.id);
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((item) => item.id !== itemBarang.id));
    } else {
      setBookmarks([...bookmarks, itemBarang]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 1. KONTENER NAVIGASI UTAMA */}
      <NavigationContainer>
        <Router
          barang={barang}
          hapusProduk={hapusProduk}
          tambahProduk={tambahProduk}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
          setShowBookmark={setShowBookmark}
        />
      </NavigationContainer>

      {/* 2. OVERLAY BOOKMARK (Tampil di atas navigasi utama jika dipanggil) */}
      {showBookmark && (
        <View style={styles.bookmarkOverlay}>
          <Bookmark
            dataBookmark={bookmarks}
            onToggleBookmark={toggleBookmark}
            onClose={() => setShowBookmark(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bookmarkOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 999, // Memastikan halaman favorit menutupi seluruh layar termasuk tab bar bawah
  }
});