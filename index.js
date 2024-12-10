const express = require('express');
const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

const dbConnection = require("./config/db") 
const projectRoutes = require('./routes/projectRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

// Use the routes
app.use('/api/projects', projectRoutes);
app.use('/api/achievement', achievementRoutes);
app.use('/api/experience', experienceRoutes);

dbConnection();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});