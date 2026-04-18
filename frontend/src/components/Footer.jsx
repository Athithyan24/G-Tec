import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react"; 

export default function FooterSection() {
  return (
    <footer className="relative z-50 w-full bg-[#0a0a0a] text-white -mt-45 pt-36 pb-12 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-zinc-800 pb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-zinc-800 rounded-lg">
                <img 
                  src="https://cdn.simpleicons.org/instagram/e1306c" 
                  alt="Instagram" 
                  className="w-5 h-5" 
                />
              </div>
              <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Stay Updated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-clash mb-4 tracking-tight">Join our Institution Today.</h2>
            <p className="text-zinc-400 font-clash text-lg max-w-md leading-relaxed">
              Keep up with our latest courses and workshops. No spam, we promise.
            </p>
          </div>

          <div className="relative">
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white placeholder:text-zinc-500"
              />
              <button className="absolute right-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                Subscribe <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-black mb-6 tracking-tighter">G-TEC<span className="text-blue-600">.</span></h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Empowering students with industry-standard skills in IT, Accounting, and CAD.
            </p>
            
            <div className="flex gap-4">
              {[
                { name: 'instagram', color: 'white' },
                { name: 'x', color: 'white' },
                { name: 'facebook', color: 'white' }
              ].map((social) => (
                <a key={social.name} href="#" className="p-2.5 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-all border border-zinc-800">
                  <img 
                    src={`https://cdn.simpleicons.org/${social.name}/${social.color}`} 
                    alt={social.name} 
                    className="w-4.5 h-4.5" 
                  />
                </a>
              ))}

              <a href="#" className="p-2.5 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-all border border-zinc-800 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-zinc-600 text-xs">
          <p>© 2026 G-TEC Education, Nagercoil. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Designed with ❤️ for Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}