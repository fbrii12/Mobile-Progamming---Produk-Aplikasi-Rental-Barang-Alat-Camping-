import { ScrollView, View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { colors } from "../../assets/theme";
import { ReceiptText, Bookmark } from "lucide-react-native";

export default function ListBlog({ styles, data, onDelete }) { // ✅ tambah onDelete
  return (
    <ScrollView>
      <View style={styles.listBlog}>

        {/* HORIZONTAL (Highlight Barang) */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 15 }}
        >
          {data.slice(0, 3).map((item, index) => (
            <View
              key={item.id}
              style={{ ...itemHorizontal.cardItem, marginLeft: index === 0 ? 24 : 0 }}
            >
              <ImageBackground
                style={itemHorizontal.cardImage}
                resizeMode="cover"
                imageStyle={{ borderRadius: 15 }}
                source={{ uri: item.image }}
              >
                <View style={itemHorizontal.cardContent}>
                  <View style={itemHorizontal.cardInfo}>
                    <Text style={itemHorizontal.cardTitle}>
                      {item.nama}
                    </Text>
                    <Text style={itemHorizontal.cardText}>
                      {item.harga}
                    </Text>
                  </View>
                  <View style={itemHorizontal.cardIcon}>
                    <Bookmark color={colors.white()} size={20} />
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>

        {/* VERTICAL (List Barang DINAMIS) */}
        <View style={itemVertical.listCard}>

          {data.map((item) => (
            <View key={item.id} style={itemVertical.cardItem}>
              <Image
                style={itemVertical.cardImage}
                source={{ uri: item.image }}
              />

              <View style={itemVertical.cardContent}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ gap: 5, width: "70%" }}>
                    <Text style={itemVertical.cardCategory}>
                      {item.kategori}
                    </Text>
                    <Text style={itemVertical.cardTitle}>
                      {item.nama}
                    </Text>
                  </View>

                  <ReceiptText color={colors.olive(0.6)} size={20} />
                </View>

                <View style={itemVertical.cardInfo}>
                  <Text style={itemVertical.cardText}>
                    {item.harga}
                  </Text>

                  {/* 🔥 TOMBOL HAPUS */}
                  <TouchableOpacity onPress={() => onDelete(item.id)}>
                    <Text style={{ color: "red", fontSize: 12 }}>
                      Hapus
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

        </View>
      </View>
    </ScrollView>
  );
}

const itemHorizontal = StyleSheet.create({
  cardItem: {
    width: 280,
  },

  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
  },

  cardInfo: {
    justifyContent: "flex-end",
    height: "100%",
    gap: 10,
    maxWidth: "60%",
  },

  cardTitle: {
    fontFamily: "Pjs-Bold",
    fontSize: 14,
    color: colors.white(),
  },

  cardText: {
    fontSize: 11,
    color: colors.sand(),
    fontFamily: "Pjs-Medium",
  },

  cardIcon: {
    backgroundColor: colors.forestGreen(0.7),
    padding: 6,
    borderRadius: 8,
  },
});

const itemVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },

  cardItem: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
  },

  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },

  cardCategory: {
    fontSize: 12,
    color: colors.grey(),
    fontFamily: "Pjs-Regular",
  },

  cardTitle: {
    fontFamily: "Pjs-Bold",
    fontSize: 14,
    color: colors.black(),
  },

  cardText: {
    fontSize: 12,
    color: colors.grey(),
    fontFamily: "Pjs-Regular",
  },

  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});