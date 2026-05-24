import React, { useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Settings, Edit } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Image } from "expo-image";
import { ProfileData } from "../data/profiledata";
import { BlogList } from "../data/blogs";
import ItemSmall from "../components/itemSmall";
import { colors } from "../../assets/theme";
import { formatNumber } from "../utils/formatNumber";
import axios from "axios";

const data = BlogList.slice(5);

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDataBlog = async () => {
    try {
      const response = await axios.get(
        "https://6a12d93978d0434e0d5d8969.mockapi.io/blog",
      );
      setBlogData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDataBlog();
      setRefreshing(false);
    }, 1500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataBlog();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Settings color={colors.black()} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileHeader}>
          <Image
            style={profile.pic}
            source={{
              uri: ProfileData.profilePict,
              headers: { Authorization: "someAuthToken" },
            }}
            contentFit="cover"
            transition={200}
            priority="high"
          />

          <View style={{ gap: 5, alignItems: "center" }}>
            <Text style={profile.name}>{ProfileData.name}</Text>
            <Text style={profile.info}>
              Member since {ProfileData.createdAt}
            </Text>
          </View>

          <View style={profile.statsContainer}>
            <View style={profile.statItem}>
              <Text style={profile.sum}>{ProfileData.blogPosted}</Text>
              <Text style={profile.tag}>Posted</Text>
            </View>
            <View style={profile.statDivider} />
            <View style={profile.statItem}>
              <Text style={profile.sum}>
                {formatNumber(ProfileData.following)}
              </Text>
              <Text style={profile.tag}>Following</Text>
            </View>
            <View style={profile.statDivider} />
            <View style={profile.statItem}>
              <Text style={profile.sum}>
                {formatNumber(ProfileData.follower)}
              </Text>
              <Text style={profile.tag}>Follower</Text>
            </View>
          </View>

          <TouchableOpacity style={profile.buttonEdit}>
            <Text style={profile.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.blogList}>
          {loading ? (
            <ActivityIndicator size={"large"} color={colors.forestGreen()} />
          ) : (
            blogData.map((item, index) => (
              <ItemSmall item={item} key={index} />
            ))
          )}
        </View>
      </ScrollView>
      <Pressable
        style={({ pressed }) => [
          styles.floatingButton,
          {
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
        onPress={() => navigation.navigate("AddBlog")}
      >
        <Edit color={colors.white()} size={20} />
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F2",
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    marginTop: 16,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
  },
  profileHeader: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    gap: 16,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#eee",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  blogList: {
    paddingVertical: 10,
    gap: 10,
  },
  floatingButton: {
    backgroundColor: colors.forestGreen(),
    padding: 15,
    position: "absolute",
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.forestGreen(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

const profile = StyleSheet.create({
  pic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: colors.forestGreen(0.1),
  },
  name: {
    color: colors.black(),
    fontSize: 20,
    fontFamily: "Pjs-Bold",
    textTransform: "capitalize",
  },
  info: {
    fontSize: 12,
    fontFamily: "Pjs-Regular",
    color: colors.grey(),
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#f0f0f0",
    paddingVertical: 12,
    marginTop: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#eee",
    alignSelf: "center",
  },
  sum: {
    fontSize: 16,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
  },
  tag: {
    fontSize: 11,
    fontFamily: "Pjs-Regular",
    color: colors.grey(0.6),
    marginTop: 2,
  },
  buttonEdit: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.forestGreen(0.08),
    borderRadius: 25,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Pjs-SemiBold",
    color: colors.forestGreen(),
  },
});
