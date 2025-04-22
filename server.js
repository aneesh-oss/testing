// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is up and running!' });
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  
  // Start server only after DB connection
  // app.listen(PORT, '0.0.0.0', () => {
  //   console.log(`Server running at http://0.0.0.0:${PORT}`);
  // });
  
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1); // Stop the server if DB is not connected
});



// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();

// const authRoutes = require('./routes/authRoutes');
// const todoRoutes = require('./routes/todoRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/todo', todoRoutes);

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(process.env.PORT, () =>
//             console.log(`Server running on port ${process.env.PORT}`)
//         );
//     })
//     .catch((err) => console.log(err));
