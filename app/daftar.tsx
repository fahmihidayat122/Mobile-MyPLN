import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Daftar() {
  const navigation = useNavigation();

  // State untuk inputan
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noHp, setNoHp] = useState('');
  const [loading, setLoading] = useState(false); // Untuk indikator loading

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Fungsi untuk menangani pendaftaran
  const handleRegister = async () => {
    if (!namaLengkap || !email || !password || !noHp) {
      Alert.alert('Error', 'Semua kolom harus diisi!');
      return;
    }

    setLoading(true); // Mulai loading

    try {
      const response = await fetch('http://192.168.84.1:8000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nama_lengkap: namaLengkap,
          email: email,
          password: password,
          no_hp: noHp,
        }),
      });

      const data = await response.json();
      console.log('Response API:', data); // Debugging respons API

      if (response.ok) {
        if (data.token) {
          await AsyncStorage.setItem('userToken', data.token);
          Alert.alert('Sukses', 'Registrasi berhasil!');
          navigation.navigate('login');
        } else {
          Alert.alert('Error', 'Registrasi berhasil, tetapi token tidak ditemukan.');
        }
      } else {
        Alert.alert('Error', data.message || 'Registrasi gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Terjadi kesalahan, coba lagi nanti.');
    }

    setLoading(false); // Selesai loading
  };



  return (
    <ImageBackground source={require('../assets/images/backgorund2.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Logo PLN */}
        <Image source={require('../assets/images/plnn.png')} style={styles.logo} resizeMode="contain" />

        {/* Input Nama */}
        <Text style={styles.label}>NAMA LENGKAP</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="black" style={styles.icon} />
          <TextInput placeholder="Enter your name" style={styles.input} value={namaLengkap} onChangeText={setNamaLengkap} />
        </View>

        {/* Input Email */}
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
          <TextInput placeholder="Enter your email address" style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />
        </View>

        {/* Input Password */}
        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="black" style={styles.icon} />
          <TextInput placeholder="Enter your password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
        </View>

        {/* Input Nomor Telepon/WhatsApp */}
        <Text style={styles.label}>NO. TLP/ WHATSAPP</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={20} color="black" style={styles.icon} />
          <TextInput placeholder="Enter your nomor" style={styles.input} keyboardType="phone-pad" value={noHp} onChangeText={setNoHp} />
        </View>

        {/* Tombol Daftar */}
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>DAFTAR</Text>}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 45,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6DD5FA',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
