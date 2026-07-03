import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";
import { Mail, Lock, User, Key, CheckCircle, Github, Chrome, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

export const AuthPage: React.FC = () => {
  const { login, signup, addNotification } = useAuth();
  const { navigateTo } = useNavigation();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addNotification("Please fill in all fields.", "error");
      return;
    }
    if (!isLogin && !username) {
      addNotification("Please enter a username.", "error");
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, "password");
      } else {
        await signup(username, email);
      }
      navigateTo("dashboard");
    } catch (err) {
      console.error(err);
      addNotification("Authentication failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      const mockEmail = `${provider.toLowerCase()}User@example.com`;
      await login(mockEmail, provider);
      navigateTo("dashboard");
    } catch (err) {
      console.error(err);
      addNotification(`OAuth via ${provider} failed.`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addNotification("Please enter your email to receive a reset link.", "error");
      return;
    }
    addNotification(`A reset link has been dispatched to ${email}`, "success");
    setShowForgot(false);
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center bg-[#0B0B0B] px-4 py-12 text-white">
      {/* Background Poster Overlay */}
      <div 
        className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/90 via-[#0B0B0B]/95 to-[#0B0B0B] pointer-events-none" />

      {/* Main Authentication Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1A1A]/85 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
      >
        {!showForgot ? (
          <>
            {/* Header */}
            <div className="mb-8 text-center space-y-2">
              <h2 className="font-sans text-3xl font-extrabold text-white">
                {isLogin ? "Sign In" : "Create Account"}
              </h2>
              <p className="font-sans text-xs text-gray-400">
                {isLogin ? "Welcome back to CineMatch AI" : "Join the premium AI recommendation engine"}
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5 text-left">
                  <label className="block font-sans text-xs font-semibold text-gray-300">Username</label>
                  <div className="relative">
                    <User className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Keerthi Mehran"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 font-sans text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#E50914] focus:bg-white/[0.08]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="block font-sans text-xs font-semibold text-gray-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 font-sans text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#E50914] focus:bg-white/[0.08]"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label className="block font-sans text-xs font-semibold text-gray-300">Password</label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="font-sans text-xs text-[#FF3B3B] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-12 font-sans text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#E50914] focus:bg-white/[0.08]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              {isLogin && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center space-x-2 font-sans text-xs text-gray-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-[#E50914] rounded border-white/10 bg-white/5"
                    />
                    <span>Remember me on this session</span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#E50914] py-3 font-sans text-sm font-bold text-white transition hover:bg-[#FF3B3B] shadow-lg shadow-[#E50914]/20 disabled:opacity-55 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
              <span className="relative bg-[#1A1A1A] px-3 font-sans text-[10px] uppercase tracking-wider text-gray-500">Or continue with</span>
            </div>

            {/* Social Authentication Row */}
            <div className="grid grid-cols-2 gap-3.5">
              <button
                onClick={() => handleOAuthLogin("Google")}
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 rounded-xl border border-white/5 bg-white/5 py-2.5 font-sans text-xs font-semibold text-gray-200 transition hover:bg-white/10 hover:text-white"
              >
                <Chrome className="h-4 w-4" />
                <span>Google</span>
              </button>
              <button
                onClick={() => handleOAuthLogin("GitHub")}
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 rounded-xl border border-white/5 bg-white/5 py-2.5 font-sans text-xs font-semibold text-gray-200 transition hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </button>
            </div>

            {/* Account toggle link */}
            <p className="mt-8 text-center font-sans text-xs text-gray-400">
              {isLogin ? "New to CineMatch AI? " : "Already registered? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-[#E50914] hover:underline"
              >
                {isLogin ? "Create an account" : "Sign in here"}
              </button>
            </p>
          </>
        ) : (
          /* Forgot Password Interface */
          <form onSubmit={handleForgotPassword} className="space-y-4 text-left">
            <div className="text-center mb-6 space-y-2">
              <h3 className="font-sans text-2xl font-bold text-white">Reset Password</h3>
              <p className="font-sans text-xs text-gray-400">
                Input your credentials to secure a password reset pipeline.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block font-sans text-xs font-semibold text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 font-sans text-sm text-white placeholder-gray-500 outline-none focus:border-[#E50914]"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2.5 font-sans text-xs font-bold text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#E50914] py-2.5 font-sans text-xs font-bold text-white hover:bg-[#FF3B3B]"
              >
                Send Code
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
