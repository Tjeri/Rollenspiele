var ChannelCover = (new function () {
    var init = false;

    this.initialize = function () {
        if (Settings.CHANS && !init) {
            init = true;

            var channels = getChanDB();
            if (channels.indexOf(RS.name) == -1) {
                channels.push(RS.name);
                channels.sort();
                saveChanDB(channels);
            } else {
                Log.dev("Tried 2 initialize ChannelCover in " + RS.name + ". Channel was already on the List.")
            }
            var cms = Channel.getOnlineCMs();
            saveCMDB(RS.name, cms);
        }
    };

    this.remove = function () {
        if (Settings.CHANS) {
            var channels = getChanDB();
            for (var i = 0; i < channels.length; ++i) {
                if (channels[i] == RS.name) {
                    channels.splice(i, 1);
                    init = false;
                    break;
                }
            }
            saveChanDB(channels);
        }
    };

    this.showList = function (user) {
        if (Settings.CHANS) {
            var output = STRINGS.EXISTING_CHANS;
            var channels = getChanDB();
            for (var i = 0; i < channels.length; ++i) {
                var name = channels[i];
                output += "°#°" + name + " - ";
                var chanCMs = getCMDB(name);
                if (chanCMs.length == 0) {
                    output += STRINGS.noCMs(name);
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
        } else {
            user.sendPrivateMessage(STRINGS.NOT_AVAILABLE);
        }
    };

    this.userJoined = function (user) {
        if (Settings.CHANS) {
            var channels = getChanDB();
            if (channels.indexOf(RS.name) == -1) {
                this.initialize();
            } else if (user.isChannelModerator()) {
                var cms = Channel.getOnlineCMs();
                saveCMDB(RS.name, cms);
            }
        }
    };

    this.userLeft = function (user) {
        if (Settings.CHANS) {
            if (Channel.getUsers(UserType.Human).length == 0) {
                var channels = getChanDB();
                for (var j = 0; j < channels.length; ++j) {
                    if (channels[j] == RS.name) {
                        channels.splice(j, 1);
                        init = false;
                        break;
                    }
                }
                saveChanDB(channels);
            } else if (user.isChannelModerator()) {
                var cms = Channel.getOnlineCMs();
                saveCMDB(RS.name, cms);
            }
        }
    };

    function getChanDB() {
        return DB.getObj(Keys.CHANNELS, []);
    }

    function getCMDB(_chan) {
        return DB.getObj(_chan, []);
    }

    function saveChanDB(_db) {
        DB.saveObj(Keys.CHANNELS, _db);
    }

    function saveCMDB(_chan, _db) {
        DB.saveObj(_chan, _db);
    }
}());