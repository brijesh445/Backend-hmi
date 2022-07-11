import { Request, Response, NextFunction } from 'express';
import { Express } from 'express';
import fs from 'fs';
import Exam_Result_Model from "../model/exam-resultModel";
import { Multer } from 'multer';
const readline = require('readline');
const stream = require('stream');



const Pattern = /\(([^)]+)\)\s[0-9]+\)/;


const GermanLanguageEnum=[
    'Frage',
    'Korrekte Anwort',
    'Ihre Antwort',
    'Punkte'
]

const EnglishLanguageEnum=[
    'Question',
    'Correct Answer',
    'Your response',
    'Points'
]

export default async function FileUpload(req: Request, res: Response,next:NextFunction): Promise<any> {


    if (!req.file) {
        return res.status(400).json({
            Message: 'Select at least one file for upload'
        })
    }

    const UploadedFiles: any = req.file;
    console.log(UploadedFiles);
    const buffer = await UploadedFiles.buffer;

    var bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    var rl = readline.createInterface({
        input: bufferStream,
    });

    var QuestionCollection: any = [];
    let QuestionOjbect: any = {}
    let ResponsObject:any={}

    let linenumber = 0;
    rl.on('line', (line: string) => {
        const Prefix = line.split(':')[0];
        const Lang = (Prefix===EnglishLanguageEnum[0] || Prefix===GermanLanguageEnum[1]  || Prefix===GermanLanguageEnum[2]  || Prefix===GermanLanguageEnum[3]  ) ?  'DE' :  'EN' ;

        if(Prefix.startsWith('Enrollment') || Prefix.startsWith('Matrikelnummer')){
                const ID=line.split(':')[1]
                ResponsObject['ID']=parseInt(ID,10);
        }

        if (Prefix.startsWith(GermanLanguageEnum[0]) || Prefix.startsWith(EnglishLanguageEnum[0]) ) {
            const Suffix = line.split(': ')[1]
            const Question = Suffix.split(Pattern)
            const QuestionContent = Question[2].split(/\[([^\]]+)]/);
            const Type = Question[1]
            const QuestionText = QuestionContent[0]
            QuestionOjbect['question'] = QuestionText.trim();
            QuestionOjbect['question_type'] = Type.trim();

        }
        if (Prefix.startsWith(GermanLanguageEnum[1]) || Prefix.startsWith(EnglishLanguageEnum[1]) ) {
            const RightAnswer = line.split(':')[1]
            QuestionOjbect['correct_answer'] = RightAnswer;

        }
        if (Prefix.startsWith(GermanLanguageEnum[2]) || Prefix.startsWith(EnglishLanguageEnum[2])) {
            const WrongAnswer = line.split(':')[1]
            QuestionOjbect['given_answer'] = WrongAnswer;

        }
        if (Prefix.startsWith(GermanLanguageEnum[3]) || Prefix.startsWith(EnglishLanguageEnum[3])) {
            const UserPoints = line.split(':')[1].split('/')
            QuestionOjbect['maximum_points'] = parseFloat(UserPoints[1]) ;
            QuestionOjbect['scored_points'] = parseFloat(UserPoints[0]);
            QuestionOjbect['Lang']=Lang

            QuestionCollection.push(QuestionOjbect);
            QuestionOjbect = {}
        }
    });
    rl.on('close', () => {
       // console.log(QuestionCollection)
        
       ResponsObject['Questions']=QuestionCollection;
    
       // console.log(ResponsObject);
       res.locals.Data=ResponsObject;
    //   res.send(ResponsObject); 
        next()
    });


}
