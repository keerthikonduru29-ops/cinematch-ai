import React, { useState, useMemo } from "react";
import { useNavigation } from "../context/NavigationContext";
import { useAuth } from "../context/AuthContext";
import { useWatchlist } from "../context/WatchlistContext";
import { MOCK_MOVIES } from "../data/mockMovies";
import { Movie, Review } from "../types/movie";
import { Star, Calendar, Clock, Film, Bookmark, BookmarkCheck, DollarSign, Send, MessageSquare, ArrowLeft, Share2, Languages } from "lucide-react";
import { motion } from "motion/react";

export const MovieDetailsPage: React.FC = () => {
  const { currentParams, navigateTo, goBack } = useNavigation();
  const { user, addNotification } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  // Local state for adding reviews
  const [reviewAuthor, setReviewAuthor] = useState(user?.username || "Guest Critic");
  const [reviewRating, setReviewRating] = useState<number>(10);
  const [reviewContent, setReviewContent] = useState("");
  const [localReviews, setLocalReviews] = useState<{ [movieId: string]: Review[] }>({});

  const movieId = currentParams?.id || "inception";

  // Find movie
  const movie = useMemo(() => {
    return MOCK_MOVIES.find(m => m.id === movieId) || MOCK_MOVIES[0];
  }, [movieId]);

  const isBookmarked = isInWatchlist(movie.id);

  // Combine standard mock reviews with user added local reviews
  const currentReviews = useMemo(() => {
    const defaultReviews = movie.reviews || [];
    const addedReviews = localReviews[movie.id] || [];
    return [...addedReviews, ...defaultReviews];
  }, [movie, localReviews]);

  // Find similar movies (intersecting genres, exclude current)
  const similarMovies = useMemo(() => {
    return MOCK_MOVIES.filter(m =>
      m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))
    ).slice(0, 4);
  }, [movie]);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeFromWatchlist(movie.id, movie.title);
    } else {
      addToWatchlist(movie.id, movie.title);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addNotification(`Link for "${movie.title}" copied to clipboard!`, "success");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim()) {
      addNotification("Review content cannot be empty.", "error");
      return;
    }

    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      author: reviewAuthor,
      rating: reviewRating,
      content: reviewContent,
      date: new Date().toISOString().split("T")[0]
    };

    setLocalReviews(prev => {
      const currentList = prev[movie.id] || [];
      return {
        ...prev,
        [movie.id]: [newReview, ...currentList]
      };
    });

    setReviewContent("");
    addNotification("Your review was posted successfully!", "success");
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen pb-16">
      
      {/* 1. Large Parallax Backdrop Hero Banner */}
      <div className="relative h-[45vh] sm:h-[55vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 select-none pointer-events-none">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="h-full w-full object-cover object-center scale-105 opacity-55 blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-transparent to-transparent" />
        </div>

        {/* Back and Share buttons */}
        <div className="absolute top-6 left-4 right-4 z-10 mx-auto max-w-7xl flex justify-between px-2 sm:px-6">
          <button
            onClick={goBack}
            className="flex items-center space-x-1.5 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black hover:text-[#E50914]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={handleShare}
            className="rounded-full bg-black/60 p-2 text-white backdrop-blur-md transition hover:bg-black hover:text-[#E50914]"
            title="Share Movie link"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Details Content Wrapper */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-28 sm:-mt-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT SPECS PANEL: POSTER, SPEC LIST */}
          <div className="lg:col-span-4 space-y-6 text-left">
            
            {/* Poster image card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80 aspect-[2/3]"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Quick action triggers */}
            <div className="flex gap-3">
              <button
                onClick={handleBookmarkToggle}
                className={`flex-1 flex items-center justify-center space-x-2 rounded-xl py-3.5 font-sans text-sm font-semibold transition ${
                  isBookmarked
                    ? "bg-white/10 border border-white/15 text-white hover:bg-white/15"
                    : "bg-[#E50914] text-white hover:bg-[#FF3B3B] shadow-lg shadow-[#E50914]/20"
                }`}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 text-[#FF3B3B]" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>
            </div>

            {/* Speclist parameters */}
            <div className="rounded-xl border border-white/5 bg-[#121212] p-5 space-y-4">
              <span className="block font-sans text-[10px] font-black uppercase tracking-widest text-[#FF3B3B]">Technical Specifications</span>
              
              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-3">
                <div className="space-y-0.5">
                  <span className="block font-sans text-[10px] text-gray-500 uppercase">Budget</span>
                  <p className="font-mono text-xs font-bold text-gray-200 flex items-center"><DollarSign className="h-3 w-3 mr-0.5" />{movie.budget}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="block font-sans text-[10px] text-gray-500 uppercase">Revenue</span>
                  <p className="font-mono text-xs font-bold text-gray-200 flex items-center"><DollarSign className="h-3 w-3 mr-0.5" />{movie.revenue}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-3">
                <div className="space-y-0.5">
                  <span className="block font-sans text-[10px] text-gray-500 uppercase">Runtime</span>
                  <p className="font-sans text-xs font-bold text-gray-200 flex items-center"><Clock className="h-3.5 w-3.5 mr-1" />{movie.runtime} Min</p>
                </div>
                <div className="space-y-0.5">
                  <span className="block font-sans text-[10px] text-gray-500 uppercase">Language</span>
                  <p className="font-sans text-xs font-bold text-gray-200 flex items-center"><Languages className="h-3.5 w-3.5 mr-1" />{movie.language}</p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="block font-sans text-[10px] text-gray-500 uppercase">Streaming platform licenses</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {movie.streamingPlatforms.map(platform => (
                    <span key={platform} className="rounded bg-[#E50914]/15 px-2.5 py-0.5 font-sans text-[10px] font-bold text-[#FF3B3B]">{platform}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT DETAILS COLUMN: SYNOPSIS, EMBEDDED YT TRAILER, USER REVIEWS */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* Title block */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center space-x-1 rounded bg-[#FF3B3B]/10 border border-[#FF3B3B]/20 px-2 py-0.5 font-sans text-xs font-bold text-[#FF3B3B]">
                  <Star className="h-3.5 w-3.5 fill-[#FF3B3B] stroke-[#FF3B3B]" />
                  <span>{movie.rating.toFixed(1)} IMDb</span>
                </span>
                <span className="flex items-center space-x-1 rounded bg-white/5 border border-white/5 px-2 py-0.5 font-sans text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{movie.releaseYear}</span>
                </span>
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl font-black tracking-tight">{movie.title}</h2>
              <p className="font-sans text-sm text-gray-400 leading-relaxed italic border-l-2 border-[#E50914] pl-3">
                Directed by <span className="text-white font-semibold">{movie.director}</span>
              </p>
            </div>

            {/* Genres & Cast List tags */}
            <div className="space-y-2">
              <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-gray-500">Genres</span>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(g => (
                  <span key={g} className="rounded-xl border border-white/10 bg-[#1A1A1A] px-3.5 py-1 font-sans text-xs font-medium text-gray-300">{g}</span>
                ))}
              </div>
            </div>

            {/* Storyline text */}
            <div className="space-y-3 border-t border-white/5 pt-6">
              <h3 className="font-sans text-lg font-black uppercase tracking-wider">Storyline</h3>
              <p className="font-sans text-sm text-gray-300 leading-relaxed font-light">{movie.overview}</p>
            </div>

            {/* Cast List */}
            <div className="space-y-3 border-t border-white/5 pt-6">
              <h3 className="font-sans text-lg font-black uppercase tracking-wider">Featured Cast</h3>
              <div className="flex flex-wrap gap-2.5">
                {movie.cast.map(actor => (
                  <div key={actor} className="rounded-full bg-white/5 border border-white/5 px-4 py-1.5 font-sans text-xs font-medium text-gray-300 hover:text-white hover:border-[#E50914] transition duration-300">
                    {actor}
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded YouTube Trailer */}
            {movie.trailerKey && (
              <div className="space-y-3 border-t border-white/5 pt-6">
                <h3 className="font-sans text-lg font-black uppercase tracking-wider flex items-center space-x-2">
                  <Film className="h-5 w-5 text-[#E50914]" />
                  <span>Trailer Showcase</span>
                </h3>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.trailerKey}?modestbranding=1&rel=0`}
                    title={`${movie.title} Official Trailer`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* USER INTERACTIVE REVIEWS BOX */}
            <div className="space-y-6 border-t border-white/5 pt-6">
              <h3 className="font-sans text-lg font-black uppercase tracking-wider flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-[#E50914]" />
                <span>Critique Portal ({currentReviews.length})</span>
              </h3>

              {/* Add Critique Form */}
              <form onSubmit={handleAddReview} className="rounded-2xl border border-white/10 bg-[#121212]/80 p-5 space-y-4">
                <span className="block font-sans text-xs font-bold uppercase tracking-wider text-[#FF3B3B]">Write a Review</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Critic Name */}
                  <div className="space-y-1">
                    <label className="block font-sans text-[10px] text-gray-500 uppercase">Critic Handle</label>
                    <input
                      type="text"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-[#1A1A1A] p-2.5 font-sans text-xs text-white outline-none focus:border-[#E50914]"
                      required
                    />
                  </div>
                  {/* Critique Rating */}
                  <div className="space-y-1">
                    <label className="block font-sans text-[10px] text-gray-500 uppercase">Score (1-10 Stars)</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(parseInt(e.target.value))}
                      className="w-full rounded-xl border border-white/5 bg-[#1A1A1A] p-2.5 font-sans text-xs text-white outline-none focus:border-[#E50914]"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} Stars</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1">
                  <label className="block font-sans text-[10px] text-gray-500 uppercase">Review Content</label>
                  <textarea
                    placeholder="Enter your critique..."
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    className="w-full h-24 rounded-xl border border-white/5 bg-[#1A1A1A] p-3 font-sans text-xs text-white placeholder-gray-600 outline-none focus:border-[#E50914]"
                    required
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 rounded-xl bg-[#E50914] px-5 py-2.5 font-sans text-xs font-bold text-white hover:bg-[#FF3B3B] transition"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Post Critique</span>
                  </button>
                </div>
              </form>

              {/* Critiques List Display */}
              <div className="space-y-4">
                {currentReviews.length === 0 ? (
                  <p className="font-sans text-xs text-gray-500 text-center py-6">No critiques published for this movie yet. Be the first!</p>
                ) : (
                  currentReviews.map((rev) => (
                    <div key={rev.id} className="rounded-xl border border-white/5 bg-[#141414] p-4.5 space-y-2.5 text-left transition hover:border-white/10">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <div className="space-y-0.5">
                          <p className="font-sans text-xs font-bold text-white">{rev.author}</p>
                          <span className="block font-sans text-[10px] text-gray-600">{rev.date}</span>
                        </div>
                        <span className="flex items-center space-x-1 rounded bg-[#FF3B3B]/10 px-2 py-1 font-mono text-xs font-black text-[#FF3B3B]">
                          <Star className="h-3.5 w-3.5 fill-[#FF3B3B] stroke-[#FF3B3B]" />
                          <span>{rev.rating}/10</span>
                        </span>
                      </div>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">{rev.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SIMILAR MOVIES CAROUSEL */}
            {similarMovies.length > 0 && (
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="font-sans text-lg font-black uppercase tracking-wider">Similar Masterpieces</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {similarMovies.map((sim) => (
                    <div
                      key={sim.id}
                      onClick={() => navigateTo("details", { id: sim.id })}
                      className="relative overflow-hidden rounded-xl border border-white/5 aspect-[2/3] cursor-pointer group bg-neutral-900"
                    >
                      <img src={sim.posterUrl} alt={sim.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition duration-300">
                        <div className="text-left w-full">
                          <p className="font-sans text-xs font-bold text-white truncate">{sim.title}</p>
                          <span className="block font-mono text-[9px] text-[#FF3B3B]">{sim.rating.toFixed(1)} IMDb</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
