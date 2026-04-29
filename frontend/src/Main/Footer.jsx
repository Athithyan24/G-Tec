import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react"; 
import { Link } from "react-router-dom";

export default function FooterSection() {
  return (
    <footer className="relative z-50 w-full bg-[#0a0a0a] text-white pt-20 pb-12 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Standard 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black tracking-tighter">G-TEC<span className="text-blue-600">.</span></h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Empowering students with industry-standard skills in IT, Accounting, and CAD. Nagercoil's premier destination for professional certification.
            </p>
            
            {/* Social Icons - Kept logic exactly as provided to avoid Twitter error */}
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

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Navigation</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-blue-500 transition-colors">All Courses</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/enroll" className="hover:text-blue-500 transition-colors font-semibold text-blue-400">Enroll Now</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-blue-500 mt-1" />
                <div className="text-sm text-zinc-400">
                  <p className="font-semibold text-zinc-200">Phone Numbers</p>
                  <p>+91 94861 88648</p>
                  <p>+91 72002 86091</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-blue-500 mt-1" />
                <div className="text-sm text-zinc-400">
                  <p className="font-semibold text-zinc-200">Official Email</p>
                  <p>infozenxit@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Address */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Campus Address</h4>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-blue-500 mt-1 shrink-0" />
              <p className="text-sm text-zinc-400 leading-relaxed">
                Upstair, Tower Jn, Sivaraj Building 2nd Floor, <br />
                Rose Centre, Nagercoil, <br />
                Tamil Nadu 629001
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-zinc-600 text-xs gap-4">
          <p>© 2026 G-TEC Education, Nagercoil. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span>Designed with ❤️ for Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}