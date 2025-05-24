import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function LaporanGangguanScreen() {
  const [noHp, setNoHp] = useState("");
  const [noId, setNoId] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async () => {
    if (!noHp || !noId || !lokasi || !deskripsi) {
      Alert.alert("Error", "Semua field harus diisi");
      return;
    }

    const requestBody = {
      no_hp: noHp,
      no_id: noId,
      lokasi_gangguan: lokasi,
      deskripsi_laporan: deskripsi,
    };

    try {
      let response = await fetch("http://192.168.96.1:8000/api/user/laporan-gangguan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      let json = await response.json();
      if (json.status === "success") {
        Alert.alert("Sukses", "Laporan berhasil dikirim!");
        setNoHp("");
        setNoId("");
        setLokasi("");
        setDeskripsi("");
      } else {
        Alert.alert("Gagal", "Terjadi kesalahan, coba lagi");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal mengirim laporan");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laporan Gangguan</Text>
      <TextInput
        style={styles.input}
        placeholder="Nomor HP"
        keyboardType="phone-pad"
        value={noHp}
        onChangeText={setNoHp}
      />
      <TextInput
        style={styles.input}
        placeholder="Nomor ID"
        value={noId}
        onChangeText={setNoId}
      />
      <TextInput
        style={styles.input}
        placeholder="Lokasi Gangguan"
        value={lokasi}
        onChangeText={setLokasi}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Deskripsi Laporan"
        multiline
        numberOfLines={4}
        value={deskripsi}
        onChangeText={setDeskripsi}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>LAPORKAN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
