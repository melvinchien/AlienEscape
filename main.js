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
}, {
    name: "facility1_level_tiles",
    type: "image",
    src: "images/facility1_level_tiles.png"
}, {
    name: "facility1",
    type: "tmx",
    src: "maps/facility1.tmx"

}, {
    name: "alien_tiles",
    type: "image",
    src: "images/alien_tiles.png"

}, {
    name: "teleporter_tiles",
    type: "image",
    src: "images/teleporter_tiles.png"

}, {
    name: "guard_tiles",
    type: "image",
    src: "images/guard_tiles.png"

}, {
    name: "engine_piece",
    type: "image",
    src: "images/engine_piece.png"

}, {
    name: "key",
    type: "image",
    src: "images/key.png"

}, {
    name: "music-temp",
    type: "audio",
    src: "sounds/",
    channel : 1
}, {
    name: "chime-pickup-bonus",
    type: "audio",
    src: "sounds/",
    channel : 1
},{
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
}];


var jsApp = {
    // Initialize the jsApp

    onload: function() {

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

        // Set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);

        // Add entities in entity pool
        me.entityPool.add("player", PlayerEntity);
        me.entityPool.add("teleporter", TeleporterEntity);
        me.entityPool.add("GuardEntity", GuardEntity);
        me.entityPool.add("KeyEntity", KeyEntity);
        me.entityPool.add("enginePiece", EnginePieceEntity);

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
        me.gamestat.add("staminaF1", 101);
        me.gamestat.add("staminaF2", 101);
        me.gamestat.add("staminaBonus", 15);
        me.gamestat.add("engineCollected");
        me.gamestat.add("keyCollected");
        me.gamestat.add("moved");
        me.gamestat.add("playerX");
        me.gamestat.add("playerY");

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
        me.game.HUD.addItem("stamina", new TurnObject(992, 0));
        me.game.HUD.setItemValue("stamina", me.gamestat.getItemValue("staminaF1"));

        // make sure everyhting is in the right order
        me.game.sort();

    },

    // Action to perform when game is finished (state change)
    onDestroyEvent: function() {
        // remove the HUD
        me.game.disableHUD();
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
        me.audio.playTrack("music-temp");
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
                me.audio.playTrack("music-temp");
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
        this.font.draw(context, "M - TOGGLE MUSIC", x, y + 128);

    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindMouse(me.input.mouse.LEFT);
    }
});


var TurnObject = me.HUD_Item.extend({
    init: function(x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("font_scifly_grey", 32);
    },


    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }

});


// Bootstrap
window.onReady(function() {
    jsApp.onload();
});


