import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ContactScreen() {
    const navigation = useNavigation();
  const handlePress = (url: string) => {
    Linking.openURL(url); // Membuka URL pada aplikasi yang sesuai
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kontak Kami</Text>

      <View style={styles.contactContainer}>
        {/* WhatsApp */}
        <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('http://wa.me/‪6287714585771')}>
          <FontAwesome name="whatsapp" size={30} color="green" />
          <Text style={styles.contactText}>WhatsApp</Text>
        </TouchableOpacity>

        {/* Instagram */}
        <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('https://www.instagram.com/pln.areapamekasan?igsh=OHEzaGY0dnUzYXQy')}>
          <FontAwesome5 name="instagram" size={30} color="purple" />
          <Text style={styles.contactText}>Instagram</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('https://www.facebook.com/share/18nmwRmkaw/?mibextid=wwXIfr')}>
          <FontAwesome name="facebook" size={30} color="blue" />
          <Text style={styles.contactText}>Facebook</Text>
        </TouchableOpacity>

        {/* Twitter */}
        <TouchableOpacity style={styles.contactItem} onPress={() => handlePress('https://x.com/pln_123?s=21')}>
          <FontAwesome name="twitter" size={30} color="skyblue" />
          <Text style={styles.contactText}>Twitter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contactContainer: {
    width: '100%',
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  contactText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});
