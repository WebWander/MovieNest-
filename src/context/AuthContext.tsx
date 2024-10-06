import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from '../entities';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<{ success: boolean; msg?: string }>;
  logout: () => Promise<{ success: boolean; msg?: string }>;
  register: (email: string, password: string, username: string) => Promise<{ success: boolean; msg?: string }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        const userData = await fetchUserData(currentUser.uid);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const fetchUserData = async (userId: string): Promise<User | null> => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), uid: userId } as User;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return null;
  };

  const register = async (email: string, password: string, username: string): Promise<{ success: boolean; msg?: string }> => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // Log response to debug if it's successful
      console.log('Registration successful:', response);
  
      await setDoc(doc(db, "users", response.user.uid), {
        username,
        userId: response.user.uid,
      });
      
      // Return success without setting the user here
      return { success: true };
    } catch (error: any) {
      console.error('Error during registration:', error); // Log error to debug
      let msg = error.message;
      if (msg.includes('(auth/email-already-in-use)')) msg = 'Email already in use';
      else if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
      else if (msg.includes('(auth/weak-password)')) msg = 'Password should be at least 6 characters';
      else msg = 'An error occurred. Please try again later.';
      return { success: false, msg };
    }
  };
  

  const login = async (email: string, password: string): Promise<{ success: boolean; msg?: string }> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData(response.user.uid);
      setUser(userData);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes('(auth/wrong-password)')) msg = 'Invalid credentials';
      else if (msg.includes('(auth/user-not-found)')) msg = 'Invalid email';
      else msg = 'An error occurred. Please try again later.';
      return { success: false, msg };
    }
  };

  const logout = async (): Promise<{ success: boolean; msg?: string }> => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return value;
};
