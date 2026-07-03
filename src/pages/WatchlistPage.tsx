import React, { useState, useMemo } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import { useNavigation } from "../context/NavigationContext";
import { MOCK_MOVIES } from "../data/mockMovies";
import { MovieCard } from "../components/MovieCard";
import { TrailerModal } from "../components/TrailerModal";
import { Bookmark, Sparkles, SlidersHorizontal, Play, Trash2, Library, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export const WatchlistPage: React.FC = () => {
  const { watchlist, clearWatchlist } = useWatchlist();
  const { navigateTo } = useNavigation();

  const [activeTrailerKey, setActiveTrailerKey] = useState<string | null>(null);

  // Retrieve bookmarked movies from full database
  const bookmarkedMovies = useMemo(() => {
    return MOCK_MOVIES.filter(m => watchlist.includes(m.id));
  }, [watchlist]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 text-white text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E50914]/10 text-[#E50914]">
            <Bookmark className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-sans text-3xl font-black uppercase tracking-tight">My Watchlist</h1>
            <p className="font-sans text-sm text-gray-500">Your personal selection of cinematic masterworks.</p>
          </div>
        </div>

        {bookmarkedMovies.length > 0 && (
          <button
            onClick={clearWatchlist}
            className="flex items-center space-x-1.5 rounded-xl border border-[#FF3B3B]/20 bg-[#FF3B3B]/5 px-4 py-2.5 font-sans text-xs font-bold text-[#FF3B3B] hover:bg-[#FF3B3B]/10 transition"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Watchlist</span>
          </button>
        )}
      </div>

      {/* Grid or Empty view */}
      {bookmarkedMovies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#121212] py-24 text-center max-w-xl mx-auto space-y-6 flex flex-col items-center">
          <Library className="h-14 w-14 text-neutral-700 animate-bounce" />
          <div className="space-y-1.5 max-w-sm">
            <h3 className="font-sans text-lg font-bold">Your Watchlist is Empty</h3>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              Explore the database, ask the AI Recommendation Engine for advice, and bookmark your next favorite films!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigateTo("dashboard")}
              className="flex items-center justify-center space-x-1.5 rounded-xl bg-white/5 border border-white/15 px-5 py-2.5 font-sans text-xs font-bold text-gray-200 hover:text-white"
            >
              <span>Browse Catalogue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => navigateTo("recommend")}
              className="flex items-center justify-center space-x-1.5 rounded-xl bg-[#E50914] px-5 py-2.5 font-sans text-xs font-bold text-white hover:bg-[#FF3B3B] shadow-lg shadow-[#E50914]/25"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask CineMatch AI</span>
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {bookmarkedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlayTrailer={setActiveTrailerKey}
            />
          ))}
        </motion.div>
      )}

      {/* PORTAL MODALS */}
      <TrailerModal
        trailerKey={activeTrailerKey}
        onClose={() => setActiveTrailerKey(null)}
      />

    </div>
  );
};
