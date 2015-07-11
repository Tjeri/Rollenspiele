var Mods = (new function () {

    this.addMod = function (_user, _mod) {
        if (RS.isAllowed(_user)) {
            var mod = Users.get(_user, _mod);
            var nick = mod.getNick();
            if (mod) {
                var mods = getMods();
                if (mods.indexOf(nick) == -1) {
                    mods.push(nick);
                    mods.sort();
                    saveMods(mods);
                    _user.sendPrivateMessage(STRINGS.mod_added(nick));
                } else {
                    _user.sendPrivateMessage(STRINGS.mod_already(nick));
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.removeMod = function (_user, _mod) {
        if (RS.isAllowed(_user)) {
            var mod = Users.get(_user, _mod);
            var nick = mod.getNick();
            if (mod) {
                var mods = getMods();
                var index = mods.indexOf(nick);
                if (index > -1) {
                    mods.splice(index, 1);
                    saveMods(mods);
                    _user.sendPrivateMessage(STRINGS.mod_removed(nick));
                } else {
                    _user.sendPrivateMessage(STRINGS.mod_isNot(nick));
                }
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    this.showMods = function (_user) {
        if (RS.isAllowed(_user)) {
            if (Settings.MODS) {
                var nicks = "";
                var mods = getMods();
                mods.forEach(function (mod) {
                    if (nicks != "") {
                        nicks += ", ";
                    }
                    nicks += mod;
                });
                _user.sendPrivateMessage(STRINGS.mod_list(nicks));
            } else {
                _user.sendPrivateMessage(STRINGS.command_notAvailable);
            }
        } else {
            _user.sendPrivateMessage(STRINGS.command_notAllowed);
        }
    };

    function getMods() {
        return DB.getObj(Keys.MODERATORS, []);
    }

    function saveMods(_mods) {
        DB.saveObj(Keys.MODERATORS, _mods);
    }

    this.isMod = function (_user) {
        if (Settings.MODS) {
            var mods = getMods();
            return mods.indexOf(_user.getNick()) > -1;
        }
        return false;
    }


}());