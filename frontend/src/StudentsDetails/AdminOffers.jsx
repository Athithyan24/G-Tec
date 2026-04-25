import React, { useState, useEffect } from "react";
import { Plus, Trash2, Tag, FileText, Check, X, IndianRupee, Save, Star } from "lucide-react";

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "", description: "", priceOff: "", priceOn: "", features: [""], highlighted: false,
  });

  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/offers");
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchOffers(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedData = { ...formData, features: formData.features.filter(f => f.trim() !== "") };

    try {
      const response = await fetch("http://localhost:5000/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        setFormData({ name: "", description: "", priceOff: "", priceOn: "", features: [""], highlighted: false });
        fetchOffers();
      }
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/offers/${id}`, { method: "DELETE" });
      if (response.ok) fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Tag className="text-blue-600" size={28} />
        <h1 className="text-3xl font-bold text-gray-900">Manage Offers</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: The Form (Matches Course Management width & style) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <Plus className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Create New Offer</h2>
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
                <span className="text-xs text-amber-700/70">Displays as the "Most Popular" blue card on the main website.</span>
              </div>
            </label>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 mt-2">
              <Save size={18} /> Publish Offer
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Active Offers List (Matches Course Management sticky list & hover styles) */}
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
                <div key={offer._id} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group relative pr-12">
                  
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

                  {/* Hover Actions (Matches exactly with CourseManagement) */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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