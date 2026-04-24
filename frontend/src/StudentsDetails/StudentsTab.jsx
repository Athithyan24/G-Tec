import React, { useState, useEffect } from "react";
import { Search, GraduationCap, MapPin, Phone, Calendar, User, FileText, Download } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 p-8 py-50 pb-70">
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
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase">Phone Number</th>
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase">Education</th>
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase">Location</th>
                  <th className="p-5 text-xs font-bold text-gray-400 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStudents.map((student) => (
  <motion.tr 
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    key={student._id} 
    className="hover:bg-blue-50/30 border-b border-gray-100 transition-colors"
  >
    {/* 1. STUDENT INFO & PHONE */}
    <td className="p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
          {student.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-gray-800">{student.name}</p>
          
          <p className="text-[10px] text-gray-400 flex items-center gap-1 uppercase tracking-wider">
            <Calendar size={10}/> {student.dob}
          </p>
        </div>
      </div>
    </td>

    {/* 2. COURSE SELECTED */}
    <td className="p-5 text-sm">
      <div className="flex flex-col gap-1">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold border border-blue-100 text-[11px] w-fit">
          {student.course}
        </span>
      </div>
    </td>

    <td className="p-5 text-sm">
      <div className="flex flex-col gap-1">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold border border-blue-100 text-[11px] w-fit">
          {student.phone}
        </span>
      </div>
    </td>

    {/* 3. EDUCATION DETAILS (Dynamic for School/College) */}
    <td className="p-5 text-sm">
      <div className="flex items-start gap-2">
        <GraduationCap size={16} className="text-gray-400 mt-0.5" />
        <div>
          {student.educationType === "college" ? (
            <>
              <p className="font-bold text-gray-700 text-xs">{student.degreeLevel} - {student.department}</p>
              <p className="text-[10px] mt-1">
                {student.educationStatus === "Pursuing" ? (
                  <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold uppercase">
                    Year: {student.currentYear}
                  </span>
                ) : (
                  <span className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-semibold uppercase">
                    Passed: {student.passOutYear}
                  </span>
                )}
              </p>
            </>
          ) : (
            <>
              <p className="font-bold text-gray-700 text-xs">Class: {student.classGrade}</p>
              <p className="text-[10px] mt-1">
                {student.educationStatus === "Pursuing" ? (
                  <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-semibold uppercase">
                    Currently Studying
                  </span>
                ) : (
                  <span className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-semibold uppercase">
                    Completed: {student.passOutYear}
                  </span>
                )}
              </p>
            </>
          )}
          <p className="text-[10px] text-gray-400 mt-1 italic truncate max-w-[140px]">
            {student.institutionName}
          </p>
        </div>
      </div>
    </td>

    {/* 4. LOCATION */}
    <td className="p-5 text-sm text-gray-600">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 font-medium text-gray-800 text-xs">
          <MapPin size={12} className="text-red-500" />
          {student.district}, {student.state}
        </div>
        <div className="text-[10px] text-gray-500 ml-4">
          Taluk: <span className="capitalize">{student.subDistrict}</span>
        </div>
        <div className="text-[10px] text-gray-400 font-mono ml-4">
          PIN: {student.pincode}
        </div>
      </div>
    </td>

    {/* 5. ACTIONS */}
    <td className="p-5 text-center">
      <button className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all group">
        <FileText size={18} />
      </button>
    </td>
  </motion.tr>
))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}