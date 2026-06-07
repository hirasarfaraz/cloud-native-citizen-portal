const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routers/authRoutes'));
app.use('/api/complaints', require('./routers/complaintRoutes'));
app.use('/api/services', require('./routers/serviceRoutes'));
app.use('/api/notifications', require('./routers/notificationRoutes'));
app.use('/api/feedback', require('./routers/feedbackRoutes'));
app.use('/api/admin', require('./routers/adminRoutes'));

app.get("/", (req, res) => {
  res.send("Citizen Portal Backend Running 🚀");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
