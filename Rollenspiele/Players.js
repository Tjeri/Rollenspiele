var Players = (new function () {

    this.rpgEnd = function (_user, _id) {
        var key = Keys.TIME_START + _id;
        var startTime = UserDB.getNum(_user, key, Date.now());
        UserDB.delNum(_user, key);
        var time = Date.now() - startTime;
        UserDB.addNum(_user, Keys.TIME, time);
    };

    this.rpgEndAll = function (_rpg) {
        _rpg.players.forEach(function (uid) {
            var user = Users.getByUid(Bot.get(), uid);
            Players.rpgEnd(user, _rpg.id);
        });
    };

    this.rpgGetPlayTime = function (_user, _id) {
        var startTime = UserDB.getNum(_user, Keys.TIME_START + _id);
        return Date.now() - startTime;
    };

    this.rpgStart = function (_user, _id) {
        UserDB.saveNum(_user, Keys.TIME_START + _id, Date.now());
    };

    this.rpgStartAll = function (_rpg) {
        _rpg.players.forEach(function (uid) {
            Players.rpgStart(Users.getByUid(Bot.get(), uid), _rpg.id);
        });
    };
}());