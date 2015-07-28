S.welc = {
    add: function (_user, _msg) {
        return _user.getProfileLink() + " wird ab nun mit folgendem Text begrüßt: °#°" + replaceHashtag(_msg);
    },
    list: function (_users) {
        if (_users.length == 0) {
            return "Momentan erhält niemand eine eigene Begrüßung.";
        }
        var nicks = "";
        _users.forEach(function (user) {
            if (nicks != "") {
                nicks += ", ";
            }
            var nick = user.getNick();
            nicks += "°>" + nick + "|/welcome ?" + nick + "<°";
        });
        return "Folgende Leute haben gerade eine eigene Begrüßung: " + nicks;
    },
    msg: function (_user, _msg) {
        return _user.getProfileLink() + " hat folgende Nachricht zur Begrüßung: °#°" + replaceHashtag(_msg);
    },
    notReg: function (_user) {
        return "Keine Begrüßung für " + _user.getProfileLink() + " registriert.";
    },
    remove: function (_user) {
        return _user.getProfileLink() + " hat nun keine eigene Begrüßung mehr.";
    }
};
