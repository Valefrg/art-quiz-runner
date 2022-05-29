import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizState } from 'src/app/models/quizState';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { MockQuizService } from 'src/app/services/mockquiz.service';
import { IQuizService } from 'src/app/services/quiz.interface';
import { QuizService } from 'src/app/services/quiz.service';
import { environment } from 'src/environments/environment';
import { PhaserAnimationComponent } from '../phaser-animation/phaser-animation.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {

  public static TIME_TO_ANSWER = 5000;
  public quizState : QuizState | null = null;
  public reloadScene : boolean = false;
  public username: string;
  public placeHolder: string = 'Type in your username and press START';
  public isServerHealthy: boolean;
  public isOnlineMode: boolean;
  private quizService : IQuizService;

  @ViewChild(PhaserAnimationComponent) public animation : PhaserAnimationComponent;

  constructor(private trueQuizService: QuizService, private fakeQuizService: MockQuizService, 
    private configurationService: ConfigurationService, private connectionService: ConnectionService) {
    }

  ngOnInit(): void {
    this.loadServerStatus();
    this.isOnlineMode = this.connectionService.isOnlineMode;
    this.switchService()
    this.connectionService.connectEvent.subscribe((isOnlineMode) => {
      this.isOnlineMode = isOnlineMode;
      this.switchService()
    })
  }

  startGame(): void {
    if (this.reloadScene) this.animation.reloadScene(); 
    this.quizService.getInitialQuizState(this.username).subscribe((state) => {
      this.quizState = state;
      setTimeout(() => {
        this.animation.makePlayerRun();
      },100)
    })
  }

  quizStateChanged(event: QuizState): void {
    if (this.quizState.gameState.currentPoints < event.gameState.currentPoints) {
      this.quizState = Object.assign({}, event);
    } else if (this.quizState.gameState.currentPoints > event.gameState.currentPoints) {
      this.animation.makePlayerFall();
      this.triggerGetUpAndRun(event);
    } else {
      this.animation.makePlayerFall();
      this.triggerGetUpAndRun(event);
    }
  }

  loadServerStatus() {
    this.isServerHealthy = null;
    this.configurationService.health().subscribe(() => {
      this.isServerHealthy = true;
    }, err => {
      this.isServerHealthy = false;
    });
  }

  switchConnect() {
    this.connectionService.switchConnectionMode();
  }

  private switchService() {
    if (this.isOnlineMode) {
      this.quizService = this.trueQuizService;
    } else {
      this.quizService = this.fakeQuizService;
    }
  }

  private triggerGetUpAndRun(nextState: QuizState) {
    setTimeout(() => {
      this.animation.makePlayerGetUpAndRun(() => {
        if (nextState.gameState.endState === 0) {
          this.animation.makeEnemyShootAndPlayerFall(() => {
            this.quizState = {username: nextState.username, gameState: nextState.gameState, nextQuestion: null};
            this.reloadScene = true;
          });
        }
        else {
          this.quizState = Object.assign({}, nextState);
        }
      });
    }, 1000);
  }
}
