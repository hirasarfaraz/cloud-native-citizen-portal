const Service = require('../models/Service');

// Apply for service
exports.applyService = async (req, res) => {
  try {
    const { serviceType } = req.body;
    const documents = req.files ? req.files.map(f => f.path) : [];

    const service = await Service.create({
      user: req.user._id,
      serviceType, documents
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my services
exports.getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ user: req.user._id }).sort('-createdAt');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track service
exports.trackService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({
      serviceType: service.serviceType,
      status: service.status,
      estimatedCompletion: service.estimatedCompletion,
      remarks: service.remarks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update service status (admin)
exports.updateServiceStatus = async (req, res) => {
  try {
    const { status, estimatedCompletion, remarks } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { status, estimatedCompletion, remarks },
      { new: true }
    );
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
