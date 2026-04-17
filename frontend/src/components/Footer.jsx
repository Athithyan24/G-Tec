import React from "react";
import { motion } from "framer-motion";
import { Instagram, X, Linkedin, Facebook, Send } from "lucide-react";

export default function GtecFooter() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* --- NEWSLETTER SECTION (As per your image) --- */}
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
                <Instagram size={20} className="text-pink-500" />
              </div>
              <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Stay Updated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Join our newsletter
            </h2>
            <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
              Keep up with our latest courses, workshops, and placement events. No spam, we promise.
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
            <p className="mt-4 text-xs text-zinc-600">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </motion.div>

        {/* --- LINKS SECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-black mb-6 tracking-tighter">G-TEC<span className="text-blue-600">.</span></h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Empowering students with industry-standard skills in IT, Accounting, and CAD.
            </p>
            <div className="flex gap-4">
              {[Instagram, X, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-zinc-200">Courses</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Information Technology</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Advanced Accounting</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Civil & CAD Design</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Software Engineering</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-zinc-200">Company</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Our Centers</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Placement Cell</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-zinc-200">Legal</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Terms & Conditions</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Cookie Policy</li>
            </ul>
          </div>
        </div>

        {/* --- COPYRIGHT --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-zinc-600 text-xs">
          <p>© 2026 G-TEC Education. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Designed with ❤️ for Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}