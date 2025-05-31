import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.7:8000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Response dari server:', data); // Debugging

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal! Periksa email dan password.');
      }

      if (data.token && data.user) {
        await AsyncStorage.setItem('auth_token', data.token);
        await AsyncStorage.setItem('user_id', data.user.id.toString()); // Simpan user ID

        Alert.alert('Success', 'Login berhasil!');
        navigation.replace('dashboard'); // Redirect ke dashboard
      } else {
        throw new Error('Token atau user ID tidak ditemukan dalam respons!');
      }
    } catch (error) {
      console.error('Error saat login:', error); // Debugging
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/images/backgorund2.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Logo PLN */}
        <Image source={require('../assets/images/plnn.png')} style={styles.logo} resizeMode="contain" />

        {/* Input Email */}
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
          <TextInput
            placeholder="Enter your email address"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Input Password */}
        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="black" style={styles.icon} />
          <TextInput
            placeholder="Enter your password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('password')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Tombol Login */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'LOGIN'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 20,
  },
  logo: { width: 120, height: 120, marginBottom: 20 },
  label: { alignSelf: 'flex-start', fontSize: 14, fontWeight: 'bold', marginTop: 10, marginBottom: 5, color: '#fff' },
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
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#6DD5FA',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
