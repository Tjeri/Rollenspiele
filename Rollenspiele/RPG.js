function RPG(_host, _id) {
    var self = this;
    var start = Date.now();

    var id = _id;
    var channel = RS.name;

    var host = _host;
    var players = [_host.getNick()];
    var name = "";
    var theme = "";
    var desc = "";

    var declined = [];

    this.getId = function () {
        return id;
    };

    this.getChannel = function () {
        return channel;
    };

    this.setName = function (_user, _name) {
        if (isAllowed(_user)) {
            sendPlayers(STRINGS.rpg_name_changed(_user, getName(), _name), true);
            name = _name;
            save();
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_name_notAllowed);
        }
    };

    this.getName = function () {
        return name;
    };

    this.setTheme = function (_user, _theme) {
        if (isAllowed(_user)) {
            if (theme != "") {
                sendPlayers(STRINGS.rpg_theme_changed(_user, getName(), theme, _theme), true);
            } else {
                sendPlayers(STRINGS.rpg_theme_set(_user, getName(), _theme), true);
            }
            theme = _theme;
            save();
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_theme_notAllowed);
        }
    };

    this.getTheme = function () {
        return theme;
    };

    this.setDesc = function (_user, _desc) {
        if (isAllowed(_user)) {
            _user.sendPrivateMessage(STRINGS.rpg_desc_changed(_desc));
            desc = _desc;
            save();
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_desc_notAllowed);
        }
    };

    this.getDesc = function () {
        return desc;
    };

    this.getPlayers = function () {
        return players;
    };

    this.getInfos = function () {
        var _name = name == "" ? STRINGS.rpg_info_noName : name;
        var _theme = theme == "" ? STRINGS.rpg_info_noTheme : theme;
        var _desc = desc == "" ? STRINGS.rpg_info_noDesc : desc;
        var _players = "";
        var msec = Date.now() - start;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        var time = (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss) + "." + msec;
        players.forEach(function (player) {
            if (_players != "") {
                _players += ", ";
            }
            var user = Users.get(Bot.get(), player);
            if (isHost(user)) {
                _players += "_" + user.getProfileLink() + "_" + STRINGS.rpg_info_host;
            } else {
                _players += user.getProfileLink();
            }
        });
        return STRINGS.rpg_info(id, _name, _theme, _desc, _players, time);
    };

    this.changeHost = function (_user, _nick) {
        if (isAllowed(_user)) {
            var user = Users.get(_user, _nick);
            if (user) {
                var nick = user.getNick();
                if (self.isPlaying(nick)) {
                    host = user;
                    save();
                    host.sendPrivateMessage(STRINGS.rpg_newHost(_user, getName()) + STRINGS.rpgs_host(self));
                    sendPlayers(STRINGS.rpg_newHost_players(nick, _user, getName()), false);
                } else {
                    _user.sendPrivateMessage(STRINGS.rpg_newHost_mustBePlayer(nick));
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_newHost_notAllowed);
        }
    };

    this.addPlayer = function (_user, player) {
        var silent = !isHost(_user);
        if (isAllowed(_user)) {
            if (addPlayer(player)) {
                save();
                if (!silent) {
                    player.sendPrivateMessage(STRINGS.rpg_added_you(_user, getName()));
                }
                _user.sendPrivateMessage(STRINGS.rpg_added_user_confirmation(player));
            }
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_addPlayer_notAllowed);
        }
    };

    this.join = function (_user) {
        var nick = _user.getNick();
        if (declined.indexOf(nick) == -1) {
            host.sendPrivateMessage(STRINGS.rpg_join_question(nick, id));
            _user.sendPrivateMessage(STRINGS.rpg_join_ask(host));
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_join_alreadyDeclined);
        }
    };

    this.acceptPlayer = function (_user, _player) {
        if (isHost(_user)) {
            if (addPlayer(_player)) {
                save();
                _player.sendPrivateMessage(STRINGS.rpg_join_accepted(host));
                host.sendPrivateMessage(STRINGS.rpg_join_userAccepted(_player));
            }
        }
    };

    this.declinePlayer = function (_user, _player) {
        if (isHost(_user)) {
            var player = Users.get(host, _player);
            var nick = player.getNick();
            if (player) {
                if (self.isPlaying(nick)) {
                    host.sendPrivateMessage(STRINGS.rpg_decline_alreadyPlaying(nick, id));
                } else {
                    if (declined.indexOf(nick) == -1) {
                        declined.push(nick);
                        host.sendPrivateMessage(STRINGS.rpg_declined_user(nick, id));
                        player.sendPrivateMessage(STRINGS.rpg_declined(host));
                    } else {
                        host.sendPrivateMessage(STRINGS.rpg_decline_alreadyDeclined(nick));
                    }
                }
            }
        }
    };

    this.leave = function (_user) {
        var nick = _user.getNick();
        var index = players.indexOf(nick);
        if (index > -1) {
            players.splice(index, 1);
            _user.sendPrivateMessage(STRINGS.rpg_leave);
            if (players.length == 0) {
                RPGS.isEmpty(id);
            } else {
                if (isHost(_user)) {
                    host = Users.get(Bot.get(), players[0]);
                    host.sendPrivateMessage(STRINGS.rpg_leave_userLeft(nick) + STRINGS.rpgs_host(self));
                    sendPlayers(STRINGS.rpg_leave_newHost(nick, host), false);
                } else {
                    sendPlayers(STRINGS.rpg_leave_userLeft(nick), true);
                }
                save();
            }
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_leave_notPlaying);
        }
    };

    this.removePlayer = function (_user, _player) {
        var silent = !isHost(_user);
        if (isAllowed(_user)) {
            var player = Users.get(host, _player);
            if (player) {
                if (player.getNick() == _user.getNick()) {
                    _user.sendPlayers(STRINGS.rpg_removePlayer_leave(id));
                } else if (removePlayer(player)) {
                    save();
                    if (!silent) {
                        player.sendPrivateMessage(STRINGS.rpg_removePlayer_removedYou(_user, getName()));
                    }
                    _user.sendPrivateMessage(STRINGS.rpg_removePlayer_removed(player));
                } else {
                    _user.sendPrivateMessage(STRINGS.rpg_removePlayer_notPlaying(player));
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_removePlayer_notAllowed);
        }
    };

    this.getHostInfos = function(_user) {
        if (isHost(_user)) {
            _user.sendPrivateMessage(STRINGS.rpgs_host(self));
        } else {
            STRINGS.command_notAllowed;
        }
    };

    this.delete = function (_user) {
        if (isAllowed(_user)) {
            players.forEach(function (nick) {
                var player = Users.get(_user, nick);
                player.sendPrivateMessage(STRINGS.rpg_end(_user));
            });
            DB.delStr(Keys.RPG + id);
            return true;
        } else {
            _user.sendPrivateMessage(STRINGS.rpg_end_notAllowed);
        }
    };

    this.isPlaying = function (_nick) {
        return players.indexOf(_nick) > -1;
    };

    this.toString = function () {
        var out = name;
        if (name == "") {
            out = id;
        }
        if (theme != "") {
            out += " (" + theme + ")";
        }
        out += " - ";
        var count = 0;
        players.forEach(function (player) {
            if (count > 0) {
                out += ", ";
            }
            var user = Users.get(Bot.get(), player);
            if (isHost(user)) {
                out += "_" + user.getProfileLink() + "_" + STRINGS.rpg_info_host;
            } else {
                out += user.getProfileLink();
            }
            count++;
        });
        out += " - Channel " + RS.name + " °>[Ansehen]|/go +" + channel + "<°";
        return out;
    };

    function getName() {
        if (name == "") {
            return id;
        } else {
            return name + "(" + id + ")";
        }
    }

    function addPlayer(_player) {
        var nick = _player.getNick();
        if (players.indexOf(nick) == -1) {
            players.push(nick);
            var index = declined.indexOf(nick);
            if (index > -1) {
                declined.splice(index, 1);
            }
            return true;
        } else {
            return false;
        }
    }

    function removePlayer(_user) {
        var nick = _user.getNick();
        var index = players.indexOf(nick);
        if (index > -1) {
            players.splice(index, 1);
            declined.push(nick);
            if (players.length == 0) {
                RPGS.isEmpty(id);
            } else if (isHost(_user)) {
                host = Users.get(_user, players[0]);
                host.sendPrivateMessage(STRINGS.rpg_leave_userLeft(nick) + STRINGS.rpgs_host(self));
                sendPlayers(STRINGS.rpg_leave_newHost(nick, host), false);
            }
            return true;
        }
        return false;
    }

    function isAllowed(_user) {
        return _user.isAppDeveloper() || Bot.isBot(_user) || isHost(_user);
    }

    function isHost(_user) {
        return host.getNick() == _user.getNick();
    }

    function save() {
        DB.saveStr(Keys.RPG + id, self.toString());
    }

    function sendPlayers(_msg, _sendHost) {
        players.forEach(function (player) {
            if (_sendHost || player != host.getNick()) {
                Users.get(Bot.get(), player).sendPrivateMessage(_msg);
            }
        });
    }
}