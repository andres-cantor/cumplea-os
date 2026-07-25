import Phaser from 'phaser';

const basePath = import.meta.env.BASE_URL;

class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.on('loaderror', (file) => {
      console.warn(`No se encontró el activo: ${file.key}`);
    });

    for (let i = 1; i <= 16; i += 1) {
      this.load.image(`photo-${i}`, `${basePath}photos/photo-${i}.jpg`);
    }
    this.load.image('photo-frame', `${basePath}photos/photo-frame.png`);
  }

  create() {
    this.cameras.main.setBackgroundColor('#090317');
    this.createTextures();
    this.showIntro();
  }

  createTextures() {
    const heart = this.add.graphics({ x: 0, y: 0 });
    heart.fillStyle(0xff7ea2, 1);
    heart.fillCircle(16, 18, 14);
    heart.fillCircle(32, 18, 14);
    heart.fillTriangle(4, 22, 48, 22, 26, 52);
    heart.generateTexture('heart', 48, 56);
    heart.destroy();

    const spark = this.add.graphics({ x: 0, y: 0 });
    spark.fillStyle(0xfff0c8, 1);
    spark.fillCircle(12, 12, 6);
    spark.generateTexture('spark', 24, 24);
    spark.destroy();

    const player = this.add.graphics({ x: 0, y: 0 });
    player.fillStyle(0xffffff, 1);
    player.fillCircle(28, 28, 24);
    player.fillStyle(0xff93ff, 1);
    player.fillCircle(18, 18, 10);
    player.generateTexture('player', 56, 56);
    player.destroy();

    const cloud = this.add.graphics({ x: 0, y: 0 });
    cloud.fillStyle(0xffffff, 0.28);
    cloud.fillRoundedRect(0, 10, 140, 52, 28);
    cloud.fillRoundedRect(16, 0, 100, 64, 32);
    cloud.fillRoundedRect(68, 6, 100, 50, 26);
    cloud.generateTexture('cloud', 168, 78);
    cloud.destroy();

    const colors = [0xff8ad9, 0xf7c4ff, 0xffd58f, 0xa1d9ff, 0xc9a8ff, 0xff8cb5];
    for (let i = 1; i <= 16; i += 1) {
      const key = `photo-${i}`;
      if (!this.textures.exists(key)) {
        const photo = this.add.graphics({ x: 0, y: 0 });
        const accent = colors[i % colors.length];
        photo.fillStyle(0x1c0a2e, 1);
        photo.fillRoundedRect(0, 0, 84, 84, 18);
        photo.lineStyle(4, accent, 1);
        photo.strokeRoundedRect(2, 2, 80, 80, 16);
        photo.fillStyle(0xffffff, 0.18);
        photo.fillCircle(26, 32, 14);
        photo.fillCircle(58, 32, 14);
        photo.fillRect(22, 46, 40, 14);
        photo.fillStyle(accent, 0.55);
        photo.fillCircle(26, 32, 10);
        photo.fillCircle(58, 32, 10);
        photo.fillRect(24, 48, 36, 10);
        photo.generateTexture(key, 84, 84);
        photo.destroy();
      }
    }

    if (!this.textures.exists('photo-frame')) {
      const frame = this.add.graphics({ x: 0, y: 0 });
      frame.lineStyle(5, 0xffffff, 0.9);
      frame.strokeRoundedRect(4, 4, 70, 70, 14);
      frame.generateTexture('photo-frame', 84, 84);
      frame.destroy();
    }
  }

  showIntro() {
    const title = this.add.text(540, 240, 'Nueva Historia de Amor', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '42px',
      color: '#e40e0e',
      fontWeight: '700',
      align: 'center',
    }).setOrigin(0.5);

    const subtitle = this.add.text(540, 320, 'Este juego es para ti, para celebrar nuestro amor y capturar cada momento juntos.', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '20px',
      color: '#d8d1ff',
      align: 'center',
      wordWrap: { width: 720 },
    }).setOrigin(0.5);

    this.tweens.add({
      targets: [title, subtitle],
      alpha: { from: 0, to: 1 },
      y: '+=18',
      duration: 1000,
      ease: 'Power2',
    });

    this.time.delayedCall(1800, () => {
      this.scene.start('MenuScene');
    });
  }
}

export default BootScene;
