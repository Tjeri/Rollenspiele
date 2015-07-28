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

    this.showList = function (user) {
        var output = STRINGS.channelCover_existingChannels;
        var channels = getChanDB();
        for (var i = 0; i < channels.length; ++i) {
            var name = channels[i];
            output += "°#°" + name + " - ";
            var chanCMs = getCMDB(name);
            if (chanCMs.length == 0) {
                output += STRINGS.channelCover_noCMs(name);
            } else {
                for (var j = 0; j < chanCMs.length; ++j) {
                    if (j != 0) {
                        output += ", ";
                    }
                    output += chanCMs[j].getProfileLink();
                }
            }
        }
        user.sendPrivateMessage(output);
    };

    this.userJoined = function (user) {
        var chan = Channel.getName();
        var channels = getChanDB();
        if (channels.indexOf(chan) == -1) {
            channels.push(chan);
            channels.sort();
            saveChanDB(channels);
            saveCMDB(chan, Channel.getOnlineCMs());
        } else if (user.isChannelModerator()) {
            saveCMDB(chan, Channel.getOnlineCMs());
        }
    };

    this.userLeft = function (user) {
        var chan = Channel.getName();
        if (Channel.getUsers(UserType.Human).length == 0) {
            var channels = getChanDB();
            var index = channels.indexOf(chan);
            channels.splice(index, 1);
            saveChanDB(channels);
        } else if (user.isChannelModerator()) {
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