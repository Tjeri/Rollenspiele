var ChannelCover = (new function () {
    var init = false;

    var channels;
    var cms;

    var name = Channel.getName();

    this.getData = function() {
        Log.d(init);
        Log.d(channels);
        Log.d(cms);
    };

    this.reset = function() {
        init = false;
        channels = [];
        cms = [];
    };

    this.initialize = function () {
        if (Settings.CHANS && !init) {
            init = true;

            channels = DB.getObj(Keys.CHANNELS, []);
            if (channels.indexOf(name) == -1) {
                channels.push(name);
                DB.saveObj(Keys.CHANNELS, channels);
            } else {
                Log.dev("Tried 2 initialize ChannelCover in " + name + ". Channel was already on the List.")
            }
            cms = Channel.getOnlineCMs();
            DB.saveObj(name, cms);
        }
    };

    this.remove = function () {
        if (Settings.CHANS) {
            channels = DB.getObj(Keys.CHANNELS, []);
            for (var i = 0; i < channels.length; ++i) {
                if (channels[i] == name) {
                    channels.splice(i, 1);
                    break;
                }
            }
            DB.saveObj(Keys.CHANNELS, channels);
        }
    };

    this.showList = function (user) {
        if (Settings.CHANS) {
            var output = STRINGS.EXISTING_CHANS;
            channels = DB.getObj(Keys.CHANNELS, []);
            channels.sort();
            for (var i = 0; i < channels.length; ++i) {
                var cName = channels[i];
                output += "°#°" + cName + " - ";
                var chanCMs = DB.getObj(cName, []);
                if (chanCMs.length == 0) {
                    output += STRINGS.noCMs(cName);
                } else {
                    for (var j = 0; j < chanCMs.length; ++j) {
                        if (j != 0) {
                            output += ", ";
                        }
                        output += chanCMs[j].getProfileLink();
                    }
                }
            }
            Log.d(output.escapeKCode());
            user.sendPrivateMessage(output);
        } else {
            user.sendPrivateMessage(STRINGS.NOT_AVAILABLE);
        }
    };

    this.userJoined = function (user) {
        if (Settings.CHANS) {
            if (channels.indexOf(name) == -1) {
                this.initialize();
            } else if (user.isChannelModerator()) {
                cms.push(user);
                DB.saveObj(name, cms);
            }
        }
    };

    this.userLeft = function (user) {
        if (Settings.CHANS) {
            if (Channel.getUsers(UserType.Human).length == 0) {
                channels = DB.getObj(Keys.CHANNELS, []);
                for (var j = 0; j < channels.length; ++j) {
                    if (channels[j] == name) {
                        channels.splice(j, 1);
                        break;
                    }
                }
                DB.saveObj(Keys.CHANNELS, channels);
            } else if (user.isChannelModerator()) {
                cms = Channel.getOnlineCMs();
                DB.saveObj(name, cms);
            }
        }
    };
}());