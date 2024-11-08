const express = require('express');
const Build = require('../models/build');
const router = express.Router();
const {getDb} = require('../config/db');
// Create a new PC build
router.post('/new-build', async (req, res) => {
    try {
        const db = getDb()
        console.log("api hit....")
        const { cpu, gpu, ram, motherboard, powerSupply, storage, pcCase, cooler } = req.body;

        const buildData = { cpu, gpu, ram, motherboard, powerSupply, storage, pcCase, cooler };
        Object.keys(buildData).forEach((key) => {
            if (buildData[key]._id) delete buildData[key]._id;
        });
        console.log(buildData);
        const response = await db.collection('builds').insertOne(buildData);
        console.log(response)
        console.log("success")
        res.status(200)
    } catch (error) {
        console.log(error);
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
