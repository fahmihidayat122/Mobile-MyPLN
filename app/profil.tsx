import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userId = await AsyncStorage.getItem('user_id');

      if (!token || !userId) {
        Alert.alert('Error', 'Token atau user ID tidak ditemukan');
        return;
      }

      const response = await fetch(`http://192.168.1.7:8000/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      const json = await response.json();
      if (json.success) {
        setUserData(json.data);
      } else {
        Alert.alert('Gagal', json.message);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', 'Gagal mengambil data, coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_id');
    Alert.alert('Logout Berhasil', 'Anda telah keluar.');
    navigation.replace('login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={30} color="white" />
        <Text style={styles.headerText}>Profil</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : userData ? (
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput style={styles.input} value={userData.nama_lengkap} editable={false} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={userData.email} editable={false} />

          <Text style={styles.label}>Nomor HP</Text>
          <TextInput style={styles.input} value={userData.no_hp} editable={false} />
        </View>
      ) : (
        <Text style={styles.errorText}>Gagal mengambil data profil.</Text>
      )}

      {/* Tombol Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6DD5FA',
    width: '100%',
    padding: 15,
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileInfo: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e0f7fa',
  },
  logoutButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});
