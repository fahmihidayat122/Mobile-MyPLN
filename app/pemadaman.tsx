import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function PemadamanScreen({ }) {
  const [pemadaman, setPemadaman] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPemadaman();
  }, []);

  const fetchPemadaman = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      const response = await fetch("http://192.168.96.1:8000/api/user/informasi-pemadaman", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      const json = await response.json();
      console.log("Response API:", json);

      if (json.success) {
        setPemadaman(json.data);
      } else {
        console.error("Gagal mengambil data pemadaman:", json.message);
      }
    } catch (error) {
      console.error("Error fetching pemadaman:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="lightbulb-o" size={24} color="white" />
        <Text style={styles.headerText}>Informasi Pemadaman</Text>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#0097e6" style={styles.loader} />
      ) : pemadaman.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada informasi pemadaman.</Text>
      ) : (
        <FlatList
          data={pemadaman}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>PT PLN (PERSERO) UP3 MADURA</Text>
              <Text style={styles.cardSubtitle}>ULP PAMEKASAN</Text>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Hari/Tanggal</Text>
                <Text style={styles.input}>{item.hari_tanggal}</Text>

                <Text style={styles.label}>Waktu</Text>
                <Text style={styles.input}>{item.waktu_mulai} - {item.waktu_selesai}</Text>

                <Text style={styles.label}>Wilayah Pemeliharaan</Text>
                <Text style={styles.input}>{item.lokasi_pemeliharaan}</Text>

                <Text style={styles.label}>Pekerjaan</Text>
                <Text style={styles.input}>{item.pekerjaan}</Text>
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#00c4ff",
    paddingVertical: 10,
  },
  footerItem: {
    padding: 10,
  },
});
