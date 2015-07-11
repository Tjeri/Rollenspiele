var RPGS = (new function () {
    var self = this;
    var rpgMode = false;

    var rpgs = [];

    this.onShutdown = function () {
        rpgs.forEach(function (rpg) {
            rpg.delete(Bot.get());
        });
    };

    this.startRPGMode = function (_silent) {
        if (!rpgMode) {
            rpgMode = true;
            HtmlBox.sendAllRPGHint();
            if (!_silent) {
                RS.sendPub(STRINGS.rpgMode_switch_on);
            }
        }
    };

    this.endRPGMode = function (_silent) {
        if (rpgMode) {
            rpgMode = false;
            HtmlBox.removeAllContent();
            if (!_silent) {
                RS.sendPub(STRINGS.rpgMode_switch_off);
            }
        }
    };

    this.createRPG = function (_user, _nick) {
        if (RS.isAllowed(_user) || Mods.isMod(_user)) {
            var host = Users.get(_user, _nick);
            if (host) {
                var nick = host.getNick();
                if (!isPlaying(nick)) {
                    var id = DB.addNum(Keys.RPG_COUNTER, 1);
                    var rpg = new RPG(host, id);
                    DB.saveStr(Keys.RPG + id, rpg.toString());
                    var rpg_nums = getRPGNums();
                    rpg_nums.push(id);
                    saveRPGNums(rpg_nums);
                    rpgs.push(rpg);
                    _user.sendPrivateMessage(STRINGS.rpgs_created(id, nick));
                    host.sendPrivateMessage(STRINGS.rpgs_start(_user) + STRINGS.rpgs_host(rpg));
                    self.startRPGMode(false);
                } else {
                    _user.sendPrivateMessage(STRINGS.rpgs_alreadyPlaying(nick));
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.rpgs_create_notAllowed);
        }
    };

    this.setName = function (_user, _id, _name) {
        var rpg;
        if (!_id) {
            rpg = getRPGByNick(_user.getNick());
        } else {
            rpg = getRPG(_id);
        }
        if (rpg) {
            rpg.setName(_user, _name);
        } else {
            if (!_id) {
                _user.sendPrivateMessage(STRINGS.rpgs_notPlaying);
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        }
    };

    this.setTheme = function (_user, _id, _theme) {
        var rpg;
        if (!_id) {
            rpg = getRPGByNick(_user.getNick());
        } else {
            rpg = getRPG(_id);
        }
        if (rpg) {
            rpg.setTheme(_user, _theme);
        } else {
            if (!_id) {
                _user.sendPrivateMessage(STRINGS.rpgs_notPlaying);
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        }
    };

    this.setDesc = function (_user, _id, _desc) {
        var rpg;
        if (!_id) {
            rpg = getRPGByNick(_user.getNick());
        } else {
            rpg = getRPG(_id);
        }
        if (rpg) {
            rpg.setDesc(_user, _desc);
        } else {
            if (!_id) {
                _user.sendPrivateMessage(STRINGS.rpgs_notPlaying);
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        }
    };

    this.removeRPG = function (_user, _id) {
        if (!_id) {
            rpg = getRPGByNick(_user.getNick());
            if (!rpg) {
                _user.sendPrivateMessage(STRINGS.rpgs_notPlaying);
                return;
            }
            _id = rpg.getId();
        }
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
            _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
        }
    };

    this.addPlayer = function (_user, _id, _player) {
        var rpg;
        var player = Users.get(_user, _player);
        if (player) {
            var nick = player.getNick();
            if (!isPlaying(nick)) {
                if (!_id) {
                    rpg = getRPGByNick(_user.getNick());
                } else {
                    rpg = getRPG(_id);
                }
                if (rpg) {
                    rpg.addPlayer(_user, player);
                } else {
                    if (!_id) {
                        _user.sendPrivateMessage(STRINGS.rpgs_notPlaying);
                    } else {
                        _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
                    }
                }
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_alreadyPlaying(nick));
            }
        }
    };

    this.rpgModeActive = function () {
        return rpgMode;
    };

    this.acceptPlayer = function (_user, _id, _player) {
        var rpg = getRPG(_id);
        if (rpg) {
            var player = Users.get(_user, _player);
            var nick = player.getNick();
            if (player) {
                if (!isPlaying(nick)) {
                    rpg.acceptPlayer(_user, player);
                } else {
                    _user.sendPrivateMessage(STRINGS.rpgs_alreadyPlaying(nick));
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
        }
    };

    this.declinePlayer = function (_user, _id, _player) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.declinePlayer(_user, _player);
        } else {
            _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
        }
    };

    this.removePlayer = function (_user, _id, _player) {
        var rpg;
        if (!_id) {
            rpg = getRPGByNick(_user.getNick());
        } else {
            rpg = getRPG(_id);
        }
        if (rpg) {
            rpg.removePlayer(_user, _player);
        } else {
            if (!_id) {
                _user.sendPrivateMessage(STRINGS.rpgs_notPlaying);
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        }
    };

    this.changeHost = function (_user, _id, _player) {
        var rpg;
        if (!_id) {
            rpg = getRPGByNick(_user.getNick());
        } else {
            rpg = getRPG(_id);
        }
        if (rpg) {
            rpg.changeHost(_user, _player);
        } else {
            if (!_id) {
                _user.sendPrivateMessage(STRINGS.rpgs_notPlaying);
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
            }
        }
    };

    this.getHostInfos = function (_user) {
        var rpg = getRPGByNick(_user.getNick());
        if (rpg) {
            rpg.getHostInfos(_user);
        } else {
            _user.sendPrivateMessage(STRINGS.rpgs_notPlaying);
        }
    };

    this.leaveRPG = function (_user, _id) {
        var rpg = getRPG(_id);
        if (rpg) {
            rpg.leave(_user);
        } else {
            _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
        }
    };

    this.joinRPG = function (_user, _id) {
        var rpg = getRPG(_id);
        if (rpg) {
            if (!isPlaying(_user.getNick())) {
                rpg.join(_user);
            } else {
                _user.sendPrivateMessage(STRINGS.rpgs_user_alreadyPlaying);
            }
        } else {
            _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
        }
    };

    this.isEmpty = function (_id) {
        self.removeRPG(Bot.get(), _id);
    };

    this.userJoined = function (_user) {
        if (rpgMode) {
            Bot.prv(_user, STRINGS.rpgMode_userJoined);
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

    this.showRPG = function (_user, _id) {
        var rpg = getRPG(_id);
        if (rpg) {
            _user.sendPrivateMessage(rpg.getInfos());
        } else {
            _user.sendPrivateMessage(STRINGS.rpgs_notExisting(_id));
        }
    };

    this.showRPGList = function (_user) {
        var rpg_nums = getRPGNums();
        if (rpg_nums.length == 0) {
            _user.sendPrivateMessage(STRINGS.rpgs_noRunningRPGs);
        } else {
            var str = "";
            rpg_nums.forEach(function (_id) {
                var str = DB.getStr(Keys.RPG + _id, "");
                if (str != "") {
                    str += "°#°" + str;
                } else {
                    str += "°#" + _id;
                }
            });
            _user.sendPrivateMessage(STRINGS.rpgs_running(str));
        }
    };

    this.showPlayers = function (_user, _id) {
        var rpg = getRPG(_id);
        _user.sendPrivateMessage(rpg.toString());
    };

    function getRPGByNick(_nick) {
        var rpg;
        rpgs.some(function (_rpg) {
            if (_rpg.isPlaying(_nick)) {
                rpg = _rpg;
                return true;
            }
        });
        return rpg;
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
                _user.sendPrivateMessage(STRINGS.rpgMode_publicMessage(start, end));
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