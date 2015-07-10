var RPGS = (new function () {
    var self = this;
    var rpgMode = false;

    var rpgs = [];

    this.onShutdown = function() {
        rpgs.forEach(function(rpg) {
            rpg.delete(Bot.get());
        });
        DB.delObj(Keys.RPG_NUMS);
    };

    this.startRPGMode = function (_silent) {
        if (!rpgMode) {
            rpgMode = true;
            HtmlBox.sendAllRPGHint();
            if (!_silent) {
                RS.sendPub(STRINGS.SWITCH_RPG_ON);
            }
        }
    };

    this.endRPGMode = function (_silent) {
        if (rpgMode) {
            rpgMode = false;
            HtmlBox.removeAllContent();
            if (!_silent) {
                RS.sendPub(STRINGS.SWITCH_RPG_OFF);
            }
        }
    };

    this.createRPG = function (_user, _nick) {
        if (RS.isAllowed(_user) || Mods.isMod(_user)) {
            var nick = _user.getNick();
            var host = Users.get(_user, _nick);
            if (host) {
                nick = host.getNick();
                if (!isPlaying(nick)) {
                    var id = DB.addNum(Keys.RPG_COUNTER, 1);
                    var rpg = new RPG(host, id);
                    DB.saveStr(Keys.RPG + id, rpg.toString());
                    var rpg_nums = getRPGNums();
                    rpg_nums.push(id);
                    saveRPGNums(rpg_nums);
                    rpgs.push(rpg);
                    _user.sendPrivateMessage("Das RPG mit " + nick + " als Spielleiter wurde mit der id " + id + " gestartet.");
                    host.sendPrivateMessage(_user.getNick() + " hat für dich ein RPG gestartet. Du bist Spielleiter und kannst nun Spieler hinzufügen etc.");
                    self.startRPGMode(false);
                } else {
                    _user.sendPrivateMessage(nick + " spielt bereits.");
                }
            }
        } else {
            _user.sendPrivateMessage("Du bist nicht berechtigt RPGs anzulegen.");
        }
    };

    this.setName = function (_user, _id, _name) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.setName(_user, _name);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der ID " + _id + " existiert nicht.");
        }
    };

    this.setTheme = function (_user, _id, _theme) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.setTheme(_user, _theme);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der ID " + _id + " existiert nicht.");
        }
    };

    this.setDesc = function (_user, _id, _desc) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.setDesc(_user, _desc);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der ID " + _id + " existiert nicht.");
        }
    };

    this.removeRPG = function (_user, _id) {
        var index = -1;
        rpgs.some(function (rpg, i) {
            if (rpg.getId() == _id) {
                index = i;
                return true;
            }
        });
        if (index > -1) {
            var rpg = rpgs[index];
            if (rpg.delete(_user)) {
                rpgs.splice(index, 1);
                var rpgNums = getRPGNums();
                index = rpgNums.indexOf(_id);
                rpgNums.splice(index, 1);
                saveRPGNums(rpgNums);
                if (rpgs.length == 0) {
                    self.endRPGMode(false);
                }
            }
        } else {
            _user.sendPrivateMessage("Dieses RPG existiert nicht.");
        }
    };

    this.addPlayer = function (_user, _id, _player) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.addPlayer(_user, _player);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der id " + _id + " existiert nicht.");
        }
    };

    this.rpgModeActive = function () {
        return rpgMode;
    };

    this.acceptPlayer = function (_user, _id, _player) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.acceptPlayer(_user, _player);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der id " + _id + " existiert nicht.");
        }
    };

    this.declinePlayer = function (_user, _id, _player) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.declinePlayer(_user, _player);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der id " + _id + " existiert nicht.");
        }
    };

    this.removePlayer = function (_user, _id, _player) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.removePlayer(_user, _player);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der id " + _id + " existiert nicht.");
        }
    };

    this.changeHost = function (_user, _id, _nick) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.changeHost(_user, _nick);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der ID " + _id + " existiert nicht.");
        }
    };

    this.leaveRPG = function (_user, _id) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.leave(_user);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der id " + _id + " existiert nicht.");
        }
    };

    this.joinRPG = function (_user, _id) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.join(_user);
        } else {
            _user.sendPrivateMessage("Ein RPG mit der id " + _id + " existiert nicht.");
        }
    };

    this.isEmpty = function (_id) {
        self.removeRPG(Bot.get(), _id);
    };

    this.userJoined = function (_user) {
        if (rpgMode) {
            Bot.prv(_user, STRINGS.RPG_PRV);
            HtmlBox.sendRPGHint(_user);
        }
    };

    this.userLeft = function (_user) {
        var nick = _user.getNick();
        if (rpgMode) {
            if (isPlaying(nick)) {
                setTimeout(function () {
                    if (!_user.isOnlineInChannel()) {
                        var rpg = getRPGByNick(nick);
                        if (rpg) {
                            rpg.leave(_user);
                        }
                    }
                }, Settings.TIMEOUT);
            }
        }
    };

    this.showRPGList = function (_user) {
        var rpg_nums = getRPGNums();
        if (rpg_nums.length == 0) {
            _user.sendPrivateMessage("Momentan laufen keine RPGs.");
        } else {
            var out = "Folgende RPGs laufen gerade:";
            rpg_nums.forEach(function (_id) {
                var str = DB.getStr(Keys.RPG + _id, "");
                if (str != "") {
                    out += "°#°" + str;
                } else {
                    out += "°#" + _id;
                }
            });
            _user.sendPrivateMessage(out);
        }
    };

    function getRPGByNick(_nick) {
        var index = -1;
        rpgs.some(function (_id, _index) {
            var _rpg = getRPG(_id);
            if (_rpg.getChannel() == RS.name && _rpg.isPlaying(_nick)) {
                index = _index;
                return true;
            }
        });
        if (index > -1) {
            return rpgs[index];
        }
    }

    this.onPublicMessage = function (_user, _msg) {
        var nick = _user.getNick();
        if (rpgMode && !isPlaying(nick)) {
            _msg = _msg.trim();
            var start = isValidBracket(_msg.charAt(0));
            var end = isValidBracket(_msg.charAt(_msg.length - 1));

            if (!start || !end) {
                if ((start || end) && _msg.length == 1) {
                    return;
                }
                _user.sendPrivateMessage(STRINGS.askRPG(start, end));
            }
        }
    };

    function getRPGNums() {
        return DB.getObj(Keys.RPG_NUMS, []);
    }

    function getRPG(_id) {
        var rpg;
        rpgs.some(function (_rpg) {
            if (_rpg.getId() == _id) {
                rpg = _rpg;
            }
        });
        return rpg;
    }

    function saveRPGNums(_rpgs) {
        DB.saveObj(Keys.RPG_NUMS, _rpgs);
    }

    function isValidBracket(_c) {
        return Settings.BRACKETS.indexOf(_c) > -1;
    }

    function isPlaying(_nick) {
        var playing = false;
        rpgs.some(function (_rpg) {
            if (_rpg.isPlaying(_nick)) {
                playing = true;
                return true;
            }
        });
        return playing;
    }


}());