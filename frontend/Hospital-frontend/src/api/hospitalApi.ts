import { Hospital, ApiResponse } from '../types';

const API_URL = 'http://localhost:3000/api/hospitals';

export const getAllHospitals = async (): Promise<Hospital[]> => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch hospitals');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    throw error;
  }
};

export const createHospital = async (hospital: Hospital): Promise<ApiResponse<Hospital>> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospital),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create hospital');
    }
    
    return data;
  } catch (error) {
    console.error('Error creating hospital:', error);
    throw error;
  }
};

export const updateHospital = async (hospital: Hospital): Promise<ApiResponse<Hospital>> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospital),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update hospital');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating hospital:', error);
    throw error;
  }
};

export const deleteHospital = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete hospital');
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting hospital:', error);
    throw error;
  }
};

export const addOrUpdateHospitalDetails = async (
  id: string, 
  details: Partial<Hospital>
): Promise<ApiResponse<Hospital>> => {
  try {
    const response = await fetch(`${API_URL}/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...details }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update hospital details');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating hospital details:', error);
    throw error;
  }
};