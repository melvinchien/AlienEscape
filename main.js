// Alien Escape
// Melvin Chien, Ki Lee, Ank Nguyen, Stephen Swift
// CS 113 / INF 125, Professor Dan Frost
// Version 1.0
// November 12, 2012


// Debug display
var debug = document.getElementById("debugInfo");

// Game resources
var g_resources = [
{
    name: "menu_main",
    type: "image",
    src: "images/menu_main.png"
}, {
    name: "font_orbitron",
    type: "image",
    src: "images/font_orbitron.png"
}, {
    name: "font_scifly_grey",
    type: "image",
    src: "images/font_scifly_grey.png"
}, {
    name: "font_scifly_green",
    type: "image",
    src: "images/font_scifly_green.png"
},  {
    name: "font_scifly_white",
    type: "image",
    src: "images/font_scifly_white.png"
}, {
    name: "facility1_level_tiles",
    type: "image",
    src: "images/facility1_level_tiles.png"
}, {
    name: "facility1",
    type: "tmx",
    src: "maps/facility1.tmx"

},  {
    name: "facility2_level_tiles",
    type: "image",
    src: "images/facility2_level_tiles.png"
}, {
    name: "facility2",
    type: "tmx",
    src: "maps/facility2.tmx"

},   {
    name: "facility3_level_tiles",
    type: "image",
    src: "images/facility2_level_tiles.png"
}, {
    name: "facility3",
    type: "tmx",
    src: "maps/facility3.tmx"

}, {
    name: "alien_tiles",
    type: "image",
    src: "images/alien_tiles.png"

}, {
    name: "teleporter_tiles",
    type: "image",
    src: "images/teleporter.png"

}, {
    name: "key",
    type: "image",
    src: "images/key.png"

},
{
    name: "lock",
    type: "image",
    src: "images/lock.png"

}, {
    name: "fow",
    type: "image",
    src: "images/fow.png"
},




{
    name: "water",
    type: "image",
    src: "images/water.png"
}, {
    name: "guard_novice_tiles",
    type: "image",
    src: "images/guard_novice.png"
}, {
    name: "guard_pro_tiles",
    type: "image",
    src: "images/guard_pro.png"
}, {
    name: "guard_elite_tiles",
    type: "image",
    src: "images/guard_elite.png"
}, {
    name: "doctor_tiles",
    type: "image",
    src: "images/doctor_tiles.png"
}, {
    name: "turret_tiles",
    type: "image",
    src: "images/turret.png"
}, {
    name: "laser_beam",
    type: "image",
    src: "images/turret.png"
}, {
    name: "turret_advanced_tiles",
    type: "image",
    src: "images/turret_advanced.png"
}, {
    name: "powerful_laser_beam",
    type: "image",
    src: "images/turret_advanced.png"
}, {
    name: "engine_piece",
    type: "image",
    src: "images/engine_piece.png"

}, {
    name: "fresh_sandwich",
    type: "image",
    src: "images/fresh_sandwich.png"

}, {
    name: "rotten_sandwich",
    type: "image",
    src: "images/rotten_sandwich.png"

},




{
    name: "music-loop",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "music-win",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "music-tag",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "chime-pickup-bonus",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "roombg-teleporter",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "roombg-home",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "roombg-key",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "roombg-puzzle",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "roombg-guard",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la1",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la2",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la3",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la4",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la5",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la6",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la7",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la8",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_la9",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb1",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb2",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb3",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb4",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb5",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb6",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb7",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb8",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rb9",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc1",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc2",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc3",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc4",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc5",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc6",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc7",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc8",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_lc9",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd1",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd2",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd3",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd4",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd5",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd6",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd7",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd8",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_rd9",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "foot_1",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "foot_2",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "foot_3",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "foot_4",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "foot_5",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "foot_6",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "foot_7",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "foot_8",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "dr_move",
    type: "audio",
    src: "sounds/",
    channel : 4
}, {
    name: "grunt",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "turret",
    type: "audio",
    src: "sounds/",
    channel : 8
}, {
    name: "warp",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "lock",
    type: "audio",
    src: "sounds/",
    channel : 1
}];


