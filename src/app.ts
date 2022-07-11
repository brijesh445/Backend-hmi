

import DB from './db/Connection';
import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import StudentModel from './model/studentModel';
import SemesterModel from './model/semestersModel';
import Exam_Result_Question from './model/exam-result-questionsModel';
import cors from 'cors';

import multer, { MulterError } from 'multer';
import { randomBytes } from "crypto";

import { router } from './routes';
dotenv.config();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app: Express = express();

app.use(cors());

app.use(express.json());


app.get('/', async (req: Request, res: Response) => {
console.log('db conncetion',DB);
});

app.use('/api', router);

export default app;