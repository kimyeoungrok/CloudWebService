const express = require('express')
const app = express()
const dataRoutes = require('./routes/dataRoute');
const port = 3000

app.use('/api/charger', dataRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})
