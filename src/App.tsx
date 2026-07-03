import React from "react";
import { NavigationProvider, useNavigation } from "./context/NavigationContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Page Imports
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AIRecommendPage } from "./pages/AIRecommendPage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import { WatchlistPage } from "./pages/WatchlistPage";
import { TrendingPage } from "./pages/TrendingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPage } from "./pages/AdminPage";

// Icons & Animations
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

// Notification Toast Portal
const NotificationToasts: React.FC = () => {
  const { notifications, markNotificationRead } = useAuth();
  
  // Show only unread and active notifications (last 3)
  const activeNotes = notifications.filter(n => !n.read).slice(0, 3);

  return (
    <div className="fixed top-20 right-4 z-[999] w-full max-w-sm space-y-2 pointer-events-none">
      <AnimatePresence>
        {activeNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={`pointer-events-auto flex items-start space-x-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md ${
              note.type === "success"
                ? "border-emerald-500/20 bg-emerald-950/80 text-emerald-200"
                : note.type === "error"
                ? "border-[#FF3B3B]/20 bg-[#FF3B3B]/10 text-[#FF3B3B]"
                : "border-indigo-500/20 bg-indigo-950/80 text-indigo-200"
            }`}
          >
            {note.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
            ) : note.type === "error" ? (
              <AlertCircle className="h-5 w-5 shrink-0 text-[#FF3B3B] mt-0.5" />
            ) : (
              <Info className="h-5 w-5 shrink-0 text-indigo-400 mt-0.5" />
            )}

            <div className="flex-1 text-left">
              <p className="font-sans text-xs font-bold leading-relaxed">{note.message}</p>
            </div>

            <button
              onClick={() => markNotificationRead(note.id)}
              className="text-gray-400 hover:text-white transition shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Route Switcher with Guard Rails
const PageRenderer: React.FC = () => {
  const { currentPage } = useNavigation();
  const { user } = useAuth();

  // Route Guard: Access restriction for unauthenticated guest sessions
  const requiresAuth = [
    "dashboard",
    "recommend",
    "details",
    "watchlist",
    "trending",
    "profile",
    "admin"
  ].includes(currentPage);

  const shouldRenderAuth = requiresAuth && !user;

  // Fade-in Page Transitions
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  const renderContent = () => {
    if (shouldRenderAuth) {
      return <AuthPage />;
    }

    switch (currentPage) {
      case "landing":
        return <LandingPage />;
      case "login":
        return <AuthPage />;
      case "dashboard":
        return <DashboardPage />;
      case "recommend":
        return <AIRecommendPage />;
      case "details":
        return <MovieDetailsPage />;
      case "watchlist":
        return <WatchlistPage />;
      case "trending":
        return <TrendingPage />;
      case "profile":
        return <ProfilePage />;
      case "admin":
        return <AdminPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={currentPage + (shouldRenderAuth ? "_guarded" : "")}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1 min-h-[75vh]"
      >
        {renderContent()}
      </motion.main>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <AuthProvider>
        <WatchlistProvider>
          <div className="flex min-h-screen flex-col bg-[#0B0B0B] text-white">
            {/* Header bar */}
            <Navbar />

            {/* Notification system overlay */}
            <NotificationToasts />

            {/* Core Router */}
            <PageRenderer />

            {/* Footer */}
            <Footer />
          </div>
        </WatchlistProvider>
      </AuthProvider>
    </NavigationProvider>
  );
}
