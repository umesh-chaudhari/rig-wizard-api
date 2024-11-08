const mongoose = require('mongoose');

const BuildSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    cpu: {
        type: Object,
        required: true,
    },
    gpu: {
        type: Object,
        required: true,
    },
    ram: {
        type: Object,
        required: true,
    },
    motherboard: {
        type: Object,
        required: true,
    },
    storage: {
        type: Object,
        required: true,
    },
    powerSupply: {
        type: Object,
        required: true,
    },
    pcCase: {
      type: Object,
      required: true,
    },
    cooler:{
        type: Object,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { _id: true });

module.exports = mongoose.model('Build', BuildSchema);
