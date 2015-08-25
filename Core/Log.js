var Log = (new function ()
{
	var _log = KnuddelsServer.getDefaultLogger();
	var _dev = Instance.getDev();

	this.debug = function (msg)
	{
		_log.debug(msg);
	};
	this.d = function (msg)
	{
		_log.debug(msg);
	};

	this.error = function (msg)
	{
		_log.error(msg);
	};
	this.e = function (msg)
	{
		_log.error(msg);
	};

	this.fatal = function (msg)
	{
		_log.fatal(msg);
	};
	this.f = function (msg)
	{
		_log.fatal(msg);
	};

	this.info = function (msg)
	{
		_log.info(msg);
	};
	this.i = function (msg)
	{
		_log.info(msg);
	};

	this.warn = function (msg)
	{
		_log.warn(msg);
	};
	this.w = function (msg)
	{
		_log.warn(msg);
	};

	this.dev = function (msg)
	{
		if (_dev.isOnline())
		{
			_dev.sendPrivateMessage("Debug:°#°" + msg);
		}
		else
		{
			_dev.sendPostMessage("Debug", msg);
		}
	};

	this.use = function (_user, _command)
	{
		var messages = DB.getObj(Keys.LOG_USAGE, []);
		messages.push(JSON.stringify(new Date().toString()) + ": " + _user.getProfileLink() + " hat '" + _command + "' benutzt.");
		DB.saveObj(Keys.LOG_USAGE, messages);
	};

	this.get = function (_force)
	{
		var messages = DB.getObj(Keys.LOG_USAGE, []);
		var message = "";
		messages.forEach(function (msg)
		{
			if (msg)
			{
				message += "°#°";
			}
			message += msg;
		});
		if (_force && !message) {
			message = "Keine Vorkommnisse.";
		}
		if (message)
		{
			Instance.getDev().sendPostMessage("Usage Log", message);
			DB.delObj(Keys.LOG_USAGE, []);
			clearTimeout(DB.getNum(Keys.LOG_TIMEOUT));
		}
		var timeout = setTimeout(function ()
		{
			Log.get();
		}, 4 * 60 * 60 * 1000);
		DB.saveNum(Keys.LOG_TIMEOUT, timeout);
	};

	var timeout = setTimeout(function ()
	{
		Log.get();
	}, 4 * 60 * 60 * 1000);
	DB.saveNum(Keys.LOG_TIMEOUT, timeout);
}());