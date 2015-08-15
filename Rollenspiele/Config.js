function Config() {
    this.brackets = "{[(<>)]}";
    this.debug = false;
    this.timeout = 4 * 60 * 1000;
    this.version = "0.3";

    this.moduleChannelCover = true;
    this.moduleHTMLBox = true;
    this.moduleRPGMode = true;
    this.moduleRPGMods = true;
}

Config.cfg = new Config();

Config.brackets = function () {
    return Config.get().brackets;
};

Config.debug = function () {
    return Config.get().debug;
};

Config.timeout = function () {
    return Config.get().timeout;
};

Config.version = function () {
    return Config.get().version;
};

Config.moduleChannelCover = function () {
    return Config.get().moduleChannelCover;
};

Config.moduleHTMLBox = function () {
    return Config.get().moduleHTMLBox;
};

Config.moduleRPGMode = function () {
    return Config.get().moduleRPGMode;
};

Config.moduleRPGMods = function () {
    return Config.get().moduleRPGMods;
};

Config.get = function () {
    return DB.getObj(Keys.CONFIG, Config.cfg);
};

Config.save = function (_cfg) {
    DB.saveObj(Keys.CONFIG, _cfg);
};

Config.set = function (prop, val) {
    var cfg = Config.get();
    if (cfg.hasOwnProperty(prop)) {
        cfg[prop] = eval(val);
        Config.save(cfg);
        return true;
    }
};

Config.show = function (_user) {
    var str = "Momentane Einstellungen:";
    var cfg = Config.get();
    for (var prop in cfg) {
        str += "°#°" + prop + ": " + cfg[prop] + " °>[Ändern]|/tf-overridesb /config " + prop + ":[VAL]<°";
    }
    _user.sendPrivateMessage(str);
};

Config.update = function (_user) {
    var version = KnuddelsServer.getAppInfo().getAppVersion();
    if (Config.version() != version) {
        var cfg = Config.get();
        cfg.version = version;
        Config.save(cfg);
        _user.sendPrivateMessage("Update von Config.js abgeschlossen.");
    }
};