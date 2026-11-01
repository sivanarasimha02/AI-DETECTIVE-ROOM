import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Case',
      required: true,
      index: true,
    },
    evidenceCode: {
      type: String,
      required: true, // e.g. E-01, E-02
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    assetPath: {
      type: String,
    },
    observations: [{ type: String }],
    isMisleading: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

evidenceSchema.index({ caseId: 1, evidenceCode: 1 }, { unique: true });

export const Evidence = mongoose.model('Evidence', evidenceSchema);

