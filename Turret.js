
var LaserTurret = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        
        settings.image = "turret_tiles";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        
        this.parent(x, y, settings);
        
        // setTile(x, y, id)'s x, y are not a vector coord of tile but are tile indices
        me.game.collisionMap.setTile(x / 32, y / 32, me.game.collisionMap.getTileId(0, 0));                
        
        this.addAnimation("west", [1]);
        this.addAnimation("east", [0]);
        this.addAnimation("north", [2]);
        this.addAnimation("south", [3]);
        this.setCurrentAnimation(settings.direction);
        
        var dFactorX = 0, dFactorY = 0;
        switch (settings.direction)
        {
            case "west":                
                dFactorX = -1;
                dFactorY = 0;                
                break;
            case "east":                
                dFactorX = 1;
                dFactorY = 0;                
                break;
            case "north":                
                dFactorX = 0;
                dFactorY = -1;                
                break;
            case "south":                
                dFactorX = 0;
                dFactorY = 1;                
                break;
        }
        
        if (settings.speed == null)
            settings.speed = 1500;
        if (settings.damage == null)
            settings.damage = 1;
        if (settings.delay == null)
            settings.delay = fairPercentage() * randomInt(1, 10) + 500;
        
        for (i = 1; me.game.collisionMap.getTile(x + (i * dFactorX * 32), y + (i * dFactorY * 32)) == null; i++)
        {
            var lb = new LaserBeam(
                        x + (i * dFactorX * 32),
                        y + (i * dFactorY * 32),
                        {   // settings            
                            name : (this.name + "laser_beam" + i),
                            spritewidth : "32",
                            spriteheight : "32",
                            image : "laser_beam",
                            orientation : 1 - Math.abs(dFactorY),
                            speed : settings.speed,
                            damage : settings.damage,
                            delay : settings.delay
                        }
                    );
            //document.getElementById("debugInfo").innerHTML += lb.name + "<br>";
            me.game.add(lb, 9999999999);
        }
        me.game.sort();
    }
});


var LaserBeam = me.ObjectEntity.extend({
    
    isOn : 1,
    pTime : 0,
    damage : 0,
    orientation : 2,
    delay : 0,
    speed : 0,
    
    init : function(x, y, settings) {
        
        this.parent(x, y, settings);
        //document.getElementById("debugInfo").innerHTML += this.name + "<br>";
        this.alive = false;
        //this.collidable = false;
        this.type = me.game.ENEMY_OBJECT;
        this.damage = settings.damage;
        this.delay = settings.delay;
        this.speed = settings.speed;
        this.orientation = settings.orientation;
        
        this.addAnimation(0, [4, 7]);   // vertical
        this.addAnimation(1, [5, 6]);   // horizontal
        this.addAnimation(2, [8]);  // empty;
        
        
        this.setCurrentAnimation(2);
        //document.getElementById("debugInfo").innerHTML += this.name + " (" + this.GUID + ")<br>";
        this.pTime = me.timer.getTime() + this.delay;
    },
    
    update : function() {        
        // onCollision override...
        if (this.alive && this.pos.x == player.pos.x && this.pos.y == player.pos.y)
        {
            //document.getElementById("debugInfo").innerHTML = "<font color=red>" + this.name + ": " + this.pos.x + " x " + this.pos.y + "<br>player: " + player.pos.x + " x " + player.pos.y + "</font><br>";
            player.setCurrentAnimation("dead");
            var newStamina = me.game.HUD.getItemValue("stamina") - this.damage;
            if (newStamina <= 0)
            {
                newStamina = 0;
                gameOver();
            }
            me.game.HUD.setItemValue("stamina", newStamina);
            //document.getElementById("debugInfo").innerHTML += this.name + " (" + this.GUID + ")<font color=red>laser</font><br>";
        }/*
        else
        {
            document.getElementById("debugInfo").innerHTML = "<font color=blue>" + this.name + "- " + this.pos.x + " x " + this.pos.y + "<br>player: " + player.pos.x + " x " + player.pos.y + "</font><br>";
        }*/        
        
        //document.getElementById("debugInfo").innerHTML = "<font color=red>" + (me.timer.getTime() - this.pTime) + "</font> -> " + this.speed + "</br>";

        if (!this.isOn) {
            this.alive = false;
            //this.collidable = false;
            this.setCurrentAnimation(2);
        }
        else if (me.timer.getTime() - this.pTime > this.speed)
        {
            //document.getElementById("debugInfo").innerHTML = "";
            if (this.alive)
            {
                this.alive = false;
                //this.collidable = false;
                this.setCurrentAnimation(2);
            }
            else
            {
                this.alive = true;
                //this.collidable = true;
                this.setCurrentAnimation(this.orientation);
            }
            this.pTime = me.timer.getTime();
            
        }
        
        this.parent(this);
        return true;
    }
});



