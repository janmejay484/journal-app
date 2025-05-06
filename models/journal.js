const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Journal', journalSchema);



