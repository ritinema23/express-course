const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

//serving a normla html line and a file
// app.get('/', (req, res) => {
//     //res.send('<h1>hello world</h1>')
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
 
//app.use(logger);

//bode parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static folder => serves regular html files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})