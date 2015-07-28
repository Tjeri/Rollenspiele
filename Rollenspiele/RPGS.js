var RPGS = (new function () {
    this.addRPG = function (_rpg) {
        var rpgs = RPGS.getAllIDs();
        rpgs.push(_rpg.id);
        DB.saveObj(Keys.RPGS_ALL, rpgs);
    };

    this.getAllIDs = function () {
        return DB.getObj(Keys.RPGS_ALL, []);
    };

    this.getAllRPGs = function () {
        var rpgs = RPGS.getAllIDs();
        var result = [];
        rpgs.forEach(function (id) {
            result.push(RPGS.getRPG(id));
        });
        return result;
    };

    this.getForUser = function (_user) {
        var rpgs = RPGS.getAllIDs();
        var uid = _user.getUserId();
        var result = [];
        rpgs.forEach(function (id) {
            var rpg = RPGS.getRPG(id);
            if (RPG.isPlaying(rpg, uid)) {
                result.push(rpg);
            }
        });
        return result;
    };

    this.getRPG = function (_id) {
        return DB.getObj(Keys.RPG + _id, null);
    };

    this.getRunning = function (allChans) {
        var rpgs = RPGS.getAllIDs();
        var result = [];
        rpgs.forEach(function (id) {
            var rpg = RPGS.getRPG(id);
            if (rpg.running && (allChans || rpg.channel == Channel.getName())) {
                result.push(rpg);
            }
        });
        return result;
    };

    this.removeRPG = function (_rpg) {
        var rpgs = RPGS.getAllIDs();
        var index = rpgs.indexOf(_rpg.id);
        rpgs.splice(index, 1);
        DB.saveObj(Keys.RPGS_ALL, rpgs);
        DB.delObj(Keys.RPG + _rpg.id);
    };
}());