var jsApp = {
    // Initialize the jsApp

    onload: function() {
        me.debug.renderHitBox = false;

        // Initialize the video
        if (!me.video.init("jsapp", 1024, 768, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        // initialize the "audio"
        me.audio.init("ogg","mp3");

        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);

        // set all resources to be loaded
        me.loader.preload(g_resources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },


    // Callback when everything is loaded
    loaded: function () {
        // Set the "Menu" Screen Object
        me.state.set(me.state.MENU, new TitleScreen());

        me.state.set(me.state.GAMEOVER, new GameOverScreen());

        me.state.set(me.state.WIN, new WinScreen());

        // Set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);

        // Add entities in entity pool
        me.entityPool.add("player", PlayerEntity);

        me.entityPool.add("fow", FogOfWar);

        me.entityPool.add("NoviceGuard", NoviceGuard);
        me.entityPool.add("ProGuard", ProGuard);
        me.entityPool.add("EliteGuard", EliteGuard);
        me.entityPool.add("Turret", LaserTurret);
        me.entityPool.add("Advanced_Turret", AdvancedLaserTurret);
        me.entityPool.add("Doctor", Doctor);

        me.entityPool.add("teleporter", TeleporterEntity);
        me.entityPool.add("KeyEntity", KeyEntity);
        me.entityPool.add("LockEntity", LockEntity);
        me.entityPool.add("enginePiece", EnginePieceEntity);

        me.entityPool.add("KeyHomeDoor", KeyHomeDoor);
        me.entityPool.add("HomeKeyDoor", HomeKeyDoor);
        me.entityPool.add("KeyGuardDoor", KeyGuardDoor);
        me.entityPool.add("GuardKeyDoor", GuardKeyDoor);
        me.entityPool.add("GuardPuzzleDoor", GuardPuzzleDoor);
        me.entityPool.add("PuzzleGuardDoor", PuzzleGuardDoor);
        me.entityPool.add("GuardTeleportDoor", GuardTeleportDoor);
        me.entityPool.add("TeleportGuardDoor", TeleportGuardDoor);

        me.entityPool.add("WaterSpawn", Water);
        me.entityPool.add("FSandwichSpawn", FreshSandwich);
        me.entityPool.add("RSandwichSpawn", RottenSandwich);

        // Enable the keyboard
        me.input.bindKey(me.input.KEY.A, "left", true);
        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.D, "right", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.S, "down", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
        me.input.bindKey(me.input.KEY.W, "up", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.M, "music", true);
        

        // Store statistics and values (Default value is 0)
        me.gamestat.add("music");
        me.gamestat.add("bg");
        me.gamestat.add("staminaF1", 151);
        me.gamestat.add("staminaF2", 151);

        // start the game
        me.state.change(me.state.MENU);
    }

};

// jsApp - In game stuff
var PlayScreen = me.ScreenObject.extend( {

    onResetEvent: function() {
        me.levelDirector.loadLevel("facility1");

        // add a default HUD to the game mngr
        me.game.addHUD(0, 736, 1024, 32);

        // add a new HUD item
        me.game.HUD.addItem("stamina", new StaminaObject(992, 0));
        me.game.HUD.setItemValue("stamina", me.gamestat.getItemValue("staminaF1"));

        // make sure everyhting is in the right order
        me.game.sort();

        // start the background noise for the starting room
        me.audio.playTrack("music-loop", 0.5);
        me.audio.play("roombg-home",0.5,true);
        me.gamestat.setValue("bg", 1);

    },

    // Action to perform when game is finished (state change)
    onDestroyEvent: function() {
        // remove the HUD
        me.game.disableHUD();
        me.audio.stop("roombg-teleporter");
        me.audio.stop("roombg-guard");
        me.audio.stop("roombg-home");
        me.audio.stop("roombg-key");
        me.audio.stop("roombg-puzzle");
        me.audio.stopTrack();
    }

});

var TitleScreen = me.ScreenObject.extend( {


    init: function() {
        this.parent(true);
        this.title = null;
        this.font = null;
    },

    onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage("menu_main");
            // font to display the menu items
            this.font = new me.BitmapFont("font_scifly_green", 32);
            this.font.set("center");
        }

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);

        // play something
        me.audio.playTrack("music-loop", 0.5);
        me.gamestat.setValue("music", 1);
    },


    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed("enter")) {
            me.state.change(me.state.PLAY);
        }

        if (me.input.isKeyPressed("music")) {
            if (me.gamestat.getItemValue("music") == 1) {
                me.audio.stopTrack();
                me.gamestat.setValue("music", 0);
            } else {
                me.audio.playTrack("music-loop", 0.5);
                me.gamestat.setValue("music", 1);
            }
        }
        return true;
    },


    draw: function(context) {
        context.drawImage(this.title, 0, 0);
        var x = me.video.getWidth() / 2;
        var y = me.video.getHeight() / 2;
        this.font.draw(context, "PLAY - ENTER", x, y);
        this.font.draw(context, "MOVE - ARROW KEYS / WASD", x, y + 64);
        this.font.draw(context, "TOGGLE BGM - M", x, y + 128);
        this.font.draw(context, "TOGGLE FOG - F", x, y + 192);
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindMouse(me.input.mouse.LEFT);
    }
});


var StaminaObject = me.HUD_Item.extend({
    init: function(x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("font_scifly_white", 32);
    },

    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }

});


var GameOverScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.font = null;
    },

    onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage("menu_main");
            // font to display the menu items
            this.font = new me.BitmapFont("font_scifly_green", 32);
            this.font.set("center");

        }

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
        me.audio.playTrack("music-tag", 0.7);


    },


    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed("enter")) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },


    draw: function(context) {
        context.drawImage(this.title, 0, 0);
        var x = me.video.getWidth() / 2;
        var y = me.video.getHeight() / 2;
        this.font.draw(context, "GAME OVER", x, y);
        this.font.draw(context, "PRESS ENTER TO TRY AGAIN", x, y + 64);

    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindMouse(me.input.mouse.LEFT);
    }
});

var WinScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.font = null;
    },

    onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage("menu_main");
            // font to display the menu items
            this.font = new me.BitmapFont("font_scifly_green", 32);
            this.font.set("center");


        }
        
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
        me.audio.playTrack("music-win", 0.9);

    },


    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed("enter")) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },


    draw: function(context) {
        context.drawImage(this.title, 0, 0);
        var x = me.video.getWidth() / 2;
        var y = me.video.getHeight() / 2;
        this.font.draw(context, "CONGRATULATIONS!", x, y);
        this.font.draw(context, "YOU WON!", x, y + 64);
        this.font.draw(context, "PRESS ENTER TO PLAY AGAIN", x, y + 128);
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindMouse(me.input.mouse.LEFT);
    }
});

// Bootstrap
window.onReady(function() {
    jsApp.onload();
});


