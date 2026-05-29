const express = require('express');
const router = express.Router();
const { applyService, getMyServices, trackService, updateServiceStatus } = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.array('documents', 5), applyService);
router.get('/my', protect, getMyServices);
router.get('/:id/track', protect, trackService);
router.put('/:id/status', protect, adminOnly, updateServiceStatus);

module.exports = router;
