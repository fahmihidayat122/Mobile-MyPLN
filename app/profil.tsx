import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // untuk memilih gambar

export default function ProfilScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [fullName, setFullName] = useState('Person');
  const [email, setEmail] = useState('blabla@gmail.com');
  const [whatsapp, setWhatsapp] = useState('083752135866');
  const [password, setPassword] = useState('**********');
  
  const navigation = useNavigation();

  const handleImagePick = async () => {
    // Meminta izin akses galeri
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } else {
      Alert.alert('Izin ditolak', 'Anda perlu memberikan izin untuk mengakses galeri.');
    }
  };

  const handleEditProfile = () => {
    // Fitur edit profil (bisa mengarah ke halaman edit yang lebih kompleks)
    Alert.alert('Edit Profil', 'Fitur ini akan mengarah ke halaman untuk mengedit profil.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={30} color="white" />
        <Text style={styles.headerText}>Person</Text>
      </View>

      {/* Foto Profil */}
      <TouchableOpacity onPress={handleImagePick} style={styles.profileImageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <FontAwesome name="camera" size={50} color="#6DD5FA" />
        )}
      </TouchableOpacity>

      {/* Info Profil */}
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Nomor WhatsApp</Text>
        <TextInput
          style={styles.input}
          value={whatsapp}
          onChangeText={setWhatsapp}
        />
      </View>

      {/* Tombol Edit Profil */}
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profil</Text>
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
  profileImageContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#e0f7fa',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  button: {
    backgroundColor: '#6DD5FA',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
