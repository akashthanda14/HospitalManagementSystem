const API_URL = `https://hospitalmanagementsystem-1-sh3i.onrender.com/api/hospitals`;

// Get all hospitals
export const getAllHospitals = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch hospitals");
    }
    return data;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
};

// Create a new hospital
export const createHospital = async (hospital) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hospital),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create hospital");
    }
    return data;
  } catch (error) {
    console.error("Error creating hospital:", error);
    throw error;
  }
};

// Update a hospital by ID
export const updateHospital = async (hospital) => {
  try {
    const response = await fetch(`${API_URL}/${hospital._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hospital),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update hospital");
    }
    return data;
  } catch (error) {
    console.error("Error updating hospital:", error);
    throw error;
  }
};

// Delete a hospital by ID
export const deleteHospital = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete hospital");
    }
    return data;
  } catch (error) {
    console.error("Error deleting hospital:", error);
    throw error;
  }
};

// Add or update hospital details by ID
export const addOrUpdateHospitalDetails = async (id, details) => {
  try {
    const response = await fetch(`${API_URL}/${id}/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update hospital details");
    }
    return data;
  } catch (error) {
    console.error("Error updating hospital details:", error);
    throw error;
  }
};
