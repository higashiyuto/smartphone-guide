// models/Smartphone.js
const mongoose = require('mongoose'); // 🌟 この1行が消えてしまっていたのが原因です！

const smartphoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String, required: false },
  display: { type: String, required: false },
  weight: { type: String, required: false },
  sd_card: { type: String, required: false },
  battery: { type: String, required: false },
  jac: { type: String, required: false },
  releaseDate: { type: Date },
  specs: {
    cpu: String,
    gpu: String,
    ram: String,
    rom: String
  },
  variants: [{
    colorName: String,
    colorHex: String,
    imageUrl: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Smartphone', smartphoneSchema);