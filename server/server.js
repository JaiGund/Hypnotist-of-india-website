import express from 'express';
import { connectToDb } from './config/db.js';

const app = express();

app.use(express.json());
connectToDb();

app.get('/',(req, res)=>{
  res.send('Server is running');
})

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
