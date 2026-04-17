import React from "react";
import { motion } from "framer-motion";
import { 
  Type, ImageIcon, Hexagon, Layers, Palette, Settings, 
  MousePointer2, ChevronDown, Share2, GripVertical, Eye 
} from "lucide-react";
export default function CreativeWorkflowSection() {
    const img=["/cr1.jpg", "/cr2.jpg", "/cr3.jpg"];
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 font-sans text-center">
      
      {/* 1. Max-width Container for alignment */}
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* === TOP BLOCK: Heading, Paragraph, Button === */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {/* USER REQUEST: Heading - Match theme with bold black font and a blue emphasis on "Creative" */}
          <h1 className="text-5xl md:text-6xl font-clash text-black tracking-tighter leading-none max-w-4xl mx-auto">
            Take your <span className="text-blue-600">Creative</span> workflow to the next level
          </h1>

          {/* USER REQUEST: 2-line Paragraph - Light grey, centered, and matching creative theme */}
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
            Effortlessly create stunning visual content with our integrated suite of design tools. Enhance collaboration and speed up delivery times across your entire team.
          </p>

          {/* USER REQUEST: Button - Black background, blue text "Get start now" with a glow effect */}
          <button className="relative group bg-blue-800 text-white text-xl font-bold px-10 py-4.5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(29,112,242,0.3)] hover:shadow-[0_0_30px_rgba(29,112,242,0.5)]">
            <span className="relative z-10">Get start now</span>
          </button>
        </motion.div>

        {/* === BOTTOM BLOCK: Dashboard Mockup (Matching dark aesthetic from image) === */}
        <section className="w-full bg-white py-24 px-4 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Your Exact Starting Animation & Container */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative rounded-[3rem] p-2 shadow-2xl"
        >
          {/* 1. DASHBOARD HEADER (Logo, Profile, Share) */}
          <div className="bg-white rounded-t-[2.5rem] border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm relative z-20">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-200">G</div>
              <span className="font-bold text-gray-800 text-lg hidden md:block">G-TEC Nagercoil</span>
            </div>

            {/* Center: Profile/Agency Toggle */}
            <div className="flex items-center gap-2 bg-gray-50 px-5 py-2.5 rounded-full border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="w-6 h-6 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 border-2 border-white shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">Creative Flow UI</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>

            {/* Right: Badges + Share */}
            <div className="flex items-center gap-5">
              <div className="flex space-x-3">
                {img.map(i => (
                  <img src={i} className={`w-9 h-9 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm relative z-${40-i*10}`} />
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white bg-blue-50 text-blue-600 flex items-center justify-center text-[11px] font-bold shadow-sm relative z-10">+5</div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-colors">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          {/* 2. DASHBOARD BODY */}
          <div className="bg-white rounded-b-[2.5rem] flex flex-col md:flex-row min-h-[650px] overflow-hidden">
            
            {/* LEFT SIDEBAR (Image 3 Tools) */}
            <div className="w-full md:w-20 border-r border-gray-100 p-4 flex md:flex-col items-center gap-6 bg-white z-10">
              {[MousePointer2, Type, ImageIcon, Hexagon, Layers, Palette].map((Icon, i) => (
                <div key={i} className={`p-3.5 rounded-2xl transition-all group cursor-pointer ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:bg-gray-50 hover:text-blue-600'}`}>
                  <Icon size={22} strokeWidth={2.5} />
                </div>
              ))}
              <div className="md:mt-auto p-3.5 text-gray-300 hover:text-gray-600 cursor-pointer transition-colors">
                <Settings size={22} strokeWidth={2.5} />
              </div>
            </div>

            {/* CENTER CANVAS (Image 4 Styling) */}
            <div className="flex-1 bg-gray-50 p-6 md:p-12 relative overflow-hidden flex flex-col">
              {/* Dot Grid Background Effect */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(#000 2px, transparent 2px)`, backgroundSize: '32px 32px' }}></div>
              
              {/* Main Canvas Area */}
              <div className="relative flex-1 w-full border-2 border-dashed border-gray-300 rounded-[2rem] flex items-center justify-center bg-white/60 backdrop-blur-sm overflow-hidden">
                
                {/* Moving Mouse Cursor (Animated) */}
                <motion.div 
                  animate={{ 
                    x: [-80, 120, -20, -80],
                    y: [-40, 60, 120, -40]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-50 pointer-events-none drop-shadow-xl"
                >
                  <MousePointer2 className="fill-blue-600 text-white stroke-[1.5]" size={36} />
                  <div className="ml-5 mt-1 bg-blue-600 text-white text-[11px] px-3 py-1.5 rounded-md shadow-lg font-bold tracking-wide">
                    Sofia Designer
                  </div>
                </motion.div>

                {/* Main Visual Content (Bounding Box Style) */}
                <div className="relative group scale-110 md:scale-125">
                  <div className="w-64 h-64 rounded-[3rem] shadow-2xl shadow-indigo-200 rotate-3 flex items-center justify-center p-8 relative overflow-hidden">
                     {/* Inner glass effect on card */}
                     <img src="https://pixabay.com/images/download/alexas_fotos-ladybug-9635222_1920.jpg" className="absolute inset-0 bg-white/10 border-t border-l border-white/20 rounded-[3rem]"/>
                     <h3 className="text-white text-4xl font-black text-center tracking-tighter leading-[0.9] relative z-10 drop-shadow-md">
                       CRAFTING<br/>BRANDS
                     </h3>
                  </div>
                  {/* Bounding Box Corners (Anchor Points) */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-sm shadow-sm"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-sm shadow-sm"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-sm shadow-sm"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-sm shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR (Image 2 Tools & Expansion) */}
            <div className="w-full md:w-80 border-l border-gray-100 p-6 flex flex-col gap-8 bg-white z-10">
              
              {/* Properties Panel */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Properties</span>
                  <GripVertical size={16} className="text-gray-300" />
                </div>
                
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Opacity</span>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">85%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-blue-600 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>

              {/* Layers Panel (Expansion View) */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                   <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Layers</span>
                </div>
                
                <div className="space-y-2">
                  {[
                    { name: 'Gradient_Bg', active: true },
                    { name: 'Header_Text', active: false },
                    { name: 'Avatar_Group', active: false }
                  ].map((layer, i) => (
                    <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${layer.active ? 'bg-blue-50 border-blue-100 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <Eye size={16} className={layer.active ? 'text-blue-600' : 'text-gray-400'} />
                        <span className={`text-sm font-semibold ${layer.active ? 'text-blue-700' : 'text-gray-600'}`}>{layer.name}</span>
                      </div>
                      <ChevronDown size={16} className={layer.active ? 'text-blue-400' : 'text-gray-300'} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions (Image 2 Progress Circle) */}
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4 bg-[#111111] text-white p-5 rounded-2xl shadow-xl">
                  {/* SVG Circular Loader */}
                  <div className="relative w-12 h-12 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      {/* Background track */}
                      <path className="text-zinc-800" strokeWidth="3" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      {/* Progress track */}
                      <path className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" strokeDasharray="75, 100" strokeWidth="3" strokeLinecap="round" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Exporting</p>
                    <p className="text-sm font-semibold">Assets Ready</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>

      </div>
    </section>
  );
}