
var DIRECTION = {
    SOUTH: 0,
    EAST: 1,
    NORTH: 2,
    WEST: 3
};

// generate a random integer in range of [x, y)
function randomInt(x, y) {
    return Math.floor(Math.random() * y) + x;
}

function fairPercentage() {
    var r = randomInt(0, 1000);
    for (i = 900; r > 100; i -= 100)
    {
        if (r > i)
        {
            r -= i;
            break;
        }
    }
    return r;
}

function time() {
    return Math.floor(me.timer.getTime() / 10);
}

function getPlayerX() {
    return player.pos.x / 32;
}

function getPlayerY() {
    return player.pos.y / 32;
}

function isAlienCaptured(obj) {
    /*
    oX = obj.pos.x;
    oY = obj.pos.y;
    pX = player.pos.x;
    pY = player.pos.y;

    if ((obj.direction == DIRECTION.EAST && (oX + obj.pace >= pX && oX + obj.pace <= pX + 32 && oY == pY)) ||
        (obj.direction == DIRECTION.WEST && (oX - obj.pace >= pX && oX - obj.pace <= pX + 32 && oY == pY)) ||
        (obj.direction == DIRECTION.NORTH && (oX == pX && oY - obj.pace >= pY && oY - obj.pace <= pY + 32)) ||
        (obj.direction == DIRECTION.SOUTH && (oX == pX && oY + obj.pace >= pY && oY + obj.pace <= pY + 32)))
        return true;
    else
        return false;
    */
    return obj.getRect().overlaps(player.getRect());
}

function checkObstacle(obj) {
    var obstacles = 0;
    if (me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y) != null)
        obstacles += 2;
    if (me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y) != null)
        obstacles += 4;
    if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32) != null)
        obstacles += 8;
    if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32) != null)
        obstacles += 16;
    return obstacles;
}

function nextMoveCheck(obj) {
    // current coord. of obj
    var cX = obj.pos.x;
    var cY = obj.pos.y;

    // coord of settings
    var sX = obj.settings.x;
    var sY = obj.settings.y;

    // size of settings
    var sW = obj.settings.width;
    var sH = obj.settings.height;

    var newDirection = [];

    //document.getElementById("debugInfo").innerHTML = "";

    if (cX + 32 >= sX + sW && cY - 32 < sY)  // obj at top-right corner
    {
        //document.getElementById("debugInfo").innerHTML += "tr<br>";
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32);

        if (me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.WEST);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32) == null)
            newDirection.push(DIRECTION.SOUTH);
    }
    else if (cX - 32 < sX && cY - 32 < sY)  // obj at top-left corner
    {

        //document.getElementById("debugInfo").innerHTML += "tl<br>";
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32);
        if (me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.EAST);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32) == null)
            newDirection.push(DIRECTION.SOUTH);
    }
    else if (cX + 32 >= sX + sW && cY + 34 >= sY + sH)   // obj at bottom-right corner
    {
        //document.getElementById("debugInfo").innerHTML += "br<br>";
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32);
        if (me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.WEST);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32) == null)
            newDirection.push(DIRECTION.NORTH);
    }
    else if (cX  - 32 < sX && cY + 34 >= sY + sH)   // obj at bottom-left corner
    {
        //document.getElementById("debugInfo").innerHTML += "bl<br>";
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32);
        if (me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.EAST);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32) == null)
            newDirection.push(DIRECTION.NORTH);
    }
    else if (obj.direction == DIRECTION.EAST && cX + 32 >= sX + sW)  // guard can't move east anymore
    {
        //document.getElementById("debugInfo").innerHTML += "ee<br>";
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32);
        if (me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.WEST);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32) == null)
            newDirection.push(DIRECTION.NORTH);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32) == null)
            newDirection.push(DIRECTION.SOUTH);
    }
    else if (obj.direction == DIRECTION.WEST && cX - 32 < sX)  // guard can't move west anymore
    {
        //document.getElementById("debugInfo").innerHTML += "ew<br>";
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32);
        if (me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.EAST);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32) == null)
            newDirection.push(DIRECTION.NORTH);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32) == null)
            newDirection.push(DIRECTION.SOUTH);
    }
    else if (obj.direction == DIRECTION.SOUTH && cY + 32 >= sY + sH)   // guard can't move south anymore
    {
        //document.getElementById("debugInfo").innerHTML += "es<br>";
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32);
        if (me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.EAST);
        if (me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.WEST);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y - 32) == null)
            newDirection.push(DIRECTION.NORTH);
    }
    else if (obj.direction == DIRECTION.NORTH && cY - 32 < sY) // guard can't move north anymore
    {
        //document.getElementById("debugInfo").innerHTML += "en<br>";
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y): " + me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y);
        //document.getElementById("debugInfo").innerHTML += "<br>me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32): " + me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32);
        if (me.game.collisionMap.getTile(obj.pos.x + 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.EAST);
        if (me.game.collisionMap.getTile(obj.pos.x - 32, obj.pos.y) == null)
            newDirection.push(DIRECTION.WEST);
        if (me.game.collisionMap.getTile(obj.pos.x, obj.pos.y + 32) == null)
            newDirection.push(DIRECTION.SOUTH);
    }
    else
    {
        //document.getElementById("debugInfo").innerHTML += "same";
        newDirection.push(obj.direction);
    }
    var asdf = newDirection[randomInt(0, newDirection.length)];
    //document.getElementById("debugInfo").innerHTML += "<br>" + newDirection + " (" + newDirection.length + "): " + asdf + "<br>";
    //return newDirection[randomInt(0, newDirection.length)];

    return asdf;
}

