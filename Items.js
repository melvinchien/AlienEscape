
var Water = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // call the parent constructor        
        this.parent(x, y, settings);
        
        settings.image = "water";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        
        this.type = me.game.COLLECTABLE_OBJECT;
        
        // updated this to fix out-of-bound values
        this.pos.x += randomInt(0, settings.width / 32 - 1) * 32;
        this.pos.y += randomInt(0, settings.height / 32 - 1)  * 32;
        this.reward = 12;
        this.collidable = true;
    },

    onCollision: function() {
        // do something when collected
        me.game.HUD.updateItemValue("stamina", this.reward);
        this.collidable = false;
        me.game.remove(this);
    }
});

var FreshSandwich = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "fresh_sandwich";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        
        // call the parent constructor        
        this.parent(x, y, settings);
                
        this.pos.x += randomInt(0, settings.width / 32) * 32;
        this.pos.y += randomInt(0, settings.height / 32) * 32;
        
        this.reward = 20;
        this.collidable = true;
        
        this.gravity = 0;
    },

    onCollision: function() {
        // do something when collected
        me.game.HUD.updateItemValue("stamina", this.reward);
        this.collidable = false;
        me.game.remove(this);
    }
});

var RottenSandwich = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "rotten_sandwich";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        
        // call the parent constructor        
        this.parent(x, y, settings);
        
        this.pos.x += randomInt(0, settings.width / 32) * 32;
        this.pos.y += randomInt(0, settings.height / 32) * 32;
        
        this.reward = 50;
        this.collidable = true;
        
        this.gravity = 0;
    },

    onCollision: function() {
        // do something when collected
        me.game.HUD.updateItemValue("stamina", this.reward);
        this.collidable = false;
        me.game.remove(this);
    }
});