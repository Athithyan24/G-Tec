import React, { useState, useEffect } from "react";
import { Info, Phone, Users, MapPin, BookOpen,MessageCircleQuestionMark, ChevronDown, LayoutGrid, User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderSection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/";
  };

  const courseCategories = [
    { name: "IT / Technical", desc: "Programming, Software & Web Dev", path: "/courses/it-technical" },
    { name: "IT / Non-Technical", desc: "Digital Marketing, Office Auto", path: "/courses/it-non-technical" },
    { name: "Designing", desc: "UI/UX, Graphic & Multimedia", path: "/courses/designing" },
    { name: "Accounting", desc: "SAP, Tally Prime, GST & More", path: "/courses/accounting" },
    { name: "Civil", desc: "AutoCAD, 2D/3D Max, Revit", path: "/courses/civil" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-100 bg-blue-900/95 backdrop-blur-md border-b border-white/10 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 h-30 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0">
            <img
              src="/logo1.webp"
              alt="G-Tech Logo"
              className="h-25 w-auto object-contain"
            />
            <div className="flex text-white mt-1 border-l border-white/20 pl-3">
            <MapPin size={25} />
            <span className="text-xl font-light tracking-tight pl-1">
              Nagercoil
            </span></div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            
            <div className="relative group flex items-center h-20">
  {/* CHANGED FROM <button> TO <Link> */}
  <Link 
    to="/courses" 
    className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-blue-300 transition-colors cursor-pointer"
  >
    <LayoutGrid size={16} />
    Courses
    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
  </Link>

  {/* Dropdown remains the same, triggered by the 'group' hover */}
  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-0 overflow-hidden z-[100]">
    <div className="p-3 flex flex-col">
      {courseCategories.map((category, index) => (
        <Link
          key={index}
          to={category.path}
          className="group/item flex flex-col p-3 rounded-xl hover:bg-blue-50 transition-colors"
        >
          <span className="text-sm font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors">
            {category.name}
          </span>
          <span className="text-xs font-medium text-gray-500 mt-0.5">
            {category.desc}
          </span>
        </Link>
      ))}
      
      {/* Optional: Add a 'View All' link at the bottom for better UX */}
      <div className="mt-2 pt-2 border-t border-gray-50">
        <Link 
          to="/courses" 
          className="text-center block py-2 text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider"
        >
          View All Course Categories
        </Link>
      </div>
    </div>
  </div>
</div>

            {isAdmin && (
  <div className="flex items-center gap-6 border-x border-white/10 px-6">
    
    {/* --- NEW STUDENTS DROPDOWN --- */}
    <div className="relative group flex items-center h-20">
      <button className="flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 whitespace-nowrap cursor-pointer transition-colors">
        <Users size={16} /> 
        Students
        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute top-[80%] left-0 w-[260px] bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-[110]">
        <div className="p-2 flex flex-col gap-1">
          
          {/* Option 1: The Enrollment Log (Master List) */}
          <Link
            to="/admin/enrolled-log"
            className="group/item flex flex-col p-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <span className="text-sm font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors">
              Enrollment Log
            </span>
            <span className="text-[10px] font-medium text-gray-400 mt-0.5 leading-tight">
              Master database of all applications <br/>(Safe Mode)
            </span>
          </Link>

          {/* Option 2: Manage Students (The Old Tab) */}
          <Link
            to="/admin/students"
            className="group/item flex flex-col p-3 rounded-xl hover:bg-yellow-50 transition-colors"
          >
            <span className="text-sm font-bold text-gray-900 group-hover/item:text-yellow-600 transition-colors">
              Manage Students
            </span>
            <span className="text-[10px] font-medium text-gray-400 mt-0.5 leading-tight">
              Active workspace to edit or <br/>remove students from view
            </span>
          </Link>

        </div>
      </div>
    </div>
    {/* --- END DROPDOWN --- */}

    <Link to="/admin/courses" className="flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 whitespace-nowrap">
      <Settings size={16} /> Manage
    </Link>
    
    <Link to="/admin/enquiry" className="flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 whitespace-nowrap">
      <MessageCircleQuestionMark size={16} /> Enquiry
    </Link>
  </div>
)}
            
            <Link to="/about" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-300 transition-colors whitespace-nowrap">
              <Info size={16} /> About
            </Link>
            
            <Link to="/contact" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-300 transition-colors whitespace-nowrap">
              <Phone size={16} /> Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4 lg:gap-6 shrink-0">
            {isAdmin ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-xs font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut size={14}/> Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-white hover:text-blue-300">
                <User size={18} /> Login
              </Link>
            )}
            <Link 
  to="/enroll" 
  className="relative group overflow-hidden flex items-center gap-2 bg-white text-blue-900 px-8 py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-blue-500/20"
>
  {/* The Animated Circles (Z-index 0) */}
  <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-yellow-400/40"></div>
  <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-orange-400/40"></div>
  <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-pink-400/40"></div>
  <div className="absolute group-hover:-top-1 group-hover:-right-2 z-0 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-red-500/40"></div>

  {/* The Text (Z-index 10 to stay on top of circles) */}
  <span className="relative z-10">Enroll Now</span>
</Link>
          </div>
        </div>
      </header>
    </>
  );
}