import Phaser, { Create } from "phaser";

import Bullets from "../UI/Bullets";

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

        this.invincibility = 0

        this.healthValue = 100
        this.healthDisplay = undefined

        this.EXPbar = undefined

        this.UIbelow = undefined
        this.UIbelowbg = undefined
        this.UIgroup = []

        this.Bullets = undefined
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
        //BUllets
        this.Bullets.image("Bullets", "Assets/MushroomSpore.png")
    }
    
    create() {

        this.add.image(this.halfheight, this.halfwidth, "Bg");
        // this.healthDisplay = this.add.rectangle(123, 631, 166, 133, d40d3e)
        // this.Stats("Health", 100)
        // this.Stats("EXP", 320)

        //UI 
        this.UIbelowbg = this.physics.add.staticImage(this.halfwidth, 624, "UIbelowBG").setDepth(1) //UI
        this.UIbelow = this.add.image(this.halfwidth, 624, "UIbelow").setDepth(3) //UI
        this.player = this.createplayer();
        this.cursors = this.input.keyboard.createCursorKeys()
        this.healthDisplay = this.add.rectangle(123, 631, 166, 133, 0xEE4B2B).setDepth(2)
        this.EXPbar = this.add.rectangle(349 , 579, 0, 42, 0x22baa3).setDepth(2)
        this.UIgroup = [this.UIbelowbg, this.UIbelowbg, this.healthDisplay, this.EXPbar]

        //COLIDER
        this.physics.add.collider(this.player, this.UIbelowbg)
        
    }

    update(time) {
        this.moveplayer(this.player, time)
        this.invincibilityDown()
        if (this.invincibility >= 0) {
            this.invincibility -= 1
        }
    }

    createplayer() {
        const player = this.physics.add
            .sprite(this.halfwidth, this.halfheight, "Mushroom")
            .setSize(50, 50)
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
            this.Stats("Health", 2)
            this.Stats("EXP", 1)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.speed);
            this.player.anims.play("Right", true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(this.speed * -1);
            this.player.anims.play("Up", true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.speed);
            this.player.anims.play("Down", true);
        } else if (this.cursors.space.isDown) {

        } else {
            this.player.setVelocity(0, 0);
            this.player.anims.play("Standby", true);
        }
    }

    Stats(Stat, Value,time) {
        if (Stat == "Health") {
            if (this.invincibility <= 0) {
                this.healthDisplay.setAlpha(this.healthDisplay.alpha - Value / 100)
                this.invincibility = 10
            }

        } else if (Stat == "EXP") {
            if (this.EXPbar.width < 338){
                this.EXPbar.width = Value + this.EXPbar.width
            }
        }
    }

    invincibilityDown(){
        if (this.invincibility >= 0) {
            this.invincibility -= 1
        }
    }
}