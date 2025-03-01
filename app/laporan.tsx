import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'; // Untuk permissions

export default function LaporanScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null); // State untuk menyimpan gambar
  const [kunjungan, setKunjungan] = useState('sekarang'); // Pilihan kunjungan

  // Fungsi untuk memilih foto dari galeri
  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Cek jika hasilnya adalah sukses dan akses properti URI
    if (result.type === 'success') {
      const uri = result.uri;  // Ambil uri dari ImagePickerSuccessResult
      setImage(uri); // Menyimpan URI gambar
    }
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome5 name="file-alt" size={24} color="white" />
        <Text style={styles.headerText}>Laporan Gangguan</Text>
      </View>

      {/* Info Laporan */}
      <ScrollView style={styles.infoContainer}>
        <Text style={styles.infoText}>PT PLN (PERSERO) UP3 MADURA ULP PAMEKASAN</Text>

        {/* Form Input */}
        <Text style={styles.label}>No HandPhone</Text>
        <TextInput style={styles.input} placeholder="Masukkan Nomer" />

        <Text style={styles.label}>No ID</Text>
        <TextInput style={styles.input} placeholder="Masukkan ID" />

        <Text style={styles.label}>Lokasi gangguan</Text>
        <TextInput style={styles.input} placeholder="Masukkan Lokasi" />

        <Text style={styles.label}>Deskripsi Laporan</Text>
        <TextInput style={styles.input} placeholder="Deskripsi" />

        {/* Add Image */}
        <Text style={styles.label}>Tambah Foto (Opsional)</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Pilih Foto</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        {/* Kunjungan Petugas */}
        <Text style={styles.label}>Kunjungan Petugas</Text>
        <View style={styles.radioButtons}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setKunjungan('sekarang')}
          >
            <Text style={styles.radioButtonText}>Sekarang</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setKunjungan('nanti')}
          >
            <Text style={styles.radioButtonText}>Nanti</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Laporan Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>LAPORKAN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageButton: {
    backgroundColor: '#6DD5FA',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  radioButton: {
    backgroundColor: '#6DD5FA',
    padding: 10,
    borderRadius: 15,
    width: '40%',
    alignItems: 'center',
  },
  radioButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6DD5FA',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
