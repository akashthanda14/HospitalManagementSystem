import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { createHospital, updateHospital } from '../api/HospitalAPI';

const HospitalForm = ({ hospital, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image: '',
    speciality: [''],
    rating: 3,
    description: '',
    facilities: [''],
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (hospital) {
      setFormData({
        ...hospital,
        speciality: hospital.speciality?.length ? hospital.speciality : [''],
        facilities: hospital.facilities?.length ? hospital.facilities : [''],
        contactInfo: {
          phone: hospital.contactInfo?.phone || '',
          email: hospital.contactInfo?.email || '',
          website: hospital.contactInfo?.website || ''
        }
      });
    }
  }, [hospital]);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Hospital name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    
    // Check if at least one non-empty speciality exists
    const hasSpeciality = formData.speciality.some(s => s.trim() !== '');
    if (!hasSpeciality) newErrors.speciality = 'At least one speciality is required';
    
    // Validate email format if provided
    if (formData.contactInfo.email && !/\S+@\S+\.\S+/.test(formData.contactInfo.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Validate website URL if provided
    if (formData.contactInfo.website && !formData.contactInfo.website.match(/^(http|https):\/\/[^ "]+$/)) {
      newErrors.website = 'Invalid website URL format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contactInfo.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSpecialityChange = (index, value) => {
    const updatedSpecialities = [...formData.speciality];
    updatedSpecialities[index] = value;
    setFormData({
      ...formData,
      speciality: updatedSpecialities
    });
  };
  
  const handleFacilityChange = (index, value) => {
    const updatedFacilities = [...formData.facilities];
    updatedFacilities[index] = value;
    setFormData({
      ...formData,
      facilities: updatedFacilities
    });
  };
  
  const addSpeciality = () => {
    setFormData({
      ...formData,
      speciality: [...formData.speciality, '']
    });
  };
  
  const removeSpeciality = (index) => {
    if (formData.speciality.length > 1) {
      const updatedSpecialities = formData.speciality.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        speciality: updatedSpecialities
      });
    }
  };
  
  const addFacility = () => {
    setFormData({
      ...formData,
      facilities: [...formData.facilities, '']
    });
  };
  
  const removeFacility = (index) => {
    if (formData.facilities.length > 1) {
      const updatedFacilities = formData.facilities.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        facilities: updatedFacilities
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setIsSubmitting(true);
      
      // Filter out empty specialities and facilities
      const cleanedData = {
        ...formData,
        speciality: formData.speciality.filter(s => s.trim() !== ''),
        facilities: formData.facilities.filter(f => f.trim() !== '')
      };
      
      if (hospital && hospital._id) {
        await updateHospital({ ...cleanedData, _id: hospital._id });
      } else {
        await createHospital(cleanedData);
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save hospital. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {hospital ? 'Edit Hospital' : 'Add New Hospital'}
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter hospital name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City*
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter city"
            />
            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL*
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter image URL"
            />
            {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Tip: Use a URL from Unsplash or similar sites
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex items-center">
              <input
                type="range"
                name="rating"
                min="1"
                max="5"
                step="0.5"
                value={formData.rating}
                onChange={handleChange}
                className="w-full"
              />
              <span className="ml-2 text-gray-700">{formData.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Specialities */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Specialities*
            </label>
            <button
              type="button"
              onClick={addSpeciality}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add More
            </button>
          </div>
          {errors.speciality && <p className="mt-1 text-sm text-red-500">{errors.speciality}</p>}
          
          {formData.speciality.map((spec, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={spec}
                onChange={(e) => handleSpecialityChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Cardiology, Neurology"
              />
              <button
                type="button"
                onClick={() => removeSpeciality(index)}
                className="ml-2 text-red-500 hover:text-red-700"
                disabled={formData.speciality.length <= 1}
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hospital description"
          ></textarea>
        </div>
        
        {/* Facilities */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Facilities
            </label>
            <button
              type="button"
              onClick={addFacility}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add More
            </button>
          </div>
          
          {formData.facilities.map((facility, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={facility}
                onChange={(e) => handleFacilityChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Ambulance, Pharmacy"
              />
              <button
                type="button"
                onClick={() => removeFacility(index)}
                className="ml-2 text-red-500 hover:text-red-700"
                disabled={formData.facilities.length <= 1}
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Contact Information */}
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="text"
                name="contactInfo.website"
                value={formData.contactInfo.website}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.website ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter website URL"
              />
              {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : hospital ? 'Update Hospital' : 'Add Hospital'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HospitalForm;