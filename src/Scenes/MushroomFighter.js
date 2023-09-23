import Phaser, { Create } from "phaser";

export default class MushroomFighter extends Phaser.Scene{
    constructor() {
        super("Mushroom-Fighter-Scene")
    }

    init() {
        this.halfwidth = this.scale.width / 2
        this.halfheight = this.scale.height / 2

        this.player = undefined
        this.speed = 100
        this.cursors = this.input.keyboard.createCursorKeys();

        this.healthValue = 100
        this.healthDisplay = undefined
    }

    preload() {
        this.load.spritesheet("Mushroom", "Assets/Mushroom.png", {
            frameWidth: 29.3,
            frameHeight: 35.3,
        })
        this.load.image("Bg", "Assets/BG700.png")
        //UI
        this.load.image("UIbelow", "Assets/UIbelow.png")
        this.load.image("UIbelowBG", "Assets/UIbelowBG.png")
    }
    
    create() {
        this.add.image(this.halfheight, this.halfwidth, "Bg");
        this.add.image(this.halfwidth, 624, "UIbelowBG") //UI
        // this.healthDisplay = this.add.rectangle(123, 631, 166, 133, d40d3e)
        this.Stats("Health", 0)
        this.Stats("EXP", 338)
        // this.add.image(this.halfwidth, 624, "UIbelow") //UI
        this.player = this.createplayer();
        this.cameras.main.startFollow(this.player)
        this.cursors = this.input.keyboard.createCursorKeys()
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
            this.player.setVelocityX(this.speed * -1);
            this.player.anims.play("Left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.speed);
            this.player.anims.play("Right", true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(this.speed * -1);
            this.player.anims.play("Up", true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.speed);
            this.player.anims.play("Down", true);
        } else {
            this.player.setVelocity(0, 0);
            this.player.anims.play("Standby", true);
        }
    }

    Stats(Stat, Value) {
        if (Stat == "Health") {
            this.add.rectangle(123, 631, 166, 133 + Value/133, 0xa85232)
        } else if (Stat == "EXP") {
            this.add.rectangle(349 , 579, 0 + Value/338 * 338, 42, 0x22baa3 )
        }


    }
}