var AdvancedLaserTurret = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        
        settings.image = "turret_advanced_tiles";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        
        this.parent(x, y, settings);
        
        // setTile(x, y, id)'s x, y are not a vector coord of tile but are tile indices
        me.game.collisionMap.setTile(x / 32, y / 32, me.game.collisionMap.getTileId(0, 0));                
        
        this.addAnimation("west", [1]);
        this.addAnimation("east", [0]);
        this.addAnimation("north", [2]);
        this.addAnimation("south", [3]);
        this.setCurrentAnimation(settings.direction);
        
        this.laser = [];
        var dFactorX = 0, dFactorY = 0;
        switch (settings.direction)
        {
            case "west":                
                dFactorX = -1;
                dFactorY = 0;                
                break;
            case "east":                
                dFactorX = 1;
                dFactorY = 0;                
                break;
            case "north":                
                dFactorX = 0;
                dFactorY = -1;                
                break;
            case "south":                
                dFactorX = 0;
                dFactorY = 1;                
                break;
        }
        
        if (settings.damage == null)
            settings.damage = 2;
        
        this.minX = x;
        this.maxX = x;
        this.minY = y;
        this.maxY = y;
        
        for (i = 1; me.game.collisionMap.getTile(x + (i * dFactorX * 32), y + (i * dFactorY * 32)) == null; i++)
        {
            //document.getElementById("debugInfo").innerHTML += (x + (i * dFactorX * 32)) + " x " + (y + (i * dFactorY * 32)) + "<br>";
            var plb = new PowerfulLaserBeam(
                    x + (i * dFactorX * 32),
                    y + (i * dFactorY * 32),
                    {   // settings            
                        name : this.name + "powerful_laser_beam" + i,
                        spritewidth : "32",
                        spriteheight : "32",
                        image : "powerful_laser_beam",
                        orientation : dFactorY,
                        damage : settings.damage
                    }
                );
            
            if (plb.pos.x < this.minX)
                this.minX = plb.pos.x;
            else if (plb.pos.x > this.maxX)
                this.maxX = plb.pos.x;
            if (plb.pos.y < this.minY)
                this.minY = plb.pos.y;
            else if (plb.pos.y > this.maxY)
                this.maxY = plb.pos.y;
                
            this.laser.push(plb);
            me.game.add(plb, 99999999999);
            //document.getElementById("debugInfo").innerHTML += plb.name + "<br>";
        }
        me.game.sort();
        
        this.delay = (settings.delay == null) ? 300 : settings.delay;
        this.alive = false;
        this.lockOn = false;
        this.pTime = 0;
    },
    
    update : function() {
        
        if (this.minX <= player.pos.x && player.pos.x <= this.maxX && this.minY <= player.pos.y && player.pos.y <= this.maxY)
        {
            //document.getElementById("debugInfo").innerHTML = "locked";
            if (this.lockOn)
            {
                if (me.timer.getTime() > this.pTime)
                {
                    for (i = 0; i < this.laser.length; i++)
                        this.laser[i].fire();
                }
            }
            else
            {
                this.pTime = me.timer.getTime() + this.delay;
                this.lockOn = true;
                this.alive = true;
            }
        }
        else
        {
            //document.getElementById("debugInfo").innerHTML = "(" + this.minX + ", " + this.minY + ") ~ (" + this.maxX + ", " + this.maxY + ")<br>" + player.pos.x + " x " + player.pos.y;
            if (this.lockOn)
            {
                if (this.alive && me.timer.getTime() > this.pTime)
                {
                    for (i = 0; i < this.laser.length; i++)
                        this.laser[i].fire();
                    this.alive = false;
                    this.pTime = me.timer.getTime() + 1000; // once turret locks on, it fires for one second even if player escapes before turret fires
                }
                else if (!this.alive && me.timer.getTime() > this.pTime)
                    this.lockOn = false;
            }
            else 
            {
                for (i = 0; i < this.laser.length; i++)
                        this.laser[i].stop();
            }
        }
        
        //document.getElementById("debugInfo").innerHTML += "<br>alive ? " + this.alive + "<br>lockOn ? " + this.lockOn;
        
        this.parent(this);
        return true;
    }
});


var PowerfulLaserBeam = me.ObjectEntity.extend({
    
    orientation : -1,
    damage : 0,
    
    init : function(x, y, settings) {
        
        this.name = settings.name;
        this.spritewidth = settings.spritewidth;
        this.spriteheight = settings.spriteheight;
        this.orientation = settings.orientation;
        this.damage = settings.damage;
        
        this.parent(x, y, settings);        
        this.collidable = false;
        
        this.addAnimation(0, [4, 7]);   // vertical
        this.addAnimation(1, [5, 6]);   // horizontal
        this.addAnimation(2, [8]);  // empty;
        
        this.orientation = 1 - Math.abs(settings.orientation);
        this.setCurrentAnimation(2);
        //document.getElementById("debugInfo").innerHTML += this.name + " (" + this.GUID + ")<br>";
    },
    
    update : function() {
        if (this.collidable && this.pos.x == player.pos.x && this.pos.y == player.pos.y)
        {
            //document.getElementById("debugInfo").innerHTML += this.name + "<br>";
            player.setCurrentAnimation("dead");
            var newStamina = me.game.HUD.getItemValue("stamina") - this.damage;
            if (newStamina <= 0)
            {
                newStamina = 0;
                gameOver();
            }
            me.game.HUD.setItemValue("stamina", newStamina);
        }
        
        this.parent(this);
        return true;
    },
    
    fire : function() {
        //this.alive = ture;
        this.collidable = true;
        this.setCurrentAnimation(this.orientation);
    },
    
    stop : function() {
        //this.alive = false;
        this.collidable = false;
        this.setCurrentAnimation(2);
    }
});