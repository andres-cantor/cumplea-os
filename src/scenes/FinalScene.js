import Phaser from 'phaser';

class FinalScene extends Phaser.Scene {
  constructor() {
    super('FinalScene');
  }

  init(data) {
    this.collected = data.collected || 0;
    this.fromMenu = data.fromMenu || false;
  }

  create() {
    this.cameras.main.setBackgroundColor('#0b0518');
    this.createFireworks();
    this.createMessage();
    this.createButton();
  }

  createFireworks() {
    const colors = [0xff8ebf, 0x7b65ff, 0x9df2ff, 0xffd56f];
    for (let i = 0; i < 4; i += 1) {
      this.time.addEvent({
        delay: 1200 + i * 420,
        loop: true,
        callback: () => {
          const x = Phaser.Math.Between(180, 900);
          const y = Phaser.Math.Between(120, 340);
          const color = Phaser.Utils.Array.GetRandom(colors);
          this.firework(x, y, color);
        },
      });
    }
  }

  firework(x, y, color) {
    for (let i = 0; i < 16; i += 1) {
      const spark = this.add.circle(x, y, 4, color).setAlpha(0.96);
      const angle = Phaser.Math.DegToRad((360 / 16) * i);
      const distance = Phaser.Math.Between(90, 170);
      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0.2,
        duration: 860,
        ease: 'Cubic.easeOut',
        onComplete: () => spark.destroy(),
      });
    }
  }

  createMessage() {
    const title = this.add.text(540, 170, this.fromMenu ? 'Historias que brillan' : 'Feliz cumpleaños, mi amor', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '52px',
      color: '#3d09f8',
      fontWeight: '800',
      stroke: '#c981ff',
      strokeThickness: 10,
    }).setOrigin(0.5);

    const subtitle = this.add.text(540, 240, this.fromMenu ? 'Celebremos cada instante que hemos vivido juntos.' : `Recogiste ${this.collected} fotos de nuestro amor. Cada momento contigo es un regalo.`, {
      fontFamily: 'Inter, sans-serif',
      fontSize: '20px',
      color: '#2a047e',
      align: 'center',
      wordWrap: { width: 760 },
    }).setOrigin(0.5);

    const body = this.add.text(540, 320, 'Feliz cumpleaños, mi vida. Hoy quiero que sepas que eres mi alegría diaria, mi cómplice y mi sueño hecho realidad. Gracias por ser luz, fuerza y ternura en cada día que compartimos.', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      color: '#460595',
      align: 'center',
      wordWrap: { width: 760 },
      lineSpacing: 8,
    }).setOrigin(0.5);

    const extra = this.add.text(540, 420, 'Que este juego te recuerde cuánto te adoro y cuánto quiero seguir construyendo recuerdos juntos. Te amo más de lo que cualquier palabra pueda decir.', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      color: '#e9d7ff',
      align: 'center',
      wordWrap: { width: 760 },
      lineSpacing: 8,
    }).setOrigin(0.5);

    this.add.rectangle(540, 520, 720, 190, 0x1a0e33, 0.16).setOrigin(0.5).setStrokeStyle(1, 0xffffff, 0.08);
  }

  createButton() {
    const button = this.add.container(540, 600);
    const bg = this.add.rectangle(0, 0, 320, 72, 0x7b5cff, 0.95).setStrokeStyle(2, 0xffffff, 0.12).setOrigin(0.5);
    const text = this.add.text(0, 0, this.fromMenu ? 'Volver al menú' : 'Jugar otra vez', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '22px',
      color: '#ffffff',
      fontWeight: '700',
    }).setOrigin(0.5);
    button.add([bg, text]);
    button.setSize(320, 72);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => bg.setFillStyle(0x9d74ff, 0.98));
    button.on('pointerout', () => bg.setFillStyle(0x7b5cff, 0.95));
    button.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}

export default FinalScene;
