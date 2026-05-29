const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { rating, comment, complaintId, serviceId } = req.body;
    const feedback = await Feedback.create({
      user: req.user._id,
      rating, comment,
      complaint: complaintId || null,
      service: serviceId || null
    });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('user', 'name email');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
