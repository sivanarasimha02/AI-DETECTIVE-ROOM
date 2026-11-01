import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_jwt_detective_key';

// In-memory store fallback for development
const mockUsers = new Map();

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let createdUser = null;

    try {
      createdUser = await User.create({
        username,
        email,
        passwordHash,
      });
    } catch (dbError) {
      // In-memory fallback
      if (mockUsers.has(email)) {
        return res.status(409).json({
          success: false,
          message: 'User already exists',
        });
      }
      createdUser = {
        _id: 'usr_' + Date.now(),
        username,
        email,
        settings: { reducedMotion: false, soundVolume: 0.7, controlsMode: 'fps' },
      };
      mockUsers.set(email, { ...createdUser, passwordHash });
    }

    const token = jwt.sign(
      { id: createdUser._id, username: createdUser.username, email: createdUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      user: {
        id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        settings: createdUser.settings,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    let user = null;
    let validPassword = false;

    try {
      user = await User.findOne({ email });
      if (user) {
        validPassword = await bcrypt.compare(password, user.passwordHash);
      }
    } catch {
      // Fallback to in-memory check
      const memUser = mockUsers.get(email);
      if (memUser) {
        validPassword = await bcrypt.compare(password, memUser.passwordHash);
        user = memUser;
      }
    }

    if (!user || !validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        settings: user.settings,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
}

export async function getMe(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    });
  }

  res.json({
    success: true,
    user: req.user,
  });
}

