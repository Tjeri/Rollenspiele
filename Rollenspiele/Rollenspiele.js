require("Rollenspiele/ChannelCover.js");
require("Rollenspiele/Commands.js");
require("Rollenspiele/Config.js");
require("Rollenspiele/HtmlBox.js");
require("Rollenspiele/Players.js");
require("Rollenspiele/RPG.js");
require("Rollenspiele/RPGMode.js");
require("Rollenspiele/RPGMods.js");
require("Rollenspiele/RPGS.js");
require("Rollenspiele/StringKeys.js");
require("Rollenspiele/Strings.js");
require("Rollenspiele/Welcome.js");

var RS = (new function () {
    // Commands

    this.commands = {
        acceptPlayer: function (_user, _params) {
            Commands.acceptPlayer(_user, _params);
        },
        addMod: function (_user, _mod) {
            Commands.addMod(_user, _mod);
        },
        addPlayer: function (_user, _params) {
            Commands.addPlayer(_user, _params);
        },
        app: function (_user) {
            Commands.showAppCommands(_user);
        },
        changeHost: function (_user, _params) {
            Commands.changeRPGHost(_user, _params);
        },
        chans: function (_user) {
            Commands.channelCover(_user);
        },
        closeForJoin: function (_user, _id) {
            Commands.closeRPGForJoin(_user, _id);
        },
        config: function (_user, _params) {
            Commands.config(_user, _params);
        },
        create: function (_user, _nick) {
            Commands.createRPG(_user, _nick);
        },
        declinePlayer: function (_user, _params) {
            Commands.declinePlayer(_user, _params);
        },
        delete: function (_user, _id) {
            Commands.deleteRPG(_user, _id);
        },
        editRPG: function (_user, _id) {
            Commands.editRPG(_user, _id);
        },
        end: function (_user, _id) {
            Commands.endRPG(_user, _id);
        },
        eval: function (_user, _code) {
            Commands.evaluateCode(_user, _code);
        },
        join: function (_user, _id) {
            Commands.joinRPG(_user, _id);
        },
        juschu: function (_user, _nick) {
            Commands.sendYouthProtectionHint(_user, _nick);
        },
        klammern: function (_user, _nick) {
            Commands.sendBracketHint(_user, _nick);
        },
        leave: function (_user, _id) {
            Commands.leaveRPG(_user, _id);
        },
        openForJoin: function (_user, _id) {
            Commands.openRPGForJoin(_user, _id);
        },
        removeMod: function (_user, _mod) {
            Commands.removeMod(_user, _mod);
        },
        removePlayer: function (_user, _params) {
            Commands.removePlayer(_user, _params);
        },
        removeWindow: function (_user, _nick) {
            Commands.removeHtmlBox(_user, _nick);
        },
        restart: function (_user) {
            Commands.restartApp(_user);
        },
        revision: function (_user) {
            Commands.showAppServerRevision(_user);
        },
        rpgList: function (_user, _param) {
            Commands.showRPGList(_user, _param);
        },
        sendNewsletter: function (_user, _msg) {
            Commands.sendNewsletter(_user, _msg);
        },
        say: function (_user, _msg) {
            Commands.say(_user, _msg);
        },
        setDesc: function (_user, _params) {
            Commands.setRPGDescription(_user, _params);
        },
        setDescription: function (_user, _params) {
            Commands.setRPGDescription(_user, _params);
        },
        setName: function (_user, _params) {
            Commands.setRPGName(_user, _params);
        },
        setTheme: function (_user, _params) {
            Commands.setRPGTheme(_user, _params);
        },
        showMods: function (_user) {
            Commands.showMods(_user);
        },
        showRPG: function (_user, _id) {
            Commands.showRPG(_user, _id)
        },
        start: function (_user, _id) {
            Commands.startRPG(_user, _id);
        },
        topChannel: function (_user) {
            Commands.topChannel(_user);
        },
        topPlayer: function (_user) {
            Commands.topPlayer(_user);
        },
        welcome: function (_user, _param) {
            Commands.welcome(_user, _param);
        },
        update: function (_user) {
            Commands.update(_user);
        }
    };

    // Events

    this.onAppEventReceived = function (appInstance, type, data) {
        //if (type == Keys.INITIALIZE) {
        //    if (Config.moduleChannelCover()) {
        //        ChannelCover.initialize();
        //    }
        //} else if (type == Keys.SHUTDOWN) {
        //    if (Config.moduleChannelCover()) {
        //        ChannelCover.onShutdown();
        //    }
        //}
    };

    this.onAppStart = function () {
        RPGMode.onAppStart();
        //var oi = KnuddelsServer.getAppAccess().getOwnInstance();
        //Log.dev("Start in " + Channel.getName() + " - " + oi.isRootInstance());
        //if (oi.isRootInstance()) {
        //    Log.dev("Root!");
        //    var instances = oi.getAllInstances();
        //    Log.d(instances);
        //    instances.forEach(function (instance) {
        //        Log.dev("Instance: " + instance.getAppInfo().getAppUid());
        //        instance.sendAppEvent(Keys.INITIALIZE, null);
        //    });
        //}
    };

    this.onKnuddelReceived = function (_sender, _receiver, _knuddelAmount, _transferReason) {
        _sender.sendPostMessage("", STRINGS.knuddel_thanks);
        KnuddelsServer.getAppDeveloper().sendPostMessage("", STRINGS.knuddel_donation(Channel.getName(), _sender, _knuddelAmount, _transferReason));
    };

    this.onPrivateMessage = function (_pm) {
        _pm.getAuthor().sendPrivateMessage(STRINGS.private_answer(_pm));
    };

    this.onPublicMessage = function (_user, _msg) {
        if (Config.moduleRPGMode()) {
            RPGMode.onPublicMessage(_user, _msg);
        }
    };

    this.onShutdown = function () {
        //Log.dev("End in " + Channel.getName());
        //var oi = KnuddelsServer.getAppAccess().getOwnInstance();
        //if (oi.isRootInstance()) {
        //    var instances = oi.getAllInstances();
        //    instances.forEach(function (instance) {
        //        instance.sendAppEvent(Keys.SHUTDOWN, null);
        //    });
        //}
    };

    this.onUserJoined = function (_user) {
        if (Config.moduleRPGMode()) {
            RPGMode.userJoined(_user);
        }
        if (Config.moduleChannelCover()) {
            ChannelCover.userJoined(_user);
        }
        Welcome.welcome(_user);
    };

    this.onUserLeft = function (_user) {
        if (Config.moduleRPGMode()) {
            RPGMode.userLeft(_user);
        }
        if (Config.moduleChannelCover()) {
            ChannelCover.userLeft(_user)
        }
    };

    // Methods

    this.sendPub = function (_msg) {
        if (Config.moduleRPGMode() && RPGMode.rpgModeActive()) {
            _msg = "< " + _msg + " >";
        }
        Bot.pub(_msg);
    };
}());