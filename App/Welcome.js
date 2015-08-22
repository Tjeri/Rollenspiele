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
            _user.sendPrivateMessage(S.welc.add(user, _text));
        }
    };

    this.get = function (_user, _nick) {
        var user = Users.getByNick(_user, _nick);
        if (user) {
            var str = UserDB.getStr(user, Keys.WELCOME, "");

            if (str == "") {
                _user.sendPrivateMessage(S.welc.notReg(user));
            } else {
                _user.sendPrivateMessage(S.welc.msg(user, str));
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
                _user.sendPrivateMessage(S.welc.remove(user.getNick()));
            } else {
                _user.sendPrivateMessage(S.welc.notReg(user));
            }
        }
    };

    this.showList = function (_user) {
        var users = [];
        DB.getObj(Keys.WELCOME, []).forEach(function (uid) {
            var user = Users.getByUid(uid);
            users.push(user);
        });
        users.sort();
        _user.sendPrivateMessage(S.welc.list(users));
    };

    this.welcome = function (_user) {
        var str = UserDB.getStr(_user, Keys.WELCOME, "");
        if (str) {
            _user.sendPrivateMessage(str);
        }
    };

    this.update = function (_user) {

    }
}());