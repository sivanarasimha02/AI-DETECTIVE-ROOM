import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    settings: {
      reducedMotion: { type: Boolean, default: false },
      soundVolume: { type: Number, default: 0.7 },
      controlsMode: { type: String, enum: ['fps', 'pointAndClick'], default: 'fps' },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);

