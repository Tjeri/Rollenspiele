var Users = (new function () {
    var _access = KnuddelsServer.getUserAccess();

    this.getByUid = function (_user, _uid) {
        if (_access.mayAccess(_uid)) {
            return _access.getUserById(_uid);
        } else {
            _user.sendPrivateMessage("Auf den User kann ich nicht zugreifen.");
        }
    };

    this.getByNick = function (_user, _nick) {
        if (_access.exists(_nick)) {
            var id = _access.getUserId(_nick);
            if (_access.mayAccess(id)) {
                return _access.getUserById(id);
            } else {
                _user.sendPrivateMessage("Auf den User kann ich nicht zugreifen.");
            }
        } else {
            _user.sendPrivateMessage("Ein User mit dem Nick existiert nickt.");
        }
    };
}());