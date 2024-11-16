const express = require('express');
const router = express.Router();
const {getDb} = require('../config/db');
const {generatePCBuildPDF} = require('../utils/pdf');
const path = require('path');
router.post('/new-build', async (req, res) => {
    try {
        const db = getDb()
        const { cpu, gpu, ram, motherboard, powerSupply, storage, pcCase, cooler } = req.body;

        const buildData = { cpu, gpu, ram, motherboard, powerSupply, storage, pcCase, cooler };
        Object.keys(buildData).forEach((key) => {
            if (buildData[key]._id) delete buildData[key]._id;
        });
        const response = await db.collection('builds').insertOne(buildData);
        res.status(201).json({status: 'success', data: response});
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


router.post('/generate-pdf', async (req, res) => {
    try {
        const buildData = req.body
        const imagesPath = path.join(__dirname, '..' ,'component-images');

        console.log(imagesPath);
        console.log(buildData)
        console.log(Object.keys(buildData))
        if (!buildData) {
            return res.status(400).json({ error: 'Build data is required' });
        }

        const pdfBuffer = await generatePCBuildPDF(buildData, imagesPath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=pc-build-specifications.pdf');

        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
})

router.get("/builds", async (req, res) => {
    let data = []
    try {
        const db = getDb()
        db.collection('builds')
            .find()
            .forEach((item) => data.push(item))
            .then(() => {
                res.json(data)
            });
    }
    catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;
