const mongoose = require('mongoose');
const stream = require("node:stream");

const BuildSchema = new mongoose.Schema({
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
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CpuSchema = new mongoose.Schema({

})
const caseSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    type: String
})

module.exports = mongoose.model('Build', BuildSchema);
module.exports = mongoose.model("Case", caseSchema);
