import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, BookOpen, Layers, ImageIcon, FileText, Clock, Tag, AlignLeft, Edit, X, Award } from "lucide-react";

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all"); 
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "", category: "", shortDesc: "", fullDesc: "", duration: "", image: ""
  });

  const [tags, setTags] = useState([""]);
  const [syllabus, setSyllabus] = useState([""]);
  const [certifications, setCertifications] = useState([""]); // <-- New State

  const API_BASE = "http://localhost:5000/api";

  const fetchCourses = () => {
    fetch(`${API_BASE}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleArrayChange = (index, value, setter, array) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };
  const addArrayItem = (setter, array) => setter([...array, ""]);
  const removeArrayItem = (index, setter, array) => {
    if (array.length > 1) setter(array.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", category: "", shortDesc: "", fullDesc: "", duration: "", image: "" });
    setTags([""]);
    setSyllabus([""]);
    setCertifications([""]); // <-- Reset
  };

  const handleEditClick = (course) => {
    setEditingId(course._id);
    setFormData({
      title: course.title, category: course.category, shortDesc: course.shortDesc, 
      fullDesc: course.fullDesc, duration: course.duration, image: course.image || ""
    });
    setTags(course.tags?.length ? course.tags : [""]);
    setSyllabus(course.syllabus?.length ? course.syllabus : [""]);
    setCertifications(course.certifications?.length ? course.certifications : [""]); // <-- Populate Edit
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await fetch(`${API_BASE}/courses/${id}`, { method: "DELETE" });
      if (editingId === id) resetForm(); 
      fetchCourses();
    } catch (error) { console.error("Error deleting", error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedTags = tags.filter(t => t.trim() !== "");
    const cleanedSyllabus = syllabus.filter(s => s.trim() !== "");
    const cleanedCertifications = certifications.filter(c => c.trim() !== ""); // <-- Clean up

    if (!formData.title || !formData.category) return alert("Title and Category are required!");

    const coursePayload = { 
      ...formData, 
      tags: cleanedTags, 
      syllabus: cleanedSyllabus,
      certifications: cleanedCertifications // <-- Add to Payload
    };
    
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_BASE}/courses/${editingId}` : `${API_BASE}/courses`;

    try {
      const response = await fetch(url, {
        method: method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coursePayload)
      });
      const result = await response.json();
      
      if (result.success) {
        alert(editingId ? "Course Updated Successfully!" : "Course Added Successfully!");
        resetForm();
        fetchCourses(); 
      }
    } catch (error) { console.error("Error saving course", error); }
  };

  const filteredCourses = activeFilter === "all" ? courses : courses.filter(c => c.category === activeFilter);
  const categories = [
    { id: "all", label: "All Courses" },
    { id: "it-technical", label: "IT Technical" },
    { id: "it-non-technical", label: "IT Non-Tech" },
    { id: "designing", label: "Designing" },
    { id: "accounting", label: "Accounting" },
    { id: "civil", label: "Civil" }
  ];

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium";
  const labelClass = "text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1.5 mb-1.5 tracking-wider";

  return (
    <div className="min-h-screen bg-white p-8 pt-40 pb-30 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
          <div className={`${editingId ? "bg-amber-500" : "bg-blue-900"} p-6 text-white flex items-center justify-between transition-colors`}>
            <div className="flex items-center gap-3">
              {editingId ? <Edit size={24} /> : <BookOpen size={24} />}
              <div>
                <h2 className="text-xl font-bold">{editingId ? "Edit Course" : "Add New Course"}</h2>
                <p className={`text-xs mt-1 ${editingId ? "text-amber-100" : "text-blue-200"}`}>
                  {editingId ? "Update existing details" : "Populate your website dynamically"}
                </p>
              </div>
            </div>
            {editingId && (
              <button onClick={resetForm} className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-1">
                <X size={16}/> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}><FileText size={14}/> Course Title</label>
                <input type="text" className={inputClass} placeholder="e.g. Tally Prime with GST" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required/>
              </div>
              <div>
                <label className={labelClass}><Layers size={14}/> Category</label>
                <select className={inputClass} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
                  <option value="">Select Category</option>
                  <option value="it-technical">IT / Technical</option>
                  <option value="it-non-technical">IT / Non-Technical</option>
                  <option value="designing">Designing</option>
                  <option value="accounting">Accounting</option>
                  <option value="civil">Civil / Architecture</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="md:col-span-3">
                <label className={labelClass}><ImageIcon size={14}/> Image URL</label>
                <input type="url" className={inputClass} placeholder="https://images.unsplash.com/..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}><Clock size={14}/> Duration</label>
                <input type="text" className={inputClass} placeholder="e.g. 3 Months" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
              </div>
            </div>

            <div>
              <label className={labelClass}><AlignLeft size={14}/> Short Description</label>
              <input type="text" className={inputClass} placeholder="Brief one-liner for the card view..." value={formData.shortDesc} onChange={e => setFormData({...formData, shortDesc: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}><AlignLeft size={14}/> Full Description</label>
              <textarea rows="3" className={`${inputClass} resize-none`} placeholder="Detailed explanation of the course..." value={formData.fullDesc} onChange={e => setFormData({...formData, fullDesc: e.target.value})} />
            </div>

            {/* Changed to 3 Columns to fit the Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              
              <div>
                <label className={labelClass}><Tag size={14}/> Tags</label>
                {tags.map((tag, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" className={inputClass} placeholder="e.g. GST" value={tag} onChange={(e) => handleArrayChange(i, e.target.value, setTags, tags)} />
                    <button type="button" onClick={() => removeArrayItem(i, setTags, tags)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem(setTags, tags)} className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-1 hover:underline"><Plus size={14}/> Add Tag</button>
              </div>

              <div>
                <label className={labelClass}><BookOpen size={14}/> Syllabus</label>
                {syllabus.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" className={inputClass} placeholder={`Point ${i + 1}`} value={item} onChange={(e) => handleArrayChange(i, e.target.value, setSyllabus, syllabus)} />
                    <button type="button" onClick={() => removeArrayItem(i, setSyllabus, syllabus)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem(setSyllabus, syllabus)} className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-1 hover:underline"><Plus size={14}/> Add Point</button>
              </div>

              {/* NEW CERTIFICATIONS BLOCK */}
              <div>
                <label className={labelClass}><Award size={14}/> Certifications</label>
                {certifications.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" className={inputClass} placeholder={`Cert ${i + 1}`} value={item} onChange={(e) => handleArrayChange(i, e.target.value, setCertifications, certifications)} />
                    <button type="button" onClick={() => removeArrayItem(i, setCertifications, certifications)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem(setCertifications, certifications)} className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-1 hover:underline"><Plus size={14}/> Add Cert</button>
              </div>

            </div>

            <button type="submit" className={`w-full py-4 text-white rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-md mt-4 ${editingId ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"}`}>
              <Save size={18} /> {editingId ? "Update Course in Database" : "Save Course to Database"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-[fit-content] max-h-[85vh] flex flex-col">
          <div className="bg-gray-50 border-b border-gray-100 p-5 pb-4">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              Manage Courses ({filteredCourses.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveFilter(cat.id)} className={`text-[10px] px-2.5 py-1.5 rounded-lg font-bold border transition-colors ${activeFilter === cat.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"}`}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3">
            {filteredCourses.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-10">No courses found.</p>
            ) : (
              filteredCourses.map(course => (
                <div key={course._id} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group relative pr-16">
                  <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase mb-2 inline-block">
                    {course.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-bold text-gray-800 leading-tight">{course.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Clock size={10}/> {course.duration}</p>
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditClick(course)} className="text-gray-300 hover:text-amber-500 transition-colors bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(course._id)} className="text-gray-300 hover:text-red-500 transition-colors bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}