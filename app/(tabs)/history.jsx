import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useMoodStore from '../../hooks/useMoodStore';
import MoodEntryCard from '../../components/MoodEntryCard';

export default function HistoryScreen() {
  const { getMoodsByDate } = useMoodStore();
  const moodEntries = getMoodsByDate();

  return (
    <LinearGradient 
      colors={['#6a11cb', '#2575fc']} 
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Mood History</Text>
        
        {moodEntries.length === 0 ? (
          <Text style={styles.emptyText}>No entries yet</Text>
        ) : (
          <FlatList
            data={moodEntries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MoodEntryCard entry={item} />
            )}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  emptyText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40
  },
  list: {
    paddingBottom: 20
  }
});