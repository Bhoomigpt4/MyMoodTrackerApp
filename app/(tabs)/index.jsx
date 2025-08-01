// app/index.jsx
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOOD_EMOJIS, MOOD_LABELS, Moodtype } from '../../constants/moods';
import useMoodStore from '../../hooks/useMoodStore';

export default function HomeScreen() {
  const { moods, isLoading, error, resetStorage } = useMoodStore();
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];

  const todayMood = moods
    ?.filter(entry => entry?.date?.split('T')[0] === today)
    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const getMoodDisplay = (mood?: Moodtype) => {
    if (!mood) return { emoji: '❓', label: 'Unknown' };

    return {
      emoji: MOOD_EMOJIS[mood] || '❓',
      label: MOOD_LABELS[mood] || mood,
    };
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Do you want to exit?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a11cb" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={resetStorage}>
          <Text style={styles.resetText}>Reset Data</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { emoji, label } = getMoodDisplay(todayMood?.mood);

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        <View style={styles.moodContainer}>
          {todayMood ? (
            <>
              <Text style={styles.moodEmoji}>{emoji}</Text>
              <Text style={styles.moodLabel}>{label}</Text>
              {todayMood.note && (
                <Text style={styles.note}>"{todayMood.note}"</Text>
              )}
            </>
          ) : (
            <Text style={styles.noMoodText}>How are you feeling today?</Text>
          )}
        </View>

        <Link href="/log-mood" asChild>
          <TouchableOpacity style={styles.logButton}>
            <Text style={styles.buttonText}>
              {todayMood ? 'Update Mood' : "Log Today's Mood"}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFEBEE',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  resetText: {
    color: '#6a11cb',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 40,
  },
  moodContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  moodEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  moodLabel: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  note: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  noMoodText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  logButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#6a11cb',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
