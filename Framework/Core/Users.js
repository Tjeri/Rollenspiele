var Users = (new function () {

    this.canAccess = function (user, nick, uid) {
        if (KnuddelsServer.canAccessUser(uid)) {
            return true
        } else if (user) {
            user.sendPrivateMessage(STRINGS.cantAccess(nick));
        }
    };

    this.exists = function (user, nick) {
        if (KnuddelsServer.userExists(nick)) {
            return true;
        } else {
            if (user) {
                user.sendPrivateMessage(STRINGS.wrongNick(nick));
            }
            return false;
        }
    };

    this.get = function (user, nick) {
        if (Users.exists(user, nick)) {
            var uid = KnuddelsServer.getUserId(nick);
            if (Users.canAccess(user, nick, uid)) {
                return KnuddelsServer.getUser(uid);
            }
        }
    };
}());