
import mongoose from "mongoose";

interface IStudents extends mongoose.Document{
  enrollment_number:number
}

const Students = new mongoose.Schema({
  enrollment_number: {
    type: Number,
    required: true,
    unique:true
  }
}, { timestamps: true });

const StudentModel = mongoose.model<IStudents>('students', Students);



StudentModel.createCollection().then(function(collection) {
  console.log('Student Collection is created!');
});

export default StudentModel;