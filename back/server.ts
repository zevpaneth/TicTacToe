import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

// Routes
app.use('/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
