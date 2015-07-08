require("Framework/Core/Bot.js");
require("Framework/Core/Channel.js");
require("Framework/Core/Databases.js");
require("Framework/Core/Log.js");
require("Framework/Core/Users.js");
require("Rollenspiele/Rollenspiele.js");

var App = (new function () {

    this.chatCommands = {
        app: function (user, param, command) {
            RPG.commands.app(user);
        },
        juschu: function (user, param, command) {
            RPG.commands.juschu(user, param);
        },
        mods: function (user, param, command) {
            RPG.commands.mods(user, param);
        },
        player: function (user, param, command) {
            RPG.commands.player(user, param);
        },
        canplay: function(user, param, command) {
            RPG.commands.canplay(user, param);
        },
        iplay: function (user, param, command) {
            RPG.commands.iplay(user);
        },
        rpg: function (user, param, command) {
            RPG.commands.rpg(user, param)
        },
        srpg: function (user, param, command) {
            RPG.commands.srpg(user, param)
        },
        restart: function (user, param, command) {
            RPG.commands.restart(user);
        },
        say: function (user, param, command) {
            RPG.commands.say(user, param);
        },
        klammern: function (user, param, command) {
            RPG.commands.klammern(user, param);
        },
        chans: function (user, param, command) {
            RPG.commands.chans(user);
        },
        resetDB: function (user, param, command) {
            RPG.commands.resetDB(user);
        },
        clock: function (user, param, command) {
            RPG.commands.clock(user, param);
        },
        tjeri: function (user, param, command) {
            RPG.commands.tjeri(user, param, command);
        },
        func: function (user, param, command) {
            RPG.commands.func(user, param);
        }
    };

    this.onAppStart = function () {
        RPG.onAppStart();
    };

    this.onShutdown = function () {
        RPG.onShutdown();
    };

    this.onUserJoined = function (user) {
        RPG.onUserJoined(user);
    };

    this.onUserLeft = function (user) {
        RPG.onUserLeft(user);
    };

    this.onKnuddelReceived = function (sender, receiver, knuddelAmount, transferReason) {
        RPG.onKnuddelReceived(sender, receiver, knuddelAmount, transferReason);
    };

    this.onPublicMessage = function (publicMessage) {
        RPG.onPublicMessage(publicMessage.getAuthor(), publicMessage.getText());
    };

    this.onPrivateMessage = function (privateMessage) {
        RPG.onPrivateMessage(privateMessage);
    };
}());