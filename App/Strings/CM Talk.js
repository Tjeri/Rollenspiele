S.cmt = {
    cmLeft: function (_cm, _nicks) {
        return _cm.getProfileLink() + " hat den Channel verlassen. " + S.cmt.link(_nicks);
    },
    link: function (_nicks) {
        return "°>[CM Absprache]|/pp " + _nicks + "<°";
    },
    newCM: function (_cm, _nicks) {
        return _cm.getProfileLink() + " hat den Channel betreten. " + S.cmt.link(_nicks);
    }

};
