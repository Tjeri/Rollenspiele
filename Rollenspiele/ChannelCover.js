var ChannelCover = (new function () {
    var init = false;

    var channels;
    var cms;

    this.initialize = function (name) {
        if (Settings.CHANS && !init) {
            init = true;

            channels = DB.getObj(Keys.CHANNELS, []);
            if (channels.indexOf(name) == -1) {
                channels.push(name);
                DB.saveObj(Keys.CHANNELS, channels);
            } else {
                Log.dev("Tried to initialize ChannelCover in " + name + ". Channel was already on the List.")
            }
            cms = Channel.getOnlineCMs();
            DB.saveObj(name, cms);
        }
    };

    this.remove = function (name) {
        if (Settings.CHANS) {
            channels = DB.getObj(Keys.CHANNELS, []);
            for (var i = 0; i < channels.length; ++i) {
                if (channels[i] == Channel.getName()) {
                    channels.splice(i, 1);
                    break;
                }
            }
            DB.saveObj(Keys.CHANNELS, channels);
        }
    }
}());