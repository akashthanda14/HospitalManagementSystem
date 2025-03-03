import React, { useState } from 'react';
import { Guitar as HospitalIcon, Plus, RefreshCw } from 'lucide-react';
import HospitalList from './components/HospitalList';
import HospitalForm from './components/HospitalForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddNew = () => {
    setEditingHospital(null);
    setShowForm(true);
  };

  const handleEdit = (hospital) => {
    setEditingHospital(hospital);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingHospital(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingHospital(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <HospitalIcon className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Hospital Management</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setRefreshTrigger(prev => prev + 1)}
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </button>
            <button 
              onClick={handleAddNew}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Hospital
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <HospitalForm 
                hospital={editingHospital} 
                onClose={handleFormClose} 
                onSuccess={handleFormSuccess}
              />
            </div>
          </div>
        )}

        <HospitalList 
          refreshTrigger={refreshTrigger} 
          onEdit={handleEdit} 
          onDeleteSuccess={() => setRefreshTrigger(prev => prev + 1)}
        />
       
      </main>
      <Footer/>
    </div>
  );
}

export default App;