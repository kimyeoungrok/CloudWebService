const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.get('/', (req, res) => {
    res.send('hello worlds');
})

app.post('/location', express.json(), (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Received location: Latitude: ${latitude}, Longitude: ${longitude}`);
    res.send('Location received');
})

app.get('/bicycle', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bicycle.html'));
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})


