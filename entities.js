// Alien Escape
// Melvin Chien, Ki Lee, Ank Nguyen, Stephen Swift
// CS 113 / INF 125, Professor Dan Frost
// Version 1.0
// November 12, 2012

var player = null;


// Create player entity
var PlayerEntity = me.ObjectEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);

        // Set default horizontal and vertical speed
        this.setVelocity(32, 32);
        // disable gravity
        this.gravity = 0;

        // property to determine if the player has picked up the key or not
        this.hasKey = false;
        this.disableMoveLeft = false;
        this.moved = false;
        this.moveCount = 0;
        this.playerX = Math.round(this.pos.x / 32);
        this.playerY = Math.round(this.pos.y / 32);
        this.hasEngine = false;
        // Add animations
        this.addAnimation("idleDown", [0, 1, 2, 1]);
        this.addAnimation("down", [0, 3, 4, 3]);
        this.addAnimation("idleUp", [5, 6, 7, 6]);
        this.addAnimation("up", [5, 8, 9, 8]);
        this.addAnimation("idleLeft", [10, 11, 12, 11]);
        this.addAnimation("left", [10, 13, 14, 13]);
        this.addAnimation("idleRight", [15, 16, 17, 16]);
        this.addAnimation("right", [15, 18, 19, 18]);
        this.addAnimation("dead", [20]);
        this.setCurrentAnimation("idleDown");
        me.input.bindKey(me.input.KEY.M, "music", true);


        // Add footsteps
        this.nextFootVar = "la";

        //default footstep
        player = this;
    },

    // Update player position
    update : function() {
        // music toggle
        if (me.input.isKeyPressed("music")) {
            if (me.gamestat.getItemValue("music") == 1) {
                me.audio.stopTrack();
                me.gamestat.setValue("music", 0);
            } else {
                me.audio.playTrack("music-loop", 0.5);
                me.gamestat.setValue("music", 1);
            }
        }

        if (me.game.HUD.getItemValue("stamina") <= 0)
            me.state.change(me.state.GAMEOVER);

        if (me.input.isKeyPressed("left") && !this.disableMoveLeft) {
            this.setCurrentAnimation("left", "idleLeft");
            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound, 0.4);
            // Pick a new footstep variation for next time!
            if (this.nextFootVar == "la") {
                this.nextFootVar = "rb";
            } else if (this.nextFootVar == "rb") {
                this.nextFootVar = "lc";
            } else if (this.nextFootVar == "lc") {
                this.nextFootVar = "rd";
            } else {
                this.nextFootVar = "la";
            }

            // Update velocity
            this.vel.x -= 32;
        } else if (me.input.isKeyPressed("right")) {
            //enable player to move left again
            this.disableMoveLeft = false;
            this.setCurrentAnimation("right", "idleRight");

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound, 0.4);
            // Pick a new footstep variation for next time!
            if (this.nextFootVar == "la") {
                this.nextFootVar = "rb";
            } else if (this.nextFootVar == "rb") {
                this.nextFootVar = "lc";
            } else if (this.nextFootVar == "lc") {
                this.nextFootVar = "rd";
            } else {
                this.nextFootVar = "la";
            }

            // Update velocity
            this.vel.x += 32;
        } else if (me.input.isKeyPressed("up")) {
            this.setCurrentAnimation("up", "idleUp");

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound, 0.4);
            // Pick a new footstep variation for next time!
            if (this.nextFootVar == "la") {
                this.nextFootVar = "rb";
            } else if (this.nextFootVar == "rb") {
                this.nextFootVar = "lc";
            } else if (this.nextFootVar == "lc") {
                this.nextFootVar = "rd";
            } else {
                this.nextFootVar = "la";
            }

            // Update velocity
            this.vel.y -= 32;
        } else if (me.input.isKeyPressed("down")) {
            this.setCurrentAnimation("down", "idleDown");

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound, 0.4);
            // Pick a new footstep variation for next time!
            if (this.nextFootVar == "la") {
                this.nextFootVar = "rb";
            } else if (this.nextFootVar == "rb") {
                this.nextFootVar = "lc";
            } else if (this.nextFootVar == "lc") {
                this.nextFootVar = "rd";
            } else {
                this.nextFootVar = "la";
            }

            // Update velocity
            this.vel.y += 32;
        } else {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        // Update player movement
        this.updateMovement();

        var res = me.game.collide(this);
        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                console.log("flicker");
                if (this.flicker != 1) {
                                me.audio.play("grunt", 0.3);
                }
                // Flicker if we touched an enemy
                this.flicker(1);
            }
        }

        // Check for movement
        var newX = Math.round(this.pos.x / 32);
        var newY = Math.round(this.pos.y / 32);

        if (this.playerX == newX && this.playerY == newY) {
            this.moved = false;
        } else {
            this.playerX = newX;
            this.playerY = newY;
            this.moved = true;
            
            if (fogVisible) {
                this.moveCount = 0;
            } else {
                this.moveCount++;
                if (this.moveCount > 4) {
                    this.moveCount = 0;
                    fogVisible = true;
                }
            }
            
            // Update stamina
            me.game.HUD.updateItemValue("stamina", -1);
            // Update animation if necessary
            // Update object animation
            this.parent(this);
            return true;
        }

        // Otherwise inform engine we did not perform any update
        return false;
    }
});