function isInSight(obj) {
    // guard doesn't pursuit player if it's stunned
    if (player.isCurrentAnimation("dead"))
        return false;

    // check if there is a collision tile between obj and player, if yes, guard can't see player
    if (Math.abs(player.pos.x - obj.pos.x) <= obj.vision * 32 && Math.abs(player.pos.y - obj.pos.y) <= obj.vision * 32)
    {
        var playerLocationX = (player.pos.x - obj.pos.x == 0) ? 0 : (player.pos.x - obj.pos.x > 0) ? 1 : -1;
        var playerLocationY = (player.pos.y - obj.pos.y == 0) ? 0 : (player.pos.y - obj.pos.y > 0) ? 1 : -1;
        //////////////////////////
        //
        //  (playerLocationX, playerLocationY) is....   |   O is obj, X is player
        //               (0, -1)                        |
        //                  |                           |
        //         (-1, -1) | (1, -1)                   |       +-->X
        //                  |                           |       |  /|
        //   (-1, 0)--------O--------(1, 0)             |       | / |
        //                  |                           |       |/  |
        //         (-1, 1)  | (1, 1)                    |       O <-+
        //                  |                           |
        //                (0, 1)                        |
        //
        ///////////////////////////
        var isVisible = true;

        //document.getElementById("debugInfo").innerHTML = (obj.pos.x / 32) + " x " + (obj.pos.y / 32) + " | " + (player.pos.x / 32) + " x " + (player.pos.y / 32) + " | <font color=red>" + playerLocationX + ", " + playerLocationY + "</font><br>";

        for (i = 1; i <= obj.vision && isVisible; i++)
        {
            //document.getElementById("debugInfo").innerHTML += "<br>";
            if ((obj.pos.x - player.pos.x) * playerLocationX + i * 32  <= 0)
            {
                //document.getElementById("debugInfo").innerHTML += "X[" + i + "]:" + ((32 * i * playerLocationX + obj.pos.x) / 32) + "&nbsp;&nbsp;&nbsp;&nbsp;";
                if (me.game.collisionMap.getTile(32 * i * playerLocationX + obj.pos.x, 32 * i * playerLocationY + obj.pos.y) != null)
                {
                    isVisible = false;
                    break;
                }
            }

            if ((obj.pos.y - player.pos.y) * playerLocationY + i * 32 <= 0)
            {
                //document.getElementById("debugInfo").innerHTML += "Y[" + i + "]:" + ((32 * i * playerLocationY + obj.pos.y) / 32) + "&nbsp;&nbsp;&nbsp;&nbsp;";
                if (me.game.collisionMap.getTile(obj.pos.x, 32 * i * playerLocationY + obj.pos.y) != null)
                {
                    isVisible = false;
                    break;
                }
            }

            if ((obj.pos.x - player.pos.x) * playerLocationX + i * 32  <= 0 && (obj.pos.y - player.pos.y) * playerLocationY + i * 32 <= 0)
            {
                //document.getElementById("debugInfo").innerHTML += "&nbsp;&nbsp;&nbsp;&nbspX[" + i + "]:" + ((32 * i * playerLocationX + obj.pos.x) / 32) + "&nbsp;&nbsp;&nbsp;&nbsp;";
                //document.getElementById("debugInfo").innerHTML += "Y[" + i + "]:" + ((32 * i * playerLocationY + obj.pos.y) / 32);
                if (me.game.collisionMap.getTile(32 * i * playerLocationX + obj.pos.x, 32 * i * playerLocationY + obj.pos.y) != null)
                {
                    isVisible = false;
                    break;
                }
            }
        }

        //document.getElementById("debugInfo").innerHTML += "<br>is player visible? <font color=blue>" + isVisible + "</font><br>";
        return isVisible;
    }

    return false;
}


// Novice guard does not have a pursuit mode
// it moves around inside its confined zone randomly
var NoviceGuard = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {

        settings.image = "guard_novice_tiles";
        settings.spritewidth = 32;
        settings.spriteheight = 32;

        this.settings = settings;

        // make it collidable
        //this.collidable = true;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        // Call the constructor
        this.parent(x, y, settings);

        // here below are custom variables
        //
        //      direction       south: 0, east: 1, north: 2, west: 3
        //      moveXBy         horizontal displacement factor
        //      moveYBy         vertical displacement factor
        //      speed           time between sprites: smaller faster -> animation speed
        //      pace            move distance per sprite change: this is determined by (total distance move / # of sprites per move)
        //      idle            idle time between each move: set to 0 to not give any idle time
        //
        //      curAni          sprite #, 0~4 where 0 is idle and 1~4 are sprites for moving animation
        //      animationDone   boolean, tells if one moving animation is done
        //
        //      damage          amount of player's stamina deducted upon contact
        //
        /////////////////////////
        this.speed = (settings.speed == null) ? 10 : settings.vision;
        this.idle = (settings.idle == null) ? 100 : settings.idle;
        this.pace = 6.4;
        this.moveXBy = 0;
        this.moveYBy = 0;
        this.damage = (settings.damage == null) ? 7 : settings.damage;
        this.vision = (settings.vision == null) ? 0 : settings.vision;

        // tile position within guard's zone
        this.pos.x = randomInt(0, settings.width / settings.spritewidth) * settings.spritewidth + x;
        this.pos.y = randomInt(0, settings.height / settings.spriteheight) * settings.spriteheight + y;

        this.direction = randomInt(0, 4);

        if (this.direction == DIRECTION.WEST)
        {
            this.direction = DIRECTION.EAST;
            this.moveXBy = 1;
        }
        else if (this.direction == DIRECTION.EAST)
        {
            this.direction = DIRECTION.WEST;
            this.moveXBy = -1;
        }
        else if (this.direction == DIRECTION.NORTH)
        {
            this.direction = DIRECTION.SOUTH;
            this.moveYBy = 1;
        }
        else if (this.direction == DIRECTION.SOUTH)
        {
            this.direction = DIRECTION.NORTH;
            this.moveYBy = -1;
        }


        // down
        this.addAnimation("00", [0]);
        this.addAnimation("01", [1]);
        this.addAnimation("02", [2]);
        this.addAnimation("03", [3]);
        this.addAnimation("04", [4]);

        // right
        this.addAnimation("10", [15]);
        this.addAnimation("11", [16]);
        this.addAnimation("12", [17]);
        this.addAnimation("13", [18]);
        this.addAnimation("14", [19]);

        // up
        this.addAnimation("20", [5]);
        this.addAnimation("21", [6]);
        this.addAnimation("22", [7]);
        this.addAnimation("23", [8]);
        this.addAnimation("24", [9]);

        // left
        this.addAnimation("30", [10]);
        this.addAnimation("31", [11]);
        this.addAnimation("32", [12]);
        this.addAnimation("33", [13]);
        this.addAnimation("34", [14]);

        this.curAni = 0;
        this.setCurrentAnimation(this.direction + "" + this.curAni);


        // these two variables below are for animation
        this.pTime = time(); // time between each sprite
        this.animationDone = true; // is animation for single move done?

        this.updateColRect(8, 16, -1, 0);
    },


    update: function() {

        this.gravity = 0;
        /*
        var gPosX = Math.round(this.pos.x / 32);
        var gPosY = Math.round(this.pos.y / 32);

        var xDiff = gPosX - getPlayerX();
        var yDiff = gPosY - getPlayerY();

        document.getElementById("debugInfo").innerHTML = "Player: " + getPlayerX() + " x " + getPlayerY() + "<br>";
        document.getElementById("debugInfo").innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" + player.pos.x + " x " + player.pos.y + "<br>";
        document.getElementById("debugInfo").innerHTML += "Guard: " + gPosX + " x " + gPosY + "<br>";
        document.getElementById("debugInfo").innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" + guard.pos.x + " x " + guard.pos.y + "<br>";
        document.getElementById("debugInfo").innerHTML += "Zone:\t(" + guard.settings.x + ", " + guard.settings.y + ") (" + (guard.settings.width + guard.settings.x) + ", " + guard.settings.y + ")<br>"
        document.getElementById("debugInfo").innerHTML += "\t\t(" + guard.settings.x + ", " + (guard.settings.y + guard.settings.height) + ") (" + (guard.settings.width + guard.settings.x) + ", " + (guard.settings.y + guard.settings.height) + ")<br>";
        */
        /*
        if (didPlayerMove) {
            didPlayerMove = false;
            this.animationDone = false;
        }
        */
        me.game.collide(this);

        if (isAlienCaptured(this))
        {
            if (!player.isCurrentAnimation("dead"))
            {
                setTimeout(function() {
                    player.setCurrentAnimation("idleDown");
                }, 1000);
                player.setCurrentAnimation("dead");

                //player.flicker(2, function() {this.collidable = true;});

                player.flicker(0);

                me.game.HUD.updateItemValue("stamina", -this.damage);
                document.getElementById("debugInfo").innerHTML += "<font color=red>contact</font><br>";
            }

        }

        // animation done, find out what to do next
        if (this.animationDone)
        {
            this.direction = nextMoveCheck(this);
            this.animationDone = false;

            if (this.direction == DIRECTION.EAST)
            {
                this.moveXBy = 1;
                this.moveYBy = 0;
            }
            else if (this.direction == DIRECTION.WEST)
            {
                this.moveXBy = -1;
                this.moveYBy = 0;
            }
            else if (this.direction == DIRECTION.NORTH)
            {
                this.moveXBy = 0;
                this.moveYBy = -1;
            }
            else
            {
                this.moveXBy = 0;
                this.moveYBy = 1;
            }

            // sound: play guard  footstep
            var gFootSound = "foot_" + Number.prototype.random(1, 8);
            //console.log(gFootSound);
            me.audio.play(gFootSound, 0.3);

        }
        else
        {
            //document.getElementById("debugInfo").innerHTML += time() + " || " + this.pTime;
            if (time() - this.pTime > this.speed)
            {
                this.pos.x += this.pace * this.moveXBy;
                this.pos.y += this.pace * this.moveYBy;

                this.curAni++;
                if (this.curAni > 4)    // a move is done
                {
                    this.curAni = 0;
                    this.animationDone = true;

                    this.pos.x = Math.round(this.pos.x);
                    this.pos.y = Math.round(this.pos.y);

                    this.pTime = time() + (randomInt(0, 2) ? 0 : randomInt(1, this.idle));    // either move more than one tile or idle for 1~this.idle
                }
                else
                {
                    this.pTime = Math.floor(me.timer.getTime() / 10) + this.speed;
                }

                this.setCurrentAnimation(this.direction + "" + this.curAni);
                this.updateMovement();
                this.parent(this);
                return true;
            }
        }
    }
});



