function Config()
{
	// Don't remove debug!
	this.debug = false;

	this.brackets = "{[(<>)]}";
	this.timeout = 4 * 60 * 1000;
	this.timeoutPublic = 30 * 60 * 1000;
	this.version = "0.7";

	this.moduleChannelCover = true;
	this.moduleCMTalk = true;
	this.moduleHtml = true;
	this.moduleHtmlRPGs = false;
	this.modulePopupOverlay = false;
	this.moduleRPGMode = true;
	this.moduleRPGMods = true;
}

Config.cfg = new Config();

/** SETTINGS - CHANGEABLE **/
Config.brackets = function ()
{
	return Config.get().brackets;
};

Config.timeout = function ()
{
	return Config.get().timeout;
};

Config.timeoutPublic = function ()
{
	return Config.get().timeoutPublic;
};

Config.version = function ()
{
	return Config.get().version;
};

/** MODULES - CHANGEABLE **/
Config.moduleChannelCover = function ()
{
	return Config.get().moduleChannelCover;
};

Config.moduleCMTalk = function ()
{
	return Config.get().moduleCMTalk;
};

Config.moduleHtml = function ()
{
	return Config.get().moduleHtml;
};

Config.moduleHtmlRPGs = function ()
{
	return Config.get().moduleHtmlRPGs;
};

Config.modulePopupOverlay = function ()
{
	return Config.get().modulePopupOverlay;
};

Config.moduleRPGMode = function ()
{
	return Config.get().moduleRPGMode;
};

Config.moduleRPGMods = function ()
{
	return Config.get().moduleRPGMods;
};

/** DON'T CHANGE FROM HERE! **/

/** Debug - Handles every User as CM (Allowance.isAllowed()) **/
Config.debug = function ()
{
	return Config.get().debug;
};

Config.module = function (_name, _value)
{
	return "°#°" + _name + ": " + _value + " °>[Ändern]|/config " + _name + ":" + !_value + "<°";
};

Config.setting = function (_name, _value)
{
	return "°#°" + _name + ": " + _value + " °>[Ändern]|/tf-overridesb /config " + _name + ":[VAL]<°";
};

Config.get = function ()
{
	return DB.getObj(Keys.CONFIG, Config.cfg);
};

Config.save = function (_cfg)
{
	DB.saveObj(Keys.CONFIG, _cfg);
};

Config.set = function (prop, val)
{
	var cfg = Config.get();
	if (cfg.hasOwnProperty(prop))
	{
		cfg[prop] = eval(val);
		Config.save(cfg);
		return true;
	}
};

Config.show = function (_user)
{
	var str = "°#°Momentane Einstellungen:";
	var cfg = Config.get();

	var settings = [];
	var modules = [];
	for (var prop in cfg)
	{
		if (cfg.hasOwnProperty(prop))
		{
			if (prop.startsWith("module"))
			{
				modules.push(prop);
			}
			else
			{
				settings.push(prop);
			}
		}
	}
	settings.sort();
	modules.sort();

	settings.forEach(function (prop)
	{
		str += Config.setting(prop, cfg[prop]);
	});
	str += "°#°";
	modules.forEach(function (prop)
	{
		str += Config.module(prop, cfg[prop]);
	});
	_user.sendPrivateMessage(str);
};

Config.update = function (_user)
{
	var version = Instance.getVersion();
	if (Config.version() != version)
	{
		var cfg = Config.get();
		cfg.version = version;

		for (var prop in Config.cfg)
		{
			if (Config.cfg.hasOwnProperty(prop) && !cfg.hasOwnProperty(prop))
			{
				cfg[prop] = Config.cfg[prop];
			}
		}

		Config.save(cfg);
		_user.sendPrivateMessage("Update der Config.js abgeschlossen.");
	}
};