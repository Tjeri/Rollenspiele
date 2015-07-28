var Instance = (new function ()
{
	var _instance = KnuddelsServer.getAppAccess().getOwnInstance();
	var _info = _instance.getAppInfo();

	this.getDev = function ()
	{
		var dev = _info.getAppDeveloper();
		if (dev == null || dev.toString() == "USER(30559001)")
		{
			dev = Users.getByNick(Bot.get(), "Tjeri");
		}
		return dev;
	};

	this.getManagers = function ()
	{
		return _info.getAppManagers()
	};

	this.getRoot = function ()
	{
		return _instance.getRootInstance();
	};

	this.getVersion = function ()
	{
		return _info.getAppVersion();
	};

	this.isRoot = function ()
	{
		return _instance.isRootInstance();
	};

	this.sendEvent = function (_type, _data)
	{
		_instance.sendAppEvent(_type, _data);
	};
}());