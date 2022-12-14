import express from 'express';
import {
  registerUser,
  loginUser,
  refreshToken
} from '../controllers/usersController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);

export default router;
