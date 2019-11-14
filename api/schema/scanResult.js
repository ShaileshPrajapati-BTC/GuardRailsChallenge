const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScanResultSchema = new Schema(
  {
    status: { type: String, enum: ['queued', 'in_progress', 'success', 'failure'] },
    repositoryName: String,
    findings: Object,
    queuedAt: Date,
    scanningAt: Date,
    finishedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScanResult", ScanResultSchema);