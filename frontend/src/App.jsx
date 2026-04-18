import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HeaderSection from './components/Header';
import HomeSection from './components/HomeSection';
import FooterSection from './components/Footer';
import AboutSection from './AboutUsComponents/Aboutus'; // Make sure to import your new About page!

function App() {
  return (
    <Router>
      {/* Header stays at the top of every page */}
      <HeaderSection />

      {/* The Routes section swaps out the middle content */}
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/about" element={<AboutSection />} />
      </Routes>

      {/* Footer stays at the bottom of every page */}
      <FooterSection />
    </Router>
  );
}

export default App;