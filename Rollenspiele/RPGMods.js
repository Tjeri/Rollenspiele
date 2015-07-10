var Mods = (new function () {

    this.addMod = function (_user, _mod) {
        if (RS.isAllowed(_user)) {
            var mod = Users.get(_user, _mod);
            var nick = mod.getNick();
            if (mod) {
                var mods = getModDB();
                if (mods.indexOf(nick) == -1) {
                    mods.push(nick);
                    mods.sort();
                    saveModDB(mods);
                    _user.sendPrivateMessage(nick + " ist jetzt Mod.");
                } else {
                    _user.sendPrivateMessage(nick + " ist schon Mod.");
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
        }
    };

    this.removeMod = function (_user, _mod) {
        if (RS.isAllowed(_user)) {
            var mod = Users.get(_user, _mod);
            var nick = mod.getNick();
            if (mod) {
                var mods = getModDB();
                var index = mods.indexOf(nick);
                if (index > -1) {
                    mods.splice(index, 1);
                    saveModDB(mods);
                    _user.sendPrivateMessage(nick + " ist jetzt nicht mehr Mod.");
                } else {
                    _user.sendPrivateMessage(nick + " ist kein Mod.");
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
        }
    };

    this.showMods = function (_user) {
        if (RS.isAllowed(_user)) {
            var out = "Momentane Mods: ";
            var count = 0;
            var mods = getModDB();
            mods.forEach(function (mod) {
                if (count > 0) {
                    out += ", ";
                }
                out += mod;
                count++;
            });
            if (count == 0) {
                out += "Keine";
            }
            _user.sendPrivateMessage(out);
        } else {
            _user.sendPrivateMessage(STRINGS.NOT_ALLOWED);
        }
    };

    function getModDB() {
        return DB.getObj(Keys.MODERATORS, []);
    }

    function saveModDB(_mods) {
        DB.saveObj(Keys.MODERATORS, _mods);
    }

    this.isMod = function (_user) {
        if (Settings.MODS) {
            var mods = getModDB();
            return mods.indexOf(_user.getNick()) > -1;
        }
        return false;
    }


}());