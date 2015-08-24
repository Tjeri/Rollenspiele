var Users = (new function () {
    var _access = KnuddelsServer.getUserAccess();

    this.getByUid = function (_uid) {
        if (_access.mayAccess(_uid)) {
            return _access.getUserById(_uid);
        }
    };

    this.getByNick = function (_user, _nick) {
        var nick = _nick.trim();
        if (_access.exists(nick)) {
            var uid = _access.getUserId(nick);
            if (_access.mayAccess(uid)) {
                return _access.getUserById(uid);
            } else {
                _user.sendPrivateMessage("Ich kann auf '" + _access.getNick(uid) + "' nicht zugreifen. Der User muss den Channel schon einmal betreten haben.");
            }
        } else {
            _user.sendPrivateMessage("Ein User mit dem Nick '" + nick + "' existiert nicht.");
        }
    };
}());