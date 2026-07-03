import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";
import { AIRecommendation, Movie } from "../types/movie";
import { TrailerModal } from "../components/TrailerModal";
import { MovieCard } from "../components/MovieCard";
import { Sparkles, Sliders, ChevronRight, Check, Play, RefreshCw, Smile, Compass, AlertCircle, Bookmark, Star, Clapperboard, Monitor, Heart, Flame, ShieldAlert, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const AIRecommendPage: React.FC = () => {
  const { user, addNotification, addToHistory } = useAuth();
  const { navigateTo } = useNavigation();

  // Multi-step recommendation form states
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(user?.favoriteGenres || []);
  const [favoriteActors, setFavoriteActors] = useState<string[]>(user?.favoriteActors || []);
  const [favoriteDirectors, setFavoriteDirectors] = useState<string[]>(user?.favoriteDirectors || []);
  const [mood, setMood] = useState<string>("Motivational");
  const [viewingPreference, setViewingPreference] = useState<string>("Solo");
  const [duration, setDuration] = useState<string>("90-120");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Netflix", "Prime Video"]);
  const [customInput, setCustomInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [activeTrailerKey, setActiveTrailerKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [recSource, setRecSource] = useState("");

  const genres = ["Sci-Fi", "Action", "Thriller", "Drama", "Comedy", "Romance", "Adventure", "Horror", "Animation", "Mystery"];
  
  const moods = [
    { name: "Happy", icon: "😊", color: "text-amber-400" },
    { name: "Sad", icon: "😢", color: "text-blue-400" },
    { name: "Romantic", icon: "💖", color: "text-rose-400" },
    { name: "Action", icon: "💥", color: "text-red-500" },
    { name: "Thriller", icon: "🫣", color: "text-purple-400" },
    { name: "Sci-Fi", icon: "👽", color: "text-indigo-400" },
    { name: "Horror", icon: "🧟", color: "text-neutral-500" },
    { name: "Comedy", icon: "😂", color: "text-yellow-400" },
    { name: "Motivational", icon: "🏆", color: "text-emerald-400" }
  ];

  const viewingOptions = [
    { name: "Solo", desc: "Me, myself, and I" },
    { name: "Family", desc: "Safe for kids & grandmas" },
    { name: "Friends", desc: "Chill and chat-friendly" },
    { name: "Couple", desc: "Intimate and captivating" }
  ];

  const durationOptions = [
    { name: "Under 90 min", desc: "Quick watches" },
    { name: "90-120", desc: "Standard cinema" },
    { name: "120-180", desc: "Epic stories" }
  ];

  const platformOptions = ["Netflix", "Prime Video", "Max", "Disney+", "Hulu", "Paramount+"];

  // Toggle multiple items
  const handleToggleGenre = (genre: string) => {
    setFavoriteGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleTogglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  // Generate recommendation engine request
  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setRecommendations([]);

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favoriteGenres,
          favoriteActors,
          favoriteDirectors,
          mood,
          viewingPreference,
          duration,
          streamingPlatforms: selectedPlatforms,
          customInput
        })
      });

      if (!response.ok) throw new Error("Server-side request failed");

      const data = await response.json();
      setRecommendations(data.recommendations);
      setRecSource(data.source);
      addNotification("Smart AI recommendations ready!", "success");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to communicate with server recommendation engine.");
      addNotification("Recommendation fetch failed.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieView = (movie: Movie) => {
    addToHistory(movie.id);
    navigateTo("details", { id: movie.id });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 text-white">
      
      {/* Page Header */}
      <div className="flex items-center space-x-3.5 border-b border-white/5 pb-6 text-left">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E50914]/10 text-[#E50914]">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-sans text-3xl font-black uppercase tracking-tight">AI Recommendation Engine</h1>
          <p className="font-sans text-sm text-gray-500">Fine-tune the model parameters to discover your tailored playlist.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PARAMETER SELECTION FORM */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="rounded-2xl border border-white/10 bg-[#141414]/60 p-6 backdrop-blur-xl space-y-6">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
              <Sliders className="h-4 w-4 text-[#E50914]" />
              <span>Model Parameters</span>
            </h3>

            {/* Step 1: Genres Selector */}
            <div className="space-y-3">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Favorite Genres</label>
              <div className="flex flex-wrap gap-1.5">
                {genres.map((g) => {
                  const isSelected = favoriteGenres.includes(g);
                  return (
                    <button
                      key={g}
                      onClick={() => handleToggleGenre(g)}
                      className={`rounded-lg px-3 py-1.5 font-sans text-xs transition ${
                        isSelected 
                          ? "bg-[#E50914] text-white font-bold" 
                          : "bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Mood Emotion */}
            <div className="space-y-3">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Current Mood</label>
              <div className="grid grid-cols-3 gap-2">
                {moods.map((m) => {
                  const isSelected = mood === m.name;
                  return (
                    <button
                      key={m.name}
                      onClick={() => setMood(m.name)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${
                        isSelected 
                          ? "border-[#E50914] bg-[#E50914]/10 text-white font-bold" 
                          : "border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="text-xl mb-1">{m.icon}</span>
                      <span className="font-sans text-[10px] uppercase tracking-wider">{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Viewing Preference */}
            <div className="space-y-3">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Viewing Preference</label>
              <div className="grid grid-cols-2 gap-2.5">
                {viewingOptions.map((v) => {
                  const isSelected = viewingPreference === v.name;
                  return (
                    <button
                      key={v.name}
                      onClick={() => setViewingPreference(v.name)}
                      className={`p-3 rounded-xl border text-left transition ${
                        isSelected 
                          ? "border-[#E50914] bg-[#E50914]/10" 
                          : "border-white/5 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className={`block font-sans text-xs font-bold ${isSelected ? "text-white" : "text-gray-300"}`}>{v.name}</span>
                      <span className="block font-sans text-[9px] text-gray-500 mt-0.5">{v.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Movie Duration */}
            <div className="space-y-3">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Max Duration (min)</label>
              <div className="grid grid-cols-3 gap-2">
                {durationOptions.map((d) => {
                  const isSelected = duration === d.name;
                  return (
                    <button
                      key={d.name}
                      onClick={() => setDuration(d.name)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        isSelected 
                          ? "border-[#E50914] bg-[#E50914]/10" 
                          : "border-white/5 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className={`block font-sans text-[11px] font-bold ${isSelected ? "text-white" : "text-gray-300"}`}>{d.name}</span>
                      <span className="block font-sans text-[9px] text-gray-500 mt-0.5">{d.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Streaming Platform Checklist */}
            <div className="space-y-3">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Your Streaming Subscriptions</label>
              <div className="grid grid-cols-2 gap-2">
                {platformOptions.map((p) => {
                  const isSelected = selectedPlatforms.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => handleTogglePlatform(p)}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl border text-left transition ${
                        isSelected 
                          ? "border-[#E50914] bg-[#E50914]/5 text-white" 
                          : "border-white/5 bg-white/5 text-gray-400"
                      }`}
                    >
                      <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border ${
                        isSelected ? "border-[#E50914] bg-[#E50914] text-white" : "border-neutral-700 bg-neutral-900"
                      }`}>
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span className="font-sans text-xs font-medium">{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Supplementary User Prompt Context */}
            <div className="space-y-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Custom Input (Optional)</label>
              <textarea
                placeholder="E.g., 'An intelligent mind-bending thriller set in space similar to Interstellar, with a major twist ending...'"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full h-20 rounded-xl border border-white/5 bg-[#101010] p-3 font-sans text-xs text-white placeholder-gray-600 outline-none focus:border-[#E50914] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full rounded-xl bg-[#E50914] py-3.5 font-sans text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-[#E50914]/20 hover:bg-[#FF3B3B] disabled:opacity-50 transition flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing Cinematic Logic...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate AI Recommendations</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* RIGHT COLUMN: AI GENERATION RESULTS SCREEN */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Skeleton state */}
          {isLoading && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 space-y-4 animate-pulse">
                <div className="h-5 w-1/4 rounded bg-neutral-800" />
                <div className="h-4 w-3/4 rounded bg-neutral-800" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex flex-col rounded-2xl bg-[#1A1A1A] p-4 space-y-4 animate-pulse border border-white/5">
                    <div className="aspect-[2/3] w-full rounded-xl bg-neutral-800" />
                    <div className="h-4 w-1/3 rounded bg-neutral-800" />
                    <div className="h-6 w-3/4 rounded bg-neutral-800" />
                    <div className="h-10 w-full rounded bg-neutral-800" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Initial Blank state */}
          {!isLoading && recommendations.length === 0 && !errorMsg && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#141414]/40 py-24 px-6 text-center space-y-4 flex flex-col items-center justify-center h-full">
              <Sparkles className="h-14 w-14 text-neutral-700 animate-pulse" />
              <div className="space-y-1 max-w-sm">
                <h3 className="font-sans text-lg font-bold text-gray-300">Awaiting Model Inputs</h3>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  Select your favorite genres, subscriptions, and current mood on the left pane and press "Generate" to construct custom match reviews.
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {errorMsg && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center space-y-4 flex flex-col items-center">
              <AlertCircle className="h-12 w-12 text-[#FF3B3B]" />
              <div className="space-y-1">
                <h3 className="font-sans text-base font-bold text-white">Generation Pipeline Failure</h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">{errorMsg}</p>
              </div>
              <button
                onClick={handleGenerate}
                className="rounded-xl bg-[#E50914] px-4 py-2 font-sans text-xs font-bold"
              >
                Retry Request
              </button>
            </div>
          )}

          {/* Real Display Results state */}
          {recommendations.length > 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Rec Info Card */}
              <div className="rounded-2xl border border-[#E50914]/20 bg-gradient-to-r from-[#E50914]/15 to-transparent p-5 backdrop-blur-md">
                <div className="flex items-center space-x-2 text-[#FF3B3B]">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-sans text-xs font-black uppercase tracking-wider">Matched Successfully via {recSource}</span>
                </div>
                <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                  We identified 4 masterworks that align with your specified profile. Check the match score percentage overlays and personalized explanations!
                </p>
              </div>

              {/* Recommendation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((rec) => (
                  <div
                    key={rec.movie.id}
                    className="flex flex-col bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden shadow-2xl hover:border-white/10 transition duration-300"
                  >
                    {/* Basic Card Display wrapper */}
                    <MovieCard
                      movie={rec.movie}
                      matchScore={rec.matchScore}
                      onPlayTrailer={setActiveTrailerKey}
                    />

                    {/* WHY AI RECOMMENDED IT BOX */}
                    <div className="mt-auto border-t border-white/5 bg-[#141414] p-4 text-left">
                      <span className="font-sans text-[10px] font-black uppercase tracking-widest text-[#FF3B3B] block mb-1">
                        AI Compatibility Review
                      </span>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed">
                        {rec.whyRecommended}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

      </div>

      {/* LIGHTBOX TRAILERS */}
      <TrailerModal
        trailerKey={activeTrailerKey}
        onClose={() => setActiveTrailerKey(null)}
      />

    </div>
  );
};
