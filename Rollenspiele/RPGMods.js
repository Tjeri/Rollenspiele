var Mods = (new function () {

    this.addMod = function (_user, _mod) {
        var mods = getMods();
        var uid = _mod.getUserId();
        var nick = _mod.getNick();
        if (mods.indexOf(uid) == -1) {
            mods.push(uid);
            saveMods(mods);
            _user.sendPrivateMessage(STRINGS.mod_added(nick));
            _mod.sendPrivateMessage("Du wurdest eben im Channel " + Channel.getMainName() + " von " + _user.getProfileLink() + " als RPG Moderator hinzugefügt.");
            if (!_user.isAppDeveloper()) {
                KnuddelsServer.getAppDeveloper().sendPostMessage("Mod hinzugefügt", _mod.getNick() + " wurde eben von " + _user.getNick() + " in " + Channel.getMainName() + " als Moderator hinzugefügt.");
            }
        } else {
            _user.sendPrivateMessage(STRINGS.mod_already(nick));
        }
    };

    this.isMod = function (_user) {
        if (Config.moduleRPGMods()) {
            var mods = getMods();
            return mods.indexOf(_user.getUserId()) > -1;
        }
        return false;
    };

    this.removeMod = function (_user, _mod) {
        var mods = getMods();
        var uid = _mod.getUserId();
        var nick = _mod.getNick();
        var index = mods.indexOf(uid);
        if (index > -1) {
            mods.splice(index, 1);
            saveMods(mods);
            _user.sendPrivateMessage(STRINGS.mod_removed(nick));
            _mod.sendPrivateMessage("Du wurdest eben im Channel " + Channel.getMainName() + " von " + _user.getProfileLink() + " als RPG Moderator entfernt.");
            if (!_user.isAppDeveloper()) {
                KnuddelsServer.getAppDeveloper().sendPostMessage("Mod entfernt", _mod.getNick() + " wurde eben von " + _user.getNick() + " in " + Channel.getMainName() + " als Moderator entfernt.");
            }
        } else {
            _user.sendPrivateMessage(STRINGS.mod_isNot(nick));
        }
    };

    this.showMods = function (_user) {
        var nicks = "";
        var mods = getMods();
        var users = [];
        mods.forEach(function (uid) {
            var user = Users.getByUid(_user, uid);
            users.push(user);
        });
        users.sort();
        users.forEach(function (mod) {
            if (nicks != "") {
                nicks += ", ";
            }
            nicks += mod.getProfileLink();
        });
        _user.sendPrivateMessage(STRINGS.mod_list(nicks));
    };

    this.update = function (_user) {
        if (Config.version() == "0.3") {
            var users = DB.getObj(Keys.MODERATORS, []);
            var newUsers = [];
            users.forEach(function (nick) {
                var user = Users.getByNick(Bot.get(), nick);
                if (!user) {
                    user = Users.getByUid(Bot.get(), nick);
                }
                var uid = user.getUserId();
                newUsers.push(uid);
            });
            _user.sendPrivateMessage("Update von RPGMods.js abgeschlossen.");
            DB.saveObj(Keys.MODERATORS, newUsers);
        }
    };

    function getMods() {
        return DB.getObj(Keys.MODERATORS, []);
    }

    function saveMods(_mods) {
        DB.saveObj(Keys.MODERATORS, _mods);
    }
}());