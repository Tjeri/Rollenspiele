var ChannelCover = (new function () {
    this.initialize = function () {
        var chan = Channel.getName();
        var channels = getChanDB();
        if (channels.indexOf(chan) == -1) {
            channels.push(chan);
            channels.sort();
            saveChanDB(channels);
            saveCMDB(chan, Channel.getOnlineCMs());
        }
    };

    this.showList = function (_user) {
        var list = "";
        getChanDB().forEach(function (channel) {
            list += S.cc.chan(channel, getCMDB(channel));
        });
        _user.sendPrivateMessage(S.cc.showList(list));
    };

    this.userJoined = function (_user) {
        var chan = Channel.getName();
        var channels = getChanDB();
        if (channels.indexOf(chan) == -1) {
            channels.push(chan);
            channels.sort();
            saveChanDB(channels);
            saveCMDB(chan, Channel.getOnlineCMs());
        } else if (_user.isChannelModerator()) {
            saveCMDB(chan, Channel.getOnlineCMs());
        }
    };

    this.userLeft = function (_user) {
        var chan = Channel.getName();
        if (Channel.getUsers(UserType.Human).length == 0) {
            var channels = getChanDB();
            var index = channels.indexOf(chan);
            channels.splice(index, 1);
            saveChanDB(channels);
        } else if (_user.isChannelModerator()) {
            var cms = Channel.getOnlineCMs();
            saveCMDB(chan, cms);
        }
    };

    function getChanDB() {
        return DB.getObj(Keys.CHANNELS, []);
    }

    function getCMDB(_chan) {
        return DB.getObj(Keys.CHANNEL + _chan, []);
    }

    function saveChanDB(_db) {
        DB.saveObj(Keys.CHANNELS, _db);
    }

    function saveCMDB(_chan, _db) {
        DB.saveObj(Keys.CHANNEL + _chan, _db);
    }
}());