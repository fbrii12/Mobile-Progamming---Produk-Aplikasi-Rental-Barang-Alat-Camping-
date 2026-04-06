import { ScrollView, View, StyleSheet, Text,ImageBackground,Image,} from "react-native";
import { colors } from "../../assets/theme";
import { ReceiptText, Clock, MessageCircle,Bookmark } from "lucide-react-native";

export default function ListBlog({ styles }) {
  return (
    <ScrollView>
      <View style={styles.ListBlog}>

        {/* HORIZONTAL (Highlight Barang) */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 15 }}
        >
          <View style={{ ...itemHorizontal.cardItem, marginLeft: 24 }}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
              }}
            >
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                    Tenda 4 Orang
                  </Text>
                  <Text style={itemHorizontal.cardText}>
                    Rp 50.000 / hari
                  </Text>
                </View>
                <View style={itemHorizontal.cardIcon}>
                  <Bookmark color={colors.white()} size={20} />
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={itemHorizontal.cardItem}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: "https://images.unsplash.com/photo-1522163182402-834f871fd851",
              }}
            >
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                    Sleeping Bag
                  </Text>
                  <Text style={itemHorizontal.cardText}>
                    Rp 20.000 / hari
                  </Text>
                </View>
                <View style={itemHorizontal.cardIcon}>
                  <Bookmark color={colors.white()} size={20} />
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={itemHorizontal.cardItem}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab",
              }}
            >
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                    Kompor Portable
                  </Text>
                  <Text style={itemHorizontal.cardText}>
                    Rp 25.000 / hari
                  </Text>
                </View>
                <View style={itemHorizontal.cardIcon}>
                  <Bookmark color={colors.white()} size={20} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>

        {/* VERTICAL (List Barang) */}
        <View style={itemVertical.listCard}>

          {/* ITEM 1 */}
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
              }}
            />
            <View style={itemVertical.cardContent}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: 5, width: "70%" }}>
                  <Text style={itemVertical.cardCategory}>Tenda</Text>
                  <Text style={itemVertical.cardTitle}>
                    Tenda Dome 2 Orang
                  </Text>
                </View>
                <ReceiptText color={colors.grey(0.6)} size={20} />
              </View>
              <View style={itemVertical.cardInfo}>
                <Text style={itemVertical.cardText}>
                  Rp 40.000 / hari
                </Text>
              </View>
            </View>
          </View>

          {/* ITEM 2 */}
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
              }}
            />
            <View style={itemVertical.cardContent}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: 5, width: "70%" }}>
                  <Text style={itemVertical.cardCategory}>Tas</Text>
                  <Text style={itemVertical.cardTitle}>
                    Carrier 60L
                  </Text>
                </View>
                <ReceiptText color={colors.grey(0.6)} size={20} />
              </View>
              <View style={itemVertical.cardInfo}>
                <Text style={itemVertical.cardText}>
                  Rp 40.000 / hari
                </Text>
              </View>
            </View>
          </View>

          {/* ITEM 3 */}
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
              }}
            />
            <View style={itemVertical.cardContent}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: 5, width: "70%" }}>
                  <Text style={itemVertical.cardCategory}>Penerangan</Text>
                  <Text style={itemVertical.cardTitle}>
                    Headlamp Outdoor
                  </Text>
                </View>
                <ReceiptText color={colors.grey(0.6)} size={20} />
              </View>
              <View style={itemVertical.cardInfo}>
                <Text style={itemVertical.cardText}>
                  Rp 10.000 / hari
                </Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

const itemVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },

  cardItem: {
    backgroundColor: colors.white(),
    flexDirection: "row",
    borderRadius: 12,
    shadowColor: colors.earthBrown(0.3),
    elevation: 3,
  },

  cardCategory: {
    color: colors.forestGreen(),
    fontSize: 10,
    fontFamily: "Pjs-SemiBold",
  },

  cardTitle: {
    fontSize: 14,
    fontFamily: "Pjs-Bold",
    color: colors.earthBrown(),
  },

  cardText: {
    fontSize: 11,
    fontFamily: "Pjs-Medium",
    color: colors.olive(),
  },

  cardImage: {
    width: 94,
    height: 94,
    borderRadius: 12,
    resizeMode: "cover",
  },

  cardInfo: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  cardContent: {
    gap: 10,
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});

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
    backgroundColor: "rgba(0,0,0,0.2)", // overlay biar teks kebaca
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