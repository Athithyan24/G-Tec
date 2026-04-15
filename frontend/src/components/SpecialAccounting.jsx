import React from "react";
import { motion } from "framer-motion";
import { 
  MousePointer2, 
  Type, 
  Image as ImageIcon, 
  LayoutTemplate, 
  PenTool, 
  Shapes,
  Settings,
  LayoutDashboard,
  FileText,
  Sprout,
  ChevronRight,
  AlignCenter,
  AlignRight,
  AlignLeft,
  Plus 
} from "lucide-react";
import WebDevSpecial from './SpecialWebDev'

const specializedCourses = [
  {
    title: "SAP ERP",
    icon: Settings,
    description: "Master enterprise Financial Accounting (FI) and Controlling (CO) modules.",
  },
  {
    title: "Tally Prime",
    icon: LayoutDashboard,
    description: "Learn complete business accounting, inventory control, and statutory compliance (GST).",
  },
  {
    title: "Sage 50 Accounting",
    icon: FileText,
    description: "Gain hands-on bookkeeping, invoicing, and financial reporting skills for small businesses.",
  },
];

const SpecialAccounting = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.15 
      },
    },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
    <section className="w-full bg-linear-to-t from-white via-purple-300 to-[#ffffff] py-10 md:py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-20 items-center">
        
        {/* ================= LEFT COLUMN: TEXT CONTENT ================= */}
        <motion.div
          variants={leftColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="flex flex-col items-start gap-8 order-2 md:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 items-start"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-800">
              <Sprout size={28} strokeWidth={1.5} />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-gray-950 tracking-tight leading-tight">
              Special Area
            </h2>
            <p className="text-gray-800 text-lg md:text-xl font-medium max-w-lg">
              Expertise in specialized Accounting, Tally, SAP, and Sage 50 courses.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            className="w-full flex flex-col gap-6 md:gap-8 mt-2"
          >
            {specializedCourses.map((course, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 md:gap-5"
              >
                <div className="text-blue-600 mt-1 shrink-0">
                  <course.icon size={32} strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-950">
                    {course.title}
                  </h3>
                  <p className="text-gray-800 text-base leading-relaxed max-w-md">
                    {course.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
  className="relative mt-2 flex items-center pl-6 md:pl-8 pr-16 md:pr-20 py-3 md:py-4 bg-black text-white rounded-full font-bold text-base md:text-lg group overflow-hidden shadow-xl shadow-gray-200"
>
  {/* Text stays above the expanding background and changes to black on hover */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
    Explore Courses
  </span>
  
  {/* The expanding white circle background container */}
  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white rounded-full transition-all duration-300 group-hover:w-[calc(100%-0.75rem)] group-active:scale-95 z-0">
    <ChevronRight 
      size={20} 
      className="text-black transition-transform duration-300 group-hover:-translate-x-25" 
    />
  </div>
</motion.button>
        </motion.div>

       {/* ================= RIGHT COLUMN: DASHBOARD UI MOCKUP ================= */}
        <motion.div
          variants={rightColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="relative w-full order-1 lg:order-2 mb-10 lg:mb-0"
        >
          {/* Main Dashboard Container */}
          <div className="w-full aspect-4/3 lg:aspect-16/11 bg-white rounded-4xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex">
            
            {/* 1. Sidebar (Tools) - Stays full height */}
            <div className="w-16 bg-gray-50/80 border-r border-gray-100 flex flex-col items-center py-6 gap-6 shrink-0 z-10">
              <div className="p-2.5 bg-white rounded-xl shadow-sm text-purple-600">
                <MousePointer2 size={20} className="fill-purple-600" />
              </div>
              <div className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <LayoutTemplate size={20} />
              </div>
              <div className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Type size={20} />
              </div>
              <div className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <PenTool size={20} />
              </div>
              <div className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Shapes size={20} />
              </div>
              <div className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <ImageIcon size={20} />
              </div>
              <div className="mt-auto p-2.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Settings size={20} />
              </div>
            </div>

            {/* 2. Main Area Wrapper (Contains Top Header + Workspace) */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              
              {/* Top Navigation Bar - Now spans the entire width of the main area */}
              <div className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6 shrink-0 z-20">
                <span className="text-sm font-bold text-gray-800">
                  Agency / Portfolio
                </span>
                
                {/* User Avatars & Share */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <img src="https://i.pravatar.cc/100?img=1" alt="User 1" className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 z-10 shadow-sm" />
                    <img src="https://i.pravatar.cc/100?img=2" alt="User 2" className="w-8 h-8 rounded-full border-2 border-white bg-green-100 -ml-2 z-20 shadow-sm" />
                    <img src="https://i.pravatar.cc/100?img=3" alt="User 3" className="w-8 h-8 rounded-full border-2 border-white bg-pink-100 -ml-2 z-30 shadow-sm" />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors shadow-sm hidden md:block">
                    Share
                  </button>
                </div>
              </div>

              {/* Workspace Split (Canvas on left, Properties on right) */}
              <div className="flex-1 flex relative overflow-hidden">
                
                {/* Canvas Area with Image and Animated Mouse */}
                <div className="flex-1 relative flex items-center justify-center p-8 bg-[#FAFAFA]">
                  
                  {/* Active Selection Box around the image */}
                  <div className="relative inline-block  p-1 bg-white/50 group">
                    

                    <img 
                      src="acc.jpg" 
                      alt="Workspace object" 
                      className="w-48 h-48 lg:w-64 lg:h-64 object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Auto-Moving Cursor */}
                  <motion.div
                    className="absolute pointer-events-none flex flex-col items-start z-50"
                    animate={{ 
                      x: [0, 100, -30, 0], 
                      y: [0, -60, 30, 0] 
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    style={{ top: '45%', left: '40%' }}
                  >
                    <MousePointer2 className="w-6 h-6 text-indigo-500 fill-indigo-500 -rotate-12" />
                    <div className="bg-indigo-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md ml-4 mt-0">
                      David
                    </div>
                  </motion.div>
                </div>

                {/* Right Sidebar (Properties Panel) - Now safely under the header */}
                <div className="w-48 lg:w-56 bg-white border-l border-gray-100 flex flex-col hidden md:flex shrink-0 z-10 text-[12px] text-gray-600 overflow-y-auto custom-scrollbar">
                  
                  {/* Frame / Position Section */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-3 text-[13px]">Position</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100">
                        <span className="text-gray-400 font-medium">X</span>
                        <span className="font-medium text-gray-800">120</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100">
                        <span className="text-gray-400 font-medium">Y</span>
                        <span className="font-medium text-gray-800">45</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100">
                        <span className="text-gray-400 font-medium">W</span>
                        <span className="font-medium text-gray-800">800</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100">
                        <span className="text-gray-400 font-medium">H</span>
                        <span className="font-medium text-gray-800">600</span>
                      </div>
                    </div>
                  </div>

                  {/* Layout Section */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-3 text-[13px]">Layout</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-1 rounded-lg border border-gray-100 w-full">
                      <div className="p-1.5 flex-1 flex justify-center bg-white shadow-sm rounded-md cursor-pointer text-gray-800">
                        <AlignLeft size={16}/>
                      </div>
                      <div className="p-1.5 flex-1 flex justify-center hover:bg-white rounded-md cursor-pointer text-gray-500 transition-colors">
                        <AlignCenter size={16}/>
                      </div>
                      <div className="p-1.5 flex-1 flex justify-center hover:bg-white rounded-md cursor-pointer text-gray-500 transition-colors">
                        <AlignRight size={16}/>
                      </div>
                    </div>
                  </div>

                  {/* Appearance Section */}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 text-[13px]">Appearance</h4>
                    <div className="flex flex-col gap-3">
                      
                      {/* Opacity */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">Opacity</span>
                        <span className="font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-100 text-gray-800">100%</span>
                      </div>
                      
                      {/* Fill Color */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 font-medium">Fill</span>
                          <Plus size={14} className="cursor-pointer text-gray-400 hover:text-gray-800" />
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-md border border-gray-100">
                          <div className="w-4 h-4 rounded-[3px] bg-purple-500 border border-purple-600 shadow-inner shrink-0"></div>
                          <span className="font-medium uppercase flex-1 text-gray-800 tracking-wide text-[11px]">#8B5CF6</span>
                          <span className="text-gray-500 text-[11px]">100%</span>
                        </div>
                      </div>

                      {/* Stroke */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-gray-500 font-medium">Stroke</span>
                        <Plus size={14} className="cursor-pointer text-gray-400 hover:text-gray-800" />
                      </div>
                      
                      {/* Effects */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-gray-500 font-medium">Effects</span>
                        <Plus size={14} className="cursor-pointer text-gray-400 hover:text-gray-800" />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
            
          </div>
        </motion.div>

      </div>
    </section>
    <WebDevSpecial/>
    </>
  );
};

export default SpecialAccounting;