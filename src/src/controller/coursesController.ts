import CourseModel from '../model/courseModel';
import { Request, Response } from 'express';

class CourseController {

     async  get_all_course(req: Request, res: Response):Promise<any>{

        try {
    
            const data=await CourseModel.find({}).exec();

            res.status(200).json({
                Message:'All Courses',
                Data:data
            })
    
        } catch (error:any) {
                    res.send(500).json({
                        Message:'internal server error',
                        Status:res.status,
                        Errors:JSON.stringify(error)
                    })
        }
    }


    async add_new_course(req:Request,res:Response){
        try {


            const semID=req.params.semID;

            const {name,code,maximum_points,passing_points}=req.body;
            const Data={
                name,
                code,
                maximum_points:parseInt(maximum_points,10),
                passing_points:parseInt(passing_points,10),
                semester:semID
            }

           await CourseModel.create(Data, function (err:any, course:any) {
                if (err) return res.status(404).json({ err });
                res.status(200).json({
                    Message:'Course created',
                    course
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
export default new CourseController();