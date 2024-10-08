import express from 'express';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcryptjs';

// Import your routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import certificateRoutes from './routes/certificateRoutes';
import registerRoutes from './routes/registerUser';

// Import your logger and Swagger setup
import { logger } from './utils/logger';
import { setupSwaggerDocs } from './swagger/swagger';
import connectDB from './config/db';  // Your MongoDB connection function
import User from './models/User';  // Assuming the User model is correctly defined

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,  // Necessary if the frontend is sending cookies
}));

// Connect to MongoDB
connectDB()
 

// Hash passwords for existing users (optional setup process)
const hashPasswords = async () => {
  try {
    const users = await User.find();  // Get all users
    for (let user of users) {
      // Check if the user has the `name` field
      if (!user.name) {
        console.log(`User with email ${user.email} is missing the name field`);
        // Optionally, assign a default name or skip the user
        user.name = 'Unknown';  // You can adjust this according to your needs
      }

      // Check if the password is not hashed
      if (!user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;  // Update the password
        await user.save();  // Save the updated user
        console.log(`Password for user ${user.email} has been hashed`);
      }
    }
    console.log('All plain text passwords have been hashed');
  } catch (err:any) {
    console.error(`Error hashing passwords: ${err.message}`);
  }
};


// Set up routes
app.use('/auth', authRoutes);  // Handles login
app.use('/auth/register', registerRoutes);  // Handles registration
app.use('/users', userRoutes);  // Handles user-related routes
app.use('/courses', courseRoutes);  // Handles courses
app.use('/certificates', certificateRoutes);  // Handles certificates

// Static file serving (e.g., for image uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup Swagger for API documentation
setupSwaggerDocs(app);

// Global error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Export the app for testing or starting the server
export default app;


