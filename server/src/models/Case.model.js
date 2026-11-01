import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    sceneConfig: {
      roomType: { type: String, default: 'detective_office' },
      environmentPreset: { type: String, default: 'night' },
      spawnPosition: { type: [Number], default: [0, 1.6, 3] },
    },
    objectDefinitions: [
      {
        objectId: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true }, // desk, board, cabinet, terminal, photo, etc.
        position: { type: [Number], required: true },
        rotation: { type: [Number], default: [0, 0, 0] },
        scale: { type: [Number], default: [1, 1, 1] },
        interactable: { type: Boolean, default: true },
        associatedEvidenceId: { type: String },
      },
    ],
    objectives: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        prerequisites: [{ type: String }],
        requiredEvidenceId: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ['available', 'locked', 'archived'],
      default: 'available',
    },
    // CANONICAL SOLUTION IS PROTECTED: Not selected by default in queries
    canonicalSolution: {
      type: {
        culpritSuspectId: { type: String, required: true },
        culpritName: { type: String, required: true },
        keyEvidenceIds: [{ type: String }],
        summary: { type: String, required: true },
        reconstruction: { type: String },
      },
      select: false, // Prevents leaking to client
    },
  },
  {
    timestamps: true,
  }
);

export const Case = mongoose.model('Case', caseSchema);

