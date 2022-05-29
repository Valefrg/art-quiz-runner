import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CustomResponseInterceptor } from './interceptors/custom-response.interceptor';
import { QuizService } from './services/quiz.service';
import { PhaserAnimationComponent } from './components/phaser-animation/phaser-animation.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminService } from './services/admin.service';
import { FormsModule } from '@angular/forms';
import { ScorePageComponent } from './components/score-page/score-page.component';
import { ScoreService } from './services/score.service';
import { ConfigurationService } from './services/configuration.service';
import { ConnectionService } from './services/connection.service';
import { MockQuizService } from './services/mockquiz.service';
import { MockAdminService } from './services/mockadmin.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    QuizComponent,
    PhaserAnimationComponent,
    AdminPageComponent,
    ScorePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    QuizService,
    MockQuizService,
    AdminService,
    MockAdminService,
    ScoreService,
    ConfigurationService,
    ConnectionService,
    HttpClientModule,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomResponseInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => init,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function init() {
  if (!localStorage.getItem("localquestion")) {
    localStorage.setItem("localquestion", JSON.stringify([
      {
          "id": 7,
          "description": "Qui a réalisé la fresque de la Cène",
          "options": [
              {
                  "id": 13,
                  "description": "Sandro Botticelli",
                  "isCorrect": false
              },
              {
                  "id": 14,
                  "description": "Léonard De Vinci",
                  "isCorrect": true
              },
              {
                  "id": 15,
                  "description": "Michel-Ange",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 8,
          "description": "Quelle est la technique picturale utilisée par Mark Rothko dans ses œuvres",
          "options": [
              {
                  "id": 16,
                  "description": "Body Painting",
                  "isCorrect": false
              },
              {
                  "id": 17,
                  "description": "Field painting",
                  "isCorrect": true
              },
              {
                  "id": 18,
                  "description": "Action Painting",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 9,
          "description": "Le terme \"impressionniste\" est inspiré du tableau \"Impression au soleil levant\". Qui en est le peintre",
          "options": [
              {
                  "id": 19,
                  "description": "Monet",
                  "isCorrect": true
              },
              {
                  "id": 20,
                  "description": "Manet",
                  "isCorrect": false
              },
              {
                  "id": 21,
                  "description": "Renoir",
                  "isCorrect": false
              }
          ]
      }
    ]));
  }
}
