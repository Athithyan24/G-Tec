import React, { useState, useEffect } from "react";
import { Info, Phone,Users, BookOpen, ChevronDown, LayoutGrid, User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderSection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the admin token exists in browser storage
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token); // true if token exists, false if not
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/"; // Refresh to home
  };

  const courseCategories = [
    { 
      name: "IT / Technical", 
      desc: "Programming, Software & Web Dev", 
      path: "/courses/it-technical" 
    },
    { 
      name: "IT / Non-Technical", 
      desc: "Digital Marketing, Office Auto", 
      path: "/courses/it-non-technical" 
    },
    { 
      name: "Designing", 
      desc: "UI/UX, Graphic & Multimedia", 
      path: "/courses/designing" 
    },
    { 
      name: "Accounting", 
      desc: "SAP, Tally Prime, GST & More", 
      path: "/courses/accounting" 
    },
    { 
      name: "Civil", 
      desc: "AutoCAD, 2D/3D Max, Revit", 
      path: "/courses/civil" 
    },
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
        className={`fixed w-full top-0 z-100 bg-blue-900 backdrop-blur-md border-b border-gray-100/10 transition-all duration-500 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-34 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <img
              src="/logo1.webp"
              alt="G-Tech Logo"
              className="h-25 w-auto object-contain"
            />
            <span className="text-2xl font-light tracking-tight text-white mt-1">
              Nagercoil
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 h-full">
            
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-blue-300 transition-colors">
                <LayoutGrid size={16} />
                Courses
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>

              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="absolute -top-6 left-0 w-full h-6 bg-transparent"></div>
                
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
                  {/* NEW: Admin Only Tabs */}
      
                </div>
              </div>
            </div>

            {isAdmin && (
        <>
          <Link to="/admin/students" className="flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300">
            <Users size={16} /> Students
          </Link>
          <Link to="/admin/courses" className="flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300">
            <Settings size={16} /> Manage Courses
          </Link>
        </>
      )}
            
            <Link
              to="/about"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-300 transition-colors"
            >
              <Info size={16} />
              About Us
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-300 transition-colors"
            >
              <Phone size={16} />
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            {isAdmin ? (
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500/10 text-red-500 px-5 py-2 rounded-full text-xs font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={14}/> Logout
        </button>
      ) : (
        <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-white hover:text-blue-300">
          <User size={18} /> Login
        </Link>
      )}
            <Link to="/enroll" className="flex items-center gap-2 bg-white text-blue-600 px-7 py-2.5 rounded-full text-sm font-bold hover:bg-blue-50 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
  Enroll Now
</Link>
          </div>
        </div>
      </header>
    </>
  );
}