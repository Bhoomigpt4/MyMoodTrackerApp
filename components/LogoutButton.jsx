import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useAuth } from '.././context/AuthProvider';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { 
          text: 'Log Out', 
          onPress: logout,
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <TouchableOpacity 
      onPress={handleLogout}
      style={styles.button}
    >
      <Text style={styles.text}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});