// Create teleporter entity
var TeleporterEntity = me.CollectableEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);

        // Add animations
        this.addAnimation("off", [0]);
        this.addAnimation("on", [0, 1, 2, 3, 4, 5]);
        this.setCurrentAnimation("off");
    },

    update : function() {
        if (player.hasEngine) {
            this.setCurrentAnimation("on");
            this.parent(this);
            return true;
        }
        return false;
    },

    onCollision : function() {
        if (player.hasEngine)
            if (me.levelDirector.getCurrentLevelId() == "facility1") {
                me.audio.play("warp", 0.7);
                me.levelDirector.loadLevel("facility2");
                me.game.HUD.setItemValue("stamina", me.gamestat.getItemValue("staminaF2"));
                me.audio.stop("roombg-teleporter");
                me.audio.play("roombg-home",0.3,true);
                me.gamestat.setValue("bg", 1);
            } else if (me.levelDirector.getCurrentLevelId() == "facility2") {
                me.audio.play("warp", 0.7);
                me.levelDirector.loadLevel("facility3");
                me.game.HUD.setItemValue("stamina", me.gamestat.getItemValue("staminaF3"));
                me.audio.stop("roombg-teleporter");
                me.audio.play("roombg-home",0.3,true);
                me.gamestat.setValue("bg", 1);
            } else if (me.levelDirector.getCurrentLevelId() == "facility3") {
                me.state.change(me.state.WIN);
            }
    }
});

// Create guard entity
var GuardEntity = me.ObjectEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        settings.image = "guard_tiles";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        // Call the constructor
        this.parent(x, y, settings);

        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
        
        // Add animations
        this.addAnimation("idle", [0]);
        this.addAnimation("down", [0, 1, 2, 3, 4]);
        this.addAnimation("up", [5, 6, 7, 8, 9]);
        this.addAnimation("left", [10, 11, 12, 13, 14]);
        this.addAnimation("right", [15, 16, 17, 18, 19]);
        this.setCurrentAnimation("idle");
    }
});

// Create engine piece entity
var EnginePieceEntity = me.CollectableEntity.extend({
    init : function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.reward = 15;
    },

    onCollision : function() {
        me.audio.play("chime-pickup-bonus", 0.3);
        me.game.HUD.updateItemValue("stamina", this.reward);
        this.collidable = false;
        me.game.remove(this);
        player.hasEngine = true;
    }
});

// Create key  entity
var KeyEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init : function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    onCollision : function() {
        player.hasKey = true;
        me.audio.play("lock", 0.9);
        this.collidable = false;
        me.game.remove(this);
    }
});

// Create key entity
var LockEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init : function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    update: function() {
        if (player.hasKey)
            me.game.remove(this);
    },

    onCollision : function() {
        if (player.hasKey)
            me.game.remove(this);
    }
});

/* AUDIO ZONES */

// Create HomeKeyDoor entity
var HomeKeyDoor = me.InvisibleEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
    },

    onCollision : function() {
        if (me.gamestat.getItemValue("bg") != 1) {
            me.audio.play("roombg-home", 0.45, "true");
            me.audio.stop("roombg-key");
            me.gamestat.setValue("bg", 1);
        }

    //console.log(this);
    }
});

// Create KeyHomeDoor entity
var KeyHomeDoor = me.InvisibleEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
    },

    onCollision : function() {
        if (me.gamestat.getItemValue("bg") != 2) {

            me.audio.play("roombg-key", 0.75, "true");
            me.audio.stop("roombg-home");
            me.gamestat.setValue("bg", 2);
        }

    }
});

// Create KeyGuardDoor entity
var KeyGuardDoor = me.InvisibleEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
    },
    onCollision : function() {
        if (!player.hasKey)
            player.disableMoveLeft = true;

        if (me.gamestat.getItemValue("bg") != 2) {
            me.audio.play("roombg-key", 0.75, "true");
            me.audio.stop("roombg-guard");
            me.gamestat.setValue("bg", 2);
        }

    }
});

// Create GuardKeyDoor entity
var GuardKeyDoor = me.InvisibleEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
    },

    onCollision : function() {
        if (me.gamestat.getItemValue("bg") != 3) {
            me.audio.play("roombg-guard", 0.9, "true");
            me.audio.stop("roombg-key");
            me.gamestat.setValue("bg", 3);
        }
    }
});

// Create GuardPuzzleDoor entity
var GuardPuzzleDoor = me.InvisibleEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
    },

    onCollision : function() {
        if (me.gamestat.getItemValue("bg") != 3) {
            me.audio.play("roombg-guard", 0.9, "true");
            me.audio.stop("roombg-puzzle");
            me.gamestat.setValue("bg", 3);
        }
    }
});

// Create PuzzleGuardDoor entity
var PuzzleGuardDoor = me.InvisibleEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
    },

    onCollision : function() {
        if (me.gamestat.getItemValue("bg") != 4) {
            me.audio.play("roombg-puzzle", 0.5, "true");
            me.audio.stop("roombg-guard");
            me.gamestat.setValue("bg", 4);
        }
    }
});

// Create GuardTeleportDoor entity
var GuardTeleportDoor = me.InvisibleEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
    },

    onCollision : function() {
        if (me.gamestat.getItemValue("bg") != 3) {
            me.audio.play("roombg-guard", 0.75, "true");
            me.audio.stop("roombg-teleporter");
            me.gamestat.setValue("bg", 3);
            
        }
    }
});

// Create TeleportGuardDoor entity
var TeleportGuardDoor = me.InvisibleEntity.extend({
    // Constructor
    init : function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
    },

    onCollision : function() {
        if (me.gamestat.getItemValue("bg") != 5) {
            me.audio.play("roombg-teleporter", 0.7, "true");
            me.audio.stop("roombg-guard");
            me.gamestat.setValue("bg", 5);
        }
    }
});

