import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PemadamanScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome5 name="lightbulb" size={24} color="white" />
        <Text style={styles.headerText}>Informasi Pemadaman</Text>
      </View>

      {/* Info Pemadaman */}
      <ScrollView style={styles.infoContainer}>
        <Text style={styles.infoText}>PT PLN (PERSERO) UP3 MADURA ULP PAMEKASAN</Text>

        {/* Form Input */}
        <Text style={styles.label}>Hari/ Tanggal</Text>
        <TextInput style={styles.input} placeholder="Enter date" />

        <Text style={styles.label}>Waktu</Text>
        <TextInput style={styles.input} placeholder="Enter time" />

        <Text style={styles.label}>Wilayah Pemeliharaan</Text>
        <TextInput style={styles.tabel} placeholder="Enter area" />

        <Text style={styles.label}>Pekerjaan</Text>
        <TextInput style={styles.tabel} placeholder="Enter work description" />
      </ScrollView>

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
  tabel: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'left',
    height: 100,
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
