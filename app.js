
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 8000;


const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets/')));
app.use(express.static(path.join(__dirname, 'public/')));

module.exports = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});