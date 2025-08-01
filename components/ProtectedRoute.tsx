// components/ProtectedRoute.tsx
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthProvider';
import { ActivityIndicator, View } from 'react-native';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6a11cb" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}