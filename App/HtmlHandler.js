var HtmlHandler = (new function ()
{
	var rpgList = AppContent.overlayContent(new HTMLFile('channelWindow.html'), 100, 40);
	var rpgHint = AppContent.overlayContent(new HTMLFile('channelWindow.html'), 200, 80);

	this.removeContent = function (_user)
	{
		_user.removeAppContent();
	};

	this.sendAllRPGHint = function ()
	{
		var users = Channel.getUsers(UserType.Human);
		users.forEach(function (user)
		{
			HtmlHandler.sendRPGHint(user);
		});
	};

	this.sendEvent = function (_user, _type, _data)
	{
		if (Config.modulePopupOverlay())
		{
			_user.sendEvent(_type, _data, AppViewMode.Popup);
		}
		else
		{
			_user.sendEvent(_type, _data);
		}
	};

	this.sendRPGOverview = function (_user)
	{
		var pageData = RPGS.getPageData(_user, true, RPGList.All, null);
		var rpgOverview = new HTMLFile('rpgOverview.html', pageData);

		var content = AppContent.overlayContent(rpgOverview, 800, 500);
		if (Config.modulePopupOverlay())
		{
			content = AppContent.popupContent(rpgOverview, 800, 500);
		}
		_user.sendAppContent(content);
	};

	this.sendRPGDetails = function (_user, _currentRPG)
	{
		var rpgOverview = new HTMLFile('rpgOverview.html', RPGS.getPageData(_user, true, null, _currentRPG));

		var content = AppContent.overlayContent(rpgOverview, 800, 500);
		if (Config.modulePopupOverlay())
		{
			content = AppContent.popupContent(rpgOverview, 800, 500);
		}
		_user.sendAppContent(content);
	};

	this.sendRPGHint = function (_user)
	{
		var hint = RPGMode.rpgModeActive() ? rpgHint : rpgList;
		if (_user.canSendAppContent(hint))
		{
			_user.sendAppContent(hint);
		}
	};

}());