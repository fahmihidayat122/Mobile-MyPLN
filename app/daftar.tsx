import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native'; 
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function Daftar() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ImageBackground source={require('../assets/images/backgorund2.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Logo PLN */}
        <Image 
          source={require('../assets/images/plnn.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />

        {/* Input Nama */}
        <Text style={styles.label}>NAMA LENGKAP</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="black" style={styles.icon} />
          <TextInput placeholder="Enter your name" style={styles.input} />
        </View>

        {/* Input Email */}
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
          <TextInput placeholder="Enter your email address" style={styles.input} keyboardType="email-address" />
        </View>

        {/* Input Password */}
        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="black" style={styles.icon} />
          <TextInput placeholder="Enter your password" style={styles.input} secureTextEntry />
        </View>

        {/* Input Nomor Telepon/WhatsApp */}
        <Text style={styles.label}>NO. TLP/ WHATSAPP</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={20} color="black" style={styles.icon} />
          <TextInput placeholder="Enter your nomor" style={styles.input} keyboardType="phone-pad" />
        </View>

        {/* Tombol Daftar */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('dashboard')}>
          <Text style={styles.buttonText}>DAFTAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Menjadikan gambar mengisi layar sepenuhnya
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Menambahkan overlay transparan di atas gambar
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
    color: '#fff', // Ubah warna teks menjadi putih agar kontras
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
