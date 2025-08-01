import React, { createContext, useContext } from 'react';
import { MOOD_LABELS } from '../constants/moods';

const quotes = {
  happy: "Happiness is contagious. Keep spreading it!",
  sad: "It's okay to feel down. This too shall pass.",
  angry: "Take a deep breath. You are in control.",
  excited: "Ride the energy and do something amazing!",
  neutral: "Stay balanced and mindful.",
};

const QuoteContext = createContext<string>("");

export const useQuote = () => useContext(QuoteContext);

export const QuoteProvider = ({ mood, children }: { mood: keyof typeof MOOD_LABELS, children: React.ReactNode }) => {
  const quote = quotes[mood] || "Your mood matters. Take care of yourself!";
  return <QuoteContext.Provider value={quote}>{children}</QuoteContext.Provider>;
};
