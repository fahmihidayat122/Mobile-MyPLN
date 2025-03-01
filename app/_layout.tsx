import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6DD5FA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="daftar" />
      <Stack.Screen name="login" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="pemadaman" />
      <Stack.Screen name="gangguan" />
      <Stack.Screen name="laporan" />
      <Stack.Screen name="profil" />
      <Stack.Screen name="kontak" />
    </Stack>
  );
}
