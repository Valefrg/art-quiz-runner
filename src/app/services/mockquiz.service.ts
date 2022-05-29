import { HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { GameState } from "../models/gameState";
import { PlayerAnswer } from "../models/playerAnswer";
import { Question } from "../models/question";
import { QuestionFull } from "../models/questionFull";
import { QuizState } from "../models/quizState";
import { IQuizService } from "./quiz.interface";

@Injectable()
export class MockQuizService extends IQuizService {

    /**
     * 
     * Get initial quiz state
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public getInitialQuizState(username?: string, observe?: 'body', reportProgress?: boolean): Observable<QuizState>;
     public getInitialQuizState(username?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuizState>>;
     public getInitialQuizState(username?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuizState>>;
     public getInitialQuizState(username?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let initialGameState = {
            "username": username,
            "nextQuestion": this.getRandomQuestion(),
            "gameState": {
              "currentPoints": 0,
              "endState": environment.initEndState,
              "goodInARow": 0,
              "badInARow": 0
            }
        };
        localStorage.setItem("curState", JSON.stringify(initialGameState));
        return of(initialGameState);
    }

    /**
     * 
     * Send the curent player choice
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public handlePlayerChoice(body?: PlayerAnswer, observe?: 'body', reportProgress?: boolean): Observable<QuizState>;
    public handlePlayerChoice(body?: PlayerAnswer, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuizState>>;
    public handlePlayerChoice(body?: PlayerAnswer, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuizState>>;
    public handlePlayerChoice(body?: PlayerAnswer, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let questions = JSON.parse(localStorage.getItem('localquestion')) as Array<QuestionFull>;
        let curState = JSON.parse(localStorage.getItem('curState'));

        let question = questions.filter((q: QuestionFull) => q.id === curState.nextQuestion.id)[0];
        let nextState;
        
        if (question.options.filter(o => o.isCorrect)[0].id === body.chosenOption.id) {
            nextState = this.evolvePositive(curState)
            localStorage.setItem("curState",JSON.stringify(nextState));
        } else {
            nextState = this.evolveNegative(curState);
            localStorage.setItem("curState",JSON.stringify(nextState));
        }
        return of(nextState);
    }

    private getRandomQuestion() : Question {
        let questions = JSON.parse(localStorage.getItem('localquestion'));
        return questions[Math.floor(Math.random()*questions.length)]
    }

    private evolvePositive(curState: QuizState) : QuizState {
        let random;
        do {
            random = this.getRandomQuestion()
        }while(random.id === curState.nextQuestion.id)

        return {
            username: curState.username,
            nextQuestion: random,
            gameState: this.evolveGameState(curState.gameState, environment.evolPoints,
                environment.evolEndStatePositive, curState.gameState.goodInARow + 1, 0)
        } 
    }

    private evolveNegative(curState: QuizState) : QuizState {
        return {
            username: curState.username,
            nextQuestion: this.getRandomQuestion(),
            gameState: this.evolveGameState(curState.gameState, 0, environment.evolEndStateNegative, 0,
            curState.gameState.badInARow + 1)
        }
    }

    private evolveGameState(currentGameState: GameState, evolPoints: number, evolEndState: number,
        goodInARow: number, badInARow: number): GameState {
    let finalScoreAdjustment = evolPoints;
    if (goodInARow != 0 && goodInARow % environment.evolEndStatePositiveInARow === 0) {
        finalScoreAdjustment += environment.evolPoints / 2;
    } else if (badInARow != 0 && badInARow % environment.evolEndStateNegativeInARow === 0) {
        finalScoreAdjustment -= environment.evolPoints / 4;
    }

    let nextGameState = {
        badInARow: badInARow,
        goodInARow: goodInARow,
        currentPoints: currentGameState.currentPoints + finalScoreAdjustment,
        endState: currentGameState.endState + evolEndState
    } as GameState;

    return nextGameState;
}
}