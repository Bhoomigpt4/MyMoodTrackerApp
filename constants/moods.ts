export const MOODS = [
  { emoji: '😊', value: 'happy', color: '#FFD700' },
  { emoji: '😐', value: 'neutral', color: '#A9A9A9' },
  { emoji: '😢', value: 'sad', color: '#1E90FF' },
  { emoji: '😡', value: 'angry', color: '#FF4500' },
  { emoji: '😴', value: 'tired', color: '#9370DB' },
] as const; // <-- Add 'as const' for type safety

export const MOOD_EMOJIS = {
  happy: '😊',
  neutral: '😐', // <-- Ensure this exists
  sad: '😢',
  angry: '😡',
  tired: '😴'
} as const;

export const MOOD_LABELS = {
  happy: 'Happy',
  neutral: 'Neutral', // <-- Ensure this exists
  sad: 'Sad',
  angry: 'Angry',
  tired: 'Tired'
} as const;

// Add type safety
export type Moodtype = keyof typeof MOOD_LABELS;