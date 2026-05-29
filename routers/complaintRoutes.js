const express = require('express');
const router = express.Router();
const { submitComplaint, getMyComplaints, getComplaint, updateComplaintStatus } = require('../controllers/complaintController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.array('attachments', 5), submitComplaint);
router.get('/my', protect, getMyComplaints);
router.get('/:id', protect, getComplaint);
router.put('/:id/status', protect, adminOnly, updateComplaintStatus);

module.exports = router;
