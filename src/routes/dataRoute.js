// src/routes/dataRoutes.js
const express = require('express');
const { findNearestStation } = require('../services/fetchService');

const router = express.Router();
// 서울 중심 좌표 (임의로 설정)
const myLocation = { lat: 37.5290233, lon: 126.9671051};

router.get('/', async (req, res) => {
    const fileUrl = 'https://ku-cloub-web-service.s3.ap-northeast-2.amazonaws.com/unique_charger.csv';

    try {

        const nearestStation = await findNearestStation(fileUrl, myLocation);
        res.json(nearestStation);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error processing data', error });
    }
});

module.exports = router;