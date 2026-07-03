import React, { useState, useEffect, useMemo } from "react";
import { Movie } from "../types/movie";
import { MOCK_MOVIES } from "../data/mockMovies";
import { MovieCard } from "../components/MovieCard";
import { TrailerModal } from "../components/TrailerModal";
import { VoiceSearch } from "../components/VoiceSearch";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";
import { Search, Mic, SlidersHorizontal, Sparkles, X, Clapperboard, RefreshCw, Star, History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const DashboardPage: React.FC = () => {
  const { user, addToHistory } = useAuth();
  const { navigateTo } = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [selectedRuntime, setSelectedRuntime] = useState<string>("All");
  
  const [showFilters, setShowFilters] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [activeTrailerKey, setActiveTrailerKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-complete suggestion states
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Simulated content loading effect
  const triggerLoading = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  // Trigger loading state on filter change to simulate API/TMDB latency
  useEffect(() => {
    triggerLoading();
  }, [selectedGenre, selectedLanguage, selectedYear, selectedRating, selectedPlatform, selectedRuntime]);

  const genres = useMemo(() => {
    const list = new Set<string>();
    MOCK_MOVIES.forEach(m => m.genres.forEach(g => list.add(g)));
    return ["All", ...Array.from(list)];
  }, []);

  const platforms = ["All", "Netflix", "Prime Video", "Max", "Disney+", "Hulu", "Paramount+"];
  const languages = ["All", "English", "Korean", "Japanese"];
  const years = ["All", "2020s", "2010s", "2000s"];

  // Search auto-complete suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return MOCK_MOVIES.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  // Handle filter matching
  const filteredMovies = useMemo(() => {
    return MOCK_MOVIES.filter((movie) => {
      // Search matching
      const matchesSearch = searchQuery
        ? movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;

      // Genre matching
      const matchesGenre = selectedGenre === "All" || movie.genres.includes(selectedGenre);

      // Language matching
      const matchesLanguage = selectedLanguage === "All" || movie.language === selectedLanguage;

      // Year matching
      let matchesYear = true;
      if (selectedYear !== "All") {
        if (selectedYear === "2020s") matchesYear = movie.releaseYear >= 2020;
        else if (selectedYear === "2010s") matchesYear = movie.releaseYear >= 2010 && movie.releaseYear < 2020;
        else if (selectedYear === "2000s") matchesYear = movie.releaseYear >= 2000 && movie.releaseYear < 2010;
      }

      // Rating matching
      const matchesRating = movie.rating >= selectedRating;

      // Platform matching
      const matchesPlatform = selectedPlatform === "All" || movie.streamingPlatforms.includes(selectedPlatform);

      // Runtime matching
      let matchesRuntime = true;
      if (selectedRuntime !== "All") {
        if (selectedRuntime === "Under 90 min") matchesRuntime = movie.runtime < 90;
        else if (selectedRuntime === "90-120 min") matchesRuntime = movie.runtime >= 90 && movie.runtime <= 120;
        else if (selectedRuntime === "120-180 min") matchesRuntime = movie.runtime > 120 && movie.runtime <= 180;
      }

      return matchesSearch && matchesGenre && matchesLanguage && matchesYear && matchesRating && matchesPlatform && matchesRuntime;
    });
  }, [searchQuery, selectedGenre, selectedLanguage, selectedYear, selectedRating, selectedPlatform, selectedRuntime]);

  // Retrieve recently viewed movies using profile history
  const recentlyViewed = useMemo(() => {
    if (!user || !user.viewingHistory || user.viewingHistory.length === 0) return [];
    return user.viewingHistory
      .map(id => MOCK_MOVIES.find(m => m.id === id))
      .filter((m): m is Movie => !!m)
      .slice(0, 4); // Show top 4
  }, [user]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSelectedLanguage("All");
    setSelectedYear("All");
    setSelectedRating(0);
    setSelectedPlatform("All");
    setSelectedRuntime("All");
  };

  const handleMovieView = (movieId: string) => {
    addToHistory(movieId);
    navigateTo("details", { id: movieId });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 text-white">
      
      {/* Title Header with dynamic Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-sans text-3xl font-black uppercase tracking-tight">Explore Cinema</h1>
          <p className="font-sans text-sm text-gray-500">Welcome back, <span className="text-white font-semibold">{user?.username}</span>! Find your next watch list.</p>
        </div>

        <button
          onClick={() => navigateTo("recommend")}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-[#E50914] to-[#FF3B3B] px-4 py-2.5 font-sans text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-[#E50914]/25 hover:scale-105 active:scale-95 transition"
        >
          <Sparkles className="h-4 w-4" />
          <span>Try AI Recommendation Engine</span>
        </button>
      </div>

      {/* SEARCH AND FILTERS BAR */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Main Input */}
          <div className="relative flex-1">
            <Search className="absolute top-3.5 left-4 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search movies, directors, actors, or keywords..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full rounded-2xl border border-white/10 bg-[#141414] py-3.5 pl-12 pr-10 font-sans text-sm text-white placeholder-gray-500 outline-none focus:border-[#E50914]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-3.5 right-12 text-gray-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => setShowVoiceSearch(true)}
              className="absolute top-3 right-3 rounded-xl bg-white/5 p-2 text-gray-400 hover:bg-[#E50914] hover:text-white transition"
              title="Voice Search"
            >
              <Mic className="h-4 w-4" />
            </button>

            {/* Suggestions Popover */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSuggestions(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 z-20 w-full rounded-xl border border-white/10 bg-[#161616] p-2.5 shadow-2xl"
                  >
                    <span className="mb-2 block px-3.5 font-sans text-[10px] font-bold uppercase tracking-wider text-gray-500">Suggestions</span>
                    <div className="space-y-1">
                      {suggestions.map(movie => (
                        <div
                          key={movie.id}
                          onClick={() => {
                            handleMovieView(movie.id);
                            setShowSuggestions(false);
                          }}
                          className="flex items-center space-x-3 rounded-lg p-2 hover:bg-white/5 cursor-pointer transition"
                        >
                          <img src={movie.posterUrl} alt={movie.title} className="h-10 w-7 rounded object-cover" />
                          <div className="text-left">
                            <p className="font-sans text-xs font-bold text-white">{movie.title}</p>
                            <span className="block font-sans text-[10px] text-gray-500">{movie.genres.join(", ")} • {movie.releaseYear}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Advanced Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center space-x-2 rounded-2xl border border-white/10 px-5 py-3.5 font-sans text-sm font-semibold transition ${
              showFilters ? "border-[#E50914] bg-[#E50914]/10 text-white" : "bg-[#141414] text-gray-300 hover:bg-neutral-800"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>

        </div>

        {/* Dynamic Filters Section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]/50 p-6 backdrop-blur-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
                
                {/* Genre Selector */}
                <div className="space-y-2">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#101010] p-2.5 font-sans text-xs text-white outline-none focus:border-[#E50914]"
                  >
                    {genres.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Streaming Platform Selector */}
                <div className="space-y-2">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Streaming Network</label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#101010] p-2.5 font-sans text-xs text-white outline-none focus:border-[#E50914]"
                  >
                    {platforms.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Years Selector */}
                <div className="space-y-2">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Release Era</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#101010] p-2.5 font-sans text-xs text-white outline-none focus:border-[#E50914]"
                  >
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                {/* IMDb Rating Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Min IMDb Score</label>
                    <span className="font-mono text-xs text-[#FF3B3B] font-bold">{selectedRating.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="9.5"
                    step="0.5"
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
                  />
                </div>

                {/* Language Selector */}
                <div className="space-y-2">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Original Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#101010] p-2.5 font-sans text-xs text-white outline-none focus:border-[#E50914]"
                  >
                    {languages.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* Runtime Selector */}
                <div className="space-y-2">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Duration</label>
                  <select
                    value={selectedRuntime}
                    onChange={(e) => setSelectedRuntime(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#101010] p-2.5 font-sans text-xs text-white outline-none focus:border-[#E50914]"
                  >
                    <option value="All">All runtimes</option>
                    <option value="Under 90 min">Under 90 min</option>
                    <option value="90-120 min">90 - 120 min</option>
                    <option value="120-180 min">120 - 180 min</option>
                  </select>
                </div>

                {/* Action Buttons Row */}
                <div className="sm:col-span-2 flex items-end justify-end gap-3.5">
                  <button
                    onClick={handleClearFilters}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs font-bold text-gray-400 hover:text-white"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="rounded-xl bg-[#E50914] px-5 py-2 font-sans text-xs font-bold text-white hover:bg-[#FF3B3B]"
                  >
                    Apply Filter Set
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOVIE CATALOG GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-lg font-black uppercase tracking-wider flex items-center space-x-2">
            <Clapperboard className="h-5 w-5 text-[#E50914]" />
            <span>Search Results ({filteredMovies.length})</span>
          </h2>
        </div>

        {/* SKELETON LOADER AND DYNAMIC TILES GRID */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-col rounded-2xl bg-[#1A1A1A] p-4 space-y-4 animate-pulse border border-white/5">
                <div className="aspect-[2/3] w-full rounded-xl bg-neutral-800" />
                <div className="h-4 w-1/3 rounded bg-neutral-800" />
                <div className="h-6 w-3/4 rounded bg-neutral-800" />
                <div className="h-10 w-full rounded bg-neutral-800" />
              </div>
            ))}
          </div>
        ) : filteredMovies.length === 0 ? (
          /* Empty Search results state */
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#121212] py-20 text-center max-w-xl mx-auto space-y-4">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-600" />
            <div className="space-y-1">
              <h3 className="font-sans text-lg font-bold">No Movies Match Your Query</h3>
              <p className="font-sans text-xs text-gray-500">Try broadening your ratings slider or search terms.</p>
            </div>
            <button
              onClick={handleClearFilters}
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 font-sans text-xs font-semibold text-gray-300 hover:text-white hover:border-[#E50914] transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Real Grid Display */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlayTrailer={setActiveTrailerKey}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* RECENTLY VIEWED RAIL */}
      {recentlyViewed.length > 0 && (
        <div className="border-t border-white/5 pt-10 space-y-6">
          <h2 className="font-sans text-lg font-black uppercase tracking-wider flex items-center space-x-2">
            <History className="h-5 w-5 text-gray-400" />
            <span>Recently Viewed by You</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentlyViewed.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieView(movie.id)}
                className="relative overflow-hidden rounded-xl border border-white/5 aspect-[16/10] cursor-pointer group bg-neutral-900"
              >
                <img
                  src={movie.backdropUrl}
                  alt={movie.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                  <div className="text-left">
                    <p className="font-sans text-xs font-bold text-white truncate">{movie.title}</p>
                    <span className="block font-sans text-[10px] text-gray-500">{movie.genres[0]} • {movie.releaseYear}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRAILER PORTALS */}
      <TrailerModal
        trailerKey={activeTrailerKey}
        onClose={() => setActiveTrailerKey(null)}
      />

      {/* VOICE CONTROLS */}
      <VoiceSearch
        isOpen={showVoiceSearch}
        onClose={() => setShowVoiceSearch(false)}
        onResult={(result) => {
          setSearchQuery(result);
          setShowFilters(true);
        }}
      />

    </div>
  );
};
