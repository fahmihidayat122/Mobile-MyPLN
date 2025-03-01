import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfilScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={30} color="white" />
        <Text style={styles.headerText}>Person</Text>
      </View>

      {/* Profil Info */}
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <Text style={styles.input}>Person</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.input}>blabla@gmail.com</Text>

        <Text style={styles.label}>Password</Text>
        <Text style={styles.input}>**********</Text>

        <Text style={styles.label}>Nomor WhatsApp</Text>
        <Text style={styles.input}>083752135866</Text>
      </View>

      {/* Bottom Navigation Bar */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity>
          <FontAwesome name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="phone" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="user-circle" size={30} color="black" />
        </TouchableOpacity>
      </View> */}
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#6DD5FA',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
});
