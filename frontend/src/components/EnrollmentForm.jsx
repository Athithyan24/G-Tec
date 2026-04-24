import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Hash, Globe, ChevronRight, User, Calendar, GraduationCap, BookOpen, Building2, LibraryBig } from "lucide-react";

export default function EnrollmentForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  // Expanded selection state for the new Education fields
  const [selection, setSelection] = useState({
    name: "",
    dob: "",
    course: "",
    // Education specifics
    educationType: "", // "school" or "college"
    institutionName: "", 
    classGrade: "", // For School
    department: "", // For College
    degreeLevel: "", // "UG" or "PG"
    educationStatus: "", // "Passed Out" or "Pursuing"
    passOutYear: "",
    currentYear: "", // "First", "Second", "Third", "Fourth"
    // Location
    country: null,
    stateId: "",
    districtId: "",
    subDistrictId: "",
    pincode: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Prepare the submission data
  // We map the stateId and districtId to the actual names so the Admin can read them easily
  const submissionData = {
    ...selection,
    // Use the stored names if available (from Pincode logic), otherwise find in the lists
    state: selection.stateName || states.find(s => s.id === selection.stateId)?.name || "",
    district: selection.districtName || selection.districtId || "", // districtId usually holds the name in your city fetch
    subDistrict: selection.subDistrictId || "", // This is already the name in our logic
  };

  try {
    const response = await fetch("http://localhost:5000/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData), // Send the transformed data
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert("Registration Successful!");
      
      // Optional: Reset the form fields after success
      setSelection({
        name: "", dob: "", course: "",
        educationType: "", institutionName: "", 
        classGrade: "", department: "", degreeLevel: "", 
        educationStatus: "", passOutYear: "", currentYear: "",
        country: null, stateId: "", districtId: "", 
        subDistrictId: "", pincode: ""
      });
      
    } else {
      alert("Submission failed: " + result.message);
    }
  } catch (error) {
    console.error("Enrollment failed:", error);
    alert("Connection error: Is your backend running on port 5000?");
  }
};

  const API_BASE = "http://localhost:5000/api";

  // 1. Load Countries
  useEffect(() => {
    fetch(`${API_BASE}/countries`)
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  // 2. Load States
  useEffect(() => {
    if (selection.country) {
      fetch(`${API_BASE}/states/${selection.country.id}`)
        .then(res => res.json())
        .then(data => setStates(data));
    }
  }, [selection.country]);

  // 3. Load Districts (Smart Match)
  useEffect(() => {
    if (selection.stateId && selection.country) {
      fetch(`${API_BASE}/districts/${selection.country.id}/${selection.stateId}`)
        .then(res => res.json())
        .then(data => {
          if (selection.pincode.length === 6 && selection.country?.id === "IN" && selection.districtId) {
            const postalDistrict = selection.districtId.toLowerCase();
            let match = data.find(d => 
              d.name.toLowerCase() === postalDistrict || 
              d.name.toLowerCase().substring(0, 5) === postalDistrict.substring(0, 5)
            );

            if (match) {
              setSelection(prev => ({ ...prev, districtId: match.id }));
              setDistricts(data);
            } else {
              setDistricts([{ id: selection.districtId, name: selection.districtId }, ...data]);
            }
          } else {
            setDistricts(data);
          }
        })
        .catch(err => console.error("Error fetching districts:", err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.stateId, selection.country]);

  // 4. Load Sub-districts manually
  useEffect(() => {
    if (selection.districtId && selection.country?.id !== "IN") {
      fetch(`${API_BASE}/subdistricts/${selection.districtId}`)
        .then(res => res.json())
        .then(data => setSubDistricts(data));
    }
  }, [selection.districtId, selection.country]);

  // Pincode Auto-fill Logic
  const handlePincodeEntry = async (e) => {
  const pin = e.target.value;
  setSelection(prev => ({ ...prev, pincode: pin }));

  // Only trigger search when 6 digits are entered for India
  if (selection.country?.id === "IN" && pin.length === 6) {
    try {
      const res = await fetch(`${API_BASE}/india/pincode/${pin}`);
      const result = await res.json();
      
      if (result.success && result.data.length > 0) {
        const info = result.data[0]; // Take the first result (State/District/Taluk)
        
        // 1. Extract all unique Taluks (Sub-Districts) for this pincode
        const uniqueSubDistricts = Array.from(new Set(result.data.map(item => item.subDistrict)))
          .filter(Boolean)
          .map(name => ({ id: name, name: name }));
        
        setSubDistricts(uniqueSubDistricts);

        // 2. Try to find the State ID so the dropdown UI selects the right state
        const matchedState = states.find(s => 
          s.name.toLowerCase() === info.state.toLowerCase() ||
          s.name.toLowerCase().includes(info.state.toLowerCase())
        );
        
        // 3. Update selection with both IDs (for UI) and raw names (for DB)
        setSelection(prev => ({
          ...prev,
          stateId: matchedState ? matchedState.id : "", // For the dropdown to show selection
          stateName: info.state,      // Store the full name for the DB
          districtId: info.district,  // Usually District name and ID are same in your city list
          districtName: info.district, // Store the full name for the DB
          subDistrictId: uniqueSubDistricts[0]?.id || "", 
          pincode: pin
        }));
      }
    } catch (err) {
      console.error("Pincode fetch failed", err);
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-50 px-6">
      <motion.div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-900 p-8 text-white">
          <h2 className="text-2xl font-bold">Student Enrollment</h2>
          <p className="text-blue-200 text-sm">Professional Location & Education-Based Registration</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Section 1: Basic Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><User size={14}/> Full Name</label>
                <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" onChange={(e) => setSelection({...selection, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><Calendar size={14}/> Date of Birth</label>
                <input type="date" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setSelection({...selection, dob: e.target.value})} />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section 2: Education Details (Dynamic) */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><GraduationCap className="text-blue-600"/> Education Background</h3>
            
            {/* Education Toggle */}
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl cursor-pointer border-2 transition-all ${selection.educationType === 'school' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                <input type="radio" name="eduType" value="school" className="hidden" onChange={(e) => setSelection({...selection, educationType: e.target.value, institutionName: "", department: "", degreeLevel: "", educationStatus: ""})} />
                <LibraryBig size={18}/> School Student
              </label>
              <label className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl cursor-pointer border-2 transition-all ${selection.educationType === 'college' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                <input type="radio" name="eduType" value="college" className="hidden" onChange={(e) => setSelection({...selection, educationType: e.target.value, institutionName: "", classGrade: ""})} />
                <Building2 size={18}/> College / University
              </label>
            </div>

            <AnimatePresence mode="wait">
              {/* SCHOOL FIELDS */}
              {selection.educationType === 'school' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">School Name</label>
                    <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. St. John's High School" onChange={(e) => setSelection({...selection, institutionName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Class / Grade</label>
                    <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 10th Standard / 12th Grade" onChange={(e) => setSelection({...selection, classGrade: e.target.value})} />
                  </div>
                </motion.div>
              )}

              {/* COLLEGE FIELDS */}
              {selection.educationType === 'college' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">University / College Name</label>
                      <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Institution Name" onChange={(e) => setSelection({...selection, institutionName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Department / Major</label>
                      <input type="text" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Computer Science (B.Sc)" onChange={(e) => setSelection({...selection, department: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Degree Level */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Degree Level</label>
                      <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setSelection({...selection, degreeLevel: e.target.value})}>
                        <option value="">Select Level</option>
                        <option value="UG">Undergraduate (UG)</option>
                        <option value="PG">Postgraduate (PG)</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Current Status</label>
                      <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setSelection({...selection, educationStatus: e.target.value, passOutYear: "", currentYear: ""})}>
                        <option value="">Select Status</option>
                        <option value="Pursuing">Currently Pursuing</option>
                        <option value="Passed Out">Passed Out</option>
                      </select>
                    </div>

                    {/* Dynamic Year based on Status */}
                    {selection.educationStatus === "Passed Out" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Year of Passing</label>
                        <input type="number" min="1990" max="2030" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 2023" onChange={(e) => setSelection({...selection, passOutYear: e.target.value})} />
                      </div>
                    )}

                    {selection.educationStatus === "Pursuing" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Current Year</label>
                        <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setSelection({...selection, currentYear: e.target.value})}>
                          <option value="">Select Year</option>
                          <option value="First Year">First Year</option>
                          <option value="Second Year">Second Year</option>
                          <option value="Third Year">Third Year</option>
                          <option value="Fourth Year">Fourth Year</option>
                          <option value="Fifth Year">Fifth Year (If applicable)</option>
                        </select>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Target Course */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><BookOpen size={14}/> Interested G-TEC Course</label>
              <select className="w-full px-5 py-4 bg-blue-50/50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 border border-blue-100" onChange={(e) => setSelection({...selection, course: e.target.value})}>
                <option value="">Select the course you wish to enroll in</option>
                <option value="it-technical">IT / Technical</option>
                <option value="designing">Designing</option>
                <option value="accounting">Accounting</option>
                <option value="civil">Civil / Architecture</option>
              </select>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section 3: Location details */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><MapPin className="text-blue-600"/> Contact & Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><Globe size={14}/> Country</label>
                <select 
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const country = countries.find(c => c.id === e.target.value);
                    setSelection(prev => ({...prev, country, stateId: "", districtId: "", subDistrictId: "", pincode: ""}));
                    setStates([]); setDistricts([]); setSubDistricts([]);
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><Phone size={14}/> Mobile Number</label>
                <div className="relative flex items-center">
                  <div className="absolute left-5 flex items-center gap-2 border-r pr-3 border-gray-200">
                    {selection.country && (
                      <>
                        <img src={`https://flagcdn.com/w20/${selection.country.flag}.png`} alt="flag" className="w-5" />
                        <span className="text-gray-600 font-bold">{selection.country.code}</span>
                      </>
                    )}
                    {!selection.country && <span className="text-gray-300">--</span>}
                  </div>
                  <input disabled={!selection.country} type="tel" className="w-full pl-24 pr-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" placeholder="Enter number"/>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase px-1">State</span>
                <select 
                  disabled={!states.length}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none"
                  value={selection.stateId}
                  onChange={(e) => {
                    setSelection(prev => ({...prev, stateId: e.target.value, districtId: "", subDistrictId: "", pincode: ""}));
                    setDistricts([]); setSubDistricts([]);
                  }}
                >
                  <option value="">Select State</option>
                  {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase px-1">District</span>
                <select 
                  disabled={!districts.length}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none"
                  value={selection.districtId}
                  onChange={(e) => {
                    setSelection(prev => ({...prev, districtId: e.target.value, subDistrictId: "", pincode: ""}));
                    setSubDistricts([]); 
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase px-1">Sub-District (Taluk)</span>
                <select 
                  disabled={!subDistricts.length}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none bg-blue-50/30 border border-blue-100 focus:ring-2 focus:ring-blue-500"
                  value={selection.subDistrictId}
                  onChange={(e) => setSelection(prev => ({...prev, subDistrictId: e.target.value}))}
                >
                  <option value="">Select Sub-District</option>
                  {subDistricts.map(sd => <option key={sd.id} value={sd.id}>{sd.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                <Hash size={14}/> {selection.country?.id === "IN" ? "Type Pincode to Auto-fill locations" : "Pincode"}
              </label>
              <input 
                type="text"
                maxLength={6}
                value={selection.pincode}
                onChange={handlePincodeEntry} 
                className="w-full px-5 py-4 bg-white border border-gray-200 text-blue-700 font-bold rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 629001"
              />
            </div>
          </div>

          <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mt-8">
            Finalize Enrollment <ChevronRight size={20}/>
          </button>
        </form>
      </motion.div>
    </div>
  );
}