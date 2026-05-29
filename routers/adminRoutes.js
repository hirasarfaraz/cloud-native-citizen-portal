const express = require('express');
const router = express.Router();
const { getAllUsers, getAllComplaints, getDashboardStats, deleteUser } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/users/:id', protect, adminOnly, deleteUser);
router.get('/complaints', protect, adminOnly, getAllComplaints);

module.exports = router;
