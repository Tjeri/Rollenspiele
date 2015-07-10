var Bot = (new function () {
    var _bot = KnuddelsServer.getDefaultBotUser();

    this.get = function () {
        return _bot;
    };

    this.getNick = function () {
        return _bot.getNick();
    };

    this.isBot = function(user) {
        return user.getNick() == _bot.getNick();
    };

    this.knuddel = function (user, count) {
        var amount = KnuddelAmount(count);
       
        _bot.transferKnuddel(user, amount);
    };

    this.post = function (user, topic, text) {
        user.sendPostMessage(topic, text);
    };

    this.prv = function (users, text) {
        _bot.sendPrivateMessage(text, users);
    };

    this.pub = function (text) {
        _bot.sendPublicMessage(text);
    };
}());