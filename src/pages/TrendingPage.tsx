import React, { useState, useMemo } from "react";
import { MOCK_MOVIES } from "../data/mockMovies";
import { MovieCard } from "../components/MovieCard";
import { TrailerModal } from "../components/TrailerModal";
import { useNavigation } from "../context/NavigationContext";
import { Flame, Star, Award, TrendingUp, Sparkles, Trophy, Globe, Heart } from "lucide-react";
import { motion } from "motion/react";

export const TrendingPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [activeTrailerKey, setActiveTrailerKey] = useState<string | null>(null);

  // 1. Sort by popularity desc for "Today's Top 5"
  const topPopular = useMemo(() => {
    return [...MOCK_MOVIES].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
  }, []);

  // 2. Sort by rating desc for "Critical Gems"
  const topRated = useMemo(() => {
    return [...MOCK_MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }, []);

  // 3. Sort by revenue or box office size for "Box Office Giants"
  const boxOfficeGiants = useMemo(() => {
    return [...MOCK_MOVIES].filter(m => !m.revenue.includes("N/A")).slice(0, 4);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 text-white text-left">
      
      {/* Page Header */}
      <div className="flex items-center space-x-3.5 border-b border-white/5 pb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E50914]/10 text-[#E50914]">
          <Flame className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-sans text-3xl font-black uppercase tracking-tight">Trending Hub</h1>
          <p className="font-sans text-sm text-gray-500">Real-time metrics, popularity spikes, and box office leaders.</p>
        </div>
      </div>

      {/* SECTION 1: TOP 5 BANNER LIST */}
      <section className="space-y-6">
        <h2 className="font-sans text-lg font-black uppercase tracking-wider flex items-center space-x-2 text-white">
          <TrendingUp className="h-5 w-5 text-[#E50914]" />
          <span>Today's Top 5 Blockbusters</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {topPopular.map((movie, index) => (
            <motion.div
              key={movie.id}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl bg-[#141414] border border-white/5 overflow-hidden group cursor-pointer aspect-[2/3]"
              onClick={() => navigateTo("details", { id: movie.id })}
            >
              {/* Number Badge */}
              <div className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#E50914] font-sans text-lg font-black text-white shadow-lg shadow-[#E50914]/40">
                {index + 1}
              </div>

              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Glassmorphic Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4 text-left opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="rounded bg-[#E50914]/20 border border-[#E50914]/30 px-2 py-0.5 text-[8px] font-bold text-[#FF3B3B] w-max uppercase mb-1.5">
                  {movie.genres[0]}
                </span>
                <p className="font-sans text-xs font-bold text-white truncate">{movie.title}</p>
                <div className="flex items-center space-x-1.5 text-gray-400 text-[10px] mt-1">
                  <Star className="h-3 w-3 fill-[#FF3B3B] stroke-[#FF3B3B]" />
                  <span>{movie.rating.toFixed(1)} IMDb</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 2: CRITICAL GEMS GRID */}
      <section className="space-y-6">
        <h2 className="font-sans text-lg font-black uppercase tracking-wider flex items-center space-x-2 text-white">
          <Trophy className="h-5 w-5 text-amber-500" />
          <span>IMDb Critical Masterpieces</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {topRated.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlayTrailer={setActiveTrailerKey}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: BOX OFFICE GIANTS BACKDROP ROW */}
      <section className="space-y-6">
        <h2 className="font-sans text-lg font-black uppercase tracking-wider flex items-center space-x-2 text-white">
          <Globe className="h-5 w-5 text-indigo-400" />
          <span>Box Office Giants</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {boxOfficeGiants.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigateTo("details", { id: movie.id })}
              className="relative overflow-hidden rounded-2xl border border-white/5 aspect-[16/9] cursor-pointer group bg-neutral-900 shadow-xl"
            >
              <img
                src={movie.backdropUrl}
                alt={movie.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="text-left space-y-1.5">
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400 uppercase w-max block">
                    Revenue: ${movie.revenue}
                  </span>
                  <h3 className="font-sans text-lg font-black text-white">{movie.title}</h3>
                  <p className="font-sans text-xs text-gray-400 line-clamp-1">{movie.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTALS */}
      <TrailerModal
        trailerKey={activeTrailerKey}
        onClose={() => setActiveTrailerKey(null)}
      />

    </div>
  );
};
