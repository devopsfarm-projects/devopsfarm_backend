// src/routes/registerUser.ts

import express from 'express';
// import { createUser } from '../controllers/userController';
// import {registerUser} from '../controllers/createUser'
import { register } from '../controllers/authController';
const router = express.Router();

router.post('/', register);  // POST /auth/register

export default router;



// import express from 'express';
// import { registerUser } from '../controllers/createUser';

// const router = express.Router();

// router.post('/', registerUser);  // POST /auth/register

// export default router;