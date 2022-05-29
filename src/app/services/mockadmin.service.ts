import { HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { QuestionFull } from "../models/questionFull";
import { IAdminService } from "./admin.interface";

@Injectable()
export class MockAdminService extends IAdminService {

    public addQuestion(body?: QuestionFull, observe?: 'body', reportProgress?: boolean): Observable<QuestionFull>;
    public addQuestion(body?: QuestionFull, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuestionFull>>;
    public addQuestion(body?: QuestionFull, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuestionFull>>;
    public addQuestion(body?: QuestionFull, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        let questions = JSON.parse(localStorage.getItem('localquestion')) as Array<QuestionFull>;
        let options = questions.flatMap(q => q.options);
        body.id = Math.max(...questions.map(q => q.id)) + 1;
        let optionIdMax = Math.max(...options.map(q => q.id));
        body.options.forEach(o => o.id = ++optionIdMax);
        questions.push(body);
        localStorage.setItem('localquestion', JSON.stringify(questions));
        return of(body);
    }

     public deleteQuestionById(id: number, observe?: 'body', reportProgress?: boolean): Observable<QuestionFull>;
     public deleteQuestionById(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuestionFull>>;
     public deleteQuestionById(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuestionFull>>;
     public deleteQuestionById(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        let questions = JSON.parse(localStorage.getItem('localquestion')) as Array<QuestionFull>;
        questions = questions.filter(q => q.id === id);
        localStorage.setItem('localquestion', JSON.stringify(questions));
        return of({id: id});
     }
 
     public getAllQuestions(observe?: 'body', reportProgress?: boolean): Observable<Array<QuestionFull>>;
     public getAllQuestions(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<QuestionFull>>>;
     public getAllQuestions(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<QuestionFull>>>;
     public getAllQuestions(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        return of(JSON.parse(localStorage.getItem('localquestion')));
     }
    
}