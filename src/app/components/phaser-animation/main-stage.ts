import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
    curentAnim: string = 'stand';
    private character: Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }
    private enemy: Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }
    private background: any;
    private scrollIndex = 0;
  
    constructor() {
      super({ key: 'main' });
    }

    create() {
      this.background = this.add.tileSprite(0, 0, window.innerWidth, 300, "background").setOrigin(0).setScrollFactor(0, 1);
      this.character = this.physics.add.sprite(1000, 230, 'boy');
      this.character.scale = 0.25;
      this.enemy = this.physics.add.sprite(500, 220, 'enemy');
      this.enemy.scale = 0.25;
  
      this.physics.add.existing(this.background);
      this.physics.add.existing(this.character);
  
      /* main character anims */
      this.anims.create({
        key: "stand",
        frameRate: 30,
        frames: this.anims.generateFrameNumbers("boy", {start: 0, end:14}),
        repeat: -1
      });
      this.anims.create({
        key: "fall",
        frameRate: 30,
        frames: this.anims.generateFrameNumbers("boy-fall", {start: 0, end:14}),
        repeat: 0
      });
      this.anims.create({
        key: "getup",
        frameRate: 30,
        frames: this.anims.generateFrameNumbers("boy-fall", {start: 14, end:0}),
        repeat: 0
      });
      this.anims.create({
        key: "run",
        frameRate: 30,
        frames: this.anims.generateFrameNumbers("boy-run", {start: 0, end:14}),
        repeat: -1
      });

      /* enemy anims */
      this.anims.create({
        key: "enemy-stand",
        frameRate: 30,
        frames: this.anims.generateFrameNumbers("enemy", {start: 0, end:9}),
        repeat: -1
      });
      this.anims.create({
        key: "enemy-run",
        frameRate: 24,
        frames: this.anims.generateFrameNumbers("enemy-run", {start: 0, end:7}),
        repeat: -1
      });
      this.anims.create({
        key: "enemy-shoot",
        frameRate: 24,
        frames: this.anims.generateFrameNumbers("enemy-shoot", {start: 0, end:8}),
        repeat: 2
      });
      
      this.character.anims.play("stand")
      this.enemy.anims.play("enemy-stand")
      this.cameras.main.startFollow(this.character, true, 0.05, 0, 70, 82)
      this.cameras.main.centerOnX(this.character.x)
      
    }

    preload() {
      this.load.spritesheet('boy', 'assets/boy-sprite.png', {
        frameWidth: 614,
        frameHeight: 564
      });
      this.load.spritesheet('boy-fall', 'assets/boy-fall-sprite.png', {
        frameWidth: 614,
        frameHeight: 564
      });
      this.load.spritesheet('boy-run', 'assets/boy-run-sprite.png', {
        frameWidth: 614,
        frameHeight: 564
      });
      this.load.spritesheet('enemy', 'assets/robot-sprite.png', {
        frameWidth: 567,
        frameHeight: 556
      });
      this.load.spritesheet('enemy-run', 'assets/robot-run-sprite.png', {
        frameWidth: 567,
        frameHeight: 556
      });
      this.load.spritesheet('enemy-shoot', 'assets/robot-shoot-sprite.png', {
        frameWidth: 567,
        frameHeight: 556
      });
      this.load.image("background", "assets/game-background.png");
    }
    
    
    override update() {
      this.cameras.main.scrollX += this.scrollIndex;
      this.background.setTilePosition(this.cameras.main.scrollX);
    }
  
  
    /** Exposed methods */
    public fall() {
      this.character.anims.play("fall");
      this.character.body.setVelocityX(0);
      this.scrollIndex = 0;
    }
    public run () {
      this.character.anims.play("run");
      this.character.body.setVelocityX(60);
      this.enemy.anims.play("enemy-run");
      this.enemy.body.setVelocityX(60);
      this.scrollIndex = 1;
    }
    public getUpAndRun(callback : any) {
      this.character.body.setVelocityX(0);
      this.scrollIndex = 0;
      this.character.anims.play("getup").once('animationcomplete', () => {
        this.character.anims.play("run");
        this.character.body.setVelocityX(60);
        this.scrollIndex = 1;
        callback();
      });
    }
    public shootAndDie(callback: any) {
        this.enemy.anims.play("enemy-shoot").once('animationcomplete', () => {
            this.fall();
            this.enemy.body.setVelocity(0);
            this.enemy.anims.play("enemy-stand");
            callback();
        });
    }
  }