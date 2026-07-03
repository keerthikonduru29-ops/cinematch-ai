import React from "react";
import { useNavigation } from "../context/NavigationContext";
import { useAuth } from "../context/AuthContext";
import { Sparkles, Compass, Play, ArrowRight, Shield, Award, Heart, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { MOCK_MOVIES } from "../data/mockMovies";

export const LandingPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { user } = useAuth();

  const handleGetStarted = () => {
    navigateTo(user ? "recommend" : "login");
  };

  const handleExplore = () => {
    navigateTo(user ? "dashboard" : "login");
  };

  // Staggered list configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="relative overflow-hidden bg-[#0B0B0B] text-white">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#E50914]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full bg-[#FF3B3B]/5 blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-[#FF3B3B]" />
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">
                Next-Gen Cinematic Recommendation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-4xl font-extrabold tracking-tight sm:text-6xl text-white leading-tight"
            >
              Discover Your Next <br />
              <span className="bg-gradient-to-r from-[#E50914] to-[#FF3B3B] bg-clip-text text-transparent">
                Favorite Movie
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-lg text-gray-400 max-w-lg leading-relaxed"
            >
              CineMatch AI leverages advanced semantic matching and Gemini AI reasoning to parse your moods, platform preferences, and cinematic tastes to deliver personalized watchlists.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={handleGetStarted}
                className="group flex items-center justify-center space-x-2 rounded-xl bg-[#E50914] px-6 py-3.5 font-sans text-sm font-bold text-white transition hover:bg-[#FF3B3B] hover:shadow-lg hover:shadow-[#E50914]/30"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={handleExplore}
                className="flex items-center justify-center space-x-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-sans text-sm font-bold text-gray-200 transition hover:bg-white/10 hover:text-white"
              >
                <Compass className="h-4 w-4" />
                <span>Explore Catalog</span>
              </button>
            </motion.div>
          </div>

          {/* Right Floating Posters Column */}
          <div className="lg:col-span-5 relative h-[450px] w-full hidden lg:flex items-center justify-center">
            {/* Poster Stack */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-72 h-[380px] rounded-2xl shadow-2xl"
            >
              {/* Back Poster */}
              <div className="absolute top-0 -left-12 -rotate-12 w-full h-full overflow-hidden rounded-2xl border border-white/5 opacity-40 blur-[0.5px]">
                <img
                  src={MOCK_MOVIES[1].posterUrl}
                  alt="Poster"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Front Poster */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-[#E50914]/15">
                <img
                  src={MOCK_MOVIES[0].posterUrl}
                  alt="Poster"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="rounded bg-[#E50914] px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-white">99% MATCH</span>
                  <h4 className="mt-1.5 font-sans text-lg font-bold text-white">Inception</h4>
                </div>
              </div>

              {/* Side Poster */}
              <div className="absolute top-4 -right-12 rotate-12 w-full h-full overflow-hidden rounded-2xl border border-white/5 opacity-40 blur-[0.5px]">
                <img
                  src={MOCK_MOVIES[4].posterUrl}
                  alt="Poster"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Popular Trending Carousel Banner */}
      <section className="border-t border-white/5 bg-[#0e0e0e] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-sans text-xl font-bold text-white">Now Trending on CineMatch</h2>
            <button onClick={handleExplore} className="font-sans text-xs font-semibold text-[#E50914] hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {MOCK_MOVIES.slice(0, 6).map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-xl border border-white/5 aspect-[2/3] cursor-pointer group"
                onClick={() => navigateTo("details", { id: movie.id })}
              >
                <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                  <div className="space-y-0.5">
                    <p className="font-sans text-xs font-bold text-white truncate">{movie.title}</p>
                    <span className="block font-sans text-[9px] text-[#FF3B3B]">{movie.rating} IMDb</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Selling Points */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-sans text-3xl font-extrabold sm:text-4xl">Engineered for Cinema Lovers</h2>
          <p className="mx-auto max-w-lg font-sans text-sm text-gray-500">
            Ditch the endless scrolling. Find the perfect title for your movie night in under 60 seconds.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-white/5 bg-[#121212] p-6 space-y-4 hover:border-[#E50914]/20 transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E50914]/10 text-[#E50914]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-lg font-bold">Gemini AI Brain</h3>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              Real server-side AI reasoning. Cross-analyzes themes, keywords, directors, and complex storytelling to deliver customized watch lists.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-white/5 bg-[#121212] p-6 space-y-4 hover:border-[#E50914]/20 transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF3B3B]/10 text-[#FF3B3B]">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-lg font-bold">Streaming Integrations</h3>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              Configure your specific subscription platforms like Netflix, Prime Video, or Max, so we only recommend what you can actually stream.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-white/5 bg-[#121212] p-6 space-y-4 hover:border-[#E50914]/20 transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-lg font-bold">Durable Watchlists</h3>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              Create, sort, and save custom lists. Access your saved bookmarks and activity metrics securely on any device.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0e0e0e] border-t border-b border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="font-sans text-3xl font-extrabold text-white">What Movie Lovers Say</h2>
            <p className="font-sans text-sm text-gray-500">Real feedback from film enthusiasts around the globe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-[#121212] p-6 border border-white/5 space-y-4">
              <div className="flex text-[#FF3B3B]">
                <Heart className="h-4 w-4 fill-current" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
              </div>
              <p className="font-sans text-sm text-gray-400 italic">
                "CineMatch AI recommended 'Arrival' based on my sci-fi preference and late-night analytical mood. It is now my absolute favorite film!"
              </p>
              <div>
                <p className="font-sans text-xs font-bold text-white">Marcus Vance</p>
                <span className="font-sans text-[10px] text-gray-600">Letterboxd Creator</span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#121212] p-6 border border-white/5 space-y-4">
              <div className="flex text-[#FF3B3B]">
                <Heart className="h-4 w-4 fill-current" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
              </div>
              <p className="font-sans text-sm text-gray-400 italic">
                "No more arguing with my husband about what to stream. We use the 'Couple' viewing filter and let the AI find an exact match!"
              </p>
              <div>
                <p className="font-sans text-xs font-bold text-white">Sarah Jenkins</p>
                <span className="font-sans text-[10px] text-gray-600">Film Reviewer</span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#121212] p-6 border border-white/5 space-y-4">
              <div className="flex text-[#FF3B3B]">
                <Heart className="h-4 w-4 fill-current" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
                <Heart className="h-4 w-4 fill-current ml-0.5" />
              </div>
              <p className="font-sans text-sm text-gray-400 italic">
                "The admin interface metrics and the ability to test model responses directly makes this the most premium film database project I've seen."
              </p>
              <div>
                <p className="font-sans text-xs font-bold text-white">Devin Cooper</p>
                <span className="font-sans text-[10px] text-gray-600">Software Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
