// Alien Escape
// Melvin Chien, Ki Lee, Ank Nguyen, Stephen Swift
// CS 113 / INF 125, Professor Dan Frost
// Version 1.0
// November 12, 2012

// Debug display
var debugInfo = document.getElementById("debug");

// Create player entity
var PlayerEntity = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {
        // Call the constructor
        this.parent(x, y, settings);
        
        // Set default horizontal and vertical speed
        this.setVelocity(5, 5);
        
    },
    
    // Update player position
    update: function() {
        debug.innerHTML = "Debug <br/>" + this.pos + "<br/>" + Math.round(this.pos.x / 32) + "," + Math.round(this.pos.y / 32);
        if (me.input.isKeyPressed('left')) {
            // Flip sprite on horizontal axis
            
            this.flipX(true);
            // Update velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // Unflip sprite
            this.flipX(false);
            // Update velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            // Flip sprite on horizontal axis
            this.flipY(true);
            // Update velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            // Unflip sprite
            this.flipY(false);
            // Update velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.x = 0;
            this.vel.y = 0;
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
    }
    
});