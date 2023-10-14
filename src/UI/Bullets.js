import Phaser, { Create } from "phaser";

export default class Bullets extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.setScale(2)
        this.speed = 50
    }

    fire(x, y){
        this.setPosition(x,y)

    }

    update(time) {
        this.setVelocityY(this.speed * -1);
        if (this.y || this.x < -10) {
          this.erase();
        }
      }

}