// Pro guard does have a pursuit mode
// it moves around inside its confined zone randomly
// and when player's character comes into its sight,
// it starts to pursuit but only within its confied zone
var ProGuard = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {

        settings.image = "guard_pro_tiles";
        settings.spritewidth = 32;
        settings.spriteheight = 32;

        this.settings = settings;

        // make it collidable
        //this.collidable = true;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        // Call the constructor
        this.parent(x, y, settings);

        // here below are custom variables
        //
        //      direction       south: 0, east: 1, north: 2, west: 3
        //      moveXBy         horizontal displacement factor
        //      moveYBy         vertical displacement factor
        //      speed           time between sprites: smaller faster -> animation speed
        //      pace            move distance per sprite change: this is determined by (total distance move / # of sprites per move)
        //      idle            idle time between each move: set to 0 to not give any idle time
        //
        //      curAni          sprite #, 0~4 where 0 is idle and 1~4 are sprites for moving animation
        //      animationDone   boolean, tells if one moving animation is done
        //
        //      damage          amount of player's stamina deducted upon contact
        //      vision          sight range
        //
        /////////////////////////
        this.speed = (settings.speed == null) ? 7 : settings.vision;
        this.idle = (settings.idle == null) ? 70 : settings.idle;
        this.pace = 6.4;
        this.moveXBy = 0;
        this.moveYBy = 0;
        this.damage = (settings.damage == null) ? 10 : settings.damage;
        this.vision = (settings.vision == null) ? 3 : settings.vision;

        // tile position within guard's zone
        this.pos.x = randomInt(0, settings.width / settings.spritewidth) * settings.spritewidth + x;
        this.pos.y = randomInt(0, settings.height / settings.spriteheight) * settings.spriteheight + y;

        this.direction = randomInt(0, 4);

        if (this.direction == DIRECTION.WEST)
        {
            this.direction = DIRECTION.EAST;
            this.moveXBy = 1;
        }
        else if (this.direction == DIRECTION.EAST)
        {
            this.direction = DIRECTION.WEST;
            this.moveXBy = -1;
        }
        else if (this.direction == DIRECTION.NORTH)
        {
            this.direction = DIRECTION.SOUTH;
            this.moveYBy = 1;
        }
        else if (this.direction == DIRECTION.SOUTH)
        {
            this.direction = DIRECTION.NORTH;
            this.moveYBy = -1;
        }

        // down
        this.addAnimation("00", [0]);
        this.addAnimation("01", [1]);
        this.addAnimation("02", [2]);
        this.addAnimation("03", [3]);
        this.addAnimation("04", [4]);

        // right
        this.addAnimation("10", [15]);
        this.addAnimation("11", [16]);
        this.addAnimation("12", [17]);
        this.addAnimation("13", [18]);
        this.addAnimation("14", [19]);

        // up
        this.addAnimation("20", [5]);
        this.addAnimation("21", [6]);
        this.addAnimation("22", [7]);
        this.addAnimation("23", [8]);
        this.addAnimation("24", [9]);

        // left
        this.addAnimation("30", [10]);
        this.addAnimation("31", [11]);
        this.addAnimation("32", [12]);
        this.addAnimation("33", [13]);
        this.addAnimation("34", [14]);

        this.curAni = 0;
        this.setCurrentAnimation(this.direction + "" + this.curAni);


        // these two variables below are for animation
        this.pTime = time(); // time between each sprite
        this.animationDone = true; // is animation for single move done?

        this.updateColRect(8, 16, -1, 0);
    },

    update: function() {
        this.gravity = 0;

        /*
        if (didPlayerMove) {
            didPlayerMove = false;
            this.animationDone = false;
        }
        */
        //me.game.collide(this);
        if ( this.getRect().overlaps(player.getRect()) )//if (isAlienCaptured(this))
        {
            if (!player.isCurrentAnimation("dead"))
            {
                setTimeout(function() {
                    player.setCurrentAnimation("idleDown");
                }, 1000);
                player.setCurrentAnimation("dead");

                //player.flicker(2, function() {this.collidable = true;});
                player.flicker(0);

                me.game.HUD.updateItemValue("stamina", -this.damage);
                document.getElementById("debugInfo").innerHTML += "<font color=red>contact</font><br>";
            }

        }

        // animation done, find out what to do next
        if (this.animationDone)
        {

            if (isInSight(this))
            {
                //document.getElementById("debugInfo").innerHTML = "<font color=red>in range</font><br>" + this.direction + "->";
                //document.getElementById("debugInfo").innerHTML += this.direction + "->";
                pX = player.pos.x;
                pY = player.pos.y;

                if (this.pos.x - pX > 0 && this.pos.y - pY > 0)   // player is on NW direction
                {
                    //document.title = "NW";
                    this.direction = randomInt(0, 2) ? DIRECTION.WEST : DIRECTION.NORTH;
                }
                else if (this.pos.x - pX < 0 && this.pos.y - pY > 0)  // player is on NE direction
                {
                    //document.title = "NE";
                    this.direction = randomInt(0, 2) ? DIRECTION.EAST : DIRECTION.NORTH;
                }
                else if (this.pos.x - pX > 0 && this.pos.y - pY > 0)  // player is on SW direction
                {
                    //document.title = "SW";
                    this.direction = randomInt(0, 2) ? DIRECTION.WEST : DIRECTION.SOUTH;
                }
                else if (this.pos.x - pX < 0 && this.pos.y - pY < 0)  // player is on SE direction
                {
                    //document.title = "SE";
                    this.direction = randomInt(0, 2) ? DIRECTION.EAST : DIRECTION.SOUTH;
                }
                else if (this.pos.x - pX == 0 && this.pos.y - pY < 0) // player is on S direction
                {
                    //document.title = "S";
                    this.direction = DIRECTION.SOUTH;
                }
                else if (this.pos.x - pX == 0 && this.pos.y - pY > 0) // player is on N direction
                {
                    //ocument.title = "N";
                    this.direction = DIRECTION.NORTH;
                }
                else if (this.pos.x - pX > 0 && this.pos.y - pY == 0) // player is on W direction
                {
                    //document.title = "W";
                    this.direction = DIRECTION.WEST;
                }
                else if (this.pos.x - pX < 0 && this.pos.y - pY == 0) // player is on E direction
                {
                    //document.title = "E";
                    this.direction = DIRECTION.EAST;
                }

                //document.getElementById("debugInfo").innerHTML += this.direction + "<br>";
                // sound: play guard  footstep
                var gFootSound = "foot_" + Number.prototype.random(1, 8);
                //console.log(gFootSound);
                me.audio.play(gFootSound, 0.3);


            }
            else    // randomly determine direction if guard is not in pursuit
            {
                var fairCoin = fairPercentage();
                //document.title = fairCoin;
                if (fairCoin < 40)  // 40% -> change direction
                {
                    if (this.direction == DIRECTION.EAST)
                        this.direction = [DIRECTION.WEST, DIRECTION.NORTH, DIRECTION.SOUTH][randomInt(0, 3)];
                    else if(this.direction == DIRECTION.WEST)
                        this.direction = [DIRECTION.EAST, DIRECTION.NORTH, DIRECTION.SOUTH][randomInt(0, 3)];
                    else if (this.direction == DIRECTION.NORTH)
                        this.direction = [DIRECTION.EAST, DIRECTION.WEST, DIRECTION.SOUTH][randomInt(0, 3)];
                    else
                        this.direction = [DIRECTION.EAST, DIRECTION.WEST, DIRECTION.NORTH][randomInt(0, 3)];
                }
                else if (fairCoin < 10)    // 10% -> stay on same tile
                {
                    this.direction = -1;
                }
                else    // 50% -> keep same direction
                {
                }
            }

            this.direction = nextMoveCheck(this);
            this.animationDone = false;

            if (this.direction == DIRECTION.EAST)
            {
                this.moveXBy = 1;
                this.moveYBy = 0;
            }
            else if (this.direction == DIRECTION.WEST)
            {
                this.moveXBy = -1;
                this.moveYBy = 0;
            }
            else if (this.direction == DIRECTION.NORTH)
            {
                this.moveXBy = 0;
                this.moveYBy = -1;
            }
            else if (this.direction == DIRECTION.SOUTH)
            {
                this.moveXBy = 0;
                this.moveYBy = 1;
            }
            else
            {
                this.moveXBy = 0;
                this.moveYBy = 0;
            }
        }
        else
        {
            //document.getElementById("debugInfo").innerHTML += time() + " || " + this.pTime;
            if (time() - this.pTime > this.speed)
            {
                this.pos.x += this.pace * this.moveXBy;
                this.pos.y += this.pace * this.moveYBy;

                this.curAni++;
                if (this.curAni > 4)    // a move is done
                {
                    this.curAni = 0;
                    this.animationDone = true;

                    this.pos.x = Math.round(this.pos.x);
                    this.pos.y = Math.round(this.pos.y);

                    this.pTime = time() + (randomInt(0, 2) ? 0 : randomInt(1, this.idle));    // either move more than one tile or idle for 1~this.idle
                }
                else
                {
                    this.pTime = Math.floor(me.timer.getTime() / 10) + this.speed;
                }

                this.setCurrentAnimation(this.direction + "" + this.curAni);
                this.updateMovement();
                this.parent(this);
                return true;
            }
        }
    }
});


