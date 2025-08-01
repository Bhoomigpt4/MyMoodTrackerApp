import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MOODS } from '../constants/moods';
import MoodSelector from '../components/MoodSelector';
import useMoodStore from '../hooks/useMoodStore';

export default function LogMoodScreen() {
  const router = useRouter();
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const { moods, addMood } = useMoodStore();
  const [alreadyLogged, setAlreadyLogged] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const hasLogged = moods.some(m => m?.date?.split('T')[0] === today);
    setAlreadyLogged(hasLogged);
  }, [moods]);

  const handleSave = () => {
    if (!selectedMood) return;
    addMood(selectedMood, note);
    Alert.alert("Saved", "Your mood has been saved for today.");
    router.back();
  };

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {alreadyLogged ? (
          <Text style={styles.title}>
            You've already logged your mood today 🎉
          </Text>
        ) : (
          <>
            <Text style={styles.title}>How are you feeling today?</Text>

            <MoodSelector
              moods={MOODS}
              selectedMood={selectedMood}
              onSelect={setSelectedMood}
            />

            <TextInput
              style={styles.input}
              placeholder="Add a note (optional)"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={note}
              onChangeText={setNote}
              multiline
            />

            <TouchableOpacity
              style={[styles.button, !selectedMood && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={!selectedMood}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </>
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
    padding: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    minHeight: 100,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#6a11cb',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
