import React from "react";
import Hero from "./Hero";
import { useState, useEffect } from "react";
import { Home as HomeIcon, Info, Phone, User } from "lucide-react";
import LogoCarousel from "./contents";
import SpecialAccounting from "./SpecialAccounting";
import WebDevSpecial from "./SpecialWebDev";
import ScrollTypography from './ScrollAnime'
import DesignTestimonial from "./DesigningUi"
import PricingSection from "./Offers";
import GtecFooter from "./Footer";
import GtecWelcomeSection from "./FinalHome"

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        className={`fixed w-full top-0 z-100 bg-blue-900 backdrop-blur-md border-b border-gray-100 transition-all duration-500 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-30 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer">
            <img
              src="/logo1.webp"
              alt="G-Tech Logo"
              className="h-25 w-auto object-contain"
            />
            <span className="text-2xl font-light tracking-tight text-white mt-1">
              Nagercoil
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-purple-600 transition-colors"
            >
              <HomeIcon size={16} />
              Home
            </a>
            <a
              href="#about"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-purple-600 transition-colors"
            >
              <Info size={16} />
              About Us
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-purple-600 transition-colors"
            >
              <Phone size={16} />
              Contact Us
            </a>
          </nav>

          <div className="flex items-center">
            <button className="flex items-center gap-2 hover:text-white bg-white text-blue-500 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300">
              Login
              <User size={16} />
            </button>
          </div>
        </div>
      </header>
<main className="pt-20">
        <Hero />
        <LogoCarousel />
        <SpecialAccounting />
      <WebDevSpecial />
      <ScrollTypography/>
    <DesignTestimonial/>
      <PricingSection />
        <GtecWelcomeSection />
        <GtecFooter />
      </main>
    </>
  );
}
