import React, { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/theme";

export default function Profile() {
  const [name, setName] = useState("Febri");
  const [isEditing, setIsEditing] = useState(false);

  const menuItems = [
    { icon: "person-outline", label: "Edit Profile" },
    { icon: "settings-outline", label: "Pengaturan" },
    { icon: "help-circle-outline", label: "Bantuan" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER HIJAU */}
        <View style={styles.headerBg}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <TouchableOpacity style={styles.camBtn}>
              <Ionicons name="camera" size={13} color={colors.forestGreen()} />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.nameInput}
              autoFocus
            />
          ) : (
            <Text style={styles.name}>{name}</Text>
          )}
          <Text style={styles.email}>febri@email.com</Text>
        </View>

        {/* CARD PUTIH */}
        <View style={styles.card}>

          {/* STATS */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>2</Text>
              <Text style={styles.statLabel}>Produk</Text>
            </View>
            <View style={[styles.stat, styles.statBorder]}>
              <Text style={styles.statNum}>5</Text>
              <Text style={styles.statLabel}>Disewa</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>⭐ 4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* MENU ITEMS */}
          {menuItems.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={18} color={colors.forestGreen()} />
              </View>
              <Text style={styles.menuText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          ))}

          {/* LOGOUT */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, styles.menuIconDanger]}>
              <Ionicons name="log-out-outline" size={18} color="#E05252" />
            </View>
            <Text style={[styles.menuText, { color: "#E05252" }]}>Logout</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* TOMBOL EDIT */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Ionicons
            name={isEditing ? "checkmark" : "create-outline"}
            size={16}
            color="#fff"
          />
          <Text style={styles.editBtnText}>
            {isEditing ? "Simpan" : "Edit Profile"}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F2",
  },
  headerBg: {
    backgroundColor: colors.forestGreen(),
    paddingTop: 36,
    paddingBottom: 52,
    alignItems: "center",
    gap: 6,
  },
  avatarWrap: {
    position: "relative",
    marginBottom: 4,
  },
  avatar: {
    width: 90, height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.35)",
  },
  camBtn: {
    position: "absolute",
    bottom: 0, right: 0,
    width: 26, height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  nameInput: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.5)",
    paddingVertical: 2,
    paddingHorizontal: 8,
    minWidth: 120,
    textAlign: "center",
  },
  email: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "rgba(255,255,255,0.7)",
  },

  // CARD
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: -28,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#eee",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statBorder: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#eee",
  },
  statNum: {
    fontSize: 17,
    fontFamily: "Poppins-Bold",
    color: colors.forestGreen(),
  },
  statLabel: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#aaa",
    marginTop: 2,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#eee",
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f5f5f5",
  },
  menuIcon: {
    width: 36, height: 36,
    borderRadius: 10,
    backgroundColor: "#F0FAF0",
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconDanger: {
    backgroundColor: "#FFF0F0",
  },
  menuText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: colors.earthBrown(),
  },

  // EDIT BTN
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.forestGreen(),
    marginHorizontal: 16,
    marginTop: 14,
    padding: 13,
    borderRadius: 12,
    elevation: 2,
  },
  editBtnText: {
    fontSize: 13,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
});