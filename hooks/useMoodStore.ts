import { useEffect, useState, useCallback } from 'react';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../Firebase';
import { useAuth } from '../context/AuthProvider';
import { MOOD_LABELS, Moodtype } from '../constants/moods';

interface MoodEntry {
  id: string;
  date: string;
  mood: Moodtype;
  note?: string;
}

export default function useMoodStore() {
  const { user } = useAuth();
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoods = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const q = query(collection(db, 'moods'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const fetched: MoodEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && Object.keys(MOOD_LABELS).includes(data.mood)) {
          fetched.push({
            id: doc.id,
            date: data.date.toDate().toISOString(), // Firestore Timestamp → ISO string
            mood: data.mood,
            note: data.note || '',
          });
        }
      });
      setMoods(fetched);
    } catch (err) {
      console.error(err);
      setError('Failed to load mood data');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadMoods();
  }, [loadMoods]);

  const addMood = async (mood: Moodtype, note?: string) => {
    if (!user) return;
    try {
      const newEntry = {
        userId: user.uid,
        date: Timestamp.fromDate(new Date()),
        mood,
        note,
      };
      const docRef = await addDoc(collection(db, 'moods'), newEntry);
      setMoods((prev) => [
        ...prev,
        {
          id: docRef.id,
          date: newEntry.date.toDate().toISOString(),
          mood,
          note,
        },
      ]);
    } catch (err) {
      console.error(err);
      setError('Failed to save mood');
    }
  };

  const getMoodsByDate = () => {
    return [...moods].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const getMoodCounts = () => {
    return moods.reduce((counts, { mood }) => {
      counts[mood] = (counts[mood] || 0) + 1;
      return counts;
    }, {} as Record<Moodtype, number>);
  };

  return {
    moods,
    addMood,
    getMoodsByDate,
    getMoodCounts,
    isLoading,
    error,
    resetStorage: async () => {
      console.warn('Reset not implemented for Firestore yet');
    },
  };
}
