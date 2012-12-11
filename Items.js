
var Water = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        // updated this to fix out-of-bound values
        this.pos.x += randomInt(0, settings.width / 32 - 1) * 32;
        this.pos.y += randomInt(0, settings.height / 32 - 1)  * 32;

        this.reward = 12;
    },

    onCollision: function() {
        // do something when collected
        me.game.HUD.updateItemValue("stamina", this.reward);
        this.collidable = false;
        me.game.remove(this);
    }
});

var FreshSandwich = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);

        this.pos.x += randomInt(0, settings.width / 32) * 32;
        this.pos.y += randomInt(0, settings.height / 32) * 32;

        this.reward = 20;
    },

    onCollision: function() {
        me.game.HUD.updateItemValue("stamina", this.reward);
        this.collidable = false;
        me.game.remove(this);
    }
});

var RottenSandwich = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);

        this.pos.x += randomInt(0, settings.width / 32) * 32;
        this.pos.y += randomInt(0, settings.height / 32) * 32;

        this.reward = 50;
    },

    onCollision: function() {
        me.game.HUD.updateItemValue("stamina", this.reward);
        this.collidable = false;
        me.game.remove(this);
    }
});