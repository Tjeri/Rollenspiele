function RPG(_host, _id) {
    var self = this;

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
            sendPlayers(_user.getNick() + " hat den Namen vom RPG '" + getName() + "' gerade auf '" + _name + "' geändert.", true);
            name = _name;
            save();
        } else {
            _user.sendPrivateMessage("Du bist nicht berechtigt den Namen dieses RPG zu ändern.");
        }
    };

    this.setTheme = function (_user, _theme) {
        if (isAllowed(_user)) {
            if (theme != "") {
                sendPlayers(_user.getNick() + " hat das Thema vom RPG '" + getName() + "' gerade von '" + theme + "' auf '" + _theme + "' geändert.", true);
            } else {
                sendPlayers(_user.getNick() + " hat das Thema vom RPG '" + getName() + "' gerade von auf '" + _theme + "' geändert.", true);
            }
            theme = _theme;
            save();
        } else {
            _user.sendPrivateMessage("Du bist nicht berechtigt das Thema dieses RPG zu ändern.");
        }
    };

    this.setDesc = function (_user, _desc) {
        if (isAllowed(_user)) {
            _user.sendPrivateMessage("Die Beschreibung wurde geändert.");
            desc = _desc;
            save();
        } else {
            _user.sendPrivateMessage("Du bist nicht berechtigt die Beschreibung dieses RPG zu ändern.");
        }
    };

    this.changeHost = function (_user, _nick) {
        if (isAllowed(_user)) {
            var user = Users.get(_nick);
            var nick = user.getNick();
            if (user) {
                if (self.isPlaying(nick)) {
                    host = user;
                    save();
                    sendPlayers(nick + " wurde gerade von " + _user.getNick() + " zum Spielleiter im RPG " + getName() + "ernannt.", true);
                } else {
                    _user.sendPrivateMessage(nick + " muss am Spiel teilnehmen, um den Spielleiterposten zu übernehmen.");
                }
            }
        } else {
            _user.sendPrivateMessage("Du kannst den Spielleiter in diesem RPG nicht ändern.");
        }
    };

    this.addPlayer = function (_user, _nick) {
        var silent = !isHost(_user);
        if (isAllowed(_user)) {
            var user = Users.get(this.host, _nick);
            if (user) {
                if (addPlayer(user)) {
                    save();
                    if (!silent) {
                        user.sendPrivateMessage("Du wurdest dem Play hinzugefügt");
                    }
                    _user.sendPrivateMessage(user.getNick() + " wurde als Spieler hinzugefügt.");
                } else {
                    _user.sendPrivateMessage(user.getNick() + " ist bereits in der Spielerliste.");
                }
            }
        } else {
            _user.sendPrivateMessage("Du kannst keine Spieler hinzufügen.");
        }
    };

    this.join = function (_user) {
        var nick = _user.getNick();
        if (declined.indexOf(nick) == -1) {
            if (players.indexOf(nick) > -1) {
                _user.sendPrivateMessage("Du spielst hier doch schon mit.");
            } else {
                host.sendPrivateMessage(nick + " möchte an deinem RPG teilnehmen. °>[Annehmen]|/accept " + id + ":" + nick.escapeKCode() + "<° °>[Ablehnen]|/decline " + id + ":" + nick.escapeKCode() + "<°");
                _user.sendPrivateMessage("Ich werde " + host.getNick() + " gleich mal fragen :)");
            }
        } else {
            _user.sendPrivateMessage("Der Beitritt für dieses RPG wurde bereits abgelehnt.");
        }
    };

    this.acceptPlayer = function (_user, _player) {
        if (isHost(_user)) {
            var player = Users.get(host, _player);
            if (player) {
                if (addPlayer(player)) {
                    save();
                    player.sendPrivateMessage("Du wurdest als Mitspieler akzeptiert.");
                    host.sendPrivateMessage("Du hast " + player.getNick() + " als Mitspieler akzeptiert.");
                } else {
                    host.sendPrivateMessage(player.getNick() + " steht doch schon auf der Spielerliste.");
                }
            }
        }
    };

    this.declinePlayer = function (_user, _player) {
        if (isHost(_user)) {
            var player = Users.get(host, _player);
            var nick = player.getNick();
            if (player) {
                if (self.isPlaying(nick)) {
                    host.sendPrivateMessage(nick + " wurde schon als Spieler hinzugefügt. Möchtest du ihn/sie löschen? °>[Löschen]|/removePlayer " + id + ":" + nick.escapeKCode() + "<°");
                } else {
                    if (declined.indexOf(nick) == -1) {
                        declined.push(nick);
                        host.sendPrivateMessage(nick + " wurde abgelehnt. Er/Sie kann dem RPG nun nicht mehr beitreten.");
                        player.sendPrivateMessage("Deine Anfrage wurde von " + host.getNick() + " abgelehnt.");
                    } else {
                        host.sendPrivateMessage(nick + " wurde bereits abgelehnt.");
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
            _user.sendPrivateMessage("Du hast das RPG verlassen.");
            if (players.length == 0) {
                RPGS.isEmpty(id);
            } else {
                if (isHost(_user)) {
                    host = Users.get(Bot.get(), players[0]);
                    host.sendPrivateMessage(nick + " hat der RPG verlassen. Du bist neuer Spielleiter. Du kannst nun Spieler hinzufügen...");
                    sendPlayers(nick + " hat das Spiel verlassen. " + host.getNick() + " ist nun neuer Spielleiter.");
                } else {
                    sendPlayers(nick + " hat das RPG verlassen.", true);
                }
                save();
            }
        } else {
            _user.sendPrivateMessage("Du nimmst an diesem RPG nicht teil.");
        }
    };

    this.removePlayer = function (_user, _player) {
        var silent = !isHost(_user);
        if (isAllowed(_user)) {
            var player = Users.get(this.host, _player);
            if (player) {
                if (player.getNick() == _user.getNick()) {
                    _user.sendPlayers("Du kannst dich nicht selbst entfernen. Bitte nutze /leave ID zum Verlassen der Gruppe.");
                } else if (removePlayer(player)) {
                    save();
                    if (!silent) {
                        player.sendPrivateMessage("Du wurdest von der Spielerliste gelöscht.");
                    }
                    _user.sendPrivateMessage(player.getNick() + " wurde von der Spielerliste entfernt.");
                } else {
                    _user.sendPrivateMessage(player.getNick() + " steht nicht auf der Spielerliste.");
                }
            }
        } else {
            _user.sendPrivateMessage("Du kannst keine Spieler löschen.");
        }
    };

    this.delete = function (_user) {
        if (isAllowed(_user)) {
            players.forEach(function (nick) {
                var player = Users.get(_user, nick);
                player.sendPrivateMessage(_user.getNick() + " hat das RPG beendet. Danke fürs Spielen! :)");
            });
            DB.delStr(Keys.RPG + id);
            return true;
        } else {
            _user.sendPrivateMessage("Du bist nicht berechtigt dieses RPG zu beenden.");
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
            var user = Users.get(undefined, player);
            if (isHost(user)) {
                out += "_" + user.getProfileLink() + "_";
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
                host.sendPrivateMessage(nick + " hat der RPG verlassen. Du bist neuer Spielleiter. Du kannst nun Spieler hinzufügen...");
                sendPlayers(nick + " hat der RPG verlassen. " + host.getNick() + " ist neuer Spielleiter.", false);
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
                Users.get(null, player).sendPrivateMessage(_msg);
            }
        });
    }
}