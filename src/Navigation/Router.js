import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/theme";
import Home from "../screens/Home";
import Discover from "../screens/Discover";
import Profile from "../screens/Profile";
import BlogDetail from "../screens/BlogDetail"; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. KOMPONEN BOTTOM TABS
function MainTabs({ barang, hapusProduk, tambahProduk, bookmarks, toggleBookmark, setShowBookmark }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Discover") iconName = focused ? "compass" : "compass-outline";
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: colors.forestGreen(),
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#eee",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontFamily: "Poppins-SemiBold" },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <Home {...props} dataBarang={barang} onDelete={hapusProduk} onAdd={tambahProduk} bookmarks={bookmarks} onToggleBookmark={toggleBookmark} onOpenBookmark={() => setShowBookmark(true)} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Discover">
        {(props) => (
          <Discover {...props} dataBarang={barang} onDelete={hapusProduk} bookmarks={bookmarks} onToggleBookmark={toggleBookmark} onOpenBookmark={() => setShowBookmark(true)} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// 2. STACK UTAMA (Bungkus Tabs dan layani Halaman Detail)
export default function Router(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Layar utama yang isinya Tab Bar bawah */}
      <Stack.Screen name="MainTabs">
        {(navProps) => <MainTabs {...navProps} {...props} />}
      </Stack.Screen>
      
      {/* Layar Detail Produk */}
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
    </Stack.Navigator>
  );
}