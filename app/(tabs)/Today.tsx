// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import { useAuth } from '../context/AuthProvider';
// import { db } from '../Firebase';
// import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

// export default function TodayScreen() {
//   const { user } = useAuth();
//   const [todayEntries, setTodayEntries] = useState([]);

//   useEffect(() => {
//     const fetchTodayEntries = async () => {
//       if (!user?.uid) return;

//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       const todayTimestamp = Timestamp.fromDate(today);

//       const entriesRef = collection(db, 'moodEntries');
//       const q = query(entriesRef, where('userId', '==', user.uid), where('date', '>=', todayTimestamp));
//       const querySnapshot = await getDocs(q);

//       const entries = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setTodayEntries(entries);
//     };

//     fetchTodayEntries();
//   }, [user]);

//   return (
//     <View className="flex-1 bg-gradient-to-b from-[#6D28D9] to-[#3B82F6] p-4">
//       <ScrollView>
//         <Text className="text-white text-xl font-bold mb-4">Today's Moods</Text>
//         {todayEntries.length > 0 ? (
//           todayEntries.map(entry => (
//             <View key={entry.id} className="bg-white/20 rounded-xl p-4 mb-3">
//               <Text className="text-white text-lg font-medium">Mood: {entry.mood}</Text>
//               {entry.note && <Text className="text-white">Note: {entry.note}</Text>}
//               <Text className="text-white text-sm">Time: {entry.date?.toDate().toLocaleTimeString()}</Text>
//             </View>
//           ))
//         ) : (
//           <Text className="text-white">No mood logged for today yet.</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// }
