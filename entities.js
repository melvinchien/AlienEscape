// Alien Escape
// Melvin Chien, Ki Lee, Ank Nguyen, Stephen Swift
// CS 113 / INF 125, Professor Dan Frost
// Version 1.0
// November 12, 2012


// Create player entity
var PlayerEntity = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);

        // Set default horizontal and vertical speed
        this.setVelocity(32, 32);
        // disable gravity
        this.gravity = 0;

        // Add animations
        this.addAnimation("idleDown", [0,1,2,1]);
        this.addAnimation("down", [0,3,4,3]);
        this.addAnimation("idleUp", [5,6,7,6]);
        this.addAnimation("up", [5,8,9,8]);
        this.addAnimation("idleLeft", [10,11,12,11]);
        this.addAnimation("left", [10,13,14,13]);
        this.addAnimation("idleRight", [15,16,17,16]);
        this.addAnimation("right", [15,18,19,18]);
        this.setCurrentAnimation("idleDown");

        // Add footsteps
        this.nextFootVar = "la";  //default footstep
    },

    // Update player position
    update: function() {
        if (me.input.isKeyPressed("left")) {
            this.setCurrentAnimation("left", "idleLeft");

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound, 0.2);
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
            this.setCurrentAnimation("right", "idleRight");

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound, 0.2);
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
            me.audio.play(myFootSound, 0.2);
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
            me.audio.play(myFootSound, 0.2);
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

        // Check for movement
        var oldX = me.gamestat.getItemValue("playerX");
        var oldY = me.gamestat.getItemValue("playerY");
        var newX = Math.round(this.pos.x / 32);
        var newY = Math.round(this.pos.y / 32);

        var res = me.game.collide(this);
        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                // Flicker if we touched an enemy
                this.flicker(1);
            }
        }

        if (oldX == newX && oldY == newY) {
            me.gamestat.reset("moved");
        } else {
            me.gamestat.setValue("playerX", newX);
            me.gamestat.setValue("playerY", newY);
            me.gamestat.setValue("moved", 1);

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
var TeleporterEntity = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);

        // Add animations
        this.addAnimation("off", [0]);
        this.addAnimation("on", [0,1,2,3,4,5]);
        this.setCurrentAnimation("off");
    },

    update: function() {
        if (me.gamestat.getItemValue("engineCollected") == 1) {
            this.setCurrentAnimation("on");
            this.parent(this);
            return true;
        }
    }
});


// Create guard entity
var GuardEntity = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {
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
        this.addAnimation("down", [0,1,2,3,4]);
        this.addAnimation("up", [5,6,7,8,9]);
        this.addAnimation("left", [10,11,12,13,14]);
        this.addAnimation("right", [15,16,17,18,19]);
        this.setCurrentAnimation("idle");
    }
});


// Create engine piece entity
var EnginePieceEntity = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    onCollision: function() {
   		me.audio.play("chime-pickup-bonus", 0.3);
        me.game.HUD.updateItemValue("stamina", me.gamestat.getItemValue("staminaBonus"));
        this.collidable = false;
        me.game.remove(this);
        me.gamestat.setValue("engineCollected", 1);
    }
});


// Create key  entity
var KeyEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    onCollision: function() {
    me.audio.play("chime-pickup-bonus", 0.3);
    this.collidable = false;
	me.game.remove(this);
    me.gamestat.setValue("keyCollected", 1);

    // do something when collected
    }
});

/* AUDIO ZONES */

// Create HomeKeyDoor entity
var HomeKeyDoor = me.InvisibleEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
	 },

    onCollision: function() {
       	 	   if (me.gamestat.getItemValue("bg") != 1) {
					me.audio.play("roombg-home", 0.45,"true");
					me.audio.stop("roombg-key");
					me.gamestat.setValue("bg",1);
           	 }

			//console.log(this);
   	}
});

// Create KeyHomeDoor entity
var KeyHomeDoor = me.InvisibleEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
	 },

    onCollision: function() {
       	 	   if (me.gamestat.getItemValue("bg") != 2) {
					me.audio.play("roombg-key", 0.6,"true");
					me.audio.stop("roombg-home");
					me.gamestat.setValue("bg",2);
           	 }

   	}
});

// Create KeyGuardDoor entity
var KeyGuardDoor = me.InvisibleEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
	 },

    onCollision: function() {
       	 	   if (me.gamestat.getItemValue("bg") != 2) {
					me.audio.play("roombg-key", 0.6,"true");
					me.audio.stop("roombg-guard");
					me.gamestat.setValue("bg",2);
           	 }

   	}
});

// Create GuardKeyDoor entity
var GuardKeyDoor = me.InvisibleEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
	 },

    onCollision: function() {
       	 	   if (me.gamestat.getItemValue("bg") != 3) {
					me.audio.play("roombg-guard", 0.75,"true");
					me.audio.stop("roombg-key");
					me.gamestat.setValue("bg",3);
           	 }
   	}
});

// Create GuardPuzzleDoor entity
var GuardPuzzleDoor = me.InvisibleEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
	 },

    onCollision: function() {
       	 	   if (me.gamestat.getItemValue("bg") != 3) {
					me.audio.play("roombg-guard", 0.75,"true");
					me.audio.stop("roombg-puzzle");
					me.gamestat.setValue("bg",3);
           	 }
   	}
});

// Create PuzzleGuardDoor entity
var PuzzleGuardDoor = me.InvisibleEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
	 },

    onCollision: function() {
       	 	   if (me.gamestat.getItemValue("bg") != 4) {
					me.audio.play("roombg-puzzle", 0.35,"true");
					me.audio.stop("roombg-guard");
					me.gamestat.setValue("bg",4);
           	 }
   	}
});

// Create GuardTeleportDoor entity
var GuardTeleportDoor = me.InvisibleEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
	 },

    onCollision: function() {
       	 	   if (me.gamestat.getItemValue("bg") != 3) {
					me.audio.play("roombg-guard", 0.75,"true");
					me.audio.stop("roombg-teleporter");
					me.gamestat.setValue("bg",3);
           	 }
   	}
});

// Create TeleportGuardDoor entity
var TeleportGuardDoor = me.InvisibleEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        this.collidable = true;
	 },

    onCollision: function() {
       	 	   if (me.gamestat.getItemValue("bg") != 5) {
					me.audio.play("roombg-teleporter", 0.9,"true");
					me.audio.stop("roombg-guard");
					me.gamestat.setValue("bg",5);
           	 }
   	}
});

