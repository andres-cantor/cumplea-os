import Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#090317');
    this.addBackground();
    this.createTitle();
    this.createButtons();
  }

  addBackground() {
    const layers = [0.12, 0.18, 0.24, 0.3];
    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.Between(120, 960);
      const y = Phaser.Math.Between(80, 640);
      const scale = Phaser.Math.FloatBetween(0.35, 1.2);
      const star = this.add.image(x, y, 'spark').setAlpha(0.18).setScale(scale);
      this.tweens.add({
        targets: star,
        alpha: { from: 0.12, to: 0.32 },
        duration: 1800 + i * 80,
        yoyo: true,
        repeat: -1,
      });
    }
  }

  createTitle() {
    this.add.text(540, 180, 'Feliz cumpleaños, amor', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '54px',
      color: '#fff',
      fontWeight: '900',
      stroke: '#ff8ddc',
      strokeThickness: 8,
    }).setOrigin(0.5);

    this.add.text(540, 250, 'Encuentra 16 recuerdos escondidos en cada corazón y descubre la sorpresa que hice para ti.', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      color: '#e8daff',
      align: 'center',
      wordWrap: { width: 720 },
    }).setOrigin(0.5);
  }

  createButtons() {
    this.createButton(540, 370, 'Comenzar', () => {
      this.scene.start('PlayScene');
    });
    this.createButton(540, 458, 'Créditos', () => {
      this.scene.start('FinalScene', { fromMenu: true });
    });
  }

  createButton(x, y, label, callback) {
    const button = this.add.container(x, y);
    const background = this.add.rectangle(0, 0, 300, 68, 0x3e2a5e, 0.9).setStrokeStyle(2, 0xffffff, 0.1).setOrigin(0.5);
    const text = this.add.text(0, 0, label, {
      fontFamily: 'Inter, sans-serif',
      fontSize: '22px',
      color: '#ffffff',
      fontWeight: '700',
    }).setOrigin(0.5);
    button.add([background, text]);
    button.setSize(300, 68);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => background.setFillStyle(0x7f5eed, 0.96));
    button.on('pointerout', () => background.setFillStyle(0x3e2a5e, 0.9));
    button.on('pointerdown', callback);
    this.tweens.add({ targets: button, y: y + 6, duration: 1200, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });
  }
}

export default MenuScene;
