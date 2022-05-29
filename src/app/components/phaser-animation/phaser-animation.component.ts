import { Component, OnInit } from '@angular/core';
import { MainScene } from './main-stage';

@Component({
  selector: 'app-phaser-animation',
  templateUrl: './phaser-animation.component.html',
  styleUrls: ['./phaser-animation.component.less']
})
export class PhaserAnimationComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 300,
      width: window.innerWidth,
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      }
    };
  }
  
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

  makePlayerFall() {
    let ms = this.phaserGame.scene.scenes[0] as MainScene;
    ms.fall();
  }
  makePlayerRun() {
    let ms = this.phaserGame.scene.scenes[0] as MainScene;
    ms.run();
  }
  makePlayerGetUpAndRun(callback: any) {
    let ms = this.phaserGame.scene.scenes[0] as MainScene;
    ms.getUpAndRun(callback);
  }
  makeEnemyShootAndPlayerFall(callback: any) {
    let ms = this.phaserGame.scene.scenes[0] as MainScene;
    ms.shootAndDie(callback);
  }
  reloadScene() {
    let ms = this.phaserGame.scene.scenes[0] as MainScene;
    ms.scene.restart();
  }
}
