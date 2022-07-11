
import mongoose from "mongoose";
import DB from '@/db/Connection';

const Exams = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'courses'
  },
  maximum_points: {
    type: Number,
    required: true,
    max: [100, 'Maximum Points Cant be greater than 100']
    },
  passing_points: {
    type: Number,
    required: true,
    min: [0, 'Minimum Points Cant be less than 0'],
  }
}, { timestamps: true });

const ExamsModel = mongoose.model('exams', Exams);



ExamsModel.createCollection().then(function(collection) {
  console.log('Exams Collection is created!');
});

/*
ExamsModel.create([
  {
    course_id:'62c192ab9270213e9feef4f6',
    maximum_points:100,
    passing_points:50
  },
  {
    course_id:'62c192ab9270213e9feef4f7',
    maximum_points:100,
    passing_points:40
  },
])

*/





export default ExamsModel;