const express = require('express');
const connectMongo = require('./db.js');
const cors = require('cors');
const { config } = require('dotenv');
config();

const app = express()

connectMongo();


app.use(cors())
app.use(express.json())

const authRoute = require('./routes/auth.js');
const notesRoute = require('./routes/notes.js');

//available routes
app.use('/api/auth',authRoute);
app.use('/api/notes',notesRoute)


app.get('/',  (req,res) => {
  
    res.send(hello);
})

const port = 4000;

app.listen(port,() => {
    console.log(` backend Server ruuning on port ${port}`)
})