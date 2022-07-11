import { Request, Response } from 'express';

import semesterModel from "../model/semestersModel";
import CourseModel from '../model/courseModel';

class SemesterController{

    async get_all_semester(req:Request,res:Response){
        try {
            const data=await semesterModel.find({}).exec();
            res.status(200).json({
                Message:'Get all semester',
                Data:data,
                Status:200
            });
        } catch (error:any) {
            res.send(500).json({
                Message:'internal server error',
                Status:res.status,
                Errors:JSON.stringify(error)
            })
        }
    }

    async get_semeste_subject(req:Request,res:Response){
        try {
            const SEMID=req.params.SEMID;
            const Subjects=await CourseModel.find({
                semester:SEMID
            }).exec()
            res.status(200).json({
                Message:`Sem ${SEMID} subjects`,
                Data:Subjects
            });
        } catch (error) {
            res.send(500).json({
                Message:'internal server error',
                Status:res.status,
                Errors:JSON.stringify(error)
            })
        }
    }


    async add_new_semester(req:Request,res:Response){
        try {

            semesterModel.create({ name: req.body.name }, function (err:any, sem:any) {
                if (err) return res.status(404).json({ err });
                res.status(200).json({
                    Message:'Semester created',
                    sem
                })
            });

        } catch (error) {
            res.send(500).json({
                Message:'internal server error',
                Status:res.status,
                Errors:JSON.stringify(error)
            })
        }
    }

    
}

export default new SemesterController();