import { HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PlayerAnswer } from "../models/playerAnswer";
import { QuizState } from "../models/quizState";

export abstract class IQuizService {
    public abstract getInitialQuizState(username?: string, observe?: 'body', reportProgress?: boolean): Observable<QuizState>;
    public abstract getInitialQuizState(username?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuizState>>;
    public abstract getInitialQuizState(username?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuizState>>;
    public abstract getInitialQuizState(username?: string, observe?: any, reportProgress?: boolean ): Observable<any>;

    public abstract handlePlayerChoice(body?: PlayerAnswer, observe?: 'body', reportProgress?: boolean): Observable<QuizState>;
    public abstract handlePlayerChoice(body?: PlayerAnswer, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuizState>>;
    public abstract handlePlayerChoice(body?: PlayerAnswer, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuizState>>;
    public abstract handlePlayerChoice(body?: PlayerAnswer, observe?: any, reportProgress?: boolean): Observable<any>;
}