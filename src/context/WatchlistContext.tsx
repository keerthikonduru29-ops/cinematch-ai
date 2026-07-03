import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface WatchlistContextType {
  watchlist: string[]; // array of movie IDs
  addToWatchlist: (movieId: string, title: string) => void;
  removeFromWatchlist: (movieId: string, title: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const { user, addNotification } = useAuth();

  // Load from local storage or set seed movies
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("cinematch_watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    } else {
      const defaultWatchlist = ["inception", "dune-part-two", "parasite"];
      setWatchlist(defaultWatchlist);
      localStorage.setItem("cinematch_watchlist", JSON.stringify(defaultWatchlist));
    }
  }, []);

  const addToWatchlist = (movieId: string, title: string) => {
    if (watchlist.includes(movieId)) return;
    const updated = [...watchlist, movieId];
    setWatchlist(updated);
    localStorage.setItem("cinematch_watchlist", JSON.stringify(updated));
    addNotification(`"${title}" added to your watchlist.`, "success");
  };

  const removeFromWatchlist = (movieId: string, title: string) => {
    const updated = watchlist.filter(id => id !== movieId);
    setWatchlist(updated);
    localStorage.setItem("cinematch_watchlist", JSON.stringify(updated));
    addNotification(`"${title}" removed from your watchlist.`, "info");
  };

  const isInWatchlist = (movieId: string) => {
    return watchlist.includes(movieId);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    localStorage.setItem("cinematch_watchlist", JSON.stringify([]));
    addNotification("Watchlist cleared.", "info");
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      clearWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
