import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function TabLayout() {
  return (
    <ProtectedRoute>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#6a11cb',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        }
      }}>
        <Tabs.Screen 
          name="index" 
          options={{
            title: 'Today',
            tabBarIcon: ({ color }) => (
              <Ionicons name="today" size={24} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="history" 
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => (
              <Ionicons name="time" size={24} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="stats" 
          options={{
            title: 'Stats',
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart" size={24} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="profile" 
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }} 
        />
      </Tabs>
    </ProtectedRoute>
  );
}
