import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useWatchlist } from "../context/WatchlistContext";
import { MOCK_MOVIES } from "../data/mockMovies";
import { User, Mail, Shield, Award, Edit3, Check, Eye, Heart, BarChart3, Clock, Tv } from "lucide-react";
import { motion } from "motion/react";

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, addNotification } = useAuth();
  const { watchlist } = useWatchlist();

  // Profile forms state
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  
  // Preference parameters state
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(user?.favoriteGenres || []);
  const [favoriteActors, setFavoriteActors] = useState<string[]>(user?.favoriteActors || []);
  const [favoriteDirectors, setFavoriteDirectors] = useState<string[]>(user?.favoriteDirectors || []);
  const [streamingPlatforms, setStreamingPlatforms] = useState<string[]>(user?.streamingPlatforms || []);

  const [newActor, setNewActor] = useState("");
  const [newDirector, setNewDirector] = useState("");

  const genres = ["Sci-Fi", "Action", "Thriller", "Drama", "Comedy", "Romance", "Adventure", "Horror", "Animation", "Mystery"];
  const platforms = ["Netflix", "Prime Video", "Max", "Disney+", "Hulu", "Paramount+"];

  // Toggle helpers
  const handleToggleGenre = (genre: string) => {
    setFavoriteGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleTogglePlatform = (platform: string) => {
    setStreamingPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleAddActor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newActor.trim() && !favoriteActors.includes(newActor.trim())) {
      setFavoriteActors([...favoriteActors, newActor.trim()]);
      setNewActor("");
    }
  };

  const handleAddDirector = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDirector.trim() && !favoriteDirectors.includes(newDirector.trim())) {
      setFavoriteDirectors([...favoriteDirectors, newDirector.trim()]);
      setNewDirector("");
    }
  };

  const handleRemoveActor = (actor: string) => {
    setFavoriteActors(favoriteActors.filter(a => a !== actor));
  };

  const handleRemoveDirector = (director: string) => {
    setFavoriteDirectors(favoriteDirectors.filter(d => d !== director));
  };

  const handleSave = () => {
    updateProfile({
      username,
      email,
      avatarUrl,
      favoriteGenres,
      favoriteActors,
      favoriteDirectors,
      streamingPlatforms
    });
    addNotification("Profile metrics and parameters successfully updated!", "success");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 text-white text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <img
              src={avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt="Avatar"
              className="h-14 w-14 rounded-full border-2 border-[#E50914] object-cover"
            />
            <span className="absolute bottom-0 right-0 rounded-full bg-emerald-500 p-1 block border-2 border-black" />
          </div>
          <div>
            <h1 className="font-sans text-3xl font-black uppercase tracking-tight">{username || "User Profile"}</h1>
            <p className="font-sans text-sm text-gray-500">Membership tier: <span className="text-[#FF3B3B] font-bold">CineMatch Platinum Elite</span></p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="rounded-xl bg-[#E50914] px-5 py-2.5 font-sans text-xs font-black uppercase tracking-wider text-white hover:bg-[#FF3B3B] shadow-lg shadow-[#E50914]/25 transition"
        >
          Save Profile Updates
        </button>
      </div>

      {/* METRICS & ENGAGEMENT STATS DASHBOARD widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Widget 1: Hours watched */}
        <div className="rounded-2xl border border-white/5 bg-[#121212] p-5 flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <Clock className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <span className="block font-sans text-[10px] text-gray-500 uppercase tracking-wider">Hours Watched</span>
            <p className="font-mono text-xl font-bold text-white">142.5 hrs</p>
          </div>
        </div>

        {/* Widget 2: Average Rating */}
        <div className="rounded-2xl border border-white/5 bg-[#121212] p-5 flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Heart className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <span className="block font-sans text-[10px] text-gray-500 uppercase tracking-wider">Critiques Average</span>
            <p className="font-mono text-xl font-bold text-white">8.6 / 10</p>
          </div>
        </div>

        {/* Widget 3: Bookmarks Count */}
        <div className="rounded-2xl border border-white/5 bg-[#121212] p-5 flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Shield className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <span className="block font-sans text-[10px] text-gray-500 uppercase tracking-wider">Saved Bookmarks</span>
            <p className="font-mono text-xl font-bold text-white">{watchlist.length} titles</p>
          </div>
        </div>

        {/* Widget 4: Favorite Genre Representation */}
        <div className="rounded-2xl border border-white/5 bg-[#121212] p-5 flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <span className="block font-sans text-[10px] text-gray-500 uppercase tracking-wider">Top Sub-genre</span>
            <p className="font-sans text-xl font-bold text-white">{favoriteGenres[0] || "Sci-Fi"}</p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: IDENTITY CREDENTIALS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 space-y-5">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-400">Credentials Editor</h3>
            
            <div className="space-y-1.5">
              <label className="block font-sans text-xs text-gray-400">Username</label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 font-sans text-sm text-white focus:border-[#E50914] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-sans text-xs text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 font-sans text-sm text-white focus:border-[#E50914] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-sans text-xs text-gray-400">Profile Image Url</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 px-4 font-sans text-xs text-white focus:border-[#E50914] outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREFERENCES (GENRE, NETWORKS, ARTISTS) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 space-y-6">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-400">Recommendation Preferences</h3>

            {/* Favorite Genres selection */}
            <div className="space-y-2.5">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Preferred Movie Genres</label>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => {
                  const isSelected = favoriteGenres.includes(g);
                  return (
                    <button
                      key={g}
                      onClick={() => handleToggleGenre(g)}
                      className={`rounded-lg px-3.5 py-1.5 font-sans text-xs transition ${
                        isSelected 
                          ? "bg-[#E50914] text-white font-bold" 
                          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subscriptions Networks checklist */}
            <div className="space-y-2.5 border-t border-white/5 pt-5">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">My Streaming Networks</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {platforms.map((p) => {
                  const isSelected = streamingPlatforms.includes(p);
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

            {/* Favorite Actors list addition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-5">
              
              <div className="space-y-3">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Favorite Actors</label>
                <form onSubmit={handleAddActor} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="E.g., Leonardo DiCaprio"
                    value={newActor}
                    onChange={(e) => setNewActor(e.target.value)}
                    className="flex-1 rounded-xl border border-white/5 bg-white/5 px-3 py-2 font-sans text-xs text-white focus:border-[#E50914] outline-none"
                  />
                  <button type="submit" className="rounded-xl bg-[#E50914] px-4 py-2 font-sans text-xs font-bold">Add</button>
                </form>
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {favoriteActors.map(actor => (
                    <span key={actor} className="inline-flex items-center space-x-1.5 rounded-full bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-gray-400">
                      <span>{actor}</span>
                      <button type="button" onClick={() => handleRemoveActor(actor)} className="text-[#FF3B3B] hover:text-white font-bold text-[10px]">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Favorite Directors list addition */}
              <div className="space-y-3">
                <label className="block font-sans text-xs font-bold uppercase tracking-wider text-gray-500">Favorite Directors</label>
                <form onSubmit={handleAddDirector} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="E.g., Christopher Nolan"
                    value={newDirector}
                    onChange={(e) => setNewDirector(e.target.value)}
                    className="flex-1 rounded-xl border border-white/5 bg-white/5 px-3 py-2 font-sans text-xs text-white focus:border-[#E50914] outline-none"
                  />
                  <button type="submit" className="rounded-xl bg-[#E50914] px-4 py-2 font-sans text-xs font-bold">Add</button>
                </form>
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {favoriteDirectors.map(dir => (
                    <span key={dir} className="inline-flex items-center space-x-1.5 rounded-full bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-gray-400">
                      <span>{dir}</span>
                      <button type="button" onClick={() => handleRemoveDirector(dir)} className="text-[#FF3B3B] hover:text-white font-bold text-[10px]">×</button>
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
