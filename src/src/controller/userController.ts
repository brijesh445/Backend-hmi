import StudentModel from "../model/studentModel";
import { Request, Response } from 'express';

class UserController{


    async get_all_students(req:Request,res:Response){
        try {
            const data=await StudentModel.find({}).exec();
            res.status(200).json({
                Message:'All users',
                Data:data
            });
        } catch (error:any) {
            res.send(500).json({
                Message:'internal server error',
                Status:res.status,
                Errors:JSON.stringify(error)
            })
        }
    }

    async get_student_questions(req:Request,res:Response){
        try {
                    
                    
        } catch (error) {
            
        }
    }



}

export default new UserController();