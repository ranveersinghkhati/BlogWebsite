import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//components
import Connection from './database/db.js';
import Router from './routes/route.js';
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true })); // post api data(json format) parse
app.use(bodyParser.urlencoded({ extended: true }))// url parse eg /%%%%%%23423create -> /create
app.use('/', Router);

// runnig node server with help of express
const PORT = 9000;
app.listen(PORT, () => { console.log(`server Running on PORT ${PORT}`) });

Connection();
