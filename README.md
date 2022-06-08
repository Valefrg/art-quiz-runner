# ArtQuizRunner

Le jeu est accessible via l'URL : https://valefrg.github.io/ 


<img width="1062" alt="Capture d’écran 2022-06-08 à 12 53 42" src="https://user-images.githubusercontent.com/104926647/172599549-9b217fff-1e41-4e5c-9dff-7a048d8b7fc0.png">


## Informations sur le projet 

ArtQuizRunner est un jeu, mélangeant quizz et running game. Le but de jeu est de répondre correctement aux questions (ciblées sur l'histoire de l'art) afin de faire avancer le personnage principale se faisant courser par un robot dans un décor de musée. A chaque bonne réponse, le score augmente et le personnage avance. A l'inverse en cas de mauvaise réponse, le personnage trébuche et après trois chutes, il se fait viser par le robot mettant un terme à la partie. 

Le jeu stimule non seulement les connaissances du joueur dans le champ de l'histoire de l'art, mais aussi, du fait qu'il y a une partie running game et un score récompensant le joueur, ce dernier sera tenter de vouloir réussir d'avantage, afin de dépasser son score ou celui d'autrui (mode en ligne). 

De ce fait ce jeu est ludique car à force de vouloir dépasser son score, le joueur mémorisera les réponses. Le jeu est adapté à des joueurs ayant un niveau de base en histoire de l'art mais aussi à des débutants voulant en apprendre plus sur le domaine. 

## Informations sur le projet (technique)

Ce projet a été développé avec le framework Angular (pour la partie Quiz) et avec Phaser.js (pour la partie animations)
Il est possible de faire communiquer le jeu avec un serveur développé en Java.

### Pourquoi Angular ?

Angular (basé sur TypeScript) permet une meilleure organisation du code et de séparer les différents éléments d'une application web en plusieurs modules et composants.

### Pourquoi Phaser ?

Phaser.js permet de mettre en place simplement des animations en utilisant des librairies gérant la physique d'un jeu pour nous. Dans ce jeu, il n'était pas forcément
nécessaire d'utiliser une telle librairie étant donné que le jeu n'a aucun aspect nécessitant un moteur physique complet (pas de collisions, de rebonds ou autre). 
Cependant, il a quand même permi de rendre très simple le développement de la partie graphique du jeu (jouer avec la vélocité et le focus caméra 
pour faire avancer les personnages et faire défiler le décor).

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

#### Jouer en ligne

Faute de temps, l'application Java n'a pas élé déployée sur un serveur gratuit. Cependant, il est possible de déployer le serveur sur votre machine
locale et de jouer en mode connecté (même depuis https://valefrg.github.io/ car l'application web essaie de contacter l'adresse de votre machine locale par défaut).

Pour ce faire, téléchargez le fichier .jar du serveur (https://github.com/adpdevit/artquizrunner-backend/tree/development/exec)

Vérifiez que java est bien installé sur votre machine (au minimum version 17, privilégiez la 18 pour être sûr d'avoir une version compatible).
ouvrir un invité de commande et tapez: java -version Si une version 17 ou supérieure est affichée, c'est OK. si non installez java ou mettez-le à jour.

Ensuite, lancez la commande suivante: java -jar C:\chemin-vers-le-jar\artquizrunner-backend.jar en changeant "chemin-vers-le-jar" par le chemin réel et le lecteur "C" si besoin

Le nom "SPRING" devrait apparaître et le serveur devrait se lancer et écouter sur le port 8080.

Une fois le serveur lancé, vous pouvez retourner sur https://valefrg.github.io/ et cliquer sur le statut serveur en bas à droite qui devrait passer au vert.


