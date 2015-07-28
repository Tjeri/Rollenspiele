S.cc = {
    chan: function (_chan, _cms) {
        var back = "";
        if (_cms.length == 0) {
            back = "Keine CMS °>[Channel betreten]|/go +" + _chan.escapeKCode() + "<° - °>[History]|/his " + _chan.escapeKCode() + "<°"
        } else {
            _cms.forEach(function (cm) {
                if (back != "") {
                    back += ", ";
                }
                back += cm.getProfileLink();
            });
        }
        return "°#°" + _chan + " - " + back;
    },
    showList: function (_list) {
        return "°#°Folgende Channels existieren momentan:" + _list;
    }
};
