import Phaser, { Create } from "phaser";

export default class MushroomFighter extends Phaser.Scene{
    constructor() {
        super("Mushroom-Fighter-Scene")
    }

    init() {
        this.halfwidth = this.scale.width / 2
        this.halfheight = this.scale.height / 2

        this.player = undefined
        this.speed = 1000
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    preload() {
        this.load.spritesheet("Mushroom", "Assets/Mushroom.png", {
            frameWidth: 88,
            frameHeight: 106,
        })
        this.load.image("Bg", "Assets/BG700.png")
    }
    
    create() {
        this.add.image(this.halfheight, this.halfwidth, "Bg");
        this.player = this.createplayer();
        this.cameras.main.startFollow(this.player)
        this.cameras.setSize(100,100)

    }

    update(time) {
        this.moveplayer(this.player, time)


    }

    createplayer() {
        const player = this.physics.add
            .sprite(this.halfwidth, this.halfheight, "Mushroom")
            .setSize(100, 100)
        player.setCollideWorldBounds(true)

        this.anims.create({
            key: "Standby",
            frames: [{key: "Mushroom", frame: 0}],
        })
        this.anims.create({
            key: "Down",
            frames: this.anims.generateFrameNumbers("Mushroom", {start : 1, end: 2}),
            frameRate: 10
        })
        this.anims.create({
            key: "Up",
            frames: this.anims.generateFrameNumbers("Mushroom", {start : 1, end: 2}),
            frameRate: 10
        })
        this.anims.create({
            key: "Left",
            frames: this.anims.generateFrameNumbers("Mushroom", {start : 6, end: 8}),
            frameRate: 10
        })
        this.anims.create({
            key: "Right",
            frames: this.anims.generateFrameNumbers("Mushroom", {start : 3, end: 5}),
            frameRate: 10
        })
        
        return player
        
    }

    moveplayer(player, time) {
        if (this.cursors.left.isDown) {
            this.player.setVelocity(-this.speed, 0);
            this.player.anims.play("Left", true);

        } else if (this.cursors.right.isDown) {
            this.player.setVelocity(this.speed, 0);
            this.player.anims.play("Right", true);

        } else if (this.cursors.up.isDown) {
            this.player.setVelocity(0, -this.speed);
            this.player.anims.play("Up", true);

        } else if (this.cursors.down.isDown) {
            this.player.setVelocity(0, this.speed);
            this.player.anims.play("Down", true);
        } else {
            this.player.setVelocity(0, 0);
            this.player.anims.play("Standby", true);
        }
    }
}
