import Exam_Result_Model from "../model/exam-resultModel";
import { Request, Response } from 'express';
import mongoose from "mongoose";
import Exam_Result_Question from "../model/exam-result-questionsModel";
import { error } from "winston";
import StudentModel from "../model/studentModel";

class ExamResultController {

    async Get_All_Users(req: Request, res: Response): Promise<any> {

        try {
            const ID = req.params.COURSE_ID;

            /* 
            const Data = await Exam_Result_Model.find({
                course_id: ID
            })
            .populate('students')
            .exec();
            res.status(200).json({
                Message: 'All Students',
                Data
            });
         */

        Exam_Result_Model.aggregate([{
                $lookup: {
                    from: "students", // collection name in db
                    localField: "student_id",
                    foreignField: "_id",
                    as:"student"
                }
            }]).exec(function(err, students) {

                if(err){
                    res.status(404).json({
                        Message: 'Students Not Found',
                        Error:err
                    });
                }else{
                    res.status(200).json({
                        Message: 'All Students',
                        Data:students
                    });
                }

            });
            
        } catch (error) {
            res.send(500).json({
                Message: 'internal server error',
                Status: res.status,
                Errors: JSON.stringify(error)
            })
        }


    }


    async get_exam_question(req: Request, res: Response): Promise<any> {

        try {
            const Exam_Result_ID = req.params.Exam_Result_ID;
            const QueryCondition = {
                exam_result_id: Exam_Result_ID
            }

            const data = await Exam_Result_Question.find(QueryCondition);

            return res.status(200).json({
                Message: 'Students All Question',
                Data: data,
                count: data.length  // removed count function and used length fucntion to count the number of records save around 33ms ( 30% improvement in request)

            })

        } catch (error) {
            res.send(500).json({
                Message: 'internal server error',
                Status: res.status,
                Errors: JSON.stringify(error),
            });
        }


    }


    async update_question_marks(req:Request,res:Response):Promise<any>{


        try {
            const Question_ID=req.params.Question_ID;
            const Marks=Number(req.params.Marks);
            const update = { scored_points: Marks };

            /*
            const GetMaximumMarks=await Exam_Result_Question.findById(Question_ID, 'maximum_points');
                const MaximumMarks=GetMaximumMarks?.maximum_points;
                if(Marks>MaximumMarks){
                    res.status(400).json({
                        Message:'Marks cant be greater than maxium_points',
                        MaximumMarks,
                        Marks
                    }) 
                }else{                
             }*/

                const Update=await Exam_Result_Question.findByIdAndUpdate(Question_ID,update).exec()
                res.status(200).json({
                    Message:'Marks Updated',
                    Question_ID,
                    Data:update        
                })
         
        } catch (error) {
            res.send(500).json({
                Message: 'internal server error',
                Status: res.status,
                Errors: JSON.stringify(error),
            });
        }

    }


    async update_exam_marks(req:Request,res:Response):Promise<any>{


        console.log('Marks Update')
        try {

            const EXAM_RESULT_ID=req.params.EXAM_RESULT_ID;
            const POINTS=req.params.POINTS;
            const Update={
                scored_points:POINTS
            }
            const Updated_Exam_Marks=await Exam_Result_Model.findByIdAndUpdate(EXAM_RESULT_ID,Update, {new:true});
              
            if(Updated_Exam_Marks){
                res.status(200).json({
                    Message:'Updated Marks',
                    Data:Updated_Exam_Marks
                });
            }else{
                res.status(409).json({
                    Message:'Cant Updated Marks',
                    Data:Updated_Exam_Marks
                });
            }
         
        } catch (error) {
            res.send(500).json({
                Message: 'internal server error',
                Status: res.status,
                Errors: JSON.stringify(error),
            });
        }
        
    }     
    

    async Upload_Question(req:Request,res:Response){    

        const FileDataobject=await res.locals.Data;
        const COURSE_ID=req.params.CourseID
        if(!FileDataobject){
            res.status(404).json({
                Message:'File Data Not Found',
                Status:404
            })
        }

        const  enrollment_number=FileDataobject.ID;
        console.log(FileDataobject.ID);

        const ScoredPoints = FileDataobject.Questions.reduce((accumulator:any, object:any) => {
            return accumulator + object.scored_points;
          }, 0);

        const session = await mongoose.startSession();

        await session.withTransaction(async () => { 
            let user = await StudentModel.findOne({ enrollment_number }, null).session(session);


            if(!user){

                const NewUserObjectID = await StudentModel.create([
                    { 
                        enrollment_number: enrollment_number 
                    }
                ], { session });
                

                const Exam =  await Exam_Result_Model.create([
                    {
                        course_id:COURSE_ID,
                        student_id:NewUserObjectID[0]._id,
                        scored_points:ScoredPoints,
                        grade:0,
                        Status:'FAIL'
                    }
                ], { session });

                const Exam_Result_ID=Exam[0]._id;


                FileDataobject.Questions.forEach((question:any) => {
                    question.exam_result_id = Exam_Result_ID;
                  });

                  await  Exam_Result_Question.insertMany(FileDataobject.Questions)
                  .then(function(docs) {
                      res.status(200).json({
                          Message:'File Uploaded',
                          Status:200
                     })
                  })
                  .catch(function(err) {

                      res.status(500).json({
                          Message:'File didnt Uploaded',
                          Status:500,
                          err
                      })
                  });


            
            }else{
                const NewExam =  await Exam_Result_Model.create([
                    {
                        course_id:COURSE_ID,
                        student_id:user?._id || null,
                        scored_points:ScoredPoints,
                        grade:0,
                        Status:'FAIL'
                    }
                ], { session });
                
                const Exam_Result_ID=NewExam[0]._id;
    
    
                FileDataobject.Questions.forEach((question:any) => {
                    question.exam_result_id = Exam_Result_ID;
                  });
    
                  console.log(FileDataobject.Questions)
    
    
    
    
                                
                await  Exam_Result_Question.insertMany(FileDataobject.Questions)
                        .then(function(docs) {
                            res.status(200).json({
                                Message:'File Uploaded',
                                Status:200,
                                docs
                            })
                        })
                        .catch(function(err) {
    
                            res.status(500).json({
                                Message:'File didnt Uploaded',
                                Status:500,
                                err
                            })
                        });
     
    
            }
            
        });
        session.endSession();

        console.log('finished');

  
    }
    

}


export default new ExamResultController();