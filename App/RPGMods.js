var Mods = (new function () {

    this.addMod = function (_user, _mod) {
        var mods = getMods();
        var uid = _mod.getUserId();
        var nick = _mod.getNick();
        if (mods.indexOf(uid) == -1) {
            mods.push(uid);
            saveMods(mods);
            _user.sendPrivateMessage(S.mods.added(nick));
            _mod.sendPrivateMessage(S.mods.addedYou(_user));
            if (!_user.isAppDeveloper()) {
                KnuddelsServer.getAppDeveloper().sendPostMessage(S.mods.notify_topic_add, S.mods.notify_text_add(_user, _mod));
            }
        } else {
            _user.sendPrivateMessage(S.mods.alreadyMod(nick));
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
        var index = mods.indexOf(uid);
        if (index > -1) {
            mods.splice(index, 1);
            saveMods(mods);
            _user.sendPrivateMessage(S.mods.removed(_mod));
            _mod.sendPrivateMessage(S.mods.removedYou(_user));
            if (!_user.isAppDeveloper()) {
                KnuddelsServer.getAppDeveloper().sendPostMessage(S.mods.notify_topic_remove, S.mods.notify_text_remove(_user, _mod));
            }
        } else {
            _user.sendPrivateMessage(S.mods.notMod(_mod));
        }
    };

    this.showMods = function (_user) {
        var nicks = "";
        var mods = getMods();
        var users = [];
        mods.forEach(function (uid) {
            var user = Users.getByUid(uid);
            users.push(user);
        });
        users.sort();
        _user.sendPrivateMessage(S.mods.list(users));
    };

    this.update = function (_user) {

    };

    function getMods() {
        return DB.getObj(Keys.MODERATORS, []);
    }

    function saveMods(_mods) {
        DB.saveObj(Keys.MODERATORS, _mods);
    }
}());