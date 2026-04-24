import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, X, CheckCircle2, Calendar, BookOpen } from "lucide-react";

export default function ItNonTechnical() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
  {
    id: "01",
    title: "Digital Marketing Expert",
    shortDesc: "Master SEO, SEM, and social media strategies.",
    fullDesc: "Learn to build comprehensive digital marketing campaigns. This course covers Search Engine Optimization (SEO), pay-per-click advertising, social media marketing, and email campaigns to drive business growth and brand awareness.",
    duration: "3 Months",
    tags: ["SEO", "Social Media", "Google Ads"],
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
    syllabus: ["Search Engine Optimization", "Social Media Marketing", "Content Strategy", "Web Analytics"]
  },
  {
    id: "02",
    title: "IT Project Management",
    shortDesc: "Lead tech teams and deliver projects using Agile methodologies.",
    fullDesc: "Gain the skills to successfully manage software and IT infrastructure projects. You will learn Agile, Scrum, and Waterfall methodologies, along with resource allocation, risk management, and effective stakeholder communication.",
    duration: "4 Months",
    tags: ["Agile", "Scrum", "Jira"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["Agile & Scrum Frameworks", "Risk Management", "Jira & Trello", "Stakeholder Communication"]
  },
  {
    id: "03",
    title: "Business Analytics",
    shortDesc: "Transform data into actionable business insights.",
    fullDesc: "Learn to bridge the gap between IT and business. This course focuses on data interpretation, dashboard creation using modern tools, and using data storytelling to drive strategic business decision-making.",
    duration: "3 Months",
    tags: ["PowerBI", "Excel", "Data Storytelling"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
    syllabus: ["Advanced Excel", "PowerBI Dashboards", "Data Interpretation", "Business Strategy"]
  },
  {
    id: "04",
    title: "Advanced Office Automation",
    shortDesc: "Master essential productivity tools for the modern workplace.",
    fullDesc: "Become an expert in Microsoft Office Suite and Google Workspace. This course covers advanced document formatting, complex spreadsheet formulas, professional presentations, and email management to maximize workplace efficiency.",
    duration: "2 Months",
    tags: ["MS Office", "Excel", "Productivity"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["Advanced Excel Formulas", "Word & PowerPoint", "Google Workspace", "Workflow Automation"]
  },
  {
    id: "05",
    title: "IT Helpdesk & Support",
    shortDesc: "Master the fundamentals of troubleshooting and customer support.",
    fullDesc: "Start your IT career with foundational knowledge in hardware, software troubleshooting, network configurations, and ticketing systems. Learn to resolve user issues effectively and manage IT service requests.",
    duration: "2 Months",
    tags: ["Troubleshooting", "Networking", "Ticketing"],
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["Hardware Basics", "OS Troubleshooting", "Network Fundamentals", "Customer Service Skills"]
  },
  {
    id: "06",
    title: "SEO & Content Strategy",
    shortDesc: "Drive organic traffic and build compelling digital content.",
    fullDesc: "Dive deep into the mechanics of search engines. You will learn advanced keyword research, on-page and off-page optimization, and how to craft content that ranks high on Google and engages audiences.",
    duration: "2 Months",
    tags: ["SEO", "Content Writing", "Analytics"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2072",
    syllabus: ["Keyword Research", "On-Page SEO", "Link Building", "Content Marketing"]
  },
  {
    id: "07",
    title: "E-Commerce Management",
    shortDesc: "Launch and manage successful online retail businesses.",
    fullDesc: "Learn the ins and outs of running an online store. This course covers platform selection (like Shopify and WooCommerce), inventory management, payment gateways, and conversion rate optimization to boost online sales.",
    duration: "3 Months",
    tags: ["Shopify", "WooCommerce", "CRO"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["Store Setup", "Inventory Management", "Payment Gateways", "Conversion Optimization"]
  },
  {
    id: "08",
    title: "Technical Writing",
    shortDesc: "Translate complex tech concepts into clear documentation.",
    fullDesc: "Become the bridge between developers and end-users. Learn to write clear API documentation, user manuals, release notes, and help guides. This is a crucial and highly sought-after skill for the software and hardware industries.",
    duration: "2 Months",
    tags: ["Documentation", "API Docs", "Communication"],
    image: "https://images.unsplash.com/photo-1682988670855-85bd7430ad67?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2huaWNhbCUyMHdyaXRpbmd8ZW58MHx8MHx8fDA%3D",
    syllabus: ["Document Structuring", "API Documentation", "User Manuals", "Review & Editing"]
  }
];

const smoothTransition = {
    type: "tween",
    ease: [0.43, 0.13, 0.23, 0.96],
    duration: 0.7
  };
  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pt-40 pb-70 px-6 md:px-12 lg:px-24 font-sans text-zinc-900">
      <div className="max-w-350 mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col mb-16 lg:mb-24 border-b border-zinc-200 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-6">Department of Technology & Computer Science</p>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-clash font-bold tracking-tighter leading-none uppercase">
              IT / Non-Technical <span className="text-zinc-400 font-light text-3xl md:text-5xl lg:text-7xl align-top ml-2 lg:ml-4">({courses.length.toString().padStart(2, '0')})</span>
            </h1>
          </motion.div>
        </div>

        {/* LOOKBOOK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {courses.map((course) => (
            <motion.div
  layoutId={`card-${course.id}`}
  transition={smoothTransition}
  key={course.id}
  onClick={() => setSelectedCourse(course)}
  className="group relative overflow-hidden rounded-[2.5rem] aspect-4/5 bg-zinc-900 cursor-pointer shadow-lg"
>
  {/* The Course Image */}
  <motion.img 
    layoutId={`image-${course.id}`}
    transition={smoothTransition}
    src={course.image} 
    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-1000"
  />
  
  {/* GLASSY GRADIENT OVERLAY (The Fix) */}
  {/* This creates a smooth transition from transparent to a dark, blurry glass effect at the bottom */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
  
  {/* Additional Blur Layer for the "Glass" look at the bottom */}
  <div className="absolute bottom-0 w-full h-1/2 backdrop-blur-[2px] mask-gradient" 
       style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} 
  />

  {/* Top Section: Number */}
  <div className="absolute top-0 w-full p-8 z-10">
    <motion.span 
      layoutId={`number-${course.id}`} 
      transition={smoothTransition} 
      className="text-white/70 font-clash text-3xl font-medium tracking-tight group-hover:text-white transition-colors"
    >
      {course.id}
    </motion.span>
  </div>

  {/* Bottom Section: Content (Now perfectly visible) */}
  <div className="absolute bottom-0 w-full p-8 z-20">
    <motion.h3 
      layoutId={`title-${course.id}`} 
      transition={smoothTransition} 
      className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight leading-tight"
    >
      {course.title}
    </motion.h3>
    
    <p className="text-zinc-300 text-sm font-medium leading-relaxed line-clamp-2 mb-6 opacity-90">
      {course.shortDesc}
    </p>
    
    <motion.div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500 shadow-xl">
      <ArrowRight size={20} />
    </motion.div>
  </div>
</motion.div>
          ))}
        </div>

        {/* MODAL OVERLAY */}
        <AnimatePresence>
          {selectedCourse && (
            <>
              {/* Dark Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCourse(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] cursor-zoom-out"
              />

              {/* Expanded Card (Modal) */}
              <div className="fixed inset-0 flex items-center justify-center z-[120] p-4 md:p-10 pointer-events-none">
                <motion.div 
                  layoutId={`card-${selectedCourse.id}`}
                  className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] pointer-events-auto flex flex-col md:flex-row"
                >
                  {/* Left: Image Section */}
                  <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden">
                    <motion.img 
                      layoutId={`image-${selectedCourse.id}`}
                      src={selectedCourse.image} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                    <motion.span layoutId={`number-${selectedCourse.id}`} className="absolute top-8 left-8 text-white font-clash text-5xl font-bold opacity-50">
                      {selectedCourse.id}
                    </motion.span>
                  </div>

                  {/* Right: Content Section */}
                  <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start mb-6">
                      <motion.h3 layoutId={`title-${selectedCourse.id}`} className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tighter">
                        {selectedCourse.title}
                      </motion.h3>
                      <button 
                        onClick={() => setSelectedCourse(null)}
                        className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-8 text-zinc-500 font-medium">
                       <div className="flex items-center gap-2"><Calendar size={18} className="text-blue-600"/> {selectedCourse.duration}</div>
                       <div className="flex items-center gap-2"><BookOpen size={18} className="text-blue-600"/> Certification Included</div>
                    </div>

                    <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                      {selectedCourse.fullDesc}
                    </p>

                    <div className="mb-10">
                      <h4 className="font-bold uppercase tracking-widest text-xs text-zinc-400 mb-4">What you will learn</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedCourse.syllabus.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-zinc-800 font-medium">
                            <CheckCircle2 size={18} className="text-green-500" /> {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ENROLLMENT ACTION */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-zinc-100 pt-8">
                      <button className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                        Enroll Now
                      </button>
                      <p className="text-zinc-400 text-xs font-medium text-center sm:text-left">
                        * Limited seats available for the <br/>upcoming batch.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}