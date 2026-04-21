import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import './App.css';

// Import your components
import HeaderSection from './components/Header';
import HomeSection from './components/HomeSection';
import FooterSection from './components/Footer';
import AboutSection from './AboutUsComponents/Aboutus';

// 1. IMPORT YOUR NEW COURSE COMPONENT HERE
// Make sure the file path matches where you saved it!
import CourseItTechnical from './CoursesSection/CourseItTechnical';
import CourseItNonTechnical from './CoursesSection/CourseItNonTechnical'; 

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <HeaderSection />

      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/about" element={<AboutSection />} />
        
        {/* The path MUST match the path defined in your Header courseCategories array */}
        <Route path="/courses/it-technical" element={<CourseItTechnical />} />
        <Route path="/courses/it-non-technical" element={<CourseItNonTechnical />} />
      </Routes>

      <FooterSection />
    </Router>
  );
}

export default App;