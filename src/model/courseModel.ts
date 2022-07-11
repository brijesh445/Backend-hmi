
import mongoose from "mongoose";
import DB from '@/db/Connection';



/*
maximum_points
100
passing_points
50*/

interface ICourses extends mongoose.Document {
    code: string;
    name: string;
    semester:string,

  }
  
 
const CourseSchema = new mongoose.Schema({
    code: {
        type: String,
        unique : true, 
        required : true, 
        dropDups: true
        },
    name: {
        type: String
        },
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'semsters'
    },
    maximum_points:{
        type:Number
    },
    passing_points:{
        type:Number
    }
}, { timestamps: true });

  

const CourseModel = mongoose.model<ICourses>("courses", CourseSchema);

CourseModel.createCollection().then(function(collection) {
    console.log('Course Collection is created!');
  });


  /*CourseModel.create([
    {
        code:'HMI',
        name:'human interaction',
        semester:'62c190f2c2a8c57ed0229dca'
            },
            {
                code:'CI',
                name:'computer intelligence',
                semester:'62c190f2c2a8c57ed0229dca'
                    },
                    {
                        code:'Mobsys',
                        name:'Mobile System',
                        semester:'62c190f2c2a8c57ed0229dca'
                            },
                            {
                                code:'IT-SEC',
                                name:'IT security',
                                semester:'62c190f2c2a8c57ed0229dca'
                                    }
  ])*/


export default CourseModel;