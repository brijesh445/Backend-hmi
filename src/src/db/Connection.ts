require('dotenv').config()
import mongoose from "mongoose";
const connectionString = process.env.ATLAS_URI;


const DB=mongoose.connect(`${connectionString}`,function(err) {
  if (err) throw err;
  else console.log('DB CONNECTED');
});



export default DB;