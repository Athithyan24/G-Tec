import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react"; 

export default function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(false);

  const plans = [
    {
      name: "Accounting",
      description: "Perfect for commerce and accounts-related students looking to master financial tools.",
      priceOff: 29,
      priceOn: 24, 
      features: [
        "Tally Prime & GST Training",
        "Real-time financial scenarios",
        "G-Tec Course Certification",
        "100% Placement Assistance",
      ],
      highlighted: false,
    },
    {
      name: "IT",
      description: "Ideal for tech and non-tech computer students building a career in software.",
      priceOff: 49,
      priceOn: 39,
      features: [
        "Full-Stack & Web Development",
        "Hands-on coding labs",
        "Live project building",
        "Dedicated placement drives",
        "Interview & soft skills prep",
      ],
      highlighted: true,
    },
    {
      name: "CAD",
      description: "Built for civil, mechanical, and architectural students to master design software.",
      priceOff: 99,
      priceOn: 79,
      features: [
        "AutoCAD & 3D Modeling Mastery",
        "Structural design workshops",
        "Professional portfolio building",
        "G-Tec globally recognized cert",
        "Industry expert mentorship",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="w-full bg-white pb-24  px-6 md:px-12 lg:px-24 font-sans mt-25 md:mt-30">
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Flexible pricing plans
        </h2>
        <p className="text-lg md:text-xl pb-10 text-gray-600 font-normal">
          Choose a plan that grows with you. Start for free and upgrade <br className="hidden md:block"/> 
          anytime for more features and support
        </p>
      </motion.div>
        
        <div className="flex items-center justify-center mt-10 mb-16 gap-4">
          <span 
            className={`text-sm md:text-base font-semibold transition-colors duration-300 ${!isMonthly ? 'text-gray-900' : 'text-gray-400'}`}
          >
            Billed Monthly
          </span>
          
          <button
            onClick={() => setIsMonthly(!isMonthly)}
            className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              isMonthly ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <motion.div
              layout
              className="w-6 h-6 bg-white rounded-full shadow-md"
              transition={{ type: "spring", stiffness: 600, damping: 30 }}
              style={{
                x: isMonthly ? 32 : 0,
              }}
            />
          </button>

          <span 
            className={`text-sm md:text-base font-semibold transition-colors duration-300 flex items-center gap-2 ${isMonthly ? 'text-gray-900' : 'text-gray-400'}`}
          >
            Yearly billable
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Save 20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }} 
              className={`relative rounded-3xl p-8 flex flex-col h-full border transition-all duration-300
                ${plan.highlighted 
                  ? 'border-blue-600 bg-blue-900 text-white shadow-2xl scale-105 z-10' 
                  : 'border-gray-200 bg-white text-gray-900 hover:shadow-xl hover:border-gray-300' 
                }
              `}
            >
              
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-400 to-pink-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-8 leading-relaxed ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                {plan.description}
              </p>

              {/* Animated Price Amount */}
              <div className="mb-8 flex items-end">
                <span className="text-4xl font-extrabold tracking-tight mr-1">$</span>
                
                {/* AnimatePresence allows us to animate numbers entering and exiting */}
                <div className="overflow-hidden h-12 relative w-16">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={isMonthly ? "monthly" : "annual"}
                      initial={{ opacity: 0, y: isMonthly ? -20 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: isMonthly ? 20 : -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-5xl font-extrabold tracking-tighter absolute"
                    >
                      {isMonthly ? plan.priceOn : plan.priceOff}
                    </motion.span>
                  </AnimatePresence>
                </div>
                
                <span className={`ml-2 mb-1 font-medium ${plan.highlighted ? 'text-blue-200' : 'text-gray-500'}`}>
                  / mo
                </span>
              </div>

              {/* Action Button */}
              <button 
                className={`w-full py-3.5 rounded-xl font-semibold mb-8 transition-all duration-200
                  ${plan.highlighted 
                    ? 'bg-white text-blue-600 hover:bg-gray-50 hover:scale-[1.02]' 
                    : 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-[1.02]'
                  }
                `}
              >
                Get started
              </button>

              {/* Features List */}
              <ul className="flex flex-col gap-4 mt-auto">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-blue-300' : 'text-green-500'}`}>
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <span className={`text-sm font-medium ${plan.highlighted ? 'text-blue-50' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}