var HtmlBox = (new function () {
    var rpgHint = AppContent.overlayContent(new HTMLFile('display.html'), 200, 100);

    this.removeContent = function (user) {
        user.removeAppContent();
    };

    this.removeAllContent = function () {
        var users = Channel.getUsers(UserType.Human);
        users.forEach(function (user) {
            user.removeAppContent();
        });
    };

    this.sendAllRPGHint = function () {
        var users = Channel.getUsers(UserType.Human);
        users.forEach(function (user) {
            if (user.canSendAppContent(rpgHint)) {
                user.sendAppContent(rpgHint);
            }
        });
    };

    this.sendRPGHint = function (user) {
        if (user.canSendAppContent(rpgHint)) {
            user.sendAppContent(rpgHint);
        }
    };

}());