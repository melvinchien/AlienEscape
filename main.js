// Alien Escape
// Melvin Chien, Ki Lee, Ank Nguyen, Stephen Swift
// CS 113 / INF 125, Professor Dan Frost
// Version 1.0
// November 12, 2012

// Game resources
var g_resources = [
{
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

},
{name: "music-temp", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la1", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la2", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la3", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la4", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la5", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la6", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la7", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la8", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_la9", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb1", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb2", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb3", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb4", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb5", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb6", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb7", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb8", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rb9", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc1", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc2", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc3", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc4", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc5", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc6", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc7", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc8", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_lc9", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd1", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd2", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd3", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd4", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd5", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd6", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd7", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd8", type: "audio",  src: "sounds/", channel : 1},
{name: "foot_rd9", type: "audio",  src: "sounds/", channel : 1}

];


var jsApp = {
    // Initialize the jsApp

    onload: function() {

        // Initialize the video
        if (!me.video.init('jsapp', 1024, 768, false, 1.0)) {
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
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());
        
        // Add player entity in entity pool
        me.entityPool.add("player", PlayerEntity);
        
        // Add teleporter entity in entity pool
        me.entityPool.add("teleporter", TeleporterEntity);
        
        // Add guard 2 entity in entity pool
        me.entityPool.add("GuardEntity", GuardEntity);
        
        // Enable the keyboard
        me.input.bindKey(me.input.KEY.A, "left", true);
        me.input.bindKey(me.input.KEY.D, "right", true);
        me.input.bindKey(me.input.KEY.S, "down", true);
        me.input.bindKey(me.input.KEY.W, "up", true);

        // start the game
        me.state.change(me.state.PLAY);
    }

};

// jsApp - In game stuff
var PlayScreen = me.ScreenObject.extend( {

    onResetEvent: function() {
        me.levelDirector.loadLevel("facility1");
        me.audio.playTrack("music-temp"); 
    },


  
    // Action to perform when game is finished (state change)
    onDestroyEvent: function() {

    }

});


// Bootstrap
window.onReady(function() {
    jsApp.onload();
});
