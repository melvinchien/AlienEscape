

var Doctor = me.ObjectEntity.extend({
    init : function(x, y, settings) {
        this.parent(x, y, settings);
        this.settings = settings;
        this.jump = settings.jump;
        this.vision = settings.vision;
        this.speed = settings.speed; // teleportation frequency: delay between each teleportation

        // down
        this.addAnimation("0", [0]);
        this.addAnimation("000", [0]);
        this.addAnimation("001", [1]);
        this.addAnimation("002", [2]);
        this.addAnimation("003", [3]);
        this.addAnimation("004", [4]);
        this.addAnimation("005", [5]);
        this.addAnimation("006", [24]);
        this.addAnimation("010", [24]);
        this.addAnimation("011", [5]);
        this.addAnimation("012", [4]);
        this.addAnimation("013", [3]);
        this.addAnimation("014", [2]);
        this.addAnimation("015", [1]);
        this.addAnimation("016", [0]);


        // left
        this.addAnimation("3", [6]);
        this.addAnimation("300", [6]);
        this.addAnimation("301", [7]);
        this.addAnimation("302", [8]);
        this.addAnimation("303", [9]);
        this.addAnimation("304", [10]);
        this.addAnimation("305", [11]);
        this.addAnimation("306", [24]);
        this.addAnimation("310", [24]);
        this.addAnimation("311", [11]);
        this.addAnimation("312", [10]);
        this.addAnimation("313", [9]);
        this.addAnimation("314", [8]);
        this.addAnimation("315", [7]);
        this.addAnimation("316", [6]);

        // right
        this.addAnimation("1", [12]);
        this.addAnimation("100", [12]);
        this.addAnimation("101", [13]);
        this.addAnimation("102", [14]);
        this.addAnimation("103", [15]);
        this.addAnimation("104", [16]);
        this.addAnimation("105", [17]);
        this.addAnimation("106", [24]);
        this.addAnimation("110", [24]);
        this.addAnimation("111", [17]);
        this.addAnimation("112", [16]);
        this.addAnimation("113", [15]);
        this.addAnimation("114", [14]);
        this.addAnimation("115", [13]);
        this.addAnimation("116", [12]);

        // up
        this.addAnimation("2", [18]);
        this.addAnimation("200", [18]);
        this.addAnimation("201", [19]);
        this.addAnimation("202", [20]);
        this.addAnimation("203", [21]);
        this.addAnimation("204", [22]);
        this.addAnimation("205", [23]);
        this.addAnimation("206", [24]);
        this.addAnimation("210", [24]);
        this.addAnimation("211", [23]);
        this.addAnimation("212", [22]);
        this.addAnimation("213", [21]);
        this.addAnimation("214", [20]);
        this.addAnimation("215", [19]);
        this.addAnimation("216", [18]);

        this.pos.x += randomInt(0, settings.width / 32) * 32;
        this.pos.y += randomInt(0, settings.height / 32) * 32;

        this.direction = 0;//randomInt(0, 4);
        this.setCurrentAnimation(this.direction);
        this.pTime = me.timer.getTime();
        this.curAni = 0;
        this.warpSeq = 2;   // 0: initiating teleport - disappear, 1: teleported - appear, 2: next teleport coord determination, 3: idling
        this.targetX = x;
        this.targetY = y;
        this.damage = 15;

        this.temp = 0;
    },

    update : function() {

        if (this.pos.x == player.pos.x && this.pos.y == player.pos.y)
        {
            player.setCurrentAnimation("dead");
            me.game.HUD.updateItemValue("stamina", -this.damage);
        }


        if (this.warpSeq < 2)   // animation
        {
            if (me.timer.getTime() > this.pTime)
            {

                if (this.curAni == 4) {
                    me.audio.play("dr_move", 0.05);
                }
                if (this.curAni <= 6)
                {
                    this.setCurrentAnimation(this.direction + "" + this.warpSeq + "" + this.curAni);
                    this.curAni++;
                    this.pTime = me.timer.getTime() + (this.isPursuit ?  60 : 100);
                }
                else
                {
                    this.pos.x = this.targetX;
                    this.pos.y = this.targetY;
                    this.curAni = 0;
                    this.warpSeq++;
                }
            }
            this.parent(this);
            return true;
        }
        else if (this.warpSeq == 2) // determine movement
        {
            //this.targetX = -1;
            //this.targetY = -1;
            this.warpSeq = 0;

            if (isInSight(this))    // pursuit player
            {
                this.isPursuit = true;
                this.warpSeq = 0;
                this.pTime = me.timer.getTime();

                pX = (this.pos.x - player.pos.x > 0) ? 1 : (this.pos.x - player.pos.x < 0) ? -1 : 0;
                pY = (this.pos.y - player.pos.y > 0) ? 1 : (this.pos.y - player.pos.y < 0) ? -1 : 0;

                if (pX == 1 && pY == 1)   // player is on NW direction
                {
                    document.title = "NW";
                    this.direction = randomInt(0, 2) ? DIRECTION.WEST : DIRECTION.NORTH;
                }
                else if (pX == -1 && pY == 1)  // player is on NE direction
                {
                    document.title = "NE";
                    this.direction = randomInt(0, 2) ? DIRECTION.EAST : DIRECTION.NORTH;
                }
                else if (pX == 1 && pY == -1)  // player is on SW direction
                {
                    document.title = "SW";
                    this.direction = randomInt(0, 2) ? DIRECTION.WEST : DIRECTION.SOUTH;
                }
                else if (pX == -1 && pY == -1)  // player is on SE direction
                {
                    document.title = "SE";
                    this.direction = randomInt(0, 2) ? DIRECTION.EAST : DIRECTION.SOUTH;
                }
                else if (pX == 0 && pY == -1) // player is on S direction
                {
                    document.title = "S";
                    this.direction = DIRECTION.SOUTH;
                }
                else if (pX == 0 && pY == 1) // player is on N direction
                {
                    document.title = "N";
                    this.direction = DIRECTION.NORTH;
                }
                else if (pX == 1 && pY == 0) // player is on W direction
                {
                    document.title = "W";
                    this.direction = DIRECTION.WEST;
                }
                else if (pX == -1 && pY == 0) // player is on E direction
                {
                    document.title = "E";
                    this.direction = DIRECTION.EAST;
                }

                var jDistX = (Math.abs(this.pos.x - player.pos.x) / 32 > this.jump) ? this.jump : Math.abs(this.pos.x - player.pos.x) / 32;
                var jDistY = (Math.abs(this.pos.y - player.pos.y) / 32 > this.jump) ? this.jump : Math.abs(this.pos.y - player.pos.y) / 32;
                this.targetX = this.pos.x - (pX * jDistX * 32);
                this.targetY = this.pos.y - (pY * jDistY * 32);

                while ( me.game.collisionMap.getTile(this.targetX, this.targetY) != null
                    || this.targetX < 0
                    || this.targetX >= me.video.getWidth()
                    || this.targetY < 0
                    || this.targetY >= me.video.getHeight())
                    {
                    /*
                    document.getElementById("debugInfo").innerHTML =
                                                "pursuit<br>" +
                                                this.pos.x + "(" + (this.pos.x / 32) + ") x " + this.pos.y + "(" + (this.pos.y / 32) + ")<br>" + this.targetX + "(" + (this.targetX / 32) + ") x " +
                                                this.targetY + "(" + (this.targetY / 32) + ")<br><font color=red>" + me.game.collisionMap.getTile(this.targetX, this.targetY) + "</font>";
                    */
                    this.targetX -= (pX * 32);
                    this.targetY -= (pY * 32);
                    /*
                    document.getElementById("debugInfo").innerHTML += "<br>new " + this.targetX + "(" + (this.targetX / 32) + ") x " + this.targetY + "(" + (this.targetY / 32) + ")";
                    document.getElementById("debugInfo").innerHTML += "<br>dir " + this.direction;
                    */
                    resumeOnCTRL();
                }
            /*
                document.getElementById("debugInfo").innerHTML = "in sight<br>";
                document.getElementById("debugInfo").innerHTML += "player @ " + player.pos.x + " x " + player.pos.y + "<br>";
                document.getElementById("debugInfo").innerHTML += "from " + this.pos.x + " x " + this.pos.y;
                document.getElementById("debugInfo").innerHTML += " -> " + this.targetX + " x " + this.targetY + "<br>";
                document.getElementById("debugInfo").innerHTML += ((this.targetX - this.pos.x) / 32) + " x " + ((this.targetY - this.pos.y) / 32);
                */
            }
            else    // randomly determine next coord
            {
                this.isPursuit = false;
                this.pTime = me.timer.getTime() + this.speed;

                if (fairPercentage() < 60)
                    this.direction = randomInt(0, 4);

                if (this.targetY < this.settings.y)
                    this.direction = DIRECTION.SOUTH;
                else if (this.targetY > this.settings.y + this.settings.height)
                    this.direction = DIRECTION.NORTH;

                if (this.targetX < this.settings.y)
                    this.direction = DIRECTION.EAST;
                else if (this.targetX > this.settings.x + this.settings.width)
                    this.direction = DIRECTION.WEST;
                else
                    this.direction = nextMoveCheck(this);

                this.setCurrentAnimation(this.direction);
                this.parent(this);

                //document.getElementById("debugInfo").innerHTML = this.direction;

                if (this.direction == DIRECTION.EAST)
                {
                    pX = 1;
                    pY = 0;
                }
                else if (this.direction == DIRECTION.WEST)
                {
                    pX = -1;
                    pY = 0;
                }
                else if (this.direction == DIRECTION.NORTH)
                {
                    pX = 0;
                    pY = -1;
                }
                else
                {
                    pX = 0;
                    pY = 1;
                }

                //document.getElementById("debugInfo").innerHTML = pX + ", " + pY + "<br>";

                //this.targetX = this.pos.x + (pX * (randomInt(0, this.jump) + 1) * 32);
                //this.targetY = this.pos.y + (pY * (randomInt(0, this.jump) + 1) * 32);
                this.targetX = this.pos.x + (pX * this.jump * 32);
                this.targetY = this.pos.y + (pY * this.jump * 32);
                /*
                document.getElementById("debugInfo").innerHTML += this.targetX + ", " + this.targetY + "<br>";
                document.getElementById("debugInfo").innerHTML += this.settings.x + ", " + this.settings.y + "  =  " + (this.settings.x + this.settings.width) + ", " + (this.settings.y) + "<br>";
                document.getElementById("debugInfo").innerHTML += this.settings.x + ", " + (this.settings.y + this.settings.height) + "  =  " + (this.settings.x + this.settings.width) + ", " + (this.settings.y + this.settings.height) + "<br>";
                document.getElementById("debugInfo").innerHTML += this.settings.width + " x " + this.settings.height + "<br>";
                */
                // see if next target coord is within map/zone
                if (
                    this.targetX < 0 ||
                    this.targetX >= me.video.getWidth()  ||
                    this.targetY < 0 ||
                    this.targetY >= me.video.getHeight() ||
                    this.targetX < this.settings.x ||
                    this.targetX > this.settings.x + this.settings.width ||
                    this.targetY < this.settings.y ||
                    this.targetY > this.settings.y + this.settings.height ||
                    (this.targetX == this.pos.x && this.targetY == this.pos.y)
                    )
                    {
                    this.targetX += (-1 * pX * 32);
                    this.targetY += (-1 * pY * 32);
                }

                // see if next target coord is a solid tile
                while (me.game.collisionMap.getTile(this.targetX, this.targetY) != null)
                {
                    /*
                    document.getElementById("debugInfo").innerHTML += "<br>" + (me.game.collisionMap.getTile(this.targetX, this.targetY) != null);
                    document.getElementById("debugInfo").innerHTML +=
                                            "<br>random<br>" +
                                            "pos: " + this.pos.x + "(" + (this.pos.x / 32) + ") x " + this.pos.y + "(" + (this.pos.y / 32) + ")<br>" +
                                            "target: " + this.targetX + "(" + (this.targetX / 32) + ")" + this.targetY + "(" + (this.targetY / 32) + ")<br>" +
                                            "<font color=red>" + me.game.collisionMap.getTile(this.targetX, this.targetY) + "</font>";
                    */
                    this.targetX += (-1 * pX * 32);
                    this.targetY += (-1 * pY * 32);
                /*
                    document.getElementById("debugInfo").innerHTML += "<br>new " + this.targetX + "(" + (this.targetX / 32) + ") x " + this.targetY + "(" + (this.targetY / 32) + ")" +
                                                                      "<br><font color=blue>" + me.game.collisionMap.getTile(this.targetX, this.targetY) + "</font>";
                    document.getElementById("debugInfo").innerHTML += "<br>dir " + this.direction + "<br>";

                    //res = setTimeout(function() {resumeOnCTRL(); me.state.pause()}, 0);
                    */
                }
                return true;
            }
        }
        return false;
    }
});


function resumeOnCTRL()
{
    if (me.input.isKeyPressed(me.input.KEY.CTRL))
    {
        me.state.resume();
        clearTimeout(ress);
    }
    else
    {

        ress = setTimeout(function(){
            resumeOnCTRL();
        }, 50);
    }
}