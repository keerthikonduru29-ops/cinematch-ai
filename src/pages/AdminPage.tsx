import React, { useState } from "react";
import { Movie } from "../types/movie";
import { MOCK_MOVIES } from "../data/mockMovies";
import { Play, Plus, Edit, Trash2, LayoutGrid, Terminal, BarChart2, ShieldAlert, Sparkles, Check, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const AdminPage: React.FC = () => {
  // Store movies in local state to allow addition, editing, deletion
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formGenres, setFormGenres] = useState("Sci-Fi, Action");
  const [formDirector, setFormDirector] = useState("");
  const [formRating, setFormRating] = useState(8.5);
  const [formYear, setFormYear] = useState(2024);
  const [formOverview, setFormOverview] = useState("");
  const [formPoster, setFormPoster] = useState("https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80");

  // Telemetry simulator log lines
  const logs = [
    { time: "16:42:01", level: "INFO", message: "API service boot success. Port: 3000" },
    { time: "16:42:05", level: "INFO", message: "Vite dev server mounted safely." },
    { time: "16:43:18", level: "SUCCESS", message: "Gemini Model 3.5 Flash handshake confirmed." },
    { time: "16:44:59", level: "API_POST", message: "POST /api/recommendations - Status 200 - Latency 420ms" },
    { time: "16:45:12", level: "API_POST", message: "POST /api/recommendations - Status 200 - Latency 380ms" },
    { time: "16:46:00", level: "WARN", message: "Cache refresh recommended. Next cron: 04:00" }
  ];

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newMovie: Movie = {
      id: formTitle.toLowerCase().replace(/\s+/g, "-"),
      title: formTitle,
      posterUrl: formPoster,
      backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
      genres: formGenres.split(",").map(g => g.trim()),
      director: formDirector || "Unknown Director",
      cast: ["Lead Actor", "Supporting Actor"],
      rating: formRating,
      releaseYear: formYear,
      runtime: 120,
      overview: formOverview || "An outstanding masterpiece added recently by Admin console.",
      budget: "50M",
      revenue: "120M",
      language: "English",
      streamingPlatforms: ["Netflix"],
      popularity: 90,
      keywords: ["custom", "admin"],
      trailerKey: "",
      reviews: []
    };

    setMovies([newMovie, ...movies]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie) return;

    const updated = movies.map(m => {
      if (m.id === selectedMovie.id) {
        return {
          ...m,
          title: formTitle,
          genres: formGenres.split(",").map(g => g.trim()),
          director: formDirector,
          rating: formRating,
          releaseYear: formYear,
          overview: formOverview
        };
      }
      return m;
    });

    setMovies(updated);
    setShowEditModal(false);
    setSelectedMovie(null);
    resetForm();
  };

  const handleDeleteMovie = (id: string) => {
    if (window.confirm("Are you sure you want to remove this movie from local index?")) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  const handleOpenEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setFormTitle(movie.title);
    setFormGenres(movie.genres.join(", "));
    setFormDirector(movie.director);
    setFormRating(movie.rating);
    setFormYear(movie.releaseYear);
    setFormOverview(movie.overview);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormTitle("");
    setFormGenres("Sci-Fi, Action");
    setFormDirector("");
    setFormRating(8.5);
    setFormYear(2024);
    setFormOverview("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 text-white text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E50914]/10 text-[#E50914]">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-sans text-3xl font-black uppercase tracking-tight">Admin Terminal</h1>
            <p className="font-sans text-sm text-gray-500">Monitor recommendations metrics, index size, and direct catalog inserts.</p>
          </div>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center space-x-1.5 rounded-xl bg-[#E50914] px-4 py-2.5 font-sans text-xs font-black uppercase tracking-wider text-white hover:bg-[#FF3B3B] transition shadow-lg shadow-[#E50914]/20"
        >
          <Plus className="h-4 w-4" />
          <span>Insert New Movie</span>
        </button>
      </div>

      {/* METRIC BADGES ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-white/5 bg-[#121212] p-5">
          <span className="block font-sans text-[10px] text-gray-500 uppercase">Active Index Size</span>
          <p className="font-mono text-2xl font-bold mt-1 text-white">{movies.length} titles</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#121212] p-5">
          <span className="block font-sans text-[10px] text-gray-500 uppercase">Weekly Queries</span>
          <p className="font-mono text-2xl font-bold mt-1 text-white">4,812 requests</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#121212] p-5">
          <span className="block font-sans text-[10px] text-gray-500 uppercase">API Pipeline Integrity</span>
          <p className="font-sans text-xs font-bold mt-2 text-emerald-400 flex items-center">
            <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            100% SECURE HANDSHAKE
          </p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#121212] p-5">
          <span className="block font-sans text-[10px] text-gray-500 uppercase">Model Latency (Avg)</span>
          <p className="font-mono text-2xl font-bold mt-1 text-white">410 ms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ANALYTICS CHARTS COLUMN (CUSTOM RESPONSIVE VISUALIZATIONS) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 space-y-6">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
              <BarChart2 className="h-4.5 w-4.5 text-[#E50914]" />
              <span>Model Analytics</span>
            </h3>

            {/* Top Recommended Genres Gauge List */}
            <div className="space-y-4">
              <span className="block font-sans text-xs font-bold text-gray-500">Most Matched Genres</span>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between font-sans text-xs">
                    <span className="text-gray-300">Sci-Fi</span>
                    <span className="font-mono text-gray-500">42%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#E50914] to-[#FF3B3B] rounded-full" style={{ width: "42%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-sans text-xs">
                    <span className="text-gray-300">Action</span>
                    <span className="font-mono text-gray-500">28%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#E50914] to-[#FF3B3B] rounded-full" style={{ width: "28%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-sans text-xs">
                    <span className="text-gray-300">Thriller</span>
                    <span className="font-mono text-gray-500">18%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#E50914] to-[#FF3B3B] rounded-full" style={{ width: "18%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Subscriptions density map */}
            <div className="space-y-3 border-t border-white/5 pt-5">
              <span className="block font-sans text-xs font-bold text-gray-500">Subscriber Platform Density</span>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="font-mono text-base font-bold">Netflix</p>
                  <span className="font-sans text-[10px] text-gray-500">88% Density</span>
                </div>
                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="font-mono text-base font-bold">Prime</p>
                  <span className="font-sans text-[10px] text-gray-500">54% Density</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Logging Terminal */}
            <div className="space-y-2 border-t border-white/5 pt-5">
              <span className="block font-sans text-xs font-bold text-gray-500 flex items-center space-x-1.5">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span>Live Telemetry Streams</span>
              </span>
              <div className="rounded-xl bg-black p-3 font-mono text-[9px] text-emerald-400 space-y-1.5 h-36 overflow-y-auto border border-white/10 select-none">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gray-600">[{log.time}]</span>
                    <span className={log.level === "SUCCESS" ? "text-emerald-300 font-bold" : log.level === "WARN" ? "text-amber-400" : "text-gray-400"}>{log.level}</span>
                    <span className="text-gray-300 truncate">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* CATALOGUE EDITOR TABLE GRID */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 space-y-5">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
              <LayoutGrid className="h-4.5 w-4.5 text-[#E50914]" />
              <span>Movie Index Catalogue ({movies.length})</span>
            </h3>

            {/* Simple Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-500 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 pl-2">Movie Title</th>
                    <th className="pb-3">Director</th>
                    <th className="pb-3">Genres</th>
                    <th className="pb-3">IMDb Score</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {movies.map(movie => (
                    <tr key={movie.id} className="hover:bg-white/5 transition">
                      <td className="py-3 pl-2 flex items-center space-x-3 max-w-xs">
                        <img src={movie.posterUrl} alt={movie.title} className="h-10 w-7 rounded object-cover" />
                        <div className="truncate">
                          <p className="font-bold text-white truncate">{movie.title}</p>
                          <span className="block text-[10px] text-gray-500">{movie.releaseYear}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-300">{movie.director}</td>
                      <td className="py-3 text-gray-400 truncate max-w-[120px]">{movie.genres.join(", ")}</td>
                      <td className="py-3 font-bold text-[#FF3B3B]">{movie.rating.toFixed(1)}</td>
                      <td className="py-3 text-right pr-2 space-x-2">
                        <button
                          onClick={() => handleOpenEdit(movie)}
                          className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white"
                          title="Edit Specs"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMovie(movie.id)}
                          className="p-1.5 rounded hover:bg-[#FF3B3B]/10 text-gray-500 hover:text-[#FF3B3B]"
                          title="Delete Movie"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>

      {/* PORTALS: ADD NEW MOVIE LIGHTBOX MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 text-left">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg rounded-3xl bg-[#161616] p-6 border border-white/10 shadow-2xl"
            >
              <h3 className="font-sans text-lg font-bold text-white mb-4">Insert New Catalog Movie</h3>
              
              <form onSubmit={handleAddMovie} className="space-y-4 font-sans text-xs">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400">Movie Title</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400">Director</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formDirector}
                      onChange={(e) => setFormDirector(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400">IMDb Score</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formRating}
                      onChange={(e) => setFormRating(parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400">Release Year</label>
                    <input
                      type="number"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formYear}
                      onChange={(e) => setFormYear(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400">Genres (Comma separated)</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formGenres}
                      onChange={(e) => setFormGenres(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400">Poster Url</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                    value={formPoster}
                    onChange={(e) => setFormPoster(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400">Overview / Plot Summary</label>
                  <textarea
                    className="w-full h-20 rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none resize-none"
                    value={formOverview}
                    onChange={(e) => setFormOverview(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#E50914] px-5 py-2 font-bold text-white hover:bg-[#FF3B3B]"
                  >
                    Insert Title
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PORTALS: EDIT MOVIE LIGHTBOX MODAL */}
      <AnimatePresence>
        {showEditModal && selectedMovie && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 text-left">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg rounded-3xl bg-[#161616] p-6 border border-white/10 shadow-2xl"
            >
              <h3 className="font-sans text-lg font-bold text-white mb-4">Edit Movie Parameters</h3>
              
              <form onSubmit={handleEditMovie} className="space-y-4 font-sans text-xs">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400">Movie Title</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400">Director</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formDirector}
                      onChange={(e) => setFormDirector(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-400">IMDb Score</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formRating}
                      onChange={(e) => setFormRating(parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400">Release Year</label>
                    <input
                      type="number"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formYear}
                      onChange={(e) => setFormYear(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400">Genres</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none"
                      value={formGenres}
                      onChange={(e) => setFormGenres(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400">Overview / Plot Summary</label>
                  <textarea
                    className="w-full h-20 rounded-xl border border-white/5 bg-white/5 p-2.5 text-white outline-none resize-none"
                    value={formOverview}
                    onChange={(e) => setFormOverview(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#E50914] px-5 py-2 font-bold text-white hover:bg-[#FF3B3B]"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
