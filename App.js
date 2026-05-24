import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "./assets/theme";
import { Ionicons } from "@expo/vector-icons";

import Home from "./src/screens/Home";
import Discover from "./src/screens/Discover";
import Profile from "./src/screens/Profile";
import Bookmark from "./src/screens/Bookmark";

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmark, setShowBookmark] = useState(false);
  const [screen, setScreen] = useState("home");
  
  const [barang, setBarang] = useState([
    {
      id: 1,
      nama: "Tenda 4 Orang",
      kategori: "Tenda",
      harga: "Rp50.000/hari",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600",
    },
    {
      id: 2,
      nama: "Carrier 60L",
      kategori: "Tas & Carrier",
      harga: "Rp40.000/hari",
      image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600",
    },
    {
      id: 3,
      nama: "Peralatan Masak camping",
      kategori: "Peralatan Masak",
      harga: "Rp40.000/hari",
      image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=600",
    },
    {
      id: 4,
      nama: "Lampu/Lentera camping",
      kategori: "Penerangan & Aksesoris",
      harga: "Rp40.000/hari",
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=600",
    },
  ]);

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

  const hapusProduk = (id) => {
    setBarang(barang.filter((item) => item.id !== id));
  };

  // 🔥 Fungsi ini akan dipanggil dari ListBlog dan Bookmark
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
      {/* BOOKMARK SCREEN (Tampil menutupi layar jika showBookmark true) */}
      {showBookmark && (
        <Bookmark
          dataBookmark={bookmarks}
          onToggleBookmark={toggleBookmark}
          onClose={() => setShowBookmark(false)}
        />
      )}

      {/* RENDER SCREEN BERDASARKAN NAVIGASI */}
      {!showBookmark && screen === "home" && (
        <Home
          dataBarang={barang}
          onDelete={hapusProduk}
          onAdd={tambahProduk}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onOpenBookmark={() => setShowBookmark(true)}
        />
      )}

      {!showBookmark && screen === "discover" && (
        <Discover
          dataBarang={barang}
          onDelete={hapusProduk}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onOpenBookmark={() => setShowBookmark(true)}
        />
      )}

      {!showBookmark && screen === "profile" && <Profile />}

      {/* BOTTOM NAVIGATION */}
      {!showBookmark && <NavBar screen={screen} setScreen={setScreen} />}
    </View>
  );
}

// 🔥 KOMPONEN NAVBAR BAWAH
const NavBar = ({ screen, setScreen }) => {
  return (
    <View style={nav.container}>
      <TouchableOpacity onPress={() => setScreen("home")} style={nav.item}>
        <Ionicons name={screen === "home" ? "home" : "home-outline"} size={22} color={screen === "home" ? colors.forestGreen() : "#999"} />
        <Text style={{ ...nav.text, color: screen === "home" ? colors.forestGreen() : "#999" }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("discover")} style={nav.item}>
        <Ionicons name={screen === "discover" ? "compass" : "compass-outline"} size={22} color={screen === "discover" ? colors.forestGreen() : "#999"} />
        <Text style={{ ...nav.text, color: screen === "discover" ? colors.forestGreen() : "#999" }}>Discover</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("profile")} style={nav.item}>
        <Ionicons name={screen === "profile" ? "person" : "person-outline"} size={22} color={screen === "profile" ? colors.forestGreen() : "#999"} />
        <Text style={{ ...nav.text, color: screen === "profile" ? colors.forestGreen() : "#999" }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const nav = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: 10, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#eee" },
  item: { alignItems: "center" },
  text: { fontSize: 11, fontFamily: "Poppins-SemiBold", color: colors.forestGreen() }, // Pastikan pakai Poppins karena kamu panggil Poppins di tempat lain
});