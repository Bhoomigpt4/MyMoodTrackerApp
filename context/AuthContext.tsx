// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { 
//   getAuth, 
//   onAuthStateChanged, 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail
// } from 'firebase/auth';
// import { auth } from '../Firebase';
// import { Alert } from 'react-native';
// import { router } from 'expo-router';

// interface User {
//   uid: string;
//   email: string | null;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   resetPassword: (email: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [initialLoading, setInitialLoading] = useState(true);

// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//     setUser(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email } : null);
//     setInitialLoading(false); // ✅ Just set it once
//     setLoading(false);
//   });
//   return unsubscribe;
// }, []); // ✅ Empty dependency array


//   const login = async (email: string, password: string) => {
//     try {
//       if (!email || !password) {
//         throw new Error('Please enter both email and password');
//       }
//       setLoading(true);
//       await signInWithEmailAndPassword(auth, email, password);
//       router.replace('/(tabs)');
//     } catch (error: any) {
//       let message = error.message;
//       if (error.code === 'auth/user-not-found') {
//         message = 'No user found with this email';
//       } else if (error.code === 'auth/wrong-password') {
//         message = 'Incorrect password';
//       }
//       Alert.alert('Login Failed', message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       await createUserWithEmailAndPassword(auth, email, password);
//       router.replace('/(tabs)');
//     } catch (error: any) {
//       let message = error.message;
//       if (error.code === 'auth/email-already-in-use') {
//         message = 'Email already in use';
//       } else if (error.code === 'auth/weak-password') {
//         message = 'Password should be at least 6 characters';
//       }
//       Alert.alert('Registration Error', message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       setLoading(true);
//       await signOut(auth);
//       router.replace('/login');
//     } catch (error: any) {
//       Alert.alert('Logout Error', error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetPassword = async (email: string) => {
//     try {
//       setLoading(true);
//       await sendPasswordResetEmail(auth, email);
//       Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       loading, 
//       login, 
//       register, 
//       logout, 
//       resetPassword 
//     }}>
//       {!initialLoading && children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };