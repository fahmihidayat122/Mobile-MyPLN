import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, FlatList, ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

export default function GangguanScreen() {
  const [gangguan, setGangguan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGangguan();
  }, []);

  const fetchGangguan = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      const response = await fetch("http://192.168.114.212:8000/api/user/informasi-gangguan", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      const json = await response.json();
      console.log("Response API:", json);

      if (json.success) {
        setGangguan(json.data);
      } else {
        console.error("Gagal mengambil data gangguan:", json.message);
      }
    } catch (error) {
      console.error("Error fetching gangguan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome5 name="broadcast-tower" size={24} color="white" />
        <Text style={styles.headerText}>Informasi Gangguan</Text>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#0097e6" style={styles.loader} />
      ) : gangguan.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada informasi gangguan.</Text>
      ) : (
        <FlatList
          data={gangguan}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>PT PLN (PERSERO) UP3 MADURA</Text>
              <Text style={styles.cardSubtitle}>ULP PAMEKASAN</Text>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Hari/Tanggal</Text>
                <Text style={styles.input}>{item.hari_tanggal}</Text>

                <Text style={styles.label}>Waktu</Text>
                <Text style={styles.input}>{item.waktu}</Text>

                <Text style={styles.label}>Wilayah Pemeliharaan</Text>
                <Text style={styles.input}>{item.wilayah_pemeliharaan}</Text>

                <Text style={styles.label}>Informasi Gangguan</Text>
                <Text style={styles.input}>{item.informasi_gangguan}</Text>

                <Text style={styles.label}>Dampak Gangguan</Text>
                <Text style={styles.input}>{item.dampak_gangguan}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#00c4ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8,
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0097e6",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0097e6",
    textAlign: "center",
    marginBottom: 10,
  },
  cardContent: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  input: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
    fontSize: 14,
  },
});
