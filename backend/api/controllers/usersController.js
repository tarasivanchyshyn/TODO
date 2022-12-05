import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Please fill all the fields' });
    return;
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id)
    });
  } else {
    res.status(400).json({ message: 'Invalid email or password' });
    return;
  }
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { access_token, refresh_token } = req.body;

  if (!access_token || !refresh_token) {
    res.status(400).json({ message: 'Tokens not provided' });
    return;
  }

  const user = await User.findOne({ accessToken: access_token });

  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  res.json({
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id)
  });
});

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15s'
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d'
  });
};
