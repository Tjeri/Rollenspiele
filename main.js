require("Framework/Core/Bot.js");
require("Framework/Core/Channel.js");
require("Framework/Core/Databases.js");
require("Framework/Core/Log.js");
require("Framework/Core/Users.js");
require("Rollenspiele/Rollenspiele.js");

var App = (new function () {

    this.chatCommands = RS.commands;

    this.onAppStart = function () {
        RS.onAppStart();
    };

    this.onShutdown = function () {
        RS.onShutdown();
    };

    this.onUserJoined = function (user) {
        RS.onUserJoined(user);
    };

    this.onUserLeft = function (user) {
        RS.onUserLeft(user);
    };

    this.onKnuddelReceived = function (sender, receiver, knuddelAmount, transferReason) {
        RS.onKnuddelReceived(sender, receiver, knuddelAmount, transferReason);
    };

    this.onPublicMessage = function (publicMessage) {
        RS.onPublicMessage(publicMessage.getAuthor(), publicMessage.getText());
    };

    this.onPrivateMessage = function (privateMessage) {
        RS.onPrivateMessage(privateMessage);
    };
}());