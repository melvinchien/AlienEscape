// Alien Escape
// Melvin Chien, Ki Lee, Ank Nguyen, Stephen Swift
// CS 113 / INF 125, Professor Dan Frost
// Version 1.0
// November 12, 2012

// Game resources
var g_resources = [{
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

}];


var jsApp = {
    // Initialize the jsApp

    onload: function() {

        // Initialize the video
        if (!me.video.init('jsapp', 1024, 768, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        // initialize the "audio"
        //me.audio.init("mp3,ogg");

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
        me.entityPool.add("guard1", GuardEntity);
        
        // Add guard 1 entity in entity pool
        me.entityPool.add("guard2", GuardEntity);
        
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
    },


  
    // Action to perform when game is finished (state change)
    onDestroyEvent: function() {

    }

});


// Bootstrap
window.onReady(function() {
    jsApp.onload();
});
