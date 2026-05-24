import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../assets/theme";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const EditBlogForm = ({ route }) => {
  const { blogId } = route.params;
  const dataCategory = [
    { id: 1, name: "Tenda" },
    { id: 2, name: "Tas & Carrier" },
    { id: 3, name: "Peralatan Masak" },
    { id: 4, name: "Penerangan" },
    { id: 5, name: "Aksesoris" },
  ];
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image:"",
    category: {},
    totalLikes: 0,
    totalComments: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleChange = (key, value) => {
    setBlogData({
      ...blogData,
      [key]: value,
    });
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        await axios
        .get(`https://6a12d93978d0434e0d5d8969.mockapi.io/blog/${blogId}`)
        .then((response)=>{
            const data = response.data;
            if (data) {
                setBlogData({
                    title: data.title,
                    content: data.content,
                    image: data.image,
                    category: data.category,
                    totalLikes: data.totalLikes || 0,
                    totalComments: data.totalComments || 0,
                });
            }
        })
        .catch(function (error) {
          console.log(error);
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios
      .put(`https://6a12d93978d0434e0d5d8969.mockapi.io/blog/${blogId}`, {
        title: blogData.title,
        content: blogData.content,
        image: blogData.image,
        category: blogData.category,
        totalLikes: blogData.totalLikes,
        totalComments: blogData.totalComments,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      setLoading(false);
      navigation.navigate("BlogDetail", { blogId });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Edit blog</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={blogData.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Content"
            value={blogData.content}
            onChangeText={(text) => handleChange("content", text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={[textInput.content, { minHeight: 180 }]}
          />
        </View>
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Image URL"
            value={blogData.image}
            onChangeText={(text) => handleChange("image", text)}
            placeholderTextColor={colors.grey(0.6)}
            style={textInput.content}
            selectTextOnFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={textInput.categoryCard}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Pjs-Regular",
              color: colors.grey(0.6),
            }}
          >
            Category
          </Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === blogData.category.id
                  ? colors.forestGreen()
                  : colors.grey(0.08);
              const color =
                item.id === blogData.category.id
                  ? colors.white()
                  : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange("category", { id: item.id, name: item.name })
                  }
                  style={[category.item, { backgroundColor: bgColor }]}
                >
                  <Text style={[category.name, { color: color }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Update</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.forestGreen()} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditBlogForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F2",
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  title: {
    fontFamily: "Pjs-Bold",
    fontSize: 16,
    color: colors.black(),
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.forestGreen(),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: "Pjs-SemiBold",
    color: colors.white(),
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black(0.4),
    justifyContent: "center",
    alignItems: "center",
  },
});
const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 12,
    padding: 0,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  categoryCard: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  content: {
    fontSize: 13,
    fontFamily: "Pjs-Regular",
    color: colors.black(),
    paddingHorizontal: 14,
    paddingVertical: 12,
    textAlignVertical: "top",
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.6),
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: "Pjs-Medium",
  },
});
