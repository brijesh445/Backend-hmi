
import mongoose from "mongoose";
import DB from '@/db/Connection';

const Exam_Question = new mongoose.Schema({

    exam_result_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    question: {
        type: String,
        required: [true,'Question is Required.']
    },
    question_type: {
        type: String,
        required: [true,'Question Type is Required']
    },
    correct_answer: {
        type: String,
        required: [true,'Question should have correct Answer']
    },
    given_answer: {
        type: String
    },
    maximum_points: {
        type: Number,
        required: true
    },
    scored_points: {
        type: Number,
        min:[0,'Score points cant be lower than 0']
    },
    lang:{
        type: String,
    },
    isUpdated:{
        type:Boolean,
        default:false
    }
    
}, { timestamps: true });



const Exam_Result_Question = mongoose.model('exam_result_questions', Exam_Question);




Exam_Result_Question.createCollection().then(function(collection) {
    console.log('exam_result_questions Collection is created!');
  });

/*
  Exam_Result_Question.create([
    {
        exam_result_id:'62a621ed96b8398d5ac8445b',
        question:"What is your name?",
        question_type:"SM",
        correct_answer:"Akshay",
        given_answer:"Akshay",
        maximum_points:2,
        scored_points:2,
        isUpdated:false
    }
  ])
*/

export default Exam_Result_Question;