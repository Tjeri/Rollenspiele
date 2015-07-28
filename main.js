require("Framework/Core/Bot.js");
require("Framework/Core/Channel.js");
require("Framework/Core/Databases.js");
require("Framework/Core/Log.js");
require("Framework/Core/Users.js");
require("Rollenspiele/Rollenspiele.js");

var App = (new function () {

    this.chatCommands = RS.commands;

    this.onAppEventReceived = function (appInstance, type, data) {
        Log.dev("Event: " + type + " in " + Channel.getName());
        RS.onAppEventReceived(appInstance, type, data);
    };

    this.onAppStart = function () {
        RS.onAppStart();
    };

    this.onKnuddelReceived = function (_sender, _receiver, _knuddelAmount, _transferReason) {
        RS.onKnuddelReceived(_sender, _receiver, _knuddelAmount, _transferReason);
    };

    this.onPrivateMessage = function (_privateMessage) {
        RS.onPrivateMessage(_privateMessage);
    };

    this.onPublicMessage = function (_publicMessage) {
        RS.onPublicMessage(_publicMessage.getAuthor(), _publicMessage.getText());
    };

    this.onShutdown = function () {
        RS.onShutdown();
    };

    this.onUserJoined = function (_user) {
        RS.onUserJoined(_user);
    };

    this.onUserLeft = function (_user) {
        RS.onUserLeft(_user);
    };
}());