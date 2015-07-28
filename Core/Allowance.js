var Allowance = (new function ()
{
	this.isAllowed = function (_user, _silent)
	{
		var allowed = Config.debug() || Allowance.isDev(_user, _silent) || _user.isAppManager() || _user.isChannelModerator();
		if (!allowed && !_silent)
		{
			_user.sendPrivateMessage("Leider steht dir diese Funktion nicht zur Verfügung.");
		}
		return allowed;
	};

	this.isDev = function (_user, _silent)
	{
		var allowed = _user.isAppDeveloper() || _user.equals(Instance.getDev());
		if (!allowed && !_silent)
		{
			_user.sendPrivateMessage("Leider steht dir diese Funktion nicht zur Verfügung.");
		}
		return allowed;
	};
}());