// Alien Escape
// Melvin Chien, Ki Lee, Ank Nguyen, Stephen Swift
// CS 113 / INF 125, Professor Dan Frost
// Version 1.0
// November 12, 2012

// Debug display
var debug = document.getElementById("debugInfo");

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
        this.addAnimation('idleDown', [0,1,2,1]);
        this.addAnimation('down', [0,3,4,3]);
        this.addAnimation('idleUp', [5,6,7,6]);
        this.addAnimation('up', [5,8,9,8]);
        this.addAnimation('idleLeft', [10,11,12,11]);
        this.addAnimation('left', [10,13,14,13]);
        this.addAnimation('idleRight', [15,16,17,16]);
        this.addAnimation('right', [15,18,19,18]);
        this.setCurrentAnimation('idleDown');
        
        // Add footsteps
        this.nextFootVar = "la";  //default footstep
        
    },
    
    // Update player position
    update: function() {
        //debug.innerHTML = "Debug <br/>" + this.pos + "<br/>" + Math.round(this.pos.x / 32) + "," + Math.round(this.pos.y / 32);
       
        if (me.input.isKeyPressed('left')) {
            // Flip sprite on horizontal axis
            this.setCurrentAnimation('left');

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound);
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
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // Unflip sprite
            this.setCurrentAnimation('right');

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound);
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
            this.vel.x += this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            // Flip sprite on horizontal axis
            this.setCurrentAnimation('up');

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound);
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
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            // Unflip sprite
            this.setCurrentAnimation('down');

            // Generates a footstep sound
            var footRand = 1 + Math.floor(Math.random() * 9);
            var myFootSound = "FOOT_" + this.nextFootVar + footRand;
            me.audio.play(myFootSound);
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
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.setCurrentAnimation('idleDown');
            this.vel.x = 0;
            this.vel.y = 0;
        }
        // Check and update player movement
        this.updateMovement();
        
        var res = me.game.collide(this);
        
        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                // Flicker if we touched an enemy
                this.flicker(20);
            }
        }
        
        // Update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
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
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        
        
        
        // Add animations
        this.addAnimation('off', [0]);
        this.addAnimation('on', [0,1,2,3,4,5]);
        this.setCurrentAnimation('off');
    },
    
    onCollision: function() {
        this.setCurrentAnimation('on');
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
        this.addAnimation('idle', [0]);
        this.addAnimation('down', [0,1,2,3,4]);
        this.addAnimation('up', [5,6,7,8,9]);
        this.addAnimation('left', [10,11,12,13,14]);
        this.addAnimation('right', [15,16,17,18,19]);
        this.setCurrentAnimation('idle');
    }
    
    
    
});