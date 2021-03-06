var Channel = (new function () {
    var _chan = KnuddelsServer.getChannel();
    var _cfg = _chan.getChannelConfiguration();
    var _rights = _cfg.getChannelRights();

    this.getCMs = function () {
        return _rights.getChannelModerators();
    };

    this.getOnlineCMs = function () {
        var cms = [];
        Channel.getUsers(UserType.Human).forEach(function (user) {
            if (user.isChannelModerator()) {
                cms.push(user);
            }
        });
        cms.sort();
        return cms;
    };

    this.getConfig = function () {
        return _cfg;
    };

    this.getEMs = function () {
        return _rights.getEventModerators();
    };

    this.getMainName = function () {
        var chan = Channel.getName();
        if (!KnuddelsServer.getAppAccess().getOwnInstance().isRootInstance()) {
            var index = chan.lastIndexOf(" ");
            chan = chan.substr(0, index).trim();
        }
        return chan;
    };

    this.getName = function () {
        return _chan.getChannelName();
    };

    this.getOwners = function () {
        return _rights.getChannelOwners();
    };

    this.getUsers = function (userTypes) {
        if (userTypes) {
            return _chan.getOnlineUsers(userTypes);
        } else {
            return _chan.getOnlineUsers();
        }
    };
}());