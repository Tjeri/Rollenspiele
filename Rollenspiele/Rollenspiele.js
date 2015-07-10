require("Rollenspiele/ChannelCover.js");
require("Rollenspiele/HtmlBox.js");
require("Rollenspiele/RPGMode.js");
require("Rollenspiele/RPGMods.js");
require("Rollenspiele/RPG.js");
require("Rollenspiele/Settings.js");
require("Rollenspiele/Strings.js");
require("Rollenspiele/StringKeys.js");

var RS = (new function () {
    this.name = Channel.getName();

    var init = false;

    this.onAppStart = function () {
        initialize();
    };

    this.onShutdown = function () {
        RS.sendPub("Ein kurzer Neustart, ich bin gleich wieder da :)");
        ChannelCover.remove();
        RPGS.onShutdown();
    };

    this.commands = {
        accept: function (_user, _params) {
            var params = _params.split(":");
            if (params[0] != "" && params[1] && params[1] != "") {
                RPGS.acceptPlayer(_user, params[0], params[1]);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /accept ID:NICK");
            }
        },
        addMod: function (_user, _mod) {
            if (_mod != "") {
                Mods.addMod(_user, _mod);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /addMod NICK");
            }
        },
        addPlayer: function (_user, _params) {
            var params = _params.split(":");
            if (params[0] != "" && params[1] && params[1] != "") {
                RPGS.addPlayer(_user, params[0], params[1]);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /addPlayer ID:NICK");
            }
        },
        app: function (_user) {
            if (RS.isAllowed(_user)) {
                _user.sendPrivateMessage(STRINGS.help(true));
            } else if (Mods.isMod(_user)) {
                _user.sendPrivateMessage(STRINGS.help(false));
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        decline: function (_user, _params) {
            var params = _params.split(":");
            if (params[0] != "" && params[1] && params[1] != "") {
                RPGS.declinePlayer(_user, params[0], params[1]);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /decline ID:NICK");
            }
        },
        changeHost: function (_user, _params) {
            var params = _params.split(":");
            if (params[0] != "" && params[1] && params[1] != "") {
                RPGS.changeHost(_user, params[0], params[1]);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /changeHost ID:NICK");
            }
        },
        chans: function (_user) {
            if (RS.isAllowed(_user)) {
                ChannelCover.showList(_user);
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        eval: function (_user, _code) {
            if (_user.isAppDeveloper()) {
                eval(_code);
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        join: function (_user, _id) {
            if (_id != "") {
                RPGS.joinRPG(_user, _id);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /join ID");
            }
        },
        juschu: function (_user, _nick) {
            if (RS.isAllowed(_user)) {
                var user = Users.get(_nick);
                if (user) {
                    RPGS.sendPub(STRINGS.juschu(user.getNick()));
                }
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        klammern: function (_user, _nick) {
            if (RS.isAllowed(_user)) {
                var user = Users.get(_nick);
                if (user) {
                    RS.sendPub(STRINGS.klammern(user.getNick()));
                }
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        leave: function (_user, _id) {
            if (_id != "") {
                RPGS.leaveRPG(_user, _id);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /leave ID");
            }
        },
        removeMod: function (_user, _mod) {
            if (_mod != "") {
                Mods.removeMod(_user, _mod);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /removeMod NICK");
            }
        },
        removePlayer: function (_user, _params) {
            var params = _params.split(":");
            if (params[0] != "" && params[1] && params[1] != "") {
                RPGS.removePlayer(_user, params[0], params[1]);
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /removePlayer ID:NICK");
            }
        },
        removeWindow: function (_user, _nick) {
            if (RS.isAllowed(_user)) {
                var user = Users.get(_user, _nick);
                if (user) {
                    HtmlBox.removeContent(user);
                    _user.sendPrivateMessage("Fenster bei " + user.getNick() + " entfernt.");
                }
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        restart: function (_user) {
            if (_user.isAppDeveloper()) {
                _user.sendPrivateMessage(STRINGS.APP_RESTART);
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        rpg: function (_user, _param) {
            var params = _param.split(":");
            var param = params[0];
            if (param == "on") {
                RPGS.startRPGMode(params[1] && params[1] == "silent");
            } else if (param == "off") {
                RPGS.endRPGMode(params[1] && params[1] == "silent");
            } else if (param == "create") {
                if (params[1] && params[1] != "") {
                    RPGS.createRPG(_user, params[1]);
                } else {
                    _user.sendPrivateMessage("Nutze die Funktion bitte so: /rpg create:NICK");
                }
            } else if (param == "remove") {
                if (params[1] && params[1] != "") {
                    RPGS.removeRPG(_user, params[1]);
                } else {
                    _user.sendPrivateMessage("Nutze die Funktion bitte so: /rpg remove:ID");
                }
            } else {
                RPGS.showRPGList(_user);
            }
        },
        say: function (_user, _msg) {
            if (_user.isAppDeveloper()) {
                RS.sendPub(_msg);
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        setName: function (_user, _params) {
            var params = _params.split(":");
            if (params[0] != "" && params[1] && params[1] != "") {
                RPGS.setName(_user, params[0], params[1])
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /setName ID:NAME");
            }
        },
        setTheme: function (_user, _params) {
            var params = _params.split(":");
            if (params[0] != "" && params[1] && params[1] != "") {
                RPGS.setTheme(_user, params[0], params[1])
            } else {
                _user.sendPrivateMessage("Nutze die Funktion bitte so: /setTheme ID:THEME");
            }
        },
        showMods: function (_user) {
            Mods.showMods(_user);
        },
        welcome: function (_user, _param) {
            if (_user.isAppDeveloper()) {
                if (_param == "") {
                    var out = "Folgende Leute haben gerade eine eigene Begrüßung: ";
                    var count = 0;
                    DB.getObj(Keys.WELCOME_LIST, []).forEach(function (nick) {
                        if (count > 0) {
                            out += ", "
                        }
                        out += nick;
                        count++;
                    });
                    if (count == 0) {
                        out += "Keine";
                    }
                    _user.sendPrivateMessage(out);
                } else if (_param.charAt(0) == "!") {
                    var user = Users.get(_user, _param.substr(1));
                    if (user) {
                        var nick = user.getNick();
                        var key = Keys.WELCOME + nick;
                        if (DB.hasStr(key)) {
                            DB.delStr(key);
                            var users = DB.getObj(Keys.WELCOME_LIST, []);
                            var index = users.indexOf(nick);
                            users.splice(index, 1);
                            DB.saveObj(Keys.WELCOME_LIST, users);
                            _user.sendPrivateMessage(nick + " hat nun keine eigene Begrüßung mehr.");
                        } else {
                            _user.sendPrivateMessage("Keine Begrüßung für " + nick + " registriert.");
                        }
                    }
                } else if (_param.charAt(0) == "?") {
                    var user = Users.get(_user, _param.substr(1));
                    if (user) {
                        var nick = user.getNick();
                        var str = DB.getStr(Keys.WELCOME + nick, "");

                        if (str == "") {
                            _user.sendPrivateMessage(nick + " hat keine Begrüßungsnachricht.");
                        } else {
                            _user.sendPrivateMessage(nick + " hat folgende Nachricht zur Begrüßung: °#°" + str);
                        }
                    }
                } else {
                    var params = _param.split(":");
                    var user = Users.get(_user, params[0]);
                    if (user) {
                        var nick = user.getNick();
                        var key = Keys.WELCOME + nick;
                        if (!DB.hasStr(key)) {
                            var users = DB.getObj(Keys.WELCOME_LIST, []);
                            users.push(nick);
                            users.sort();
                            DB.saveObj(Keys.WELCOME_LIST, users);
                        }
                        DB.saveStr(key, params[1]);
                        _user.sendPrivateMessage(nick + " wird ab nun mit folgendem Text begrüßt: °#°" + params[1]);
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        }
    };

    this.onPrivateMessage = function (pm) {
        pm.getAuthor().sendPrivateMessage(STRINGS.pm(pm));
    };

    this.onPublicMessage = function (user, msg) {
        RPGS.onPublicMessage(user, msg);
    };

    this.onKnuddelReceived = function (sender, receiver, knuddelAmount, transferReason) {
        sender.sendPostMessage("", STRINGS.KNUDDEL_THANKS);
        KnuddelsServer.getAppDeveloper().sendPostMessage("", STRINGS.knuddelDonation(RS.name, sender, knuddelAmount, transferReason));
    };

    this.onUserJoined = function (user) {
        RPGS.userJoined(user);
        ChannelCover.userJoined(user);
        welcome(user);
    };

    this.onUserLeft = function (user) {
        ChannelCover.userLeft(user);
        RPGS.userLeft(user);
    };

    this.isAllowed = function (user) {
        return Settings.DEBUG || user.isAppDeveloper() || user.isChannelOwner() || user.isChannelModerator();
    };

    this.sendPub = function (msg) {
        if (RPGS.rpgModeActive()) {
            msg = "< " + msg + " >";
        }
        Bot.pub(msg);
    };

    function initialize() {
        if (!init) {
            init = true;
            if (RS.name.indexOf(Settings.DEBUG_CHAN) > -1) {
                Settings.DEBUG = true;
            }
            ChannelCover.initialize();
        }
    }

    function welcome(user) {
        var str = DB.getStr(Keys.WELCOME + user.getNick(), "");
        if (str != "") {
            user.sendPrivateMessage(str);
        }
    }
}());