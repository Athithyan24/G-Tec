import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, X, CheckCircle2, Calendar, BookOpen } from "lucide-react";

export default function ItTechnical() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
  {
    id: "01",
    title: "Full-Stack Web Dev",
    shortDesc: "Master the MERN stack for enterprise applications.",
    fullDesc: "Our Full-Stack program is an intensive journey through the modern web ecosystem. You'll go from basic HTML/CSS to building complex, scalable applications using React, Node.js, and MongoDB. Includes real-time project hosting and architecture patterns.",
    duration: "6 Months",
    tags: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
    syllabus: ["Frontend Architecture", "Backend API Design", "Database Modeling", "Cloud Deployment"]
  },
  {
    id: "02",
    title: "Python & Data Science",
    shortDesc: "Unlock the power of data with Python and Machine Learning.",
    fullDesc: "Go beyond basic coding. This course teaches you how to process large datasets, create stunning visualizations, and build predictive models using Scikit-Learn and TensorFlow. Perfect for those looking to enter the world of Artificial Intelligence.",
    duration: "4 Months",
    tags: ["Python", "Machine Learning", "Pandas"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["Statistical Analysis", "Data Wrangling", "Neural Networks", "Big Data Integration"]
  },
  {
    id: "03",
    title: "Cyber Security & EH",
    shortDesc: "Protect digital assets and master ethical hacking.",
    fullDesc: "Learn the mindset of a hacker to better defend against one. This program covers network security, penetration testing, and digital forensics. You'll work in virtual labs to simulate real-world cyber attacks and defense scenarios.",
    duration: "5 Months",
    tags: ["Pen-Testing", "Kali Linux", "Network Security"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["Vulnerability Assessment", "Ethical Hacking", "Encryption Protocols", "Incident Response"]
  },
  {
    id: "04",
    title: "Cloud Engineering",
    shortDesc: "Architect scalable systems on AWS and Azure platforms.",
    fullDesc: "Modern businesses live on the cloud. Master the art of deploying, managing, and scaling global applications. You will gain hands-on experience with EC2, S3, Lambda, and containerization using Docker and Kubernetes.",
    duration: "4 Months",
    tags: ["AWS", "Docker", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    syllabus: ["Cloud Infrastructure", "Serverless Computing", "Container Orchestration", "CI/CD Pipelines"]
  },
  {
    id: "05",
    title: "Mobile App Development",
    shortDesc: "Build high-performance native and cross-platform apps.",
    fullDesc: "Learn to create stunning mobile experiences for iOS and Android. This course focuses on Flutter and React Native, ensuring you can build apps with a single codebase that feel truly native on every device.",
    duration: "4 Months",
    tags: ["Flutter", "React Native", "Firebase"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["UI/UX for Mobile", "State Management", "Native API Integration", "App Store Deployment"]
  },
  {
    id: "06",
    title: "UI/UX Product Design",
    shortDesc: "Design intuitive digital products with a human-centric focus.",
    fullDesc: "Master the entire design process from user research and wireframing to high-fidelity prototyping. Using industry-standard tools like Figma, you'll learn how to bridge the gap between user needs and business goals.",
    duration: "3 Months",
    tags: ["Figma", "User Research", "Prototyping"],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["Design Systems", "Usability Testing", "Visual Hierarchy", "Interactive Prototyping"]
  },
  {
    id: "07",
    title: "Artificial Intelligence",
    shortDesc: "Harness the power of Generative AI and LLMs.",
    fullDesc: "Stay ahead of the curve by learning how to build and integrate AI solutions. This course covers Natural Language Processing (NLP), Large Language Models (LLMs), and how to build applications using OpenAI's API and LangChain.",
    duration: "4 Months",
    tags: ["NLP", "Generative AI", "LangChain"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    syllabus: ["Prompt Engineering", "Fine-tuning Models", "Vector Databases", "AI Ethics"]
  },
  {
    id: "08",
    title: "Software Quality Assurance",
    shortDesc: "Ensure software excellence with automated testing.",
    fullDesc: "Learn how to detect bugs before they reach the user. This course covers manual testing fundamentals and deep-dives into automation using Selenium and Cypress, ensuring you can manage quality in fast-paced agile environments.",
    duration: "3 Months",
    tags: ["Selenium", "Cypress", "Automation"],
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=2066",
    syllabus: ["Test Case Design", "Regression Testing", "API Automation", "Performance Testing"]
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} >
            <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-6">Department of Information Technology</p>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-clash font-bold tracking-tighter leading-none uppercase">
              IT / Technical <span className="text-zinc-400 font-light text-3xl md:text-5xl lg:text-7xl align-top ml-2 lg:ml-4">({courses.length.toString().padStart(2, '0')})</span>
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
  className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-zinc-900 cursor-pointer shadow-lg"
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