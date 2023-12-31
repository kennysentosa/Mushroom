import Phaser from 'phaser';

import MushroomFighter from './Scenes/MushroomFighter';
import GameOverScene from './Scenes/GameOverScene';

const config = {
  type: Phaser.AUTO,
  width: 700,
  height: 700,
  physics: {
    default: "arcade", // library Arcade Phaser
    arcade: {
      gravity: { y: 0 },
      debug:true,
    },
  },
  scene: [MushroomFighter,GameOverScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },

};

export default new Phaser.Game(config);