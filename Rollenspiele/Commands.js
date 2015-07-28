var Commands = (new function () {

    // RPG Funktionen

    this.acceptPlayer = function (_user, _params) {
        var params = _params.split(":");
        var id = params[0];
        var nick = params[1];
        if (id != "" && nick && nick != "") {
            var rpg = RPGS.getRPG(id);
            if (rpg) {
                var player = Users.getByNick(_user, nick);
                if (player) {
                    if (RPG.isAllowed(rpg, _user)) {
                        RPG.acceptPlayer(rpg, _user, player);
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/acceptPlayer ID:NICK"));
        }
    };

    this.addPlayer = function (_user, _params) {
        var params = _params.split(":");
        var id = params[0];
        var nick = params[1];
        if (id != "" && nick && nick != "") {
            var rpg = RPGS.getRPG(id);
            if (rpg) {
                var player = Users.getByNick(_user, nick);
                if (player) {
                    if (RPG.isAllowed(rpg, _user)) {
                        RPG.addPlayer(rpg, _user, player);
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/addPlayer ID:NICK"));
        }
    };

    this.changeRPGHost = function (_user, _params) {
        var params = _params.split(":");
        var id = params[0];
        var nick = params[1];
        if (id != "" && nick && nick != "") {
            var rpg = RPGS.getRPG(id);
            if (rpg) {
                var player = Users.getByNick(_user, nick);
                if (player) {
                    if (RPG.isAllowed(rpg, _user, true) || isAllowed(_user)) {
                        RPG.changeHost(rpg, _user, player);
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/changeHost ID:NICK"));
        }
    };

    this.closeRPGForJoin = function (_user, _id) {
        if (_id != "") {
            var rpg = RPGS.getRPG(_id);
            if (rpg) {
                if (RPG.isAllowed(rpg, _user)) {
                    rpg.open = false;
                    RPG.save(rpg);
                    _user.sendPrivateMessage("Der Beitritt zum RPG ist nun nicht mehr möglich.");
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/closeForJoin ID"));
        }
    };

    this.createRPG = function (_user, _nick) {
        if (Mods.isMod(_user) || isAllowed(_user)) {
            if (_nick != "") {
                var host = Users.getByNick(_user, _nick);
                if (host) {
                    var id = DB.addNum(Keys.RPG_COUNTER, 1);
                    RPG.create(_user, host, id);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/create NICK"));
            }
        }
    };

    this.declinePlayer = function (_user, _params) {
        var params = _params.split(":");
        var id = params[0];
        var nick = params[1];
        if (id != "" && nick && nick != "") {
            var rpg = RPGS.getRPG(id);
            if (rpg) {
                var player = Users.getByNick(_user, nick);
                if (player) {
                    if (RPG.isAllowed(rpg, _user)) {
                        RPG.declinePlayer(rpg, _user, player);
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/declinePlayer ID:NICK"));
        }
    };

    this.deleteRPG = function (_user, _id) {
        if (isAllowed(_user)) {
            if (_id != "") {
                var rpg = RPGS.getRPG(_id);
                if (rpg) {
                    RPG.delete(rpg, _user);
                } else {
                    _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
                }
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/remove ID"));
            }
        }
    };

    this.editRPG = function (_user, _id) {
        if (_id != "") {
            var rpg = RPGS.getRPG(_id);
            if (rpg) {
                if (RPG.isAllowed(rpg, _user)) {
                    RPG.edit(rpg, _user);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/editRPG ID"));
        }
    };

    this.endRPG = function (_user, _id) {
        if (_id != "") {
            var rpg = RPGS.getRPG(_id);
            if (rpg) {
                if (RPG.isAllowed(rpg, _user)) {
                    RPG.end(rpg, _user);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/endRPG ID"));
        }
    };

    this.joinRPG = function (_user, _id) {
        if (_id != "") {
            var rpg = RPGS.getRPG(_id);
            if (rpg) {
                RPG.join(rpg, _user);
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/join ID"));
        }
    };

    this.leaveRPG = function (_user, _id) {
        if (_id != "") {
            var rpg = RPGS.getRPG(_id);
            if (rpg) {
                RPG.leave(rpg, _user);
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/leave ID"));
        }
    };

    this.openRPGForJoin = function (_user, _id) {
        if (_id != "") {
            var rpg = RPGS.getRPG(_id);
            if (rpg) {
                if (RPG.isAllowed(rpg, _user)) {
                    rpg.open = true;
                    RPG.save(rpg);
                    _user.sendPrivateMessage("Der Beitritt zum RPG ist nun möglich.");
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/openForJoin ID"));
        }
    };

    this.removePlayer = function (_user, _params) {
        var params = _params.split(":");
        var id = params[0];
        var nick = params[1];
        if (id != "" && nick && nick != "") {
            var rpg = RPGS.getRPG(id);
            if (rpg) {
                var player = Users.getByNick(_user, nick);
                if (player) {
                    if (RPG.isAllowed(rpg, _user)) {
                        RPG.removePlayer(rpg, _user, player);
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/removePlayer ID:NICK"));
        }
    };

    this.setRPGDescription = function (_user, _params) {
        var index = _params.indexOf(":");
        if (index > -1) {
            var id = _params.substr(0, index).trim();
            var desc = _params.substr(index + 1).trim().replace("#", "°#°");
            var rpg = RPGS.getRPG(id);
            if (rpg) {
                if (RPG.isAllowed(rpg, _user)) {
                    RPG.setDesc(rpg, _user, desc);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/setDescription ID:BESCHREIBUNG"));
        }
    };

    this.setRPGName = function (_user, _params) {
        var index = _params.indexOf(":");
        if (index > -1) {
            var id = _params.substr(0, index).trim();
            var name = _params.substr(index + 1).trim();
            var rpg = RPGS.getRPG(id);
            if (rpg) {
                if (RPG.isAllowed(rpg, _user)) {
                    RPG.setName(rpg, _user, name);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/setName ID:NAME"));
        }
    };

    this.setRPGTheme = function (_user, _params) {
        var index = _params.indexOf(":");
        if (index > -1) {
            var id = _params.substr(0, index).trim();
            var theme = _params.substr(index + 1).trim();
            var rpg = RPGS.getRPG(id);
            if (rpg) {
                if (RPG.isAllowed(rpg, _user)) {
                    RPG.setTheme(rpg, _user, theme);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/setTheme ID:THEMA"));
        }
    };

    this.showRPG = function (_user, _id) {
        if (_id != "") {
            var rpg = RPGS.getRPG(_id);
            if (rpg) {
                _user.sendPrivateMessage(RPG.showRPG(rpg));
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/showRPG ID"));
        }
    };

    this.showRPGList = function (_user, _param) {
        var rpgs;
        var out;
        if (_param == "all") {
            rpgs = RPGS.getAllRPGs();
            if (rpgs.length == 0) {
                _user.sendPrivateMessage("Momentan sind leider keine RPGs gespeichert.");
                return;
            }
            out = "Du nimmst momentan an folgenden RPG teil:";
        } else if (_param == "my") {
            rpgs = RPGS.getForUser(_user);
            if (rpgs.length == 0) {
                _user.sendPrivateMessage("Du nimmst momentan leider an keinem RPG teil.");
                return;
            }
            out = "Momentan existieren folgende RPG:"
        } else {
            rpgs = RPGS.getRunning(true);
            if (rpgs.length == 0) {
                _user.sendPrivateMessage(STRINGS.rpgs_noRunningRPGs);
                return;
            }
            out = "Folgende RPG laufen gerade:";
        }
        rpgs.forEach(function (rpg) {
            out += "°#°" + RPG.toString(rpg, _user);
        });
        _user.sendPrivateMessage(out);
    };

    this.startRPG = function (_user, _id) {
        if (_id != "") {
            var rpg = RPGS.getRPG(_id);
            if (rpg) {
                if (RPG.isAllowed(rpg, _user)) {
                    RPG.start(rpg, _user);
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_usage("/start ID"));
        }
    };

    this.topChannel = function (_user) {
        var out = "Liste der Channel sortiert nach Spielzeit:";

        var chans = [];
        var times = [];

        for (var i = 1; i < 10; ++i) {
            var channel = Channel.getMainName();
            if (i > 1) {
                channel += " " + i;
            }
            if (DB.hasNum(Keys.TIME_CHANNEL + channel)) {
                chans.push(channel);
                var rpgTime = DB.getNum(Keys.TIME_CHANNEL + channel, 0);
                var start = DB.getNum(Keys.TIME_START + channel, 0);
                if (start > 0) {
                    rpgTime += Date.now() - start;
                }
                times.push(rpgTime);
            }
        }

        for (var j = 0; j < chans.length; ++j) {
            for (var k = j+1; k < chans.length; ++k) {
                if (times[j] < times[k]) {
                    var time = times[k];
                    times[k] = times[j];
                    times[j] = time;
                    var chan = chans[k];
                    chans[k] = chans[j];
                    chans[j] = chan;
                }
            }
        }

        for (var l = 0; l < chans.length; ++l) {
            out += "°#°" + chans[l] + " - " + RPG.getTime(times[l]);
        }
        _user.sendPrivateMessage(out);
    };

    this.topPlayer = function (_user) {
        var top = UserPersistenceNumbers.getSortedEntries(Keys.TIME, {ascending: false});
        var out = "Folgende Spieler haben am Meisten gespielt:";
        top.forEach(function (entry) {
            out += "°#°" + entry.getRank() + " - " + entry.getUser().getProfileLink() + " - " + RPG.getTime(entry.getValue());
        });
        _user.sendPrivateMessage(out);
    };

    // MOD Funktionen

    this.addMod = function (_user, _mod) {
        if (isAllowed(_user)) {
            if (Config.moduleRPGMods()) {
                if (_mod != "") {
                    var mod = Users.getByNick(_user, _mod);
                    if (mod) {
                        Mods.addMod(_user, mod);
                    }
                } else {
                    _user.sendPrivateMessage(STRINGS.command_usage("/addMod NICK"));
                }
            } else {
                _user.sendPrivateMessage(STRINGS.command_notAvailable);
            }
        }
    };

    this.removeMod = function (_user, _mod) {
        if (isAllowed(_user)) {
            if (Config.moduleRPGMods()) {
                if (_mod != "") {
                    var mod = Users.getByNick(_user, _mod);
                    if (mod) {
                        Mods.removeMod(_user, mod);
                    }
                } else {
                    _user.sendPrivateMessage(STRINGS.command_usage("/removeMod NICK"));
                }
            }
        }
    };

    this.showMods = function (_user) {
        if (isAllowed(_user)) {
            if (Config.moduleRPGMods()) {
                Mods.showMods(_user);
            } else {
                _user.sendPrivateMessage(STRINGS.command_notAvailable);
            }
        }
    };

    // CM Funktionen

    this.channelCover = function (_user) {
        if (isAllowed(_user)) {
            if (Config.moduleChannelCover()) {
                ChannelCover.showList(_user);
            } else {
                _user.sendPrivateMessage(STRINGS.command_notAvailable);
            }
        }
    };

    this.removeHtmlBox = function (_user, _nick) {
        if (isAllowed(_user)) {
            if (_nick != "") {
                var user = Users.getByNick(_user, _nick);
                if (user) {
                    HtmlBox.removeContent(user);
                    _user.sendPrivateMessage(STRINGS.html_removed(user));
                }
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/removeWindow NICK"));
            }
        }
    };

    this.sendBracketHint = function (_user, _nick) {
        if (isAllowed(_user)) {
            if (_nick != "") {
                var user = Users.getByNick(_user, _nick);
                if (user) {
                    RS.sendPub(STRINGS.command_brackets(user));
                }
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/klammern NICK"));
            }
        }
    };

    this.sendYouthProtectionHint = function (_user, _nick) {
        if (isAllowed(_user)) {
            if (_nick != "") {
                var user = Users.getByNick(_user, _nick);
                if (user) {
                    RS.sendPub(STRINGS.command_juschu(user));
                }
            } else {
                _user.sendPrivateMessage(STRINGS.command_usage("/juschu NICK"));
            }
        }
    };

    this.showAppCommands = function (_user) {
        if (isAllowed(_user)) {
            _user.sendPrivateMessage(STRINGS.help);
        }
    };

    // DEV Funktionen

    this.config = function (_user, _params) {
        if (_user.isAppDeveloper()) {
            if (_params == "") {
                Config.show(_user);
            } else {
                var params = _params.split(":");
                if (Config.set(params[0], params[1])) {
                    _user.sendPrivateMessage("Done");
                } else {
                    _user.sendPrivateMessage("Parameter existiert nicht.");
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.evaluateCode = function (_user, _code) {
        if (_user.isAppDeveloper()) {
            eval(_code);
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.restartApp = function (_user) {
        if (_user.isAppDeveloper()) {
            KnuddelsServer.getAppAccess().getOwnInstance().getRootInstance().updateApp("Der Bot wird kurz neu gestartet und ist sofort wieder für euch da.");
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.say = function (_user, _msg) {
        if (_user.isAppDeveloper()) {
            RS.sendPub(_msg.replace("#", "°#°"));
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.sendNewsletter = function (_user, _msg) {
        _msg = _msg.replace("#", "°#°");
        if (_user.isAppDeveloper()) {
            Channel.getCMs().forEach(function (cm) {
                cm.sendPostMessage("RundMail", _msg);
            });
            Channel.getOwners().forEach(function (owner) {
                owner.sendPostMessage("RundMail", _msg);
            });
            _user.sendPrivateMessage("Nachricht versendet.");
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.showAppServerRevision = function (_user) {
        if (_user.isAppDeveloper()) {
            _user.sendPrivateMessage(KnuddelsServer.getAppServerInfo().getRevision());
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.welcome = function (_user, _param) {
        if (_user.isAppDeveloper()) {
            if (_param == "") {
                Welcome.showList(_user);
            } else if (_param.charAt(0) == "!") {
                Welcome.remove(_user, _param.substr(1));
            } else if (_param.charAt(0) == "?") {
                Welcome.get(_user, _param.substr(1));
            } else {
                var index = _param.indexOf(":");
                if (index > -1) {
                    var nick = _param.substr(0, index).trim();
                    var text = _param.substr(index + 1).trim();
                    Welcome.add(_user, nick, text)
                } else {
                    _user.sendPrivateMessage(STRINGS.command_usage("/welcome NICK:TEXT"));
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.update = function (_user) {
        if (_user.isAppDeveloper()) {
            if (!Config.version()) {
                var cfg = Config.get();
                cfg.version = "0.3";
                DB.saveObj(Keys.CONFIG, cfg);
            }
            Mods.update(_user);
            Welcome.update(_user);
            Config.update(_user);
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    // Hilfsfunktionen

    function isAllowed(_user) {
        var allowed = Config.debug() || _user.isAppDeveloper() || _user.isChannelOwner() || _user.isChannelModerator();
        if (!allowed) {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
        return allowed;
    }
}());