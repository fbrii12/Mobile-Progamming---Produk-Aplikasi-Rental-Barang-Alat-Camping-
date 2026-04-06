import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { colors, fontType } from './assets/theme';
import ListBlog from './src/components/ListBlog';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts(fontType);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.sand()} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>CampRent</Text>
        <Bell color={colors.forestGreen()} size={24} />
      </View>

      {/* Kategori Alat Camping */}
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          
          <View style={{ ...category.item, marginLeft: 24 }}>
            <Text style={{ ...category.title, color: colors.forestGreen() }}>
              Semua
            </Text>
          </View>

          <View style={category.item}>
            <Text style={category.title}>Tenda</Text>
          </View>

          <View style={category.item}>
            <Text style={category.title}>Tas & Carrier</Text>
          </View>

          <View style={category.item}>
            <Text style={category.title}>Peralatan Masak</Text>
          </View>

          <View style={category.item}>
            <Text style={category.title}>Penerangan</Text>
          </View>

          <View style={category.item}>
            <Text style={category.title}>Aksesoris</Text>
          </View>

          <View style={{ ...category.item, marginRight: 24 }}>
            <Text style={category.title}>Paket Camping</Text>
          </View>

        </ScrollView>
      </View>

      {/* List Blog */}
      <ListBlog styles={styles} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sand(), // background alam (pasir)
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
    color: colors.earthBrown(), // warna tanah
  },

  listCategory: {
    paddingVertical: 10,
  },

  listBarang: {
    paddingVertical: 10,
    gap: 10,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.olive(0.15), // hijau soft
    marginHorizontal: 5,
  },

  title: {
    fontFamily: 'Pjs-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: colors.forestGreen(), // hijau utama
  },
});