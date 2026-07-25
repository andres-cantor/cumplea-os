import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
    this.collected = 0;
    this.totalHearts = 16;
  }

  create() {
    this.cameras.main.setBackgroundColor('#100b25');
    this.createWorld();
    this.createPlayer();
    this.createCollectibles();
    this.createGuidance();
    this.setupInput();
    this.dispatchStatus();
  }

  createWorld() {
    this.add.rectangle(540, 360, 1080, 720, 0x120620).setDepth(-3);

    for (let i = 0; i < 50; i += 1) {
      const star = this.add.image(Phaser.Math.Between(24, 1056), Phaser.Math.Between(24, 696), 'spark')
        .setAlpha(Phaser.Math.FloatBetween(0.08, 0.24))
        .setScale(Phaser.Math.FloatBetween(0.25, 1.15))
        .setDepth(-2);
      this.tweens.add({
        targets: star,
        alpha: { from: star.alpha, to: Math.min(0.36, star.alpha + 0.18) },
        duration: 1300 + Math.random() * 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    for (let i = 0; i < 5; i += 1) {
      const lantern = this.add.ellipse(120 + i * 200, 120 + (i % 2) * 40, 56, 84, 0xffa7df, 0.16)
        .setDepth(-1);
      const glow = this.add.ellipse(lantern.x, lantern.y, 16, 28, 0xffffff, 0.55).setDepth(-1);
      this.tweens.add({ targets: lantern, y: lantern.y - 18, duration: 3800 + i * 250, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      this.tweens.add({ targets: glow, y: glow.y - 18, duration: 3800 + i * 250, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
  }

  createPlayer() {
    this.player = this.physics.add.image(540, 540, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(2);
    this.player.setScale(0.92);
    this.player.body.setCircle(24, 4, 4);
    this.playerGlow = this.add.circle(this.player.x, this.player.y, 44, 0xff8ed9, 0.2).setDepth(1);
    this.playerHalo = this.add.circle(this.player.x, this.player.y, 92, 0xff9bdc, 0.08).setDepth(0);
    this.nextTrailTime = 0;
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  createTrail() {
    const spark = this.add.circle(this.player.x, this.player.y, 6, 0xffc8ee, 0.7).setDepth(1);
    this.tweens.add({
      targets: spark,
      alpha: 0,
      scale: 0.2,
      duration: 420,
      ease: 'Power2',
      onComplete: () => spark.destroy(),
    });
  }

  createCollectibles() {
    this.collectibles = this.physics.add.group({ allowGravity: false });
    const positions = [...Array(this.totalHearts)].map((_, index) => {
      const x = 180 + (index % 4) * 210 + Phaser.Math.Between(-24, 24);
      const y = 180 + Math.floor(index / 4) * 140 + Phaser.Math.Between(-22, 22);
      return { x, y };
    });

    const displaySize = 112;
    positions.forEach((position, index) => {
      const key = `photo-${index + 1}`;
      const item = this.collectibles.create(position.x, position.y, key).setDepth(2);
      item.setDisplaySize(displaySize, displaySize);
      item.setData('collected', false);
      item.setData('photoId', index + 1);
      item.setInteractive({ useHandCursor: true });
      item.body.setCircle(displaySize * 0.4);
      item.setData('baseScale', item.scale);
      this.add.image(position.x, position.y, 'photo-frame').setDepth(1.5).setDisplaySize(displaySize + 18, displaySize + 18);
      item.on('pointerover', () => {
        const baseScale = item.getData('baseScale');
        this.tweens.add({ targets: item, scale: baseScale * 1.08, duration: 120, ease: 'Power1' });
      });
      item.on('pointerout', () => {
        this.tweens.add({ targets: item, scale: item.getData('baseScale'), duration: 120, ease: 'Power1' });
      });
      item.on('pointerdown', () => {
        this.createTapMagic(position.x, position.y);
      });
      this.tweens.add({ targets: item, y: position.y - 10, duration: 1900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      this.tweens.add({ targets: item, angle: { from: -6, to: 6 }, duration: 2500 + index * 100, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });

    this.physics.add.overlap(this.player, this.collectibles, this.collectHeart, null, this);
  }

  createGuidance() {
    this.hint = this.add.text(32, 28, 'Usa WASD o las flechas para guiar la luz.', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      color: '#f8e9ff',
      lineSpacing: 6,
    }).setDepth(10).setScrollFactor(0);

    this.note = this.add.text(32, 58, 'Cada corazón es una foto nuestra. Toca para dejar una chispa de amor.', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      color: '#c9b0ff',
      lineSpacing: 6,
    }).setDepth(10).setScrollFactor(0);

    this.stateText = this.add.text(540, 46, '', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
      align: 'center',
    }).setDepth(10).setScrollFactor(0).setOrigin(0.5);
  }

  setupInput() {
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up2: Phaser.Input.Keyboard.KeyCodes.UP,
      down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.input.on('pointerdown', (pointer) => {
      this.createClickSparkle(pointer.worldX, pointer.worldY);
    });
  }

  collectHeart(player, heart) {
    if (heart.getData('collected')) return;
    heart.setData('collected', true);
    heart.disableBody(true, true);
    this.showPhotoMessage(heart.getData('photoId'));
    this.collected += 1;
    this.dispatchStatus();
    this.createPulse(heart.x, heart.y);
    this.createPhotoBloom(heart.x, heart.y);
    this.cameras.main.shake(160, 0.006);
    this.cameras.main.flash(140, 255, 220, 255);

    if (this.collected >= this.totalHearts) {
      this.time.delayedCall(900, () => {
        this.scene.start('FinalScene', { collected: this.collected });
      });
    }
  }

  createPulse(x, y) {
    const pulse = this.add.circle(x, y, 20, 0xff85b7, 0.35).setDepth(1);
    this.tweens.add({ targets: pulse, radius: 86, alpha: 0, duration: 650, ease: 'Cubic.easeOut', onComplete: () => pulse.destroy() });
  }

  createPhotoBloom(x, y) {
    const colors = [0xffa8e3, 0xfff2a5, 0xa5d6ff, 0xffc8ee];
    for (let i = 0; i < 12; i += 1) {
      const isHeart = i % 3 === 0;
      const angle = Phaser.Math.DegToRad((360 / 12) * i + Phaser.Math.Between(-8, 8));
      const distance = Phaser.Math.Between(48, 110);
      const targetX = x + Math.cos(angle) * distance;
      const targetY = y + Math.sin(angle) * distance;

      if (isHeart) {
        const heart = this.add.text(x, y, '❤', { fontFamily: 'Inter, sans-serif', fontSize: '22px', color: '#ff83b6' })
          .setOrigin(0.5)
          .setDepth(1);
        this.tweens.add({
          targets: heart,
          x: targetX,
          y: targetY,
          alpha: 0,
          scale: 0.2,
          duration: 700 + Math.random() * 180,
          ease: 'Cubic.easeOut',
          onComplete: () => heart.destroy(),
        });
      } else {
        const star = this.add.star(x, y, 5, 4, 10, Phaser.Utils.Array.GetRandom(colors))
          .setAlpha(0.95)
          .setDepth(1);
        this.tweens.add({
          targets: star,
          x: targetX,
          y: targetY,
          alpha: 0,
          scale: 0.2,
          duration: 700 + Math.random() * 180,
          ease: 'Cubic.easeOut',
          onComplete: () => star.destroy(),
        });
      }
    }
  }

  createTapMagic(x, y) {
    const emojis = ['🎉', '✨', '💖'];
    for (let i = 0; i < 8; i += 1) {
      const text = this.add.text(x, y, Phaser.Utils.Array.GetRandom(emojis), {
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',
      }).setOrigin(0.5).setDepth(1).setAlpha(0.95);
      const angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360));
      const dist = Phaser.Math.Between(26, 62);
      this.tweens.add({
        targets: text,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        scale: 0.6,
        duration: 520,
        ease: 'Cubic.easeOut',
        onComplete: () => text.destroy(),
      });
    }
  }

  createClickSparkle(x, y) {
    for (let i = 0; i < 10; i += 1) {
      const spark = this.add.star(x, y, 5, 4, 10, 0xffc3f7).setAlpha(0.95).setScale(0.55).setDepth(1);
      const dir = Phaser.Math.Between(0, 360);
      const dist = Phaser.Math.Between(28, 72);
      this.tweens.add({
        targets: spark,
        x: x + Math.cos(Phaser.Math.DegToRad(dir)) * dist,
        y: y + Math.sin(Phaser.Math.DegToRad(dir)) * dist,
        alpha: 0,
        duration: 560,
        ease: 'Cubic.easeOut',
        onComplete: () => spark.destroy(),
      });
    }
  }

  showPhotoMessage(photoId) {
    const message = `Foto ${photoId} de nuestro viaje juntas, mi amor`;
    this.stateText.setText(message);
    this.tweens.killTweensOf(this.stateText);
    this.tweens.add({
      targets: this.stateText,
      alpha: { from: 0, to: 1 },
      duration: 200,
      onComplete: () => {
        this.time.delayedCall(900, () => {
          this.tweens.add({ targets: this.stateText, alpha: 0, duration: 260 });
        });
      },
    });
  }

  dispatchStatus() {
    window.dispatchEvent(new CustomEvent('game:status', {
      detail: {
        collected: this.collected,
        total: this.totalHearts,
      },
    }));
  }

  update() {
    if (!this.player) return;
    const speed = 260;
    let vx = 0;
    let vy = 0;

    if (this.keys.left.isDown || this.keys.left2.isDown) vx -= 1;
    if (this.keys.right.isDown || this.keys.right2.isDown) vx += 1;
    if (this.keys.up.isDown || this.keys.up2.isDown) vy -= 1;
    if (this.keys.down.isDown || this.keys.down2.isDown) vy += 1;

    this.player.setVelocity(vx * speed, vy * speed);
    this.playerGlow.setPosition(this.player.x, this.player.y);
    this.playerGlow.setScale(1 + Math.min(0.24, this.player.body.speed / 1000));

    if (this.time.now > this.nextTrailTime && this.player.body.speed > 16) {
      this.createTrail();
      this.nextTrailTime = this.time.now + 80;
    }
  }
}

export default PlayScene;
