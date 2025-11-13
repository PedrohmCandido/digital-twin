import Device from "../models/Device.js";

// GET /devices
export const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /devices
export const createDevice = async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE /devices/:id
export const updateDevice = async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.json(updatedDevice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /devices/:id
export const deleteDevice = async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);

    if (!deletedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
