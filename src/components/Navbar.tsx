import React, { useState } from "react";
import { useNavigation, PageName } from "../context/NavigationContext";
import { useAuth } from "../context/AuthContext";
import { Film, Bell, LogOut, User, BarChart2, TrendingUp, Compass, Bookmark, Menu, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo } = useNavigation();
  const { user, logout, notifications, markNotificationRead, clearNotifications } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNav = (page: PageName) => {
    navigateTo(page);
    setShowMobileMenu(false);
  };

  const navItems = [
    { name: "Explore", page: "dashboard" as PageName, icon: Compass },
    { name: "AI Match", page: "recommend" as PageName, icon: SparklesIcon },
    { name: "Trending", page: "trending" as PageName, icon: TrendingUp },
    { name: "Watchlist", page: "watchlist" as PageName, icon: Bookmark },
  ];

  return (
    <header id="app-navbar" className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0B0B]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => navigateTo(user ? "dashboard" : "landing")}
          className="flex cursor-pointer items-center space-x-2 text-[#E50914] transition hover:opacity-90"
        >
          <Film className="h-7 w-7 stroke-[2.5]" />
          <span className="font-sans text-xl font-black uppercase tracking-wider">CineMatch<span className="text-white font-medium">AI</span></span>
        </div>

        {/* Desktop Nav Items */}
        {user && (
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`relative flex items-center space-x-1.5 py-2 font-sans text-sm font-medium transition ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-[#E50914]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* User profile & Notifications Controls */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-full p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E50914] opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E50914]"></span>
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute right-0 mt-2 z-20 w-80 rounded-xl border border-white/10 bg-[#1A1A1A] p-4 shadow-2xl backdrop-blur-xl"
                      >
                        <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2">
                          <h4 className="font-sans font-semibold text-white text-sm">Notifications</h4>
                          {notifications.length > 0 && (
                            <button
                              onClick={clearNotifications}
                              className="font-sans text-xs text-[#FF3B3B] hover:underline"
                            >
                              Clear All
                            </button>
                          )}
                        </div>
                        <div className="max-h-64 overflow-y-auto space-y-2.5">
                          {notifications.length === 0 ? (
                            <p className="py-4 text-center font-sans text-xs text-gray-500">No new notifications</p>
                          ) : (
                            notifications.map((note) => (
                              <div
                                key={note.id}
                                onClick={() => markNotificationRead(note.id)}
                                className={`flex items-start justify-between rounded-lg p-2 transition cursor-pointer ${
                                  note.read ? "bg-transparent opacity-60" : "bg-white/5 hover:bg-white/10"
                                }`}
                              >
                                <div className="space-y-0.5">
                                  <p className="font-sans text-xs text-white leading-relaxed">{note.message}</p>
                                  <span className="block font-mono text-[10px] text-gray-500">{note.timestamp}</span>
                                </div>
                                {!note.read && (
                                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 ml-1 mt-0.5" />
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Admin Button */}
              <button
                onClick={() => handleNav("admin")}
                className={`hidden sm:flex items-center space-x-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white ${
                  currentPage === "admin" ? "border-[#E50914] text-[#E50914]" : ""
                }`}
              >
                <BarChart2 className="h-3.5 w-3.5" />
                <span>Admin</span>
              </button>

              {/* User Avatar Dropdown */}
              <div 
                onClick={() => handleNav("profile")}
                className="flex cursor-pointer items-center space-x-2 group"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-8 w-8 rounded-full border-2 border-transparent object-cover transition group-hover:border-[#E50914]"
                />
                <span className="hidden lg:block font-sans text-sm font-medium text-gray-300 group-hover:text-white transition">
                  {user.username}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="hidden md:flex rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white transition"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNav("login")}
                className="rounded-lg bg-[#E50914] px-4 py-1.5 font-sans text-sm font-semibold text-white transition hover:bg-[#FF3B3B] shadow-lg shadow-[#E50914]/25"
              >
                Sign In
              </button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          {user && (
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white md:hidden transition"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {showMobileMenu && user && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0B0B0B] px-4 py-4 space-y-3"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`flex w-full items-center space-x-3 rounded-lg p-2.5 font-sans text-base font-medium transition ${
                    isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
            
            <div className="border-t border-white/5 pt-3 flex flex-col space-y-2">
              <button
                onClick={() => handleNav("admin")}
                className={`flex w-full items-center space-x-3 rounded-lg p-2.5 font-sans text-base font-medium transition ${
                  currentPage === "admin" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <BarChart2 className="h-5 w-5" />
                <span>Admin Analytics</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
                className="flex w-full items-center space-x-3 rounded-lg p-2.5 font-sans text-base font-medium text-[#FF3B3B] hover:bg-[#FF3B3B]/10 transition"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Simple Sparkles inline icon since it fits the CineMatch mood
const SparklesIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
    <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
  </svg>
);
