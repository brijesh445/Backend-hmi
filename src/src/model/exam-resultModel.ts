
import mongoose from "mongoose";
import DB from '@/db/Connection';

const Exam_Result = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'students'
    },
    scored_points: {
        type: Number,
        required: true,
    },
    grade: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    Status: {
        type: String,
        required: true,
        enum: ['PASS', 'FAIL']
        },
}, { timestamps: true });

const Exam_Result_Model = mongoose.model('exam_results', Exam_Result);



Exam_Result_Model.createCollection().then(function(collection) {
    console.log('exam_results Collection is created!');
  });

  /*
  Exam_Result_Model.create([
    {
        course_id:'62c19da22c0f5d1bad4bc49f',
        student_id:'62c191d2157f7efd68093b89',
        scored_points:90,
        grade:1.3,
        Status:'PASS'

  },
  {
    course_id:'62c19da22c0f5d1bad4bc4a0',
    student_id:'62c191d2157f7efd68093b89',
    scored_points:80,
    grade:1.5,
    Status:'PASS'

  }
])*/


export default Exam_Result_Model;