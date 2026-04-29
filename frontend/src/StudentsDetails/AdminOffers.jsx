import React, { useState, useEffect } from "react";
import { Plus, Trash2, Tag, FileText, Check, X, IndianRupee, Save, Star, Link, Edit } from "lucide-react";

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ✅ NEW: State to track if we are editing an existing offer
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "", description: "", priceOff: "", priceOn: "", features: [""], highlighted: false, linkedCategory: "", linkedCourseTitle: ""
  });

  const fetchData = async () => {
    try {
      const [offersRes, coursesRes] = await Promise.all([
        fetch("http://localhost:5000/api/offers"),
        fetch("http://localhost:5000/api/courses")
      ]);
      const offersData = await offersRes.json();
      const coursesData = await coursesRes.json();
      setOffers(offersData);
      setAllCourses(coursesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "linkedCategory") newData.linkedCourseTitle = "";
      return newData;
    });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addFeatureField = () => setFormData({ ...formData, features: [...formData.features, ""] });
  
  const removeFeatureField = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
  };

  // ✅ NEW: Function to load an offer into the form for editing
  const handleEditClick = (offer) => {
    setEditingId(offer._id);
    setFormData({
      name: offer.name || "",
      description: offer.description || "",
      priceOff: offer.priceOff || "",
      priceOn: offer.priceOn || "",
      features: offer.features?.length ? offer.features : [""],
      highlighted: offer.highlighted || false,
      linkedCategory: offer.linkedCategory || "",
      linkedCourseTitle: offer.linkedCourseTitle || ""
    });
    // Smooth scroll back to the top form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ UPDATED: Submit handles both Creating (POST) and Updating (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedData = { ...formData, features: formData.features.filter(f => f.trim() !== "") };

    try {
      const url = editingId 
        ? `http://localhost:5000/api/offers/${editingId}` 
        : "http://localhost:5000/api/offers";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        // Reset form and editing state
        setFormData({ name: "", description: "", priceOff: "", priceOn: "", features: [""], highlighted: false, linkedCategory: "", linkedCourseTitle: "" });
        setEditingId(null);
        fetchData();
      }
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/offers/${id}`, { method: "DELETE" });
      if (response.ok) fetchData();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl pb-50 mx-auto font-sans">
      <div className="flex items-center gap-3 mb-8">
        <Tag className="text-blue-600" size={28} />
        <h1 className="text-3xl font-bold text-gray-900">Manage Offers</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: The Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            {editingId ? <Edit className="text-amber-500" size={24} /> : <Plus className="text-blue-600" size={24} />}
            <h2 className="text-xl font-bold text-gray-800">
              {editingId ? "Edit Offer" : "Create New Offer"}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="relative">
              <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" name="name" required value={formData.name} onChange={handleChange} 
                className="pl-10 p-2.5 w-full bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-sm" 
                placeholder="Offer Name (e.g. Full Stack Mastery)" />
            </div>

            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea name="description" required value={formData.description} onChange={handleChange} rows="2" 
                className="pl-10 p-2.5 w-full bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-sm" 
                placeholder="Short description of the plan..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="text" name="priceOff" required value={formData.priceOff} onChange={handleChange} 
                  className="pl-10 p-2.5 w-full bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-sm" 
                  placeholder="Original Price (e.g. 60,000)" />
              </div>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 text-blue-500" size={18} />
                <input type="text" name="priceOn" required value={formData.priceOn} onChange={handleChange} 
                  className="pl-10 p-2.5 w-full bg-gray-50/50 border border-blue-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-sm font-semibold text-blue-900 placeholder-blue-300" 
                  placeholder="Discount Price (e.g. 30,000)" />
              </div>
            </div>

            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl mt-2">
              <h3 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <Link size={16} className="text-indigo-600"/> Link to Specific Course Module
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="linkedCategory" value={formData.linkedCategory} onChange={handleChange} required
                  className="p-2.5 w-full bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm">
                  <option value="">Select Category...</option>
                  <option value="accounting">Accounting</option>
                  <option value="civil">Civil</option>
                  <option value="designing">Designing</option>
                  <option value="it-technical">IT Technical</option>
                  <option value="it-non-technical">IT Non-Technical</option>
                </select>

                <select name="linkedCourseTitle" value={formData.linkedCourseTitle} onChange={handleChange} required disabled={!formData.linkedCategory}
                  className="p-2.5 w-full bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm disabled:opacity-50">
                  <option value="">Select Target Course...</option>
                  {allCourses.filter(c => c.category === formData.linkedCategory).map(c => (
                    <option key={c._id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 border border-gray-200 rounded-xl mt-2">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Check size={16} className="text-blue-600"/> Feature Highlights
              </h3>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} 
                    className="flex-1 p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm" 
                    placeholder={`Feature point ${index + 1}...`} />
                  {formData.features.length > 1 && (
                    <button type="button" onClick={() => removeFeatureField(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addFeatureField} className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-2 hover:text-blue-800 transition-colors">
                <Plus size={14} /> Add Feature
              </button>
            </div>

            <label className="flex items-center gap-3 mt-2 bg-amber-50/50 p-4 rounded-xl border border-amber-200/50 cursor-pointer group transition-all hover:bg-amber-50">
              <input type="checkbox" name="highlighted" checked={formData.highlighted} onChange={handleChange} 
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-amber-900 flex items-center gap-1 group-hover:text-amber-700">
                  <Star size={16} className="fill-amber-500 text-amber-500"/> Highlight this Offer
                </span>
                <span className="text-xs text-amber-700/70">Displays as the "Most Popular" blue card.</span>
              </div>
            </label>

            {/* ✅ UPDATED: Submit Button Layout with Cancel Option */}
            <div className="flex gap-3 mt-2">
              <button type="submit" className={`flex-1 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md ${editingId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'}`}>
                <Save size={18} /> {editingId ? "Update Offer" : "Publish Offer"}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ name: "", description: "", priceOff: "", priceOn: "", features: [""], highlighted: false, linkedCategory: "", linkedCourseTitle: "" });
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Active Offers List */}
        <div className="lg:col-span-1 flex flex-col h-[calc(100vh-100px)] sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            Active Offers <span className="text-sm bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{offers.length}</span>
          </h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
            {isLoading ? (
              <p className="text-gray-500 text-sm">Loading offers...</p>
            ) : offers.length === 0 ? (
              <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 text-sm">
                No active offers.
              </div>
            ) : (
              offers.map((offer) => (
                <div key={offer._id} className={`p-4 rounded-2xl border transition-all group relative pr-12 ${editingId === offer._id ? 'border-amber-400 bg-amber-50/30' : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'}`}>
                  
                  {offer.highlighted ? (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded uppercase mb-2 flex items-center gap-1 w-fit">
                      <Star size={10} className="fill-amber-600 text-amber-600"/> POPULAR
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase mb-2 inline-block">
                      STANDARD
                    </span>
                  )}
                  
                  <h3 className="font-bold text-gray-800 leading-tight">{offer.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{offer.description}</p>
                  
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-sm font-bold text-gray-900">₹{offer.priceOn}</span>
                    <span className="text-[10px] font-medium text-gray-400 line-through">₹{offer.priceOff}</span>
                  </div>

                  {/* ✅ NEW: Added Edit Button Here */}
                  <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity ${editingId === offer._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button onClick={() => handleEditClick(offer)} className="text-gray-300 hover:text-amber-500 transition-colors bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                      <Edit size={14} className={editingId === offer._id ? "text-amber-500" : ""} />
                    </button>
                    <button onClick={() => handleDelete(offer._id)} className="text-gray-300 hover:text-red-500 transition-colors bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
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