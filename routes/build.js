const express = require('express');
const Build = require('../models/build');
const Case = require('../models/build');
const router = express.Router();
const {getDb} = require('../config/db');

// Create a new PC build
router.post('/new-build', async (req, res) => {
    try {
        console.log("api hit....")
        const { cpu, gpu, ram, motherboard, powerSupply, storage, pcCase, cooler } = req.body;
        const newBuild = new Build({
            cpu,
            gpu,
            ram,
            motherboard,
            storage,
            powerSupply,
            pcCase,
            cooler
        });
        const build = await newBuild.save();
        res.status(200)
        res.json(build);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.get('/case', async (req, res) => {
    let data = [];
    try {
        const db = getDb()
        db.collection('case')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
            res.json(data)
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/cpu', async (req, res) => {
    let data = [];
    try {
        const db = getDb()
        db.collection('cpu')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
                res.json(data)
            });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/gpu', async (req, res) => {
    let data = [];
    try {
        const db = getDb()
        db.collection('gpu')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
                res.json(data)
            });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/motherboard', async (req, res) => {
    let data = [];
    try {
        const db = getDb()
        db.collection('motherboard')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
                res.json(data)
            });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/cooler', async (req, res) => {
    let data = [];
    try {
        const db = getDb()
        db.collection('cooler')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
                res.json(data)
            });
        console.log(data)
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/memory', async (req, res) => {
    let data = [];
    try {
        const db = getDb()
        db.collection('memory')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
                res.json(data)
            });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/power-supply', async (req, res) => {
    let data = [];
    try {
        const db = getDb()
        db.collection('powerSupply')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
                res.json(data)
            });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/storage', async (req, res) => {
    let data = [];
    try {
        const db = getDb()
        db.collection('storage')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
                res.json(data)
            });
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;
