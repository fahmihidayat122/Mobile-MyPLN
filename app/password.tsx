// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';

// export default function PasswordScreen() {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showNewPassword, setShowNewPassword] = useState(false);

//   const handleSubmit = async () => {
//     if (!email || !newPassword || !confirmPassword) {
//       Alert.alert('Error', 'Semua kolom harus diisi!');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Kata sandi tidak cocok!');
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.96.1:8000/api/user/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           password: newPassword,
//           password_confirmation: confirmPassword,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Sukses', data.message);
//         navigation.replace('login'); // Redirect ke halaman login setelah sukses
//       } else {
//         const errors = data.errors || {};
//         Alert.alert('Gagal', Object.values(errors).join('\n'));
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Terjadi kesalahan saat menghubungi server');
//     }
//   };


//   return (
//     <ImageBackground source={require('../assets/images/backgorund2.jpg')} style={styles.background}>
//       <View style={styles.container}>
//         {/* Logo PLN */}
//         <Image source={require('../assets/images/plnn.png')} style={styles.logo} resizeMode="contain" />

//         {/* EMAIL YANG TERDAFTAR */}
//         <Text style={styles.label}>EMAIL YANG TERDAFTAR</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder="Masukkan email terdaftar"
//             style={styles.input}
//             keyboardType="email-address"
//             placeholderTextColor="#666"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>

//         {/* KATA SANDI BARU */}
//         <Text style={styles.label}>KATA SANDI BARU</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder="Masukkan kata sandi baru"
//             style={styles.input}
//             secureTextEntry={!showNewPassword}
//             placeholderTextColor="#666"
//             value={newPassword}
//             onChangeText={setNewPassword}
//           />
//           <TouchableOpacity onPress={() => setShowNewPassword(prev => !prev)}>
//             <Ionicons name={showNewPassword ? 'eye-off' : 'eye'} size={24} color="#333" />
//           </TouchableOpacity>
//         </View>

//         {/* KONFIRMASI SANDI */}
//         <Text style={styles.label}>KONFIRMASI SANDI</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder="Ulangi kata sandi"
//             style={styles.input}
//             secureTextEntry
//             placeholderTextColor="#666"
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//         </View>

//         {/* Tombol */}
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>SELESAI</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     paddingHorizontal: 20,
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     marginBottom: 30,
//   },
//   label: {
//     alignSelf: 'flex-start',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 5,
//     color: '#fff',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#d3d3d3',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     width: '100%',
//     height: 45,
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#000',
//   },
//   button: {
//     backgroundColor: '#6DD5FA',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Masukkan email terlebih dahulu');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.7:8000/api/user/send-reset-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sukses', data.message);
      } else {
        Alert.alert('Gagal', data.message || 'Gagal mengirim OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Tidak dapat mengirim OTP ke email.');
    }
  };

  const handleSubmit = async () => {
    if (!email || !otp || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Semua kolom harus diisi!');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Kata sandi tidak cocok!');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.7:8000/api/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', data.message);
        navigation.replace('login');
      } else {
        const errors = data.errors || {};
        Alert.alert('Gagal', data.message || Object.values(errors).join('\n'));
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat menghubungi server');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/backgorund2.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../assets/images/plnn.png')} style={styles.logo} resizeMode="contain" />

        <Text style={styles.label}>EMAIL YANG TERDAFTAR</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Masukkan email terdaftar"
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity style={styles.buttonSmall} onPress={sendOtp}>
          <Text style={styles.buttonText}>KIRIM KODE OTP</Text>
        </TouchableOpacity>

        <Text style={styles.label}>KODE OTP</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Masukkan kode OTP"
            style={styles.input}
            keyboardType="number-pad"
            placeholderTextColor="#666"
            value={otp}
            onChangeText={setOtp}
          />
        </View>

        <Text style={styles.label}>KATA SANDI BARU</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Masukkan kata sandi baru"
            style={styles.input}
            secureTextEntry={!showNewPassword}
            placeholderTextColor="#666"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(prev => !prev)}>
            <Ionicons name={showNewPassword ? 'eye-off' : 'eye'} size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>KONFIRMASI SANDI</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ulangi kata sandi"
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SELESAI</Text>
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
    marginBottom: 30,
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
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#6DD5FA',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSmall: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

