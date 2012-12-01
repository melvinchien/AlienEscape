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
        this.setVelocity(5, 5);
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
    },
    
    // Update player position
    update: function() {
        //debug.innerHTML = "Debug <br/>" + this.pos + "<br/>" + Math.round(this.pos.x / 32) + "," + Math.round(this.pos.y / 32);
        if (me.input.isKeyPressed('left')) {
            // Flip sprite on horizontal axis
            this.setCurrentAnimation('left');
            // Update velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // Unflip sprite
            this.setCurrentAnimation('right');
            // Update velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            // Flip sprite on horizontal axis
            this.setCurrentAnimation('up');
            // Update velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            // Unflip sprite
            this.setCurrentAnimation('down');
            // Update velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.setCurrentAnimation('idleDown');
            this.vel.x = 0;
            this.vel.y = 0;
            console.log(this.vel.y);
        }
        // Check and update player movement
        this.updateMovement();
        
        
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
var TeleporterEntity = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
    }
    
});


// Create guard entity
var GuardEntity = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        
        // Add animations
        this.addAnimation('idle', [0]);
        this.addAnimation('down', [0,1,2,3,4]);
        this.addAnimation('up', [5,6,7,8,9]);
        this.addAnimation('left', [10,11,12,13,14]);
        this.addAnimation('right', [15,16,17,18,19]);
        this.setCurrentAnimation('idle');
    }
    
    
    
});