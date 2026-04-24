import React, { useState, useEffect } from "react";
import { Search, GraduationCap, MapPin, Calendar, User, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function StudentsTab() {

    const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 py-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Enrollments</h1>
            <p className="text-gray-500">Manage and view all registered G-TEC students</p>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or course..."
              className="pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80 shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase">Student Info</th>
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase">Course</th>
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase">Education</th>
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase">Location</th>
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                   <tr><td colSpan="5" className="p-20 text-center text-gray-400">Loading records...</td></tr>
                ) : filteredStudents.length === 0 ? (
                   <tr><td colSpan="5" className="p-20 text-center text-gray-400">No students found.</td></tr>
                ) : (
                  filteredStudents.map((student) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={student._id} 
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{student.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={12}/> DOB: {student.dob}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold border border-blue-100 capitalize">
                          {student.course}
                        </span>
                      </td>
                      <td className="p-5 text-sm">
                        <div className="flex items-start gap-2">
                          <GraduationCap size={16} className="text-gray-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-700 capitalize">{student.educationType}</p>
                            <p className="text-xs text-gray-500 max-w-[150px] truncate">{student.institutionName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-gray-600">
  <div className="flex flex-col gap-1">
    {/* Main Location: District & State */}
    <div className="flex items-center gap-1.5 font-medium text-gray-800">
      <MapPin size={14} className="text-red-500" />
      {student.district || "N/A"}, {student.state || "N/A"}
    </div>
    
    {/* Secondary Location: Sub-District (Taluk) */}
    {student.subDistrict && (
      <div className="text-[11px] text-gray-500 ml-5">
        Taluk: <span className="capitalize">{student.subDistrict}</span>
      </div>
    )}
    
    {/* Pincode with a subtle badge style */}
    <div className="ml-5 mt-1">
      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono border border-gray-200">
        PIN: {student.pincode}
      </span>
    </div>
  </div>
</td>
                      <td className="p-5 text-center">
                        <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-blue-600 transition-all border border-transparent hover:border-gray-100">
                          <FileText size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}