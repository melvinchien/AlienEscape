var fogVisible = true;


var FogOfWar = me.InvisibleEntity.extend({
    init : function(x, y, settings) {
        var tileX = me.video.getWidth() / 32;
        var tileY = me.video.getHeight() / 32;

        for (x = 1; x < tileX - 1; x++)
            for (y = 1; y < tileY - 1; y++)
                me.game.add(new Fog(x * 32, y * 32, me.loader.getImage("fow"), 32, 32), 9999999999999);
        me.game.sort();
        me.input.bindKey(me.input.KEY.F, "fog", true);
        
    },
    
    update : function() {
        if (me.input.isKeyPressed("fog")) {
            if (fogVisible) {
                fogVisible = false;
            } else {
                fogVisible = true;
            }
        }
    }
});


var Fog = me.AnimationSheet.extend({
    init : function(x, y, image, spritewidth, spriteheight) {
        this.parent(x, y, image, spritewidth, spriteheight);

        this.addAnimation(0, [3]);
        this.addAnimation(1, [3]);
        this.addAnimation(2, [2]);
        this.addAnimation(3, [1]);
        this.addAnimation(4, [0]);
        this.setCurrentAnimation(3);
        this.visible = true;

        this.isSolidTile = (me.game.collisionMap.getTile(x, y) == null) ? false : true;
        
    },

    update : function() {
        
        if (fogVisible) {
            
            var distX = (player.pos.x - this.pos.x) / 32;
            var distY = (player.pos.y - this.pos.y) / 32;

            var isBlocked = false;

            for (i = 1; i <= Math.abs(distX) && !isBlocked && !this.isSolidTile; i++)
            {
                if (me.game.collisionMap.getTile(this.pos.x + ((distX / Math.abs(distX)) * i * 32), this.pos.y) != null)
                {
                    isBlocked = true;
                    break;
                }
                if (me.game.collisionMap.getTile(player.pos.x - ((distX / Math.abs(distX)) * i * 32), player.pos.y) != null)
                {
                    isBlocked = true;
                    break;
                }
            }
            for (i = 1; i <= Math.abs(distY) && !isBlocked && (!this.isSolidTile && !this.turretTile); i++)
            {
                if (me.game.collisionMap.getTile(this.pos.x, this.pos.y + ((distY / Math.abs(distY)) * i * 32)) != null)
                {
                    isBlocked = true;
                    break;
                }
                if (me.game.collisionMap.getTile(player.pos.x, player.pos.y - ((distY / Math.abs(distY)) * i * 32)) != null)
                {
                    isBlocked = true;
                    break;
                }
            }
            for (i = 1; i <= Math.abs(distX) && i <= Math.abs(distY) && !isBlocked && !this.isSolidTile; i++)
            {

                if (player.pos.x == this.pos.x && player.pos.y == this.pos.y)
                    break;
                if (me.game.collisionMap.getTile(
                    this.pos.x + ((distX / (distX == 0 ? 1 : Math.abs(distX))) * i * 32),
                    this.pos.y + ((distY / (distY == 0 ? 1 : Math.abs(distY))) * i * 32)) != null)
                    {
                    isBlocked = true;
                    break;
                }
            }

            if (this.isTurretTile)
            {
                document.getElementById("debugInfo").innerHTML =
                (this.pos.x / 32) + ", " + (this.pos.y / 32) + ": " + isBlocked + "<br>" +
                distX + ", " + distY;
            }

            if (Math.abs(distX) > 4)
                distX = (distX / Math.abs(distX)) * 4;
            if (Math.abs(distY) > 4)
                distY = (distY / Math.abs(distY)) * 4;
            var dist = (Math.abs(distX) > Math.abs(distY)) ? Math.abs(distX) : Math.abs(distY);

            if (isBlocked)
                dist = 4;

            if (!this.isCurrentAnimation(dist))
            {
                this.setCurrentAnimation(dist)
                this.parent(this)
                return true;
            }
            else
                return false;
        } else {
            this.setCurrentAnimation(0);
        }
    }
});