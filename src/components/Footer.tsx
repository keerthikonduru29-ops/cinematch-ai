import React from "react";
import { Film, Github, Twitter, Youtube, Globe } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <footer id="app-footer" className="mt-auto border-t border-white/10 bg-[#0B0B0B] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-10 border-b border-white/5">
          
          {/* Brand block */}
          <div className="space-y-4">
            <div 
              onClick={() => navigateTo("landing")}
              className="flex cursor-pointer items-center space-x-2 text-[#E50914]"
            >
              <Film className="h-6 w-6 stroke-[2.5]" />
              <span className="font-sans text-lg font-black uppercase tracking-wider text-[#E50914]">
                CineMatch<span className="text-white font-medium">AI</span>
              </span>
            </div>
            <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-xs">
              Intelligent movie recommendations generated in real-time. Discover cinema tailored precisely to your mood, platforms, and preferences.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">Platform</h5>
            <ul className="space-y-2 font-sans text-xs text-gray-500">
              <li><button onClick={() => navigateTo("dashboard")} className="hover:text-white text-left transition">Explore Movies</button></li>
              <li><button onClick={() => navigateTo("recommend")} className="hover:text-white text-left transition">AI recommendation</button></li>
              <li><button onClick={() => navigateTo("trending")} className="hover:text-white text-left transition">Trending & Popular</button></li>
              <li><button onClick={() => navigateTo("watchlist")} className="hover:text-white text-left transition">My Watchlist</button></li>
            </ul>
          </div>

          {/* Genres */}
          <div className="space-y-3">
            <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">Popular Engines</h5>
            <ul className="space-y-2 font-sans text-xs text-gray-500">
              <li><span className="hover:text-white cursor-pointer transition">Sci-Fi Speculator</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Romantic Escapism</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Adrenaline Rush</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Indie Discovery</span></li>
            </ul>
          </div>

          {/* Built with */}
          <div className="space-y-3">
            <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-300">Credits</h5>
            <div className="space-y-2">
              <p className="font-sans text-xs text-gray-500">
                Powered by <span className="text-white font-medium">Gemini 3.5 Flash</span> & TMDB Core.
              </p>
              <div className="flex space-x-3.5 pt-1">
                <a href="#" className="text-gray-500 hover:text-white transition"><Twitter className="h-4 w-4" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition"><Youtube className="h-4 w-4" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition"><Github className="h-4 w-4" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition"><Globe className="h-4 w-4" /></a>
              </div>
            </div>
          </div>

        </div>

        {/* Licensing */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 font-sans text-[10px] text-gray-600 space-y-3 sm:space-y-0">
          <p>© 2026 CineMatch AI. Engineered with Gemini AI Studio Build.</p>
          <div className="flex space-x-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">TMDB API Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
