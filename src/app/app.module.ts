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
          "id": 13,
          "description": "Qui a réalisé la fresque de la Cène ?",
          "options": [
              {
                  "id": 29,
                  "description": "Sandro  Botticelli",
                  "isCorrect": false
              },
              {
                  "id": 30,
                  "description": "Léonard De Vinci",
                  "isCorrect": true
              },
              {
                  "id": 31,
                  "description": "Michel-Ange",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 14,
          "description": "Quelle est la technique picturale utilisée par Mark Rothko dans ses œuvres ?",
          "options": [
              {
                  "id": 32,
                  "description": "Body Painting",
                  "isCorrect": false
              },
              {
                  "id": 33,
                  "description": "Color Field Painting",
                  "isCorrect": true
              },
              {
                  "id": 34,
                  "description": "Action Painting",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 15,
          "description": "Le terme \"impressionniste\" est inspiré du tableau \"Impression au soleil levant\". Qui en  est le peintre ?",
          "options": [
              {
                  "id": 35,
                  "description": "Monet",
                  "isCorrect": true
              },
              {
                  "id": 36,
                  "description": "Manet",
                  "isCorrect": false
              },
              {
                  "id": 37,
                  "description": "Renoir",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 16,
          "description": "Qui a fait scandale avec son \"Urinoir\" ?",
          "options": [
              {
                  "id": 38,
                  "description": "Dali",
                  "isCorrect": false
              },
              {
                  "id": 39,
                  "description": "Warhol",
                  "isCorrect": false
              },
              {
                  "id": 40,
                  "description": "Duchhamps",
                  "isCorrect": true
              }
          ]
      },
      {
          "id": 17,
          "description": "Qui a peint le plafond de l'Opéra de Paris ?",
          "options": [
              {
                  "id": 41,
                  "description": "Magritte",
                  "isCorrect": false
              },
              {
                  "id": 42,
                  "description": "Braque",
                  "isCorrect": false
              },
              {
                  "id": 43,
                  "description": "Chagall",
                  "isCorrect": true
              }
          ]
      },
      {
          "id": 18,
          "description": "Qui a peint \"Le radeau de la Méduse\" ?",
          "options": [
              {
                  "id": 44,
                  "description": "Gericault",
                  "isCorrect": true
              },
              {
                  "id": 45,
                  "description": "Delacroix",
                  "isCorrect": false
              },
              {
                  "id": 46,
                  "description": "Raphaël",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 19,
          "description": "Quelle scène est retracée par \"Les Noces de Cana\", de Véronèse ?",
          "options": [
              {
                  "id": 47,
                  "description": "La naissance de Jésus",
                  "isCorrect": false
              },
              {
                  "id": 48,
                  "description": "La Cène",
                  "isCorrect": false
              },
              {
                  "id": 49,
                  "description": "La multiplication des pains",
                  "isCorrect": true
              }
          ]
      },
      {
          "id": 20,
          "description": "Quelle déesse a été représentée sortant des eaux par Botticelli ?",
          "options": [
              {
                  "id": 50,
                  "description": "Venus",
                  "isCorrect": true
              },
              {
                  "id": 51,
                  "description": "Athéna",
                  "isCorrect": false
              },
              {
                  "id": 52,
                  "description": "Héra",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 21,
          "description": "Les deux grands musées de Florence sont le palais Piti et...",
          "options": [
              {
                  "id": 53,
                  "description": "Le Prado",
                  "isCorrect": false
              },
              {
                  "id": 54,
                  "description": "Le musée des Offices",
                  "isCorrect": true
              },
              {
                  "id": 55,
                  "description": "Le musée Médicis",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 22,
          "description": "Ceci n'est pas une pipe\" est de...",
          "options": [
              {
                  "id": 56,
                  "description": "Dali",
                  "isCorrect": false
              },
              {
                  "id": 57,
                  "description": "Magritte",
                  "isCorrect": true
              },
              {
                  "id": 58,
                  "description": "De Chirico",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 23,
          "description": "Qui a immortalisé Marilyn Monroe en mutlicolore ?",
          "options": [
              {
                  "id": 59,
                  "description": "Yves Klein",
                  "isCorrect": false
              },
              {
                  "id": 60,
                  "description": "Roy Liechtenstein",
                  "isCorrect": false
              },
              {
                  "id": 61,
                  "description": "Andy Warhol",
                  "isCorrect": true
              }
          ]
      },
      {
          "id": 24,
          "description": "Qui est l’architecte de la Cité radieuse à Marseille ?",
          "options": [
              {
                  "id": 62,
                  "description": "Frank Lloyd Wright",
                  "isCorrect": false
              },
              {
                  "id": 63,
                  "description": "Kenzo Tange",
                  "isCorrect": false
              },
              {
                  "id": 64,
                  "description": "Le Corbusier",
                  "isCorrect": true
              }
          ]
      },
      {
          "id": 25,
          "description": "Qui est l’architecte du Guggenheim de Bilbao ?",
          "options": [
              {
                  "id": 65,
                  "description": "Zaha Hadid",
                  "isCorrect": false
              },
              {
                  "id": 66,
                  "description": "Jean Nouvel",
                  "isCorrect": false
              },
              {
                  "id": 67,
                  "description": "Frank Gehry",
                  "isCorrect": true
              }
          ]
      },
      {
          "id": 26,
          "description": "Qui a réalisé la première photographie intitulée Point de vue du Gras ?",
          "options": [
              {
                  "id": 68,
                  "description": "Daguerre",
                  "isCorrect": false
              },
              {
                  "id": 69,
                  "description": "Niepce",
                  "isCorrect": true
              },
              {
                  "id": 70,
                  "description": "Talbot",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 27,
          "description": "Où se trouve \"Le jugement dernier\" de Michel-Ange ?",
          "options": [
              {
                  "id": 71,
                  "description": "Florence",
                  "isCorrect": false
              },
              {
                  "id": 72,
                  "description": "Vatican",
                  "isCorrect": true
              },
              {
                  "id": 73,
                  "description": "Venise",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 28,
          "description": "Qui a réalisé l’Agneau mystique en 1432 ?",
          "options": [
              {
                  "id": 74,
                  "description": "Jan van Eyck",
                  "isCorrect": true
              },
              {
                  "id": 75,
                  "description": "Rogier van der Weyden",
                  "isCorrect": false
              },
              {
                  "id": 76,
                  "description": "Robert Campin",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 29,
          "description": "Quel artiste pouvons-nous rattacher au mouvement artistique De Stjl ?",
          "options": [
              {
                  "id": 77,
                  "description": "Mondrian",
                  "isCorrect": true
              },
              {
                  "id": 78,
                  "description": "Kandinsky",
                  "isCorrect": false
              },
              {
                  "id": 79,
                  "description": "Paul Klee",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 30,
          "description": "Quel mouvement artistique du début du XXe siècle est souvent rattaché au Fascime ?",
          "options": [
              {
                  "id": 80,
                  "description": "Brutalisme",
                  "isCorrect": false
              },
              {
                  "id": 81,
                  "description": "Cubisme",
                  "isCorrect": false
              },
              {
                  "id": 82,
                  "description": "Futurisme",
                  "isCorrect": true
              }
          ]
      },
      {
          "id": 31,
          "description": "Quel mouvement artistique du début du XXe donne une importance fondamentale à la  couleur plus qu’à la forme ?",
          "options": [
              {
                  "id": 83,
                  "description": "Impressionnisme",
                  "isCorrect": false
              },
              {
                  "id": 84,
                  "description": "Fauvisme",
                  "isCorrect": true
              },
              {
                  "id": 85,
                  "description": "Expressionnisme",
                  "isCorrect": false
              }
          ]
      },
      {
          "id": 32,
          "description": "Quel artiste réalise des sculptures en forme de chien en ballon ?",
          "options": [
              {
                  "id": 86,
                  "description": "Jeff Koons",
                  "isCorrect": true
              },
              {
                  "id": 87,
                  "description": "Damien Hirst",
                  "isCorrect": false
              },
              {
                  "id": 88,
                  "description": "Takashi Murakami",
                  "isCorrect": false
              }
          ]
      }
    ]));
  }
}
