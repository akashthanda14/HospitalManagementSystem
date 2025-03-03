import React, { useState, useEffect } from 'react';
import { Star, Edit, Trash2, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { getAllHospitals, deleteHospital } from '../api/HospitalAPI.js';

const HospitalList = ({ refreshTrigger, onEdit, onDeleteSuccess }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedHospital, setExpandedHospital] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const data = await getAllHospitals();
        setHospitals(data);
        setError(null);
      } catch (err) {
        setError('Failed to load hospitals. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        await deleteHospital(id);
        onDeleteSuccess();
      } catch (err) {
        alert('Failed to delete hospital. Please try again.');
        console.error(err);
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedHospital(expandedHospital === id ? null : id);
  };

  const renderRatingStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (hospitals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No hospitals found. Add a new hospital to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hospitals.map((hospital) => (
        <div key={hospital._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img
              src={hospital.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'}
              alt={hospital.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white text-xl font-bold truncate">{hospital.name}</h3>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 text-white mr-1" />
                <p className="text-white text-sm">{hospital.city}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex">{renderRatingStars(hospital.rating)}</div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onEdit(hospital)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDelete(hospital._id)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Specialities</h4>
              <div className="flex flex-wrap gap-1">
                {hospital.speciality && hospital.speciality.map((spec, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => toggleExpand(hospital._id)}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              {expandedHospital === hospital._id ? 'Show less' : 'Show more'}
            </button>
            
            {expandedHospital === hospital._id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                {hospital.description && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Description</h4>
                    <p className="text-sm text-gray-600">{hospital.description}</p>
                  </div>
                )}
                
                {hospital.facilities && hospital.facilities.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Facilities</h4>
                    <div className="flex flex-wrap gap-1">
                      {hospital.facilities.map((facility, index) => (
                        <span 
                          key={index} 
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {hospital.contactInfo && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Contact Information</h4>
                    <div className="space-y-1">
                      {hospital.contactInfo.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{hospital.contactInfo.phone}</span>
                        </div>
                      )}
                      {hospital.contactInfo.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{hospital.contactInfo.email}</span>
                        </div>
                      )}
                      {hospital.contactInfo.website && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe className="h-4 w-4 mr-2" />
                          <a 
                            href={hospital.contactInfo.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {hospital.contactInfo.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;