var Log = (new function () {
    var _log = KnuddelsServer.getDefaultLogger();

    this.debug = function (msg) {
        _log.debug(msg);
    };
    this.d = function (msg) {
        _log.debug(msg);
    };

    this.error = function (msg) {
        _log.error(msg);
    };
    this.e = function (msg) {
        _log.error(msg);
    };

    this.fatal = function (msg) {
        _log.fatal(msg);
    };
    this.f = function (msg) {
        _log.fatal(msg);
    };

    this.info = function (msg) {
        _log.info(msg);
    };
    this.i = function (msg) {
        _log.info(msg);
    };

    this.warn = function (msg) {
        _log.warn(msg);
    };
    this.w = function (msg) {
        _log.warn(msg);
    };

    this.dev = function (msg) {
        KnuddelsServer.getAppDeveloper().sendPostMessage("Debug", msg);
    };

}());