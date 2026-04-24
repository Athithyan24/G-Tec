import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, X, CheckCircle2, Calendar, BookOpen } from "lucide-react";

export default function Accounting() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
  {
    id: "01",
    title: "Tally Prime with GST",
    shortDesc: "Master the gold standard of Indian accounting software.",
    fullDesc: "Learn comprehensive business accounting using Tally Prime. This course covers everything from basic bookkeeping to advanced GST inventory management, e-way bills, and professional financial reporting essential for Indian businesses.",
    duration: "3 Months",
    tags: ["GST", "Tally Prime", "Taxation"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Voucher Entry", "GST Returns (GSTR 1, 3B)", "Inventory Management", "Balance Sheet Finalization"]
  },
  {
    id: "02",
    title: "SAP FICO (Financials)",
    shortDesc: "Manage global finances with enterprise-scale ERP software.",
    fullDesc: "Become a certified SAP consultant. This course focuses on Financial Accounting (FI) and Controlling (CO). You will learn how to manage general ledgers, accounts payable/receivable, and asset accounting within a global corporate environment.",
    duration: "5 Months",
    tags: ["SAP ERP", "FICO", "Enterprise"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["General Ledger Accounting", "Accounts Payable/Receivable", "Cost Center Accounting", "Asset Management"]
  },
  {
    id: "03",
    title: "Advanced Excel for Finance",
    shortDesc: "Master complex financial modeling and data analysis.",
    fullDesc: "Go beyond basic spreadsheets. Learn to build advanced financial models, automate reporting with macros, and use Power Query for data cleaning. This is a must-have skill for modern investment banking and corporate finance roles.",
    duration: "2 Months",
    tags: ["Excel Macros", "Financial Modeling", "Pivot Tables"],
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["VLOOKUP/XLOOKUP", "Pivot Table Analysis", "Macro Automation", "Financial Forecasting"]
  },
  {
    id: "04",
    title: "Corporate Accounting",
    shortDesc: "Manage large-scale accounts and corporate audits.",
    fullDesc: "This course focuses on the advanced accounting principles used by large corporations. Learn about share capital, debentures, consolidated financial statements, and the internal audit processes required for public companies.",
    duration: "4 Months",
    tags: ["Audit", "Corporate Law", "Financial Analysis"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Share Capital Accounting", "Cash Flow Statements", "Internal Auditing", "IFRS Standards"]
  },
  {
    id: "05",
    title: "Income Tax & TDS",
    shortDesc: "Master Indian direct tax laws and e-filing processes.",
    fullDesc: "Get hands-on training in direct taxation. This course covers the calculation of taxable income, deductions, TDS (Tax Deducted at Source) compliance, and the step-by-step process of filing Income Tax Returns (ITR).",
    duration: "3 Months",
    tags: ["Income Tax", "ITR Filing", "TDS Compliance"],
    image: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Income from Salary/Business", "TDS Computation", "E-filing Portal Training", "Tax Planning Basics"]
  },
  {
    id: "06",
    title: "Banking & Finance Operations",
    shortDesc: "Kickstart your career in the retail and corporate banking sector.",
    fullDesc: "Understand the mechanics of modern banking. This program covers retail banking products, loan processing, KYC/AML regulations, and the operational procedures used in major financial institutions.",
    duration: "3 Months",
    tags: ["Banking", "KYC/AML", "Financial Services"],
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=2000",
    syllabus: ["Retail Banking Basics", "Loan Disbursement Process", "Anti-Money Laundering", "Customer Relationship Mgmt"]
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
            <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-6">Department of Commerce</p>
            <h1 className="text-3xl md:text-4xl lg:text-[5rem] font-clash font-bold tracking-tighter leading-none uppercase">
             Accounting / Banking <span className="text-zinc-400 font-light text-3xl md:text-5xl lg:text-7xl align-top ml-2 lg:ml-4">({courses.length.toString().padStart(2, '0')})</span>
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
  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
  
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
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-110 cursor-zoom-out"
              />

              {/* Expanded Card (Modal) */}
              <div className="fixed inset-0 flex items-center justify-center z-120 p-4 md:p-10 pointer-events-none">
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