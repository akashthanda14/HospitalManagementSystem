import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { hospitalAPI } from "../api/HospitalAPI.js";
import { motion } from "framer-motion";
import { Building2, MapPin, Image, Star, Plus, Loader2 } from "lucide-react";

const AddHospitalForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    image: "",
    speciality: [],
    rating: ""
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [specialityInput, setSpecialityInput] = useState("");

  // Speciality options (static for now, can come from backend too)
  const specialitiesList = [
    "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology",
    "Dermatology", "Gastroenterology", "Ophthalmology", "Psychiatry", "Urology"
  ];

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Hospital name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    
    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.image)) {
      newErrors.image = "Please enter a valid URL starting with http:// or https://";
    }
    
    if (formData.speciality.length === 0) {
      newErrors.speciality = "At least one speciality is required";
    }
    
    if (!formData.rating) {
      newErrors.rating = "Rating is required";
    } else if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change (for normal fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle speciality selection
  const handleSpecialitySelect = (speciality) => {
    if (!formData.speciality.includes(speciality)) {
      setFormData({
        ...formData,
        speciality: [...formData.speciality, speciality]
      });
      setSpecialityInput("");
      
      // Clear error
      if (errors.speciality) {
        setErrors({
          ...errors,
          speciality: null
        });
      }
    }
  };

  // Remove speciality
  const removeSpeciality = (speciality) => {
    setFormData({
      ...formData,
      speciality: formData.speciality.filter(item => item !== speciality)
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await hospitalAPI.add(formData);
      toast.success("Hospital added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        city: "",
        image: "",
        speciality: [],
        rating: ""
      });
      
    } catch (error) {
      console.error("Error adding hospital:", error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add hospital. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Filtered specialities based on input
  const filteredSpecialities = specialitiesList.filter(
    item => item.toLowerCase().includes(specialityInput.toLowerCase()) && 
    !formData.speciality.includes(item)
  );

  return (
    <div className="relative min-h-screen bg-black overflow-hidden py-12">
      {/* Ambient background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#230e35]/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#230e35]/20 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern with dots */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_2px,_transparent_2px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </motion.div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0d0612] to-[#130820]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,black)]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <Toaster position="top-right" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 p-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-4">
              <Building2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Add New Hospital</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hospital Name */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Hospital Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                placeholder="Enter hospital name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>
            
            {/* City */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.city ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 pl-10 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                  placeholder="Enter city name"
                />
              </div>
              {errors.city && (
                <p className="mt-1 text-sm text-red-400">{errors.city}</p>
              )}
            </div>
            
            {/* Image URL */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Image URL
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.image ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 pl-10 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-400">{errors.image}</p>
              )}
              
              {formData.image && (
                <div className="mt-3 relative rounded-lg overflow-hidden h-40 bg-white/5">
                  <img 
                    src={formData.image} 
                    alt="Hospital preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* Specialities */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Specialities
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={specialityInput}
                  onChange={(e) => setSpecialityInput(e.target.value)}
                  className={`w-full bg-white/5 border ${errors.speciality ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                  placeholder="Search specialities..."
                />
                
                {specialityInput && filteredSpecialities.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-[#1a0d29] border border-white/10 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredSpecialities.map((speciality) => (
                      <div
                        key={speciality}
                        className="px-4 py-2 hover:bg-white/5 cursor-pointer text-white/80"
                        onClick={() => handleSpecialitySelect(speciality)}
                      >
                        {speciality}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {errors.speciality && (
                <p className="mt-1 text-sm text-red-400">{errors.speciality}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.speciality.map((speciality) => (
                  <div
                    key={speciality}
                    className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {speciality}
                    <button
                      type="button"
                      onClick={() => removeSpeciality(speciality)}
                      className="ml-2 text-indigo-300 hover:text-white focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rating */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Rating (1-5)
              </label>
              <div className="relative">
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className={`w-full bg-white/5 border ${errors.rating ? 'border-red-500/50' : 'border-white/10'} rounded-lg p-3 pl-10 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                  placeholder="Enter rating (1-5)"
                />
              </div>
              {errors.rating && (
                <p className="mt-1 text-sm text-red-400">{errors.rating}</p>
              )}
              
              {formData.rating && (
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(formData.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < formData.rating
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-white/60 text-sm">
                    {formData.rating} out of 5
                  </span>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Hospital
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddHospitalForm;