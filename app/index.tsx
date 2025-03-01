import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function HomeScreen() {
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

        {/* Tombol Daftar */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('daftar')}>
          <Text style={styles.buttonText}>DAFTAR</Text>
        </TouchableOpacity>

        {/* Tombol Login */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Membuat gambar menyesuaikan layar
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Menambahkan overlay transparan
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6DD5FA',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
    elevation: 5, // Efek shadow untuk tampilan lebih bagus
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
