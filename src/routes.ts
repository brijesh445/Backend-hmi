import express, { Express, NextFunction, Request, Response } from 'express';
import coursesController from './controller/coursesController';
import SemesterController from './controller/SmesterController'
import userController from './controller/userController';

import { Router } from 'express';
import examResultController from './controller/examResultController';
import multer from 'multer';
import FileUpload from './util/FileUplaod';

export const router = Router();

const storage = multer.memoryStorage();
let upload = multer({storage: storage});


// get all courses
router.get('/courses',coursesController.get_all_course);


//get all sem 
router.get('/sem',SemesterController.get_all_semester);

// get alll subject for a specific semester
router.get('/sem-subjects/:SEMID',SemesterController.get_semeste_subject)

//get all user for a specific course
router.get('/students/:COURSE_ID',examResultController.Get_All_Users);


//get all question for a student 
router.get('/students/exam/:Exam_Result_ID',examResultController.get_exam_question);

//update user exam marks

router.patch('/student/mark-updat/:Question_ID/:Marks',examResultController.update_question_marks);

// update exam_results_marks

router.patch('/student/exam-point-update/:EXAM_RESULT_ID/:POINTS',examResultController.update_exam_marks);


// File Upload Funtion
router.post('/fileupload/:CourseID',upload.single('files'), FileUpload ,examResultController.Upload_Question);


router.post('/add-sem',SemesterController.add_new_semester);


router.post('/add-course/:semID',coursesController.add_new_course);