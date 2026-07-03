import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserStats } from "../types/movie";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, provider?: string) => Promise<void>;
  signup: (username: string, email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addToHistory: (movieId: string) => void;
  addNotification: (message: string, type: 'info' | 'success' | 'error') => void;
  notifications: AppNotification[];
  clearNotifications: () => void;
  markNotificationRead: (id: string) => void;
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Premium default profile to display incredible dashboard metrics
const DEFAULT_USER: UserProfile = {
  username: "Keerthi Mehran",
  email: "keerthimehran123@gmail.com",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  favoriteGenres: ["Sci-Fi", "Action", "Thriller"],
  favoriteActors: ["Leonardo DiCaprio", "Tom Hardy", "Christian Bale", "Timothée Chalamet"],
  favoriteDirectors: ["Christopher Nolan", "Denis Villeneuve", "Damien Chazelle"],
  viewingHistory: ["inception", "interstellar", "dark-knight", "arrival"],
  stats: {
    moviesWatched: 42,
    totalMinutes: 5880, // 42 * 140 min avg
    genresDistribution: {
      "Sci-Fi": 18,
      "Action": 12,
      "Thriller": 10,
      "Drama": 8,
      "Comedy": 5,
      "Music": 4,
      "Horror": 3
    }
  },
  theme: "dark"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Load user & notifications on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("cinematch_user");
    const savedNotifications = localStorage.getItem("cinematch_notifications");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Auto-authenticate with seed user for outstanding immediate feedback
      setUser(DEFAULT_USER);
      localStorage.setItem("cinematch_user", JSON.stringify(DEFAULT_USER));
    }

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      const initialNotes: AppNotification[] = [
        {
          id: "welcome",
          message: "Welcome to CineMatch AI! Experience personalized cinematic recommendations.",
          type: "success",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        }
      ];
      setNotifications(initialNotes);
      localStorage.setItem("cinematch_notifications", JSON.stringify(initialNotes));
    }
  }, []);

  const addNotification = (message: string, type: 'info' | 'success' | 'error') => {
    const newNote: AppNotification = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => {
      const updated = [newNote, ...prev].slice(0, 20); // Keep max 20
      localStorage.setItem("cinematch_notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const login = async (email: string, provider = "email") => {
    // Simulate API network request latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists in storage or create a mock
    const savedUser = localStorage.getItem("cinematch_user");
    let loggedUser: UserProfile;

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      loggedUser = { ...parsed, email };
    } else {
      loggedUser = {
        ...DEFAULT_USER,
        email,
        username: email.split("@")[0]
      };
    }

    setUser(loggedUser);
    localStorage.setItem("cinematch_user", JSON.stringify(loggedUser));
    addNotification(`Logged in successfully via ${provider}!`, "success");
  };

  const signup = async (username: string, email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser: UserProfile = {
      username,
      email,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      favoriteGenres: ["Sci-Fi", "Comedy"],
      favoriteActors: [],
      favoriteDirectors: [],
      viewingHistory: [],
      stats: {
        moviesWatched: 0,
        totalMinutes: 0,
        genresDistribution: {}
      },
      theme: "dark"
    };

    setUser(newUser);
    localStorage.setItem("cinematch_user", JSON.stringify(newUser));
    addNotification("Welcome to CineMatch AI! Profile created successfully.", "success");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cinematch_user");
    addNotification("Signed out safely.", "info");
  };

  const updateProfile = (updatedFields: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem("cinematch_user", JSON.stringify(updated));
    addNotification("Profile preferences updated.", "success");
  };

  const addToHistory = (movieId: string) => {
    if (!user) return;
    
    // Prevent duplicate entries in immediate history
    const filteredHistory = user.viewingHistory.filter(id => id !== movieId);
    const newHistory = [movieId, ...filteredHistory].slice(0, 15); // keep last 15
    
    // Increment stats
    const updatedWatched = user.viewingHistory.includes(movieId) 
      ? user.stats.moviesWatched 
      : user.stats.moviesWatched + 1;
      
    const updatedMinutes = user.viewingHistory.includes(movieId)
      ? user.stats.totalMinutes
      : user.stats.totalMinutes + 130; // Add an average of 130 mins per new movie
      
    const updatedStats: UserStats = {
      ...user.stats,
      moviesWatched: updatedWatched,
      totalMinutes: updatedMinutes
    };

    const updatedUser = {
      ...user,
      viewingHistory: newHistory,
      stats: updatedStats
    };

    setUser(updatedUser);
    localStorage.setItem("cinematch_user", JSON.stringify(updatedUser));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(note => note.id === id ? { ...note, read: true } : note);
      localStorage.setItem("cinematch_notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.setItem("cinematch_notifications", JSON.stringify([]));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateProfile,
      addToHistory,
      addNotification,
      notifications,
      clearNotifications,
      markNotificationRead
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