// elite guard can come out from its confined zone to pursuit a player once it detects a player
// until a player escapes out from guard's sight range
// if loses a player from sight, comes back to zone
// sight range is greater than pro guard
// faster move, almost no idling time after move compare to other guards
var EliteGuard = me.ObjectEntity.extend({
    // Constructor
    init: function(x, y, settings) {

        settings.image = "guard_elite_tiles";
        settings.spritewidth = 32;
        settings.spriteheight = 32;

        this.settings = settings;

        // make it collidable
        //this.collidable = true;

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        // Call the constructor
        this.parent(x, y, settings);

        // here below are custom variables
        //
        //      direction       south: 0, east: 1, north: 2, west: 3
        //      moveXBy         horizontal displacement factor
        //      moveYBy         vertical displacement factor
        //      speed           time between sprites: smaller faster -> animation speed
        //      pace            move distance per sprite change: this is determined by (total distance move / # of sprites per move)
        //      idle            idle time between each move: set to 0 to not give any idle time
        //
        //      curAni          sprite #, 0~4 where 0 is idle and 1~4 are sprites for moving animation
        //      animationDone   boolean, tells if one moving animation is done
        //
        //      damage          amount of player's stamina deducted upon contact
        //      vision          sight range
        //
        /////////////////////////
        this.speed = (settings.speed == null) ? 4 : settings.vision;
        this.idle = (settings.idle == null) ? 10 : settings.idle;
        this.pace = 6.4;
        this.moveXBy = 0;
        this.moveYBy = 0;
        this.damage = (settings.damage == null) ? 15 : settings.damage;
        this.vision = (settings.vision == null) ? 5 : settings.vision;

        // tile position within guard's zone
        this.pos.x = x;//randomInt(0, settings.width / settings.spritewidth) * settings.spritewidth + x;
        this.pos.y = y;//randomInt(0, settings.height / settings.spriteheight) * settings.spriteheight + y;

        this.direction = randomInt(0, 4);

        if (this.direction == DIRECTION.WEST)
        {
            this.direction = DIRECTION.EAST;
            this.moveXBy = 1;
        }
        else if (this.direction == DIRECTION.EAST)
        {
            this.direction = DIRECTION.WEST;
            this.moveXBy = -1;
        }
        else if (this.direction == DIRECTION.NORTH)
        {
            this.direction = DIRECTION.SOUTH;
            this.moveYBy = 1;
        }
        else if (this.direction == DIRECTION.SOUTH)
        {
            this.direction = DIRECTION.NORTH;
            this.moveYBy = -1;
        }

        // down
        this.addAnimation("00", [0]);
        this.addAnimation("01", [1]);
        this.addAnimation("02", [2]);
        this.addAnimation("03", [3]);
        this.addAnimation("04", [4]);

        // right
        this.addAnimation("10", [15]);
        this.addAnimation("11", [16]);
        this.addAnimation("12", [17]);
        this.addAnimation("13", [18]);
        this.addAnimation("14", [19]);

        // up
        this.addAnimation("20", [5]);
        this.addAnimation("21", [6]);
        this.addAnimation("22", [7]);
        this.addAnimation("23", [8]);
        this.addAnimation("24", [9]);

        // left
        this.addAnimation("30", [10]);
        this.addAnimation("31", [11]);
        this.addAnimation("32", [12]);
        this.addAnimation("33", [13]);
        this.addAnimation("34", [14]);

        this.curAni = 0;
        this.setCurrentAnimation(this.direction + "" + this.curAni);


        // these two variables below are for animation
        this.pTime = time(); // time between each sprite
        this.animationDone = true; // is animation for single move done?

        this.updateColRect(8, 16, -1, 0);
    },
    update: function() {
        this.gravity = 0;

        /*
        if (didPlayerMove) {
            didPlayerMove = false;
            this.animationDone = false;
        }
        */
        //me.game.collide(this);
        if ( this.getRect().overlaps(player.getRect()) )//if (isAlienCaptured(this))
        {
            if (!player.isCurrentAnimation("dead"))
            {
                setTimeout(function() {
                    player.setCurrentAnimation("idleDown");
                }, 1000);
                player.setCurrentAnimation("dead");

                //player.flicker(2, function() {this.collidable = true;});
                player.flicker(0);
                me.game.HUD.updateItemValue("stamina", -this.damage);
                document.getElementById("debugInfo").innerHTML += "<font color=red>contact</font><br>";
            }

        }

        // animation done, find out what to do next
        if (this.animationDone)
        {

            if (isInSight(this))
            {
                // sound: play guard  footstep
                var gFootSound = "foot_" + Number.prototype.random(1, 8);
                //console.log(gFootSound);
                me.audio.play(gFootSound, 0.3);

                //document.getElementById("debugInfo").innerHTML = "<font color=red>in range</font><br>" + this.direction + "->";
                //document.getElementById("debugInfo").innerHTML += this.direction + "->";
                pX = player.pos.x;
                pY = player.pos.y;

                if (this.pos.x - pX > 0 && this.pos.y - pY > 0)   // player is on NW direction
                {
                    //document.title = "NW";
                    this.direction = randomInt(0, 2) ? DIRECTION.WEST : DIRECTION.NORTH;
                }
                else if (this.pos.x - pX < 0 && this.pos.y - pY > 0)  // player is on NE direction
                {
                    //document.title = "NE";
                    this.direction = randomInt(0, 2) ? DIRECTION.EAST : DIRECTION.NORTH;
                }
                else if (this.pos.x - pX > 0 && this.pos.y - pY > 0)  // player is on SW direction
                {
                    //document.title = "SW";
                    this.direction = randomInt(0, 2) ? DIRECTION.WEST : DIRECTION.SOUTH;
                }
                else if (this.pos.x - pX < 0 && this.pos.y - pY < 0)  // player is on SE direction
                {
                    //document.title = "SE";
                    this.direction = randomInt(0, 2) ? DIRECTION.EAST : DIRECTION.SOUTH;
                }
                else if (this.pos.x - pX == 0 && this.pos.y - pY < 0) // player is on S direction
                {
                    //document.title = "S";
                    this.direction = DIRECTION.SOUTH;
                }
                else if (this.pos.x - pX == 0 && this.pos.y - pY > 0) // player is on N direction
                {
                    //ocument.title = "N";
                    this.direction = DIRECTION.NORTH;
                }
                else if (this.pos.x - pX > 0 && this.pos.y - pY == 0) // player is on W direction
                {
                    //document.title = "W";
                    this.direction = DIRECTION.WEST;
                }
                else if (this.pos.x - pX < 0 && this.pos.y - pY == 0) // player is on E direction
                {
                    //document.title = "E";
                    this.direction = DIRECTION.EAST;
                }

            //document.getElementById("debugInfo").innerHTML += this.direction + "<br>";

            }
            else    // randomly determine direction if guard is not in pursuit
            {
                var fairCoin = fairPercentage();
                //document.title = fairCoin;
                if (fairCoin < 30)  // 30% -> change direction
                {
                    if (this.direction == DIRECTION.EAST)
                        this.direction = [DIRECTION.WEST, DIRECTION.NORTH, DIRECTION.SOUTH][randomInt(0, 3)];
                    else if(this.direction == DIRECTION.WEST)
                        this.direction = [DIRECTION.EAST, DIRECTION.NORTH, DIRECTION.SOUTH][randomInt(0, 3)];
                    else if (this.direction == DIRECTION.NORTH)
                        this.direction = [DIRECTION.EAST, DIRECTION.WEST, DIRECTION.SOUTH][randomInt(0, 3)];
                    else
                        this.direction = [DIRECTION.EAST, DIRECTION.WEST, DIRECTION.NORTH][randomInt(0, 3)];
                }
                else if (fairCoin < 10)    // 10% -> stay on same tile
                {
                    this.direction = -1;
                }
                else    // 50% -> keep same direction
                {
                }

                this.direction = nextMoveCheck(this);
            }


            this.animationDone = false;

            if (this.direction == DIRECTION.EAST)
            {
                this.moveXBy = 1;
                this.moveYBy = 0;
            }
            else if (this.direction == DIRECTION.WEST)
            {
                this.moveXBy = -1;
                this.moveYBy = 0;
            }
            else if (this.direction == DIRECTION.NORTH)
            {
                this.moveXBy = 0;
                this.moveYBy = -1;
            }
            else if (this.direction == DIRECTION.SOUTH)
            {
                this.moveXBy = 0;
                this.moveYBy = 1;
            }
            else
            {
                this.moveXBy = 0;
                this.moveYBy = 0;
            }
        }
        else
        {
            //document.getElementById("debugInfo").innerHTML += time() + " || " + this.pTime;
            if (time() - this.pTime > this.speed)
            {
                this.pos.x += this.pace * this.moveXBy;
                this.pos.y += this.pace * this.moveYBy;

                this.curAni++;
                if (this.curAni > 4)    // a move is done
                {
                    this.curAni = 0;
                    this.animationDone = true;

                    this.pos.x = Math.round(this.pos.x);
                    this.pos.y = Math.round(this.pos.y);

                    this.pTime = time() + (randomInt(0, 2) ? 0 : randomInt(1, this.idle));    // either move more than one tile or idle for 1~this.idle
                }
                else
                {
                    this.pTime = Math.floor(me.timer.getTime() / 10) + this.speed;
                }

                this.setCurrentAnimation(this.direction + "" + this.curAni);
                this.updateMovement();
                this.parent(this);
                return true;
            }
        }
    }
});