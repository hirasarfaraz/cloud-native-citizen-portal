const Complaint = require('../models/Complaint');

// Submit complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const attachments = req.files ? req.files.map(f => f.path) : [];

    const complaint = await Complaint.create({
      user: req.user._id,
      title, category, description, attachments
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my complaints
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort('-createdAt');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single complaint
exports.getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('user', 'name email');
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update complaint status (admin)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, assignedDepartment, estimatedCompletion } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, assignedDepartment, estimatedCompletion },
      { new: true }
    );
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
