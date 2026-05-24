import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ReceiptText } from "lucide-react-native";
import { Image } from "expo-image";
import { colors } from "../../assets/theme";

const truncateTextByWords = (text, maxWords) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " ...";
  }
  return text;
};

const ItemBookmark = ({ item, onDelete }) => {
  return (
    <TouchableOpacity
      style={styles.cardItem}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image
          style={styles.cardImage}
          source={{ uri: item?.image }}
          contentFit="cover"
          transition={200}
        />

        {/* Overlay */}
        <View style={[StyleSheet.absoluteFillObject, styles.cardContent]}>
          
          {/* KATEGORI */}
          <View style={styles.cardCategory}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryLabel}>
                {item?.kategori}
              </Text>
            </View>
          </View>

          {/* TOMBOL HAPUS */}
          <View style={styles.cardIcon}>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
              <ReceiptText color={colors.white()} size={20} />
            </TouchableOpacity>
          </View>

        </View>
      </View>

      {/* TEXT */}
      <View style={styles.textContainer}>
        <View style={{ gap: 8 }}>
          <Text style={styles.title}>
            {item?.nama}
          </Text>

          {/* OPTIONAL DESKRIPSI */}
          {item?.deskripsi && (
            <Text style={styles.desc}>
              {truncateTextByWords(item?.deskripsi, 10)}
            </Text>
          )}
        </View>

        {/* HARGA */}
        <View style={styles.cardInfo}>
          <Text style={styles.price}>
            {item?.harga}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemBookmark;

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: colors.black(0.03),
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },

  imageWrapper: {
    width: "100%",
    height: 150,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },

  cardCategory: {
    justifyContent: "flex-end",
    flex: 1,
  },

  categoryBadge: {
    backgroundColor: colors.white(),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },

  categoryLabel: {
    fontSize: 10,
    fontFamily: "Pjs-SemiBold",
    color: colors.forestGreen(),
  },

  cardIcon: {
    backgroundColor: colors.forestGreen(0.7),
    padding: 6,
    borderRadius: 8,
  },

  textContainer: {
    padding: 15,
    gap: 10,
  },

  title: {
    fontSize: 16,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },

  desc: {
    fontSize: 12,
    color: colors.grey(),
    fontFamily: "Pjs-Regular",
  },

  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  price: {
    fontSize: 14,
    fontFamily: "Pjs-SemiBold",
    color: colors.earthBrown(),
  },
});