import mongoose from 'mongoose';

const investigationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Case',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['in_progress', 'solved', 'failed', 'abandoned'],
      default: 'in_progress',
    },
    discoveredEvidenceIds: [{ type: String }],
    completedObjectives: [{ type: String }],
    sceneCheckpoint: {
      position: { type: [Number], default: [0, 1.6, 3] },
      rotation: { type: [Number], default: [0, 0, 0] },
      lastInteractedObject: { type: String },
    },
    inventory: [{ type: String }],
    boardState: {
      cards: [
        {
          id: { type: String, required: true },
          evidenceId: { type: String },
          x: { type: Number, default: 0 },
          y: { type: Number, default: 0 },
          note: { type: String },
        },
      ],
      connections: [
        {
          id: { type: String, required: true },
          fromCardId: { type: String, required: true },
          toCardId: { type: String, required: true },
          label: { type: String },
        },
      ],
    },
    notes: {
      type: String,
      default: '',
    },
    hintsUsed: [
      {
        level: { type: Number, enum: [1, 2, 3] },
        timestamp: { type: Date, default: Date.now },
        hintText: { type: String },
      },
    ],
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Investigation = mongoose.model('Investigation', investigationSchema);

