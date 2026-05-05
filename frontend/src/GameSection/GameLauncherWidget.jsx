import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LottieBase from "lottie-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, X } from "lucide-react";
import gaming from "../assets/gaming.json"; // Adjust path if needed

const Lottie = LottieBase.default || LottieBase;

export default function GameLauncherWidget() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-hide the tooltip after 10 seconds to not annoy the user
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Hide widget completely if we are ALREADY on the game page
  if (location.pathname === "/game") return null;

  return (
    <div className="fixed bottom-6 left-6 z-90000 flex flex-col items-start pointer-events-auto">
      
      {/* Pop-up Tooltip Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-2xl rounded-bl-none shadow-[0_10px_30px_rgba(34,211,238,0.5)] flex items-center gap-3 cursor-pointer relative"
            onClick={() => navigate("/game")}
          >
            <Sparkles size={20} className="text-yellow-300 animate-pulse" />
            <span className="font-black text-sm tracking-wide">Play & Win 100% Scholarship!</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }} 
              className="ml-2 bg-black/20 hover:bg-black/40 p-1.5 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Lottie Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/game")}
        className="w-20 h-20 bg-blue-950/90 backdrop-blur-md border-2 border-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center relative group"
      >
        {/* Pulsing ring behind the button */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping"></div>
        
        {/* The Lottie Animation */}
        <div className="w-[120%] h-[120%] absolute">
          <Lottie animationData={gaming} loop={true} />
        </div>
      </motion.button>
      
    </div>
  );
}