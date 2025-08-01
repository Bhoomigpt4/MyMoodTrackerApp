import { View, TouchableOpacity, Text } from 'react-native';

type Mood = {
  value: string;
  emoji: string;
};

type MoodSelectorProps = {
  moods: Mood[];
  onSelect: (value: string) => void;
};

export default function MoodSelector({ moods, onSelect }: MoodSelectorProps) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {moods.map((mood) => (
        <TouchableOpacity 
          key={mood.value}
          onPress={() => onSelect(mood.value)}
          style={{ padding: 10 }}
        >
          <Text style={{ fontSize: 30 }}>{mood.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}