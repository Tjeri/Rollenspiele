var CMTalk = (new function () {

    this.onUserJoined = function (_user) {
        if (_user.isChannelModerator()) {
            var cms = Channel.getOnlineCMs();
            if (cms.length > 1) {
                cms.forEach(function (cm) {
                    var nicks = "";
                    cms.forEach(function (cm2) {
                        if (cm2.getNick() != cm.getNick()) {
                            if (nicks != "") {
                                nicks += ", ";
                            }
                            nicks += cm2.getNick();
                        }
                    });
                    cm.sendPrivateMessage(S.cmt.newCM(_user, nicks));
                });
            }
        }
    };

    this.onUserLeft = function (_user) {
        if (_user.isChannelModerator()) {
            var cms = Channel.getOnlineCMs();
            if (cms.length > 1) {
                cms.forEach(function (cm) {
                    var nicks = "";
                    cms.forEach(function (cm2) {
                        if (cm2.getNick() != cm.getNick()) {
                            if (nicks != "") {
                                nicks += ", ";
                            }
                            nicks += cm2.getNick();
                        }
                    });
                    cm.sendPrivateMessage(S.cmt.cmLeft(_user, nicks));
                });
            }
        }
    };

}());