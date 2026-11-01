import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Case',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true, // e.g. Security Guard, Curator, Visiting Collector
    },
    profile: {
      type: String,
      required: true,
    },
    motive: {
      type: String,
      required: true,
    },
    alibi: {
      type: String,
      required: true,
    },
    statement: {
      type: String,
      required: true,
    },
    evidenceReferences: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Suspect = mongoose.model('Suspect', suspectSchema);

