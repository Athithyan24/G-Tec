import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100 } 
    },
  };

  return (
    <section className="relative w-full pt-20 pb-16 px-6 flex flex-col items-center overflow-hidden bg-[#F9FAFB]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-purple-200/30 blur-[120px] rounded-full -z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
          <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">New: G-Tech Courses 2026</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
          Master your future in <br /> 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">
            just a few clicks.
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Technical expertise and creative skills all in one powerful platform. 
          Elevate your career with offline courses and real-time mentorship.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 bg-[#8B5CF6] text-white rounded-full font-bold text-lg hover:bg-purple-700 transition-all flex items-center gap-2 shadow-xl shadow-purple-200">
            Get Started — it's free
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center gap-2">
            View Courses <ArrowUpRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        className="mt-20 w-full max-w-6xl"
      >
        <div className="relative rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden aspect-video bg-gray-100">
           <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
             [ G-Tech Course Showcase Visualization ]
           </div>
        </div>
      </motion.div>
    </section>
  );
};
