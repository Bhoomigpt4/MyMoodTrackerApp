import { View, Text, StyleSheet } from 'react-native';
import { MoodEntry } from '../constants/types';

interface Props {
  entry: MoodEntry;
}

export default function MoodEntryCard({ entry }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.mood}>{entry.mood}</Text>
        <Text style={styles.date}>
          {new Date(entry.date).toLocaleDateString()}
        </Text>
      </View>
      {entry.note && <Text style={styles.note}>{entry.note}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mood: { fontSize: 24 },
  date: { color: '#666' },
  note: { color: '#444', fontStyle: 'italic' },
});