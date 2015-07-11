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
        ChannelCover.remove();
        RPGS.onShutdown();
    };

    this.commands = {
        accept: function (_user, _params) {
            var params = _params.split(":");
            var id = params[0];
            var nick = params[1];
            if (id != "" && nick && nick != "") {
                RPGS.acceptPlayer(_user, id, nick);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/accept ID:NICK"));
            }
        },
        addMod: function (_user, _mod) {
            if (_mod != "") {
                Mods.addMod(_user, _mod);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/addMod NICK"));
            }
        },
        addPlayer: function (_user, _params) {
            var params = _params.split(":");
            var id = params[0];
            var nick = params[1];
            if (!nick) {
                id = undefined;
                nick = params[0];
            }
            if (nick != "") {
                RPGS.addPlayer(_user, id, nick);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/addPlayer [ID:]NICK"));
            }
        },
        app: function (_user) {
            if (RS.isAllowed(_user)) {
                _user.sendPrivateMessage(STRINGS.help(true));
            } else if (Mods.isMod(_user)) {
                _user.sendPrivateMessage(STRINGS.help(false));
            } else {
                notAllowed();
            }
        },
        changeHost: function (_user, _params) {
            var params = _params.split(":");
            var id = params[0];
            var nick = params[1];
            if (!nick) {
                id = undefined;
                nick = params[0];
            }
            if (nick != "") {
                RPGS.changeHost(_user, id, nick);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/changeHost [ID:]NICK"));
            }
        },
        chans: function (_user) {
            if (RS.isAllowed(_user)) {
                ChannelCover.showList(_user);
            } else {
                notAllowed();
            }
        },
        createRPG: function (_user, _nick) {
            if (_nick != "") {
                RPGS.createRPG(_user, _nick);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/createRPG NICK"));
            }
        },
        decline: function (_user, _params) {
            var params = _params.split(":");
            var id = params[0];
            var nick = params[1];
            if (id != "" && nick && nick != "") {
                RPGS.declinePlayer(_user, id, nick);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/decline ID:NICK"));
            }
        },
        eval: function (_user, _code) {
            if (_user.isAppDeveloper()) {
                eval(_code);
            } else {
                notAllowed();
            }
        },
        join: function (_user, _id) {
            if (_id != "") {
                RPGS.joinRPG(_user, _id);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/join ID"));
            }
        },
        juschu: function (_user, _nick) {
            if (RS.isAllowed(_user)) {
                var user = Users.get(_user, _nick);
                if (user) {
                    RPGS.sendPub(STRINGS.command_juschu(user));
                }
            } else {
                notAllowed();
            }
        },
        klammern: function (_user, _nick) {
            if (RS.isAllowed(_user)) {
                var user = Users.get(_user, _nick);
                if (user) {
                    RS.sendPub(STRINGS.command_brackets(user));
                }
            } else {
                notAllowed();
            }
        },
        leave: function (_user, _id) {
            if (_id != "") {
                RPGS.leaveRPG(_user, _id);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/leave ID"));
            }
        },
        mod: function (_user, _params) {
            if (RS.isAllowed(_user)) {
                if (_params.charAt(0) == "!") {
                    var nicks = _params.split(",");
                    nicks.forEach(function (nick) {
                        Mods.removeMod(_user, nick.trim());
                    });
                } else {
                    var nicks = _params.split(",");
                    nicks.forEach(function (nick) {
                        Mods.addMod(_user, nick.trim());
                    });
                }
            } else {
                notAllowed();
            }
        },
        player: function (_user, _params) {
            if (RS.isAllowed(_user)) {
                if (_params.charAt(0) == "!") {
                    var nicks = _params.split(",");
                    nicks.forEach(function (nick) {
                        RPGS.removePlayer(_user, undefined, nick.trim());
                    });
                } else {
                    var params = _params.split(":");
                    var id = params[0];
                    var nicks = params[1].split(",");
                    nicks.forEach(function (nick) {
                        RPGS.addPlayer(_user, id, nick.trim());
                    });
                }
            } else {
                notAllowed();
            }
        },
        removeMod: function (_user, _mod) {
            if (_mod != "") {
                Mods.removeMod(_user, _mod);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/removeMod NICK"));
            }
        },
        removePlayer: function (_user, _params) {
            var params = _params.split(":");
            var id = params[0];
            var nick = params[1];
            if (!nick) {
                id = undefined;
                nick = params[0];
            }
            if (nick != "") {
                RPGS.removePlayer(_user, id, nick);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/removePlayer [ID:]NICK"));
            }
        },
        removeRPG: function (_user, _id) {
            RPGS.removeRPG(_user, _id);
        },
        removeWindow: function (_user, _nick) {
            if (RS.isAllowed(_user)) {
                var user = Users.get(_user, _nick);
                if (user) {
                    HtmlBox.removeContent(user);
                    _user.sendPrivateMessage(STRINGS.html_removed(user));
                }
            } else {
                notAllowed();
            }
        },
        restart: function (_user) {
            if (_user.isAppDeveloper()) {
                _user.sendPrivateMessage(STRINGS.app_restart);
            } else {
                notAllowed();
            }
        },
        rpg: function (_user, _params) {
            if (RS.isAllowed(_user)) {
                _params = _params.toLowerCase();
                var params = _params.split(":");
                var cmd = params[0];
                if (cmd == "on") {
                    var silent = params[1] && params[1] == "silent";
                    RPGS.startRPGMode(silent)
                } else if (cmd == "off") {
                    var silent = params[1] && params[1] == "silent";
                    RPGS.endRPGMode(silent);
                } else if (cmd.charAt(0) == "!") {
                    RPGS.removeRPG(_user, cmd.substr(1));
                } else if (cmd == "name") {
                    var id = params[1];
                    var name = params[2];
                    if (id && id != "" && name && name != "") {
                        RPGS.setName(_user, id, name);
                    } else {
                        _user.sendPrivateMessage(STRINGS.command_usage("/rpg name:ID:NAME"));
                    }
                } else if (cmd == "theme") {
                    var id = params[1];
                    var theme = params[2];
                    if (id && id != "" && theme && theme != "") {
                        RPGS.setTheme(_user, id, theme);
                    } else {
                        _user.sendPrivateMessage(STRINGS.command_usage("/rpg theme:ID:NAME"));
                    }
                } else if (cmd == "desc") {
                    var id = params[1];
                    var desc = params[2];
                    if (id && id != "" && desc && desc != "") {
                        RPGS.setDesc(_user, id, desc);
                    } else {
                        _user.sendPrivateMessage(STRINGS.command_usage("/rpg desc:ID:NAME"));
                    }
                } else if (cmd == "mode") {
                    if (RPGS.rpgModeActive()) {
                        _user.sendPrivateMessage(STRINGS.rpgMode_on);
                    } else {
                        _user.sendPrivateMessage(STRINGS.rpgMode_off);
                    }
                } else if (cmd != "") {
                    RPGS.createRPG(_user, cmd);
                } else {
                    RPGS.showRPGList(_user);
                }
            } else {
                notAllowed();
            }
        },
        rpgList: function (_user) {
            RPGS.showRPGList(_user);
        },
        rpgMode: function (_user, _params) {
            if (RS.isAllowed(_user)) {
                _params = _params.toLowerCase();
                var params = _params.split(":");
                var cmd = params[0];
                var silent = params[1] && params[1] == "silent";
                if (cmd == "on") {
                    RPGS.startRPGMode(silent);
                } else if (cmd == "off") {
                    RPGS.endRPGMode(silent);
                } else {
                    if (RPGS.rpgModeActive()) {
                        _user.sendPrivateMessage(STRINGS.rpgMode_on);
                    } else {
                        _user.sendPrivateMessage(STRINGS.rpgMode_off);
                    }
                }
            } else {
                notAllowed();
            }
        },
        say: function (_user, _msg) {
            if (_user.isAppDeveloper()) {
                RS.sendPub(_msg);
            } else {
                notAllowed();
            }
        },
        setDesc: function (_user, _params) {
            var params = _params.split(":");
            var id = params[0];
            var desc = params[1];
            if (!desc) {
                id = undefined;
                desc = params[0];
            }
            if (desc != "") {
                RPGS.setDesc(_user, id, desc);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/setDesc [ID:]NAME"));
            }
        },
        setName: function (_user, _params) {
            var params = _params.split(":");
            var id = params[0];
            var name = params[1];
            if (!name) {
                id = undefined;
                name = params[0];
            }
            if (name != "") {
                RPGS.setName(_user, id, name);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/setName [ID:]NAME"));
            }
        },
        setTheme: function (_user, _params) {
            var params = _params.split(":");
            var id = params[0];
            var theme = params[1];
            if (!theme) {
                id = undefined;
                theme = params[0];
            }
            if (theme != "") {
                RPGS.setTheme(_user, id, theme)
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/setTheme [ID:]THEME"));
            }
        },
        showMods: function (_user) {
            Mods.showMods(_user);
        },
        showRPG: function (_user, _id) {
            if (_id != "") {
                RPGS.showRPG(_user, _id);
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/showRPG ID"));
            }
        },
        welcome: function (_user, _param) {
            if (_user.isAppDeveloper()) {
                if (_param == "") {
                    var nicks = "";
                    DB.getObj(Keys.WELCOME_LIST, []).forEach(function (nick) {
                        if (nicks != "") {
                            nicks += ", "
                        }
                        nicks += nick;
                    });
                    _user.sendPrivateMessage(STRINGS.welcome_list(nicks));
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
                            _user.sendPrivateMessage(STRINGS.welcome_removed(nick));
                        } else {
                            _user.sendPrivateMessage(STRINGS.welcome_notRegistered);
                        }
                    }
                } else if (_param.charAt(0) == "?") {
                    var user = Users.get(_user, _param.substr(1));
                    if (user) {
                        var nick = user.getNick();
                        var str = DB.getStr(Keys.WELCOME + nick, "");

                        if (str == "") {
                            _user.sendPrivateMessage(STRINGS.welcome_notRegistered(nick));
                        } else {
                            _user.sendPrivateMessage(STRINGS.welcome_message(nick, str));
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
                        var str = params[1].escapeKCode();
                        DB.saveStr(key, str);
                        _user.sendPrivateMessage(STRINGS.welcome_newMessage(nick, str));
                    }
                }
            } else {
                notAllowed();
            }
        }
    };

    this.onPrivateMessage = function (pm) {
        pm.getAuthor().sendPrivateMessage(STRINGS.private_answer(pm));
    };

    this.onPublicMessage = function (user, msg) {
        RPGS.onPublicMessage(user, msg);
    };

    this.onKnuddelReceived = function (sender, receiver, knuddelAmount, transferReason) {
        sender.sendPostMessage("", STRINGS.knuddel_thanks);
        KnuddelsServer.getAppDeveloper().sendPostMessage("", STRINGS.knuddel_donation(RS.name, sender, knuddelAmount, transferReason));
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

    function notAllowed(_user) {
        _user.sendPrivateMessage(STRINGS.command_notAllowed);
    }

    function welcome(user) {
        var str = DB.getStr(Keys.WELCOME + user.getNick(), "");
        if (str != "") {
            user.sendPrivateMessage(str);
        }
    }
}());