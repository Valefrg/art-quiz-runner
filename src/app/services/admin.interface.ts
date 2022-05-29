import { HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { QuestionFull } from "../models/questionFull";

export abstract class IAdminService {
    public abstract getAllQuestions(observe?: 'body', reportProgress?: boolean): Observable<Array<QuestionFull>>;
    public abstract getAllQuestions(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<QuestionFull>>>;
    public abstract getAllQuestions(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<QuestionFull>>>;
    public abstract getAllQuestions(observe?: any, reportProgress?: boolean): Observable<any>;

    public abstract deleteQuestionById(id: number, observe?: 'body', reportProgress?: boolean): Observable<QuestionFull>;
    public abstract deleteQuestionById(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuestionFull>>;
    public abstract deleteQuestionById(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuestionFull>>;
    public abstract deleteQuestionById(id: number, observe?: any, reportProgress?: boolean): Observable<any>;

    public abstract addQuestion(body?: QuestionFull, observe?: 'body', reportProgress?: boolean): Observable<QuestionFull>;
    public abstract addQuestion(body?: QuestionFull, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuestionFull>>;
    public abstract addQuestion(body?: QuestionFull, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuestionFull>>;
    public abstract addQuestion(body?: QuestionFull, observe?: any, reportProgress?: boolean): Observable<any>;
}