import Hospital from "../models/Hospitals.js";

// Get all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hospitals", error: error.message });
  }
};

// Create a new hospital
export const createHospital = async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    await newHospital.save();
    res.status(201).json(newHospital);
  } catch (error) {
    res.status(500).json({ message: "Failed to create hospital", error: error.message });
  }
};

// Update a hospital by ID
export const updateHospital = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: "Failed to update hospital", error: error.message });
  }
};

// Delete a hospital by ID
export const deleteHospital = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHospital = await Hospital.findByIdAndDelete(id);
    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hospital", error: error.message });
  }
};

// Add or update hospital details by ID
export const addOrUpdateHospitalDetails = async (req, res) => {
  const { id } = req.params;
  const details = req.body;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Update the hospital details
    hospital.description = details.description || hospital.description;
    hospital.facilities = details.facilities || hospital.facilities;
    hospital.contactInfo = details.contactInfo || hospital.contactInfo;

    await hospital.save();
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Failed to update hospital details", error: error.message });
  }
};