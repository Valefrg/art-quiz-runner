# ArtQuizRunner

Le jeu est accessible via l'URL : https://valefrg.github.io/ 

## Informations sur le projet

Ce projet a été développé avec le framework Angular (pour la partie Quiz) et avec Phaser.js (pour la partie animations)
Il est possible de faire communiquer le jeu avec un serveur développé en Java.

### Pourquoi Angular ?

Angular (basé sur TypeScript) permet une meilleure organisation du code et de séparer les différents éléments d'une application web en plusieurs modules et composants.

### Pourquoi Phaser ?

Phaser.js permet de mettre en place simplement des animations en utilisant 

## Modes de jeu

### Mode hors-ligne

Un mode hors-ligne a été développé pour éviter une indisponibilité totale du jeu si le serveur chargé de contrôler le déroulement d'une partie n'est pas disponible. La logique d'évolution
du jeu existe donc dans le code TypeScript. Les questions disponibles sont stockées dans le localstorage. Il y a 20 questions chargées par défaut dans le jeu. Le joueur peut ajouter ses propres 
questions qui seront disponibles uniquement dans le navigateur via lequel il aura ajouté ses questions. Le mode hors-ligne ne permet pas d'enregistrer des scores car la triche est impossible à 
éviter en ne passant que par du javascript (code entièrement accessible et modifiable par le joueur).

### Mode en ligne

Le jeu est fait pour communiquer avec un serveur (développé en Java) source https://github.com/adpdevit/artquizrunner-backend
Lorsque le mode en ligne est actif, toutes les fonctionnalités du jeu sont disponibles (ajout du score du joueur dans une base de données). 
Le système de jeu est fiable car les réponses du joueur sont vérifiées par le serveur et l'état du jeu (score, vies restantes) sont gérées
également par le serveur.

La partie serveur a été développée avec un système de JWT (Json Web Token) ce qui permet au serveur de "signer" l'état du jeu à chaque fois que le
joueur répond à une nouvelle question. Il est impossible pour le joueur de tromper le serveur en modifiant l'état du jeu sans connaître la clé
utilisée pour signer le JWT.

# Informations Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
