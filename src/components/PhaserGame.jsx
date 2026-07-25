import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import MenuScene from '../scenes/MenuScene';
import PlayScene from '../scenes/PlayScene';
import FinalScene from '../scenes/FinalScene';

const PhaserGame = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: 1080,
      height: 720,
      backgroundColor: '#090317',
      scene: [BootScene, MenuScene, PlayScene, FinalScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);
    return () => game.destroy(true);
  }, []);

  return <div className="game-shell__canvas" ref={containerRef} />;
};

export default PhaserGame;
