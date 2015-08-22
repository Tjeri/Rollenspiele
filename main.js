require("Core/Core.js");
requireFile("Rollenspiele");

var App = (new function ()
{
	this.chatCommands = RS.commands;

	this.mayShowPublicMessage = function (_publicMessage)
	{
		return RS.mayShowPublicMessage(_publicMessage.getAuthor(), _publicMessage.getText());
	};

	this.onAppEventReceived = function (appInstance, type, data)
	{
		RS.onAppEventReceived(appInstance, type, data);
	};

	this.onAppStart = function ()
	{
		RS.onAppStart();
	};

	this.onEventReceived = function (_user, _type, _data)
	{
		RS.onEventReceived(_user, _type, _data);
	};

	this.onKnuddelReceived = function (_sender, _receiver, _knuddelAmount, _transferReason)
	{
		RS.onKnuddelReceived(_sender, _receiver, _knuddelAmount, _transferReason);
	};

	this.onPrivateMessage = function (_privateMessage)
	{
		RS.onPrivateMessage(_privateMessage);
	};

	this.onPublicMessage = function (_publicMessage)
	{
		RS.onPublicMessage(_publicMessage.getAuthor(), _publicMessage.getText());
	};

	this.onShutdown = function ()
	{
		RS.onShutdown();
	};

	this.onUserJoined = function (_user)
	{
		RS.onUserJoined(_user);
	};

	this.onUserLeft = function (_user)
	{
		RS.onUserLeft(_user);
	};
}());