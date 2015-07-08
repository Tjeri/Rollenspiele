require("Rollenspiele/ChannelCover.js");
require("Rollenspiele/Settings.js");
require("Rollenspiele/Strings.js");
require("Rollenspiele/StringKeys.js");

RPG = (new function () {
    var init = false;

    var rpgMode = false;
    var currentPlayers = [];

    var mods = {};

    var file = new HTMLFile('display.html');
    var content = AppContent.overlayContent(file, 200, 100);

    var name = Channel.getName();

    this.onAppStart = function () {
        initialize();
    };

    this.onShutdown = function () {
        ChannelCover.remove();
    };

    this.commands = {
        app: function (user) {
            if (isAllowed(user)) {
                user.sendPrivateMessage(STRINGS.help(true));
            } else if (isMod(user)) {
                user.sendPrivateMessage(STRINGS.help(false));
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        juschu: function (user, nick) {
            if (isAllowed(user)) {
                sendPub(STRINGS.juschu(nick));
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        mods: function (_user, _nick) {
            if (isAllowed(_user)) {
                if (Settings.MODS) {
                    if (_nick == "") {
                        var str = "";

                        for (var nick in mods) {
                            if (mods.hasOwnProperty(nick) && mods[nick]) {
                                if (str != "") {
                                    str += ", "
                                }
                                str += nick;
                            }
                        }

                        _user.sendPrivateMessage(STRINGS.currentMods(str));
                    } else {
                        var remove = _nick.charAt(0) == "!";
                        var change = false;
                        if (remove) {
                            _nick = _nick.substr(1);
                        }
                        var user = Users.getUser(_user, _nick);
                        if (user) {
                            var nick = user.getNick();
                            if (remove && mods[nick]) {
                                mods[nick] = false;
                                change = true;
                                DB.saveObj(Keys.MODERATORS, mods);
                            } else if (!mods[nick]) {
                                mods[nick] = true;
                                change = true;
                                DB.saveObj(Keys.MODERATORS, mods);
                            }
                            _user.sendPrivateMessage(STRINGS.rpgModChange(nick, remove, change));
                        }
                    }
                } else {
                    _user.sendPrivateMessage(STRINGS.NOT_AVAILABLE);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        player: function (_user, _nick) {
            _nick.trim();
            if (isAllowed(_user) || isMod(_user)) {
                if (_nick == "") {
                    if (currentPlayers.length == 0) {
                        _user.sendPrivateMessage(STRINGS.NO_PLAYERS);
                    } else {
                        var players = "";
                        for (var i = 0; i < currentPlayers.length; ++i) {
                            if (i != 0) {
                                players += ", ";
                            }
                            players += currentPlayers[i];
                        }
                        _user.sendPrivateMessage(STRINGS.activePlayers(players));
                    }
                } else {
                    var remove = _nick.charAt(0) == "!";
                    if (remove) {
                        _nick = _nick.substr(1);
                    }
                    var user = Users.getUser(_user, _nick);
                    if (user) {
                        var nick = user.getNick();
                        var index = currentPlayers.indexOf(nick);
                        var onList = index > -1;
                        if (remove && onList) {
                            currentPlayers.splice(index, 1);
                            user.sendPrivateMessage(STRINGS.removedAsPlayer(_user.getNick()));
                        } else if (!remove && !onList) {
                            currentPlayers.push(nick);
                            user.sendPrivateMessage(STRINGS.I_PLAY);
                        }
                        _user.sendPrivateMessage(STRINGS.activePlayerChange(nick, remove, onList));
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        players: function (user, _nicks) {
            if (isDev(user)) {
                var nicks = _nicks.split(",");
                nicks.forEach(function (nick) {
                    currentPlayers.push(nick);
                });
                user.sendPrivateMessage("Done");
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        canplay: function (_user, _nick) {
            if (currentPlayers.indexOf(_user.getNick()) > -1) {
                var user = Users.getUser(_user, _nick);
                if (user) {
                    var nick = user.getNick();
                    if (currentPlayers.indexOf(nick) == -1) {
                        sendPlayers(STRINGS.activePlayerChange(nick, false, false));
                        currentPlayers.push(nick);
                        user.sendPrivateMessage(STRINGS.I_PLAY);
                    } else {
                        _user.sendPrivateMessage(STRINGS.activePlayerChange(nick, false, true));
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        iplay: function (_user) {
            var nick = _user.getNick();
            if (currentPlayers.indexOf(nick == -1)) {
                if (currentPlayers.length == 0) {
                    currentPlayers.push(nick);
                    _user.sendPrivateMessage(STRINGS.I_PLAY);
                } else {
                    sendPlayers(STRINGS.canPlay(nick));
                    _user.sendPrivateMessage(STRINGS.I_ASK_PLAY);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.I_ALREADY_PLAY);
            }
        },
        srpg: function (user, param) {
            if (isAllowed(user)) {
                if (param == "on" && !rpgMode) {
                    rpgMode = true;
                    sendContent();
                } else if (rpgMode && param == "off") {
                    rpgMode = false;
                    removeContent();
                    currentPlayers = [];
                }

                if (rpgMode) {
                    user.sendPrivateMessage(STRINGS.RPG_ON);
                } else {
                    user.sendPrivateMessage(STRINGS.RPG_OFF);
                }
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        rpg: function (user, param) {
            if (isAllowed(user) || isMod(user)) {
                if (param == "on" && !rpgMode) {
                    rpgMode = true;
                    sendContent();
                    sendPub(STRINGS.SWITCH_RPG_ON);
                } else if (rpgMode && param == "off") {
                    rpgOff();
                    currentPlayers = [];
                } else {
                    if (rpgMode) {
                        user.sendPrivateMessage(STRINGS.RPG_ON);
                    } else {
                        user.sendPrivateMessage(STRINGS.RPG_OFF);
                    }
                }
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        removeWindow: function (_user, nick) {
            if (isAllowed(_user)) {
                var user = Users.getUser(_user, nick);
                if (user) {
                    user.removeAppContent();
                    _user.sendPrivateMessage("Fenster bei " + nick + " entfernt.");
                }
            } else {
                _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        restart: function (user) {
            if (isDev(user)) {
                user.sendPrivateMessage(STRINGS.APP_RESTART);
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        say: function (user, param) {
            if (isDev(user)) {
                sendPub(param);
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        klammern: function (user, param) {
            if (isAllowed(user)) {
                sendPub(STRINGS.klammern(param));
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        chans: function (user) {
            if (isAllowed(user)) {
                ChannelCover.showList(user);
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        resetDB: function (user) {
            if (isDev(user)) {
                DB.saveObj(Keys.CHANNELS, []);
                DB.saveObj(name, []);
                for (var i = 2; i < 10; ++i) {
                    DB.saveObj(name + " " + i, []);
                }
                user.sendPrivateMessage(STRINGS.DB_DELETED);
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        clock: function (user, param) {
            if (isDev(user)) {
                user.sendPrivateMessage(STRINGS.clReason(param));
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        tjeri: function (user, param, command) {
            if (isDev(user)) {
                //Log.d(Channel.getCMs());
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        },
        func: function (user, param) {
            if (isDev(user)) {
                eval(param);
            } else {
                user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
            }
        }
    };

    this.onPrivateMessage = function (pm) {
        pm.getAuthor().sendPrivateMessage(STRINGS.pm(pm));
    };

    this.onPublicMessage = function (user, msg) {
        if (rpgMode && currentPlayers.indexOf(user.getNick()) == -1) {
            msg = msg.trim();
            var start = isValidBracket(msg.charAt(0));
            var end = isValidBracket(msg.charAt(msg.length - 1));

            if (!start || !end) {
                if ((start || end) && msg.length == 1) {
                    return;
                }
                user.sendPrivateMessage(STRINGS.askRPG(start, end));
            }
        }
    };

    this.onKnuddelReceived = function (sender, receiver, knuddelAmount, transferReason) {
        sender.sendPostMessage("", STRINGS.KNUDDEL_THANKS);
        KnuddelsServer.getAppDeveloper().sendPostMessage("", STRINGS.knuddelDonation(name, sender, knuddelAmount, transferReason));
    };

    this.onUserJoined = function (user) {
        if (rpgMode) {
            Bot.prv(user, STRINGS.RPG_PRV);
            if (Settings.HTML) {
                if (user.canSendAppContent(content)) {
                    user.sendAppContent(content);
                }
            }
        }
        ChannelCover.userJoined(user);
        welcome(user);
    };

    this.onUserLeft = function (user) {
        ChannelCover.userLeft(user);
        if (rpgMode) {
            if (currentPlayers.indexOf(user.getNick() > -1)) {
                setTimeout(function () {
                    if (!user.isOnlineInChannel()) {
                        var index = currentPlayers.indexOf(user.getNick());
                        if (index > -1) {
                            currentPlayers.splice(index, 1);
                            if (currentPlayers.length == 0) {
                                rpgOff();
                            }
                        }
                    }
                }, Settings.TIMEOUT);
            }
        }
    };

    function initialize() {
        if (!init) {
            init = true;
            if (name.indexOf(Settings.DEBUG_CHAN) > -1) {
                Settings.DEBUG = true;
                Settings.CHANS = true;
            }
            ChannelCover.initialize();
            if (Settings.MODS) {
                mods = DB.getObj(Keys.MODERATORS, {});
            }
        }
    }

    function isAllowed(user) {
        return Settings.DEBUG || isCM(user) || isHZM(user) || isDev(user);
    }

    function isCM(user) {
        return user.isChannelModerator();
    }

    function isDev(user) {
        return user.isAppDeveloper();
    }

    function isHZM(user) {
        return user.isChannelOwner();
    }

    function isMod(user) {
        return mods[user.getNick()];
    }

    function isValidBracket(c) {
        return Settings.BRACKETS.indexOf(c) > -1;
    }

    function removeContent() {
        var users = Channel.getUsers(UserType.Human);
        users.forEach(function (user) {
            user.removeAppContent();
        });
    }

    function rpgOff() {
        rpgMode = false;
        removeContent();
        sendPub(STRINGS.SWITCH_RPG_OFF);
    }

    function sendContent() {
        if (Settings.HTML) {
            var users = Channel.getUsers(UserType.Human);
            users.forEach(function (user) {
                if (user.canSendAppContent(content)) {
                    user.sendAppContent(content);
                }
            });
        }
    }

    function sendPlayers(msg) {
        currentPlayers.forEach(function (_nick) {
            var user = Users.getUser(KnuddelsServer.getAppDeveloper(), _nick);
            user.sendPrivateMessage(msg);
        });
    }

    function sendPub(msg) {
        if (rpgMode) {
            msg = "< " + msg + " >";
        }
        Bot.pub(msg);
    }

    function welcome(user) {
        var str = STRINGS.welcome(user.getNick());
        if (str) {
            user.sendPrivateMessage(str);
        }
    }
}());