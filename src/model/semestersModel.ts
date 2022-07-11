
import mongoose from "mongoose";
import DB from '@/db/Connection';



interface ISemster extends mongoose.Document {
    name: string;
    created_at:string,
    updated_at:string

  }
  
 

const Smesters = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    }
}, { timestamps: true });

const SemesterModel = mongoose.model<ISemster>('semesters', Smesters);



SemesterModel.createCollection().then(function(collection) {
    console.log('Smester Collection is created!');
  });

 /*SemesterModel.create(
   [
    {
        "name": "SS22",
      },
      {
        "name": "WS22",
      },
      {
        "name": "WS21",
      },
      {
        "name": "SS21",
      }
   ]
   );*/

export default SemesterModel;