var Welcome = (new function () {
    this.add = function (_user, _nick, _text) {
        var user = Users.getByNick(_user, _nick);
        if (user) {
            if (!UserDB.hasStr(user, Keys.WELCOME)) {
                var users = DB.getObj(Keys.WELCOME, []);
                users.push(user.getUserId());
                DB.saveObj(Keys.WELCOME, users);
            }
            UserDB.saveStr(user, Keys.WELCOME, _text);
            _user.sendPrivateMessage(STRINGS.welcome_newMessage(user.getNick(), _text));
        }
    };

    this.get = function (_user, _nick) {
        var user = Users.getByNick(_user, _nick);
        if (user) {
            var str = UserDB.getStr(_user, Keys.WELCOME, "");
            var nick = user.getNick();

            if (str == "") {
                _user.sendPrivateMessage(STRINGS.welcome_notRegistered(nick));
            } else {
                _user.sendPrivateMessage(STRINGS.welcome_message(nick, str));
            }
        }
    };

    this.remove = function (_user, _nick) {
        var user = Users.getByNick(_user, _nick);
        if (user) {
            if (UserDB.hasStr(user, Keys.WELCOME)) {
                UserDB.delStr(user, Keys.WELCOME);
                var users = DB.getObj(Keys.WELCOME, []);
                var index = users.indexOf(user.getUserId());
                users.splice(index, 1);
                DB.saveObj(Keys.WELCOME, users);
                _user.sendPrivateMessage(STRINGS.welcome_removed(user.getNick()));
            } else {
                _user.sendPrivateMessage(STRINGS.welcome_notRegistered);
            }
        }
    };

    this.showList = function (_user) {
        var users = [];
        DB.getObj(Keys.WELCOME, []).forEach(function (uid) {
            var user = Users.getByUid(_user, uid);
            users.push(user);
        });
        users.sort();
        var nicks = "";
        users.forEach(function (user) {
            if (nicks != "") {
                nicks += ", ";
            }
            var nick = user.getNick();
            nicks += "°>" + nick + "|/welcome ?" + nick + "<°";
        });
        _user.sendPrivateMessage(STRINGS.welcome_list(nicks));
    };

    this.welcome = function (_user) {
        var str = UserDB.getStr(_user, Keys.WELCOME + _user.getUserId(), "");
        if (str != "") {
            _user.sendPrivateMessage(str);
        }
    };

    this.update = function (_user) {
        if (Config.version() == "0.3") {
            var users = DB.getObj("WELCOMELIST", []);
            var newUsers = [];
            users.forEach(function (nick) {
                var user = Users.getByNick(_user, nick);
                var uid = user.getUserId();
                newUsers.push(uid);
                var str = DB.getStr(Keys.WELCOME + "_" + nick);
                if (!str) {
                    str = DB.getStr(Keys.WELCOME + "_" + uid);
                }
                UserDB.saveStr(user, Keys.WELCOME, str);
                DB.delStr(Keys.WELCOME + "_" + nick);
                DB.delStr(Keys.WELCOME + "_" + uid);
            });
            DB.saveObj(Keys.WELCOME, newUsers);
            DB.delObj("WELCOMELIST");
            _user.sendPrivateMessage("Update von Welcome.js abgeschlossen.");
        }
    }
}());