var Users = (new function () {
    var _access = KnuddelsServer.getUserAccess();

    this.getByUid = function (_uid) {
        if (_access.mayAccess(_uid)) {
            return _access.getUserById(_uid);
        }
    };

    this.getByNick = function (_user, _nick) {
        if (_access.exists(_nick)) {
            var id = _access.getUserId(_nick);
            if (_access.mayAccess(id)) {
                return _access.getUserById(id);
            } else {
                _user.sendPrivateMessage("Ich kann auf " + _nick + " nicht zugreifen. Der User muss den Channel schon einmal betreten haben.");
            }
        } else {
            _user.sendPrivateMessage("Ein User mit dem Nick '" + _nick + "'existiert nicht.");
        }
    };
}());