var RPGMode = (new function ()
{
	var rpgMode = false;

	this.startRPGMode = function (_silent)
	{
		if (!rpgMode)
		{
			rpgMode = true;
			DB.saveNum(Keys.RPG_MODE + Channel.getName(), 1);
			DB.saveNum(Keys.TIME_START + Channel.getName(), Date.now());
			if (Config.moduleRPGMode())
			{
				if (Config.moduleHtml())
				{
					HtmlHandler.sendAllRPGHint();
				}
				if (!_silent)
				{
					RS.sendPub(S.rpgm.on);
				}
			}
		}
	};

	this.endRPGMode = function (_silent)
	{
		if (rpgMode)
		{
			rpgMode = false;
			DB.delNum(Keys.RPG_MODE + Channel.getName());
			var startTime = DB.getNum(Keys.TIME_START + Channel.getName(), 0);
			DB.delNum(Keys.TIME_START + Channel.getName());
			DB.addNum(Keys.TIME_CHANNEL + Channel.getName(), Date.now() - startTime);
			if (Config.moduleHtml())
			{
				HtmlHandler.sendAllRPGHint();
			}
			if (Config.moduleRPGMode())
			{
				if (!_silent)
				{
					RS.sendPub(S.rpgm.off);
				}
			}
		}
	};

	this.rpgModeActive = function ()
	{
		return Config.moduleRPGMode() && rpgMode;
	};

	this.updateTime = function (_channel, _time)
	{
		DB.addNum(Keys.TIME_CHANNEL + _channel, _time);
	};

	this.mayShowPublicMessage = function (_user, _msg)
	{
		if (rpgMode && !isPlaying(_user))
		{
			_msg = _msg.trim();
			var start = isValidBracket(_msg.charAt(0));
			var end = isValidBracket(_msg.charAt(_msg.length - 1));

			if (!start || !end)
			{
				if ((start || end) && _msg.length == 1)
				{
					return true;
				}

				if (_user.getClientType() == ClientType.Android && (start || end)) {
					var time = UserDB.getNum(_user, Keys.MAY_SHOW_PM, 0);
					if (Date.now() - time > Config.timeoutPublic()) {
						UserDB.saveNum(_user, Keys.MAY_SHOW_PM, Date.now());
						_user.sendPrivateMessage(S.rpgm.pub(start, end));
						return true;
					}
				}
				_user.sendPrivateMessage(S.rpgm.pub(start, end));
				return false;
			}
		}
		return true;
	};

	this.onAppStart = function ()
	{
		if (DB.hasNum(Keys.RPG_MODE + Channel.getName()))
		{
			var startTime = DB.getNum(Keys.TIME_START + Channel.getName(), 0);
			DB.addNum(Keys.TIME_CHANNEL + Channel.getName(), Date.now() - startTime);
			RPGMode.startRPGMode(true);
		}
		if (Config.moduleHtml())
		{
			HtmlHandler.sendAllRPGHint();
		}
	};

	this.userJoined = function (_user)
	{
		if (rpgMode)
		{
			Bot.prv(_user, S.rpgm.join);
		}
	};

	this.userLeft = function (_user)
	{
		if (rpgMode)
		{
			if (isPlaying(_user))
			{
				//setTimeout(function () {
				//    if (!_user.isOnlineInChannel()) {
				//        var rpg = getRPGByNick(nick);
				//        if (rpg) {
				//            RPG.leave(rpg, _user);
				//        }
				//    }
				//}, Config.timeout());
			}
		}
	};

	this.onPublicMessage = function (_user, _msg)
	{
		if (rpgMode && !isPlaying(_user))
		{
			_msg = _msg.trim();
			var start = isValidBracket(_msg.charAt(0));
			var end = isValidBracket(_msg.charAt(_msg.length - 1));

			if (!start || !end)
			{
				if ((start || end) && _msg.length == 1)
				{
					return;
				}
				_user.sendPrivateMessage(S.rpgm.pub(start, end));
			}
		}
	};

	function isPlaying(_user)
	{
		var rpgs = RPGS.getRunning(false);
		var playing = false;
		rpgs.some(function (rpg)
		{
			if (RPG.isPlaying(rpg, _user.getUserId()))
			{
				playing = true;
				return true;
			}
		});
		return playing;
	}

	function isValidBracket(_c)
	{
		return Config.brackets().indexOf(_c) > -1;
	}
}());