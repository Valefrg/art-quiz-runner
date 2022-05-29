import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { QuestionFull } from 'src/app/models/questionFull';
import { IAdminService } from 'src/app/services/admin.interface';
import { AdminService } from 'src/app/services/admin.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { MockAdminService } from 'src/app/services/mockadmin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent implements OnInit {

  questions: QuestionFull[];
  inputPass: string;
  authToken: string;
  errorMessage: string;
  isOnlineMode: boolean;
  questionToAdd: QuestionFull;

  private adminService: IAdminService;

  constructor(private trueAdminService: AdminService, private fakeAdminService: MockAdminService,
    private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    this.isOnlineMode = this.connectionService.isOnlineMode;
    this.switchService();
    this.connectionService.connectEvent.subscribe((isOnlineMode) => {
      this.isOnlineMode = isOnlineMode;
      this.switchService()
    });

    this.authToken = localStorage.getItem('adminPass');
    this.questionToAdd = {description: null, options: [
      {description: null, isCorrect: false},
      {description: null, isCorrect: false}
    ]}

    if (this.authToken) {
      this.adminService.getAllQuestions().subscribe((questions: Array<QuestionFull>) => {
        this.questions = questions;
      })
    }
  }

  deleteQuestionById(id: number) {
    this.adminService.deleteQuestionById(id).subscribe((deletedQuestion: QuestionFull) => {
      this.questions = this.questions.filter((q) => q.id !== deletedQuestion.id);
    })
  }

  tryAuth() {
    localStorage.setItem('adminPass', this.inputPass);
    this.adminService.getAllQuestions().subscribe((questions: Array<QuestionFull>) => {
      this.questions = questions;
      this.authToken = this.inputPass
    }, err => {
      if (err.status === 401) {
        this.errorMessage = 'Mot de passe incorrect'
      } else {
        this.errorMessage = 'Problème pour contacter le serveur'
      }
      localStorage.removeItem('adminPass');
    })
  }

  logout() {
    localStorage.removeItem('adminPass');
    this.authToken = null;
  }

  addOption() {
    this.questionToAdd.options.push({description: null, isCorrect: false})
  }

  removeOption() {
    this.questionToAdd.options.pop();
  }

  addQuestion() {
    this.adminService.addQuestion(this.questionToAdd).subscribe((addedQuestion: QuestionFull) => {
      this.questions.push(addedQuestion);
    })
  }

  private switchService() {
    if (this.isOnlineMode) {
      this.adminService = this.trueAdminService;
    } else {
      this.adminService = this.fakeAdminService;
    }
  }
}
