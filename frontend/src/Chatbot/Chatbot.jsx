import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLottie } from "lottie-react";
import successAnimation from "../assets/Female.json"; 
import errorAnimation from "../assets/Thinking.json";

const PopupAnimation = ({ type }) => {
  const { View } = useLottie({
    animationData: type === "success" ? successAnimation : errorAnimation,
    loop: false,
    autoplay: true,
  });
  return <>{View}</>;
};

export default function Chatbot() {

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setModalState({
          isOpen: true,
          type: "success",
          message: "Message sent successfully! Our team will get back to you shortly."
        });

        setIsSubmitted(true); 

        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
          setModalState(prev => ({ ...prev, isOpen: false })); 
          setFormData({ name: '', email: '', phone: '' });
        }, 3000);
      } else {
        setModalState({
          isOpen: true,
          type: "error",
          message: "Failed to send message. Please try again."
        });
        
        setTimeout(() => setModalState(prev => ({ ...prev, isOpen: false })), 3000);
      }
    } catch (err) {
      console.error("Chatbot Error:", err);
      
      setModalState({
        isOpen: true,
        type: "error",
        message: "Network error. Please check your connection."
      });

      setTimeout(() => setModalState(prev => ({ ...prev, isOpen: false })), 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold">G-TEC Assistant</h3>
                <p className="text-xs text-blue-200">Online | Ready to help</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 bg-slate-50">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    ✓
                  </div>
                  <h4 className="font-bold text-gray-800">Thank You!</h4>
                  <p className="text-sm text-gray-600 mt-2">Our team will contact you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    Hi! Please provide your details below and an expert will reach out to you shortly.
                  </p>
                  
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <Send size={16} /> Send Details
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700 hover:scale-105 transition-all focus:outline-none"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
      <AnimatePresence>
        {modalState.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-4xl p-8 max-w-sm w-full flex flex-col items-center text-center shadow-2xl border border-white/20"
            >
              <div className="w-70 h-70 mb-5 flex justify-center items-center">
                <PopupAnimation type={modalState.type} />
              </div>

              <h3 className={`text-2xl font-black mb-2 ${
                modalState.type === "success" ? "text-emerald-600" : "text-red-600"
              }`}>
                {modalState.type === "success" ? "Sent!" : "Failed"}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed px-2">
                {modalState.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}