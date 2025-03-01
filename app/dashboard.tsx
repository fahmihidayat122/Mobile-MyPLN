import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function Dashboard() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url); // Membuka URL pada aplikasi yang sesuai
  };

  return (
    <ImageBackground source={require('../assets/images/backgorund2.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome name="user-circle" size={29} color="white" />
          <Text style={styles.greeting}>Hai person!</Text>
          <Image source={require('../assets/images/plnn.png')} style={styles.logo} />
        </View>

        {/* Welcome Box */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>WELCOME TO MY PLN</Text>
        </View>

        {/* Menu Icons */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('pemadaman')}>
            <FontAwesome5 name="lightbulb" size={30} color="white" />
            <Text style={styles.menuText}>INFORMASI PEMADAMAN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('gangguan')}>
            <FontAwesome5 name="broadcast-tower" size={30} color="white" />
            <Text style={styles.menuText}>INFORMASI GANGGUAN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('laporan')}>
            <FontAwesome5 name="file-alt" size={30} color="white" />
            <Text style={styles.menuText}>LAPORAN GANGGUAN</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Box with Weather Image and Link */}
        <View style={styles.notificationBox}>
          <Text style={styles.notificationText}>Berita Cuaca</Text>
          {/* Add Weather Logo */}
          {/* Add a clickable link */}
          <TouchableOpacity onPress={() => handleLinkPress('https://r.search.yahoo.com/_ylt=AwrKAy.wnMFnHgIAer_LQwx.;_ylu=Y29sbwNzZzMEcG9zAzIEdnRpZAMEc2VjA3Ny/RV=2/RE=1741951408/RO=10/RU=https%3a%2f%2fwww.bmkg.go.id%2f/RK=2/RS=VbnDh.Dir3AFs8oSuFRvzsVfwGk-')}>
            <Text style={styles.linkText}>Klik untuk informasi cuaca lebih lanjut</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.notificationBox}>
          <Text style={styles.notificationText}>Berita Terkini</Text>
          <TouchableOpacity onPress={() => handleLinkPress('https://r.search.yahoo.com/_ylt=Awr1UdYiUsBnJAIA6NbLQwx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1741866786/RO=10/RU=https%3a%2f%2fwww.detik.com%2f/RK=2/RS=Lm4CVmy80mmTtgpKpisyG.7WMTc-')}>
            <Text style={styles.linkText}>Klik untuk informasi lebih lanjut</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.notificationBox}>
          <Text style={styles.notificationText}>Website PLN</Text>
          <TouchableOpacity onPress={() => handleLinkPress('https://r.search.yahoo.com/_ylt=AwrKABclUMBnCgIAuN7LQwx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1741866278/RO=10/RU=https%3a%2f%2fweb.pln.co.id%2f/RK=2/RS=IzFhEKyZ67asvt51yNRTKrVuOjU-')}>
            <Text style={styles.linkText}>Klik untuk informasi lebih lanjut</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <FontAwesome name="home" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="phone" size={30} color="white" onPress={() => navigation.navigate('kontak')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('profil')}>
            <FontAwesome name="user-circle" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Gambar akan menutupi seluruh layar
    justifyContent: 'center', // Menjaga konten di tengah layar
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6DD5FA',
    width: '100%',
    padding: 15,
    paddingTop: 15,
  },
  greeting: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 25,
    height: 40,
  },
  welcomeBox: {
    backgroundColor: '#6DD5FA',
    width: '90%',
    padding: 35,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: '#6DD5FA',
    padding: 15,
    borderRadius: 15,
    width: '30%',
  },
  menuText: {
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
  },
  notificationBox: {
    backgroundColor: '#6DD5FA',
    width: '90%',
    padding: 25,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherLogo: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textDecorationLine: 'underline',
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
