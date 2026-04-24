import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, X, CheckCircle2, Calendar, BookOpen } from "lucide-react";

export default function Civil() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
  {
    id: "01",
    title: "AutoCAD (2D & 3D)",
    shortDesc: "Master the industry standard for precision drafting.",
    fullDesc: "The essential starting point for every civil engineer. Learn to create professional-grade 2D floor plans, elevations, and 3D wireframe models. This course covers everything from basic geometric shapes to complex architectural layouts and plotting.",
    duration: "2 Months",
    tags: ["Drafting", "2D/3D", "Blueprints"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Coordinate Systems", "Layer Management", "3D Modeling Basics", "Plotting & Scaling"]
  },
  {
    id: "02",
    title: "Revit Architecture (BIM)",
    shortDesc: "Build intelligent 3D models with BIM technology.",
    fullDesc: "Move beyond simple lines. Revit allows you to create smart architectural designs where every element contains data. Learn to design walls, roofs, and windows while automatically generating schedules and documentation.",
    duration: "3 Months",
    tags: ["BIM", "Architecture", "3D Design"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Parametric Components", "Floor & Roof Plans", "Families & Worksets", "Rendering & Walkthroughs"]
  },
  {
    id: "03",
    title: "STAAD.Pro",
    shortDesc: "Master structural analysis and design of buildings.",
    fullDesc: "Learn to analyze and design structures to withstand loads and forces. This course focuses on steel and concrete design, ensuring safety and compliance with international building codes using Bentley’s powerful engine.",
    duration: "3 Months",
    tags: ["Structures", "Analysis", "Concrete"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000", // Structural Steel Reinforcement
    syllabus: ["Geometry & Loading", "Member Properties", "Concrete Design", "Seismic Analysis"]
  },
  {
    id: "04",
    title: "3ds Max + V-Ray",
    shortDesc: "Create photorealistic architectural visualizations.",
    fullDesc: "The ultimate course for architectural rendering. Learn to transform CAD designs into cinematic 3D images and videos. Master lighting, textures, and the V-Ray engine to create portfolio-ready presentations.",
    duration: "3 Months",
    tags: ["Visualization", "Rendering", "Interior"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Standard Primitives", "V-Ray Materials", "IES Lighting", "Camera Animation"]
  },
  {
    id: "05",
    title: "Civil 3D",
    shortDesc: "Design infrastructure and land development projects.",
    fullDesc: "Tailored for infrastructure engineers. Master the design of roads, highways, and drainage systems. Learn to handle survey data, create surfaces, and calculate earthwork volumes with dynamic modeling tools.",
    duration: "3 Months",
    tags: ["Road Design", "Surveying", "Infrastructure"],
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    syllabus: ["Surface Creation", "Alignment & Profiles", "Corridor Modeling", "Pipe Networks"]
  },
  {
    id: "06",
    title: "Quantity Surveying",
    shortDesc: "Master estimation and cost control in construction.",
    fullDesc: "Bridge the gap between design and budget. Learn to read blueprints for measurement, prepare Bills of Quantities (BOQ), and manage project costs. Essential for aspiring site engineers and project managers.",
    duration: "2 Months",
    tags: ["Estimation", "BOQ", "Tendering"],
    image: "https://images.unsplash.com/photo-1607134541550-2994abb8077b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Construction Site Management
    syllabus: ["Rate Analysis", "Material Takeoffs", "BOQ Preparation", "Valuation & Billing"]
  },
  {
    id: "07",
    title: "ETABS",
    shortDesc: "Analyze and design multi-story high-rise buildings.",
    fullDesc: "Specialized software for building systems. Learn to perform linear and non-linear analysis of high-rise structures, including shear wall design and wind load calculations according to global standards.",
    duration: "2 Months",
    tags: ["High-Rise", "Seismic", "Steel Design"],
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Model Geometry", "Dynamic Analysis", "Shear Wall Design", "Steel Frame Analysis"]
  },
  {
    id: "08",
    title: "Primavera P6",
    shortDesc: "Enterprise-level project management and scheduling.",
    fullDesc: "Learn to manage large-scale construction schedules. Master the Work Breakdown Structure (WBS), resource allocation, critical path method (CPM), and budget tracking to ensure projects finish on time.",
    duration: "2 Months",
    tags: ["Planning", "Scheduling", "Management"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["WBS & Activities", "Resource Leveling", "Baseline Tracking", "Reporting"]
  },
  {
    id: "09",
    title: "SketchUp & Lumion",
    shortDesc: "Rapid 3D modeling and ultra-fast rendering.",
    fullDesc: "Perfect for quick design iterations. Learn to build models in SketchUp and import them into Lumion for real-time, high-quality architectural walkthroughs and landscape rendering.",
    duration: "2 Months",
    tags: ["Quick 3D", "Walkthrough", "Landscape"],
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Polygon Modeling", "Plugin Integration", "Real-time Lighting", "Cinematic Effects"]
  },
  {
    id: "10",
    title: "Tekla Structures",
    shortDesc: "Advanced BIM for steel and concrete detailing.",
    fullDesc: "The industry leader for structural detailing. Learn to create highly detailed 3D models for steel fabrication and rebar detailing, enabling accurate construction and manufacturing workflows.",
    duration: "3 Months",
    tags: ["Detailing", "Fabrication", "Steel"],
    image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Structural Modeling", "Connection Detailing", "Drawing Generation", "NC File Export"]
  },
  {
    id: "11",
    title: "Revit Structure",
    shortDesc: "Integrate structural engineering with BIM workflows.",
    fullDesc: "Focus on the structural side of BIM. Learn to model rebar, structural steel members, and foundations while maintaining perfect synchronization with architectural models for clash detection.",
    duration: "3 Months",
    tags: ["BIM Structure", "Rebar", "Clash Detection"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Structural Foundations", "Reinforcement Modeling", "Analytical Models", "Collaborative Work"]
  },
  {
    id: "12",
    title: "Interior Design (Civil)",
    shortDesc: "Design functional and aesthetic indoor spaces.",
    fullDesc: "A creative approach for engineers. Learn the principles of spatial planning, furniture layouts, lighting design, and material selection to create beautiful residential and commercial interiors.",
    duration: "3 Months",
    tags: ["Interior", "Spatial", "Lighting"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000", // Modern Interior View
    syllabus: ["Ergonomics", "Color Schemes", "Material Selection", "Electrical Layouts"]
  },
  {
    id: "13",
    title: "ArcGIS for Civil Engineers",
    shortDesc: "Geospatial analysis for urban and land planning.",
    fullDesc: "Learn to use Geographic Information Systems (GIS). Map land usage, analyze terrain data, and visualize urban expansion. Essential for environmental engineering and government planning projects.",
    duration: "3 Months",
    tags: ["GIS", "Mapping", "Analysis"],
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Data Management", "Spatial Analysis", "Map Composition", "Terrain Modeling"]
  },
  {
    id: "14",
    title: "Total Station & Surveying",
    shortDesc: "Master modern field surveying technology.",
    fullDesc: "Hands-on training with the Total Station. Learn to conduct land surveys, stakeouts, and topographic mapping. Perfect for engineers who want to specialize in high-precision field data collection.",
    duration: "1 Month",
    tags: ["Surveying", "Field Work", "Mapping"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000", // Outdoor Field Surveying
    syllabus: ["Instrument Setup", "Topographic Survey", "Stakeout Procedures", "Data Download/Processing"]
  },
  {
    id: "15",
    title: "Bridge Engineering & Design",
    shortDesc: "Design large-scale bridges and flyover structures.",
    fullDesc: "A specialized course for infrastructure lovers. Learn the mechanics of truss, arch, and cable-stayed bridges. Analyze dynamic loads and master the codes required for massive transportation projects.",
    duration: "4 Months",
    tags: ["Bridges", "Flyovers", "Infrastructure"],
    image: "https://images.unsplash.com/photo-1559843788-693858bf7338?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Massive Bridge Structure
    syllabus: ["Bridge Components", "Load Calculations", "Pre-stressed Concrete", "Maintenance & Audit"]
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
            <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-6">Department of Civil, Computer Science, Design & Electrical</p>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-clash font-bold tracking-tighter leading-none uppercase">
              CAD / 3D / 2D <span className="text-zinc-400 font-light text-3xl md:text-5xl lg:text-7xl align-top ml-2 lg:ml-4">({courses.length.toString().padStart(2, '0')})</span>
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