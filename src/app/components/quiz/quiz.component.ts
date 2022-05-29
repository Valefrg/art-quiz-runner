import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AnswerOption } from 'src/app/models/answerOption';
import { QuizState } from 'src/app/models/quizState';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { MockQuizService } from 'src/app/services/mockquiz.service';
import { IQuizService } from 'src/app/services/quiz.interface';
import { QuizService } from 'src/app/services/quiz.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less']
})
export class QuizComponent implements OnInit {

  @Input()
  public quizState: QuizState | null = null;

  @Output() 
  public quizStateChange = new EventEmitter<QuizState>();

  public hasPlayed: boolean = false;

  public isOnlineMode: boolean;

  public curTimeout : any;

  private quizService: IQuizService;

  constructor(private trueQuizService: QuizService, private fakeQuizService: MockQuizService, 
    private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    this.isOnlineMode = this.connectionService.isOnlineMode;
    this.switchService();
    this.connectionService.connectEvent.subscribe((isOnlineMode) => {
      this.isOnlineMode = isOnlineMode;
      this.switchService()
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['quizState'] && changes['quizState'].currentValue && changes['quizState'].currentValue.nextQuestion) {
      this.quizState.nextQuestion.options = this.shuffle(this.quizState.nextQuestion.options);
      this.curTimeout = setTimeout(() => {
        this.answer({id: 0});
      }, environment.timeToAnswerInMs);
      this.hasPlayed = false;
    }
  }

  answer(answer: AnswerOption): void {
    clearTimeout(this.curTimeout);
    this.hasPlayed = true;
    this.quizService.handlePlayerChoice({chosenOption: answer}).subscribe((state) => {
      this.quizStateChange.emit(state);
    });
  }

  private switchService() {
    if (this.isOnlineMode) {
      this.quizService = this.trueQuizService;
    } else {
      this.quizService = this.fakeQuizService;
    }
  }

  private shuffle<T>(array: Array<T>): Array<T> {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
