import React from "react";
import { Movie } from "../types/movie";
import { Star, Play, Bookmark, BookmarkCheck, Info, Share2 } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";
import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";

interface MovieCardProps {
  movie: Movie;
  onPlayTrailer?: (key: string) => void;
  matchScore?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlayTrailer, matchScore }) => {
  const { navigateTo } = useNavigation();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { addNotification } = useAuth();

  const isBookmarked = isInWatchlist(movie.id);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarked) {
      removeFromWatchlist(movie.id, movie.title);
    } else {
      addToWatchlist(movie.id, movie.title);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/#/details/${movie.id}`);
    addNotification(`Link for "${movie.title}" copied to clipboard!`, "success");
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1A1A1A] border border-white/5 transition duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-[#E50914]/10"
      id={`movie-card-${movie.id}`}
    >
      {/* Poster Image Container */}
      <div 
        onClick={() => navigateTo("details", { id: movie.id })}
        className="relative aspect-[2/3] w-full overflow-hidden cursor-pointer bg-neutral-900"
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 rounded-md bg-black/75 px-2 py-1 backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-[#FF3B3B] stroke-[#FF3B3B]" />
          <span className="font-mono text-xs font-bold text-white">{movie.rating.toFixed(1)}</span>
        </div>

        {/* Match Percentage overlay (AI Recommendations) */}
        {(matchScore || movie.popularity) && (
          <div className="absolute top-3 right-3 rounded-md bg-[#E50914] px-2 py-1 font-sans text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-[#E50914]/30">
            {matchScore || movie.popularity}% Match
          </div>
        )}

        {/* Quick action buttons (Hover Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <div className="flex space-x-3">
            {movie.trailerKey && onPlayTrailer && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayTrailer(movie.trailerKey);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E50914] text-white shadow-lg shadow-[#E50914]/40 transition hover:bg-[#FF3B3B] hover:scale-110 active:scale-95"
                title="Play Trailer"
              >
                <Play className="h-5 w-5 fill-white" />
              </button>
            )}
            <button
              onClick={handleBookmarkToggle}
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-md transition hover:bg-white hover:text-black hover:scale-110 active:scale-95`}
              title={isBookmarked ? "Remove from Watchlist" : "Save to Watchlist"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-[#FF3B3B]" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Info Container */}
      <div className="flex flex-1 flex-col p-4">
        {/* Genre Tags */}
        <div className="mb-2 flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="rounded bg-white/5 px-2 py-0.5 font-sans text-[10px] font-semibold text-gray-400"
            >
              {genre}
            </span>
          ))}
          <span className="ml-auto font-sans text-[10px] text-gray-500">{movie.releaseYear}</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => navigateTo("details", { id: movie.id })}
          className="mb-1.5 line-clamp-1 font-sans text-sm font-bold text-white hover:text-[#E50914] cursor-pointer transition"
        >
          {movie.title}
        </h3>

        {/* Short Synopsis */}
        <p className="mb-4 line-clamp-2 font-sans text-xs text-gray-400 leading-relaxed">
          {movie.overview}
        </p>

        {/* Action Bar */}
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3.5">
          <button
            onClick={() => navigateTo("details", { id: movie.id })}
            className="flex items-center space-x-1 font-sans text-xs font-semibold text-gray-300 hover:text-white transition"
          >
            <Info className="h-3.5 w-3.5" />
            <span>More Info</span>
          </button>
          <button
            onClick={handleShare}
            className="rounded p-1 text-gray-500 hover:bg-white/5 hover:text-white transition"
            title="Share Movie"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
