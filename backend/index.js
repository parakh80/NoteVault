import express from 'express';
import {connectMongo} from './db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



connectMongo();


app.use(cors())
app.use(express.json())

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncaught expection");
    process.exit(1);
  });


  if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "backend/.env" });
  }
  

  if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    });
  }


import authRoute from './routes/auth.js';
import notesRoute from './routes/notes.js';


//available routes
app.use('/api/auth',authRoute);
app.use('/api/notes',notesRoute)


app.get('/',  (req,res) => {
  
    res.send(hello);
})

const port = process.env.PORT;

app.listen(port,() => {
    console.log(`Server started on PORT: ${port} in ${process.env.NODE_ENV} mode.`)
})

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down server due to Unhandled Promise Rejection");
    server.close(() => {
      process.exit(1);
    });
  });