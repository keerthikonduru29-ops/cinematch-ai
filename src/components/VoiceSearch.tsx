import React, { useState, useEffect } from "react";
import { Mic, MicOff, X, Sparkles, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ isOpen, onClose, onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
        setErrorMsg("");
      };

      rec.onresult = (event: any) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
        setTimeout(() => {
          onResult(speechToText);
          onClose();
        }, 1500);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setErrorMsg("Mic access restricted inside iframe. Use typing shortcuts below!");
        } else {
          setErrorMsg("Error detecting speech. Try again.");
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    } else {
      setErrorMsg("Voice search is not supported on this browser.");
    }
  }, [onResult, onClose]);

  const startSpeech = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (err) {
        recognition.stop();
      }
    } else {
      // Simulate voice input if not supported
      simulateVoice();
    }
  };

  const simulateVoice = () => {
    setIsListening(true);
    setTranscript("Listening for movie titles...");
    
    const mockPhrases = [
      "Mind-bending sci-fi movies like Interstellar",
      "Christopher Nolan director masterpieces",
      "Action thrillers streaming on Netflix",
      "Highly rated movies with Leonardo DiCaprio"
    ];

    const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)];
    
    let currentText = "";
    let i = 0;
    
    const timer = setInterval(() => {
      if (i < randomPhrase.length) {
        currentText += randomPhrase[i];
        setTranscript(currentText);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsListening(false);
          onResult(randomPhrase);
          onClose();
        }, 1200);
      }
    }, 45);
  };

  useEffect(() => {
    if (isOpen) {
      setTranscript("Speak now... (or try a preset shortcut below)");
      setErrorMsg("");
      startSpeech();
    } else {
      if (recognition) recognition.stop();
      setIsListening(false);
    }
  }, [isOpen]);

  const PRESET_QUERIES = [
    "Christopher Nolan thrillers",
    "Animated films",
    "Highly rated 2024 movies",
    "Sci-Fi on Netflix"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#161616] p-6 text-center shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1.5 text-gray-500 hover:bg-white/5 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Mic Pulse Icon */}
            <div className="my-8 flex justify-center">
              <div className="relative">
                <motion.div
                  animate={isListening ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full bg-[#E50914]/20"
                />
                <button
                  onClick={startSpeech}
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl transition ${
                    isListening ? "bg-[#E50914] shadow-[#E50914]/40" : "bg-neutral-800 hover:bg-neutral-700"
                  }`}
                >
                  {isListening ? (
                    <Mic className="h-8 w-8 animate-pulse" />
                  ) : (
                    <MicOff className="h-8 w-8" />
                  )}
                </button>
              </div>
            </div>

            {/* Title & Status */}
            <h3 className="font-sans text-lg font-bold text-white">Voice Search Engine</h3>
            
            {/* Waveform Visualization */}
            {isListening && (
              <div className="my-5 flex items-center justify-center gap-1 h-8">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [8, 24, 8] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5 + i * 0.1,
                      ease: "easeInOut"
                    }}
                    className="w-1 rounded-full bg-[#E50914]"
                  />
                ))}
              </div>
            )}

            {/* Output Transcript */}
            <div className="my-6 min-h-12 flex items-center justify-center px-4">
              <p className="font-sans text-sm text-gray-300 italic max-w-xs leading-relaxed">
                "{transcript}"
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 rounded-lg bg-[#FF3B3B]/10 p-2.5 border border-[#FF3B3B]/20">
                <p className="font-sans text-xs text-[#FF3B3B]">{errorMsg}</p>
              </div>
            )}

            {/* Presets / Fallback Shortcuts */}
            <div className="border-t border-white/5 pt-5 text-left">
              <span className="mb-2.5 block font-sans text-xs font-semibold uppercase tracking-wider text-gray-500">
                Or tap a cinematic preset:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_QUERIES.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      onResult(preset);
                      onClose();
                    }}
                    className="flex items-center space-x-1 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 font-sans text-xs text-gray-400 transition hover:border-[#E50914] hover:bg-[#E50914]/10 hover:text-white"
                  >
                    <Sparkles className="h-3 w-3 text-[#E50914]" />
                    <span>{preset}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
