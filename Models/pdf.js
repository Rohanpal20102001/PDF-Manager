const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  sharingLink: {
    type: String,
    unique: true,
    required: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Typees.ObjectId,
        ref: "User",
      },
      commentText: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Data,
        default: Date.now,
      },
    },
  ],
  sharedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sharedUser",
    },
  ],
});

const PDF = mongoose.model("PDF", pdfSchema);
module.exports = PDF;
