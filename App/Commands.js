var Commands = (new function ()
{

	// RPG Funktionen

	this.acceptPlayer = function (_user, _params)
	{
		var params = _params.split(":");
		var id = params[0];
		var nick = params[1];
		if (id != "" && nick && nick != "")
		{
			var rpg = RPGS.getRPG(id);
			if (rpg)
			{
				var player = Users.getByNick(_user, nick);
				if (player)
				{
					if (RPG.isAllowed(rpg, _user))
					{
						RPG.acceptPlayer(rpg, _user, player);
					}
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/acceptPlayer ID:NICK"));
		}
	};

	this.addPlayer = function (_user, _params)
	{
		var params = _params.split(":");
		var id = params[0];
		var nick = params[1];
		if (id != "" && nick && nick != "")
		{
			var rpg = RPGS.getRPG(id);
			if (rpg)
			{
				var player = Users.getByNick(_user, nick);
				if (player)
				{
					if (RPG.isAllowed(rpg, _user))
					{
						RPG.addPlayer(rpg, _user, player);
					}
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/addPlayer ID:NICK"));
		}
	};

	this.changeRPGHost = function (_user, _params)
	{
		var params = _params.split(":");
		var id = params[0];
		var nick = params[1];
		if (id != "" && nick && nick != "")
		{
			var rpg = RPGS.getRPG(id);
			if (rpg)
			{
				var player = Users.getByNick(_user, nick);
				if (player)
				{
					if (RPG.isAllowed(rpg, _user, true) || Allowance.isAllowed(_user))
					{
						RPG.changeHost(rpg, _user, player);
					}
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/changeHost ID:NICK"));
		}
	};

	this.closeRPGForJoin = function (_user, _id)
	{
		if (_id != "")
		{
			var rpg = RPGS.getRPG(_id);
			if (rpg)
			{
				if (RPG.isAllowed(rpg, _user))
				{
					rpg.open = false;
					RPG.save(rpg);
					_user.sendPrivateMessage("Der Beitritt zum RPG ist nun nicht mehr möglich.");
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/closeForJoin ID"));
		}
	};

	this.createRPG = function (_user, _nick)
	{
		if (Mods.isMod(_user) || Allowance.isAllowed(_user))
		{
			if (_nick != "")
			{
				var host = Users.getByNick(_user, _nick);
				if (host)
				{
					var id = DB.addNum(Keys.RPG_COUNTER, 1);
					RPG.create(_user, host, id);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.usage("/create NICK"));
			}
		}
	};

	this.declinePlayer = function (_user, _params)
	{
		var params = _params.split(":");
		var id = params[0];
		var nick = params[1];
		if (id != "" && nick && nick != "")
		{
			var rpg = RPGS.getRPG(id);
			if (rpg)
			{
				var player = Users.getByNick(_user, nick);
				if (player)
				{
					if (RPG.isAllowed(rpg, _user))
					{
						RPG.declinePlayer(rpg, _user, player);
					}
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/declinePlayer ID:NICK"));
		}
	};

	this.removeRPG = function (_user, _id)
	{
		if (Allowance.isAllowed(_user))
		{
			if (_id != "")
			{
				var rpg = RPGS.getRPG(_id);
				if (rpg)
				{
					RPG.delete(rpg, _user);
				}
				else
				{
					_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.usage("/remove ID"));
			}
		}
	};

	this.editRPG = function (_user, _id)
	{
		if (_id != "")
		{
			var rpg = RPGS.getRPG(_id);
			if (rpg)
			{
				if (RPG.isAllowed(rpg, _user))
				{
					RPG.edit(rpg, _user);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/editRPG ID"));
		}
	};

	this.endRPG = function (_user, _id)
	{
		if (_id != "")
		{
			var rpg = RPGS.getRPG(_id);
			if (rpg)
			{
				if (RPG.isAllowed(rpg, _user, true) || Allowance.isAllowed(_user))
				{
					RPG.end(rpg, _user);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/end ID"));
		}
	};

	this.joinRPG = function (_user, _id)
	{
		if (_id != "")
		{
			var rpg = RPGS.getRPG(_id);
			if (rpg)
			{
				RPG.join(rpg, _user);
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/join ID"));
		}
	};

	this.leaveRPG = function (_user, _id)
	{
		if (_id != "")
		{
			var rpg = RPGS.getRPG(_id);
			if (rpg)
			{
				RPG.leave(rpg, _user);
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/leave ID"));
		}
	};

	this.openRPGForJoin = function (_user, _id)
	{
		if (_id != "")
		{
			var rpg = RPGS.getRPG(_id);
			if (rpg)
			{
				if (RPG.isAllowed(rpg, _user))
				{
					rpg.open = true;
					RPG.save(rpg);
					_user.sendPrivateMessage("Der Beitritt zum RPG ist nun möglich.");
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/openForJoin ID"));
		}
	};

	this.removePlayer = function (_user, _params)
	{
		var params = _params.split(":");
		var id = params[0];
		var nick = params[1];
		if (id != "" && nick && nick != "")
		{
			var rpg = RPGS.getRPG(id);
			if (rpg)
			{
				var player = Users.getByNick(_user, nick);
				if (player)
				{
					if (RPG.isAllowed(rpg, _user))
					{
						RPG.removePlayer(rpg, _user, player);
					}
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/removePlayer ID:NICK"));
		}
	};

	this.setRPGDescription = function (_user, _params)
	{
		var index = _params.indexOf(":");
		if (index > -1)
		{
			var id = _params.substr(0, index).trim();
			var desc = replaceHashtag(_params.substr(index + 1));

			var rpg = RPGS.getRPG(id);
			if (rpg)
			{
				if (RPG.isAllowed(rpg, _user))
				{
					RPG.setDesc(rpg, _user, desc);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/setDescription ID:BESCHREIBUNG"));
		}
	};

	this.setRPGName = function (_user, _params)
	{
		var index = _params.indexOf(":");
		if (index > -1)
		{
			var id = _params.substr(0, index).trim();
			var name = _params.substr(index + 1).trim();
			var rpg = RPGS.getRPG(id);
			if (rpg)
			{
				if (RPG.isAllowed(rpg, _user))
				{
					RPG.setName(rpg, _user, name);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/setName ID:NAME"));
		}
	};

	this.setRPGTheme = function (_user, _params)
	{
		var index = _params.indexOf(":");
		if (index > -1)
		{
			var id = _params.substr(0, index).trim();
			var theme = _params.substr(index + 1).trim();
			var rpg = RPGS.getRPG(id);
			if (rpg)
			{
				if (RPG.isAllowed(rpg, _user))
				{
					RPG.setTheme(rpg, _user, theme);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/setTheme ID:THEMA"));
		}
	};

	this.showRPG = function (_user, _id)
	{
		if (_id != "")
		{
			var rpg = RPGS.getRPG(_id);
			if (rpg)
			{
				_user.sendPrivateMessage(RPG.showRPG(rpg));
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/showRPG ID"));
		}
	};

	this.showRPGList = function (_user, _mode)
	{
		var rpgs;
		var out;
		if (_mode == "all")
		{
			rpgs = RPGS.getAllRPGs();
			if (rpgs.length == 0)
			{
				_user.sendPrivateMessage("Momentan sind leider keine RPGs gespeichert.");
				return;
			}
			out = "Momentan existieren folgende RPG:"
		}
		else if (_mode == "my")
		{
			rpgs = RPGS.getForUser(_user);
			if (rpgs.length == 0)
			{
				_user.sendPrivateMessage("Du nimmst momentan leider an keinem RPG teil.");
				return;
			}
			out = "Du nimmst momentan an folgenden RPG teil:";
		}
		else
		{
			rpgs = RPGS.getRunning(true);
			if (rpgs.length == 0)
			{
				_user.sendPrivateMessage(S.com.rpg_noRunning);
				return;
			}
			out = "Folgende RPG laufen gerade:";
		}
		rpgs.forEach(function (rpg)
		{
			out += "°#°" + RPG.toString(rpg, _user);
		});
		_user.sendPrivateMessage(out);
	};

	this.showRPGOverview = function (_user, _id)
	{
		if (Config.moduleHtmlRPGs())
		{
			if (_id.length > 0)
			{
				var rpg = RPGS.getRPG(_id);
				if (rpg)
				{
					HtmlHandler.sendRPGDetails(_user, rpg);
					return;
				}
			}
			HtmlHandler.sendRPGOverview(_user);
		}
		else
		{
			Commands.showRPGList(_user, "all");
		}
	};

	this.startRPG = function (_user, _id)
	{
		if (_id != "")
		{
			var rpg = RPGS.getRPG(_id);
			if (rpg)
			{
				if (RPG.isAllowed(rpg, _user))
				{
					RPG.start(rpg, _user);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.rpg_wrongId(_id));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.usage("/start ID"));
		}
	};

	this.topChannel = function (_user)
	{
		var out = "°#°Liste der Channel sortiert nach Spielzeit:";

		var chans = [];
		var times = [];

		for (var i = 1; i < 10; ++i)
		{
			var channel = Channel.getMainName();
			if (i > 1)
			{
				channel += " " + i;
			}
			if (DB.hasNum(Keys.TIME_CHANNEL + channel))
			{
				chans.push(channel);
				var rpgTime = DB.getNum(Keys.TIME_CHANNEL + channel, 0);
				var start = DB.getNum(Keys.TIME_START + channel, 0);
				if (start > 0)
				{
					rpgTime += Date.now() - start;
				}
				times.push(rpgTime);
			}
		}

		var n = chans.length;
		do {
			var newN = 0;
			for (var j = 1; j < n; ++j)
			{
				var k = j - 1;
				if (times[k] < times[j])
				{
					var time = times[k];
					times[k] = times[j];
					times[j] = time;
					var chan = chans[k];
					chans[k] = chans[j];
					chans[j] = chan;
					newN = j;
				}
			}
			n = newN;
		}
		while (n > 0);

		for (var l = 0; l < chans.length; ++l)
		{
			out += "°#°" + chans[l] + " - " + RPG.getTime(times[l]);
		}
		_user.sendPrivateMessage(out);
	};

	this.topPlayer = function (_user)
	{
		if (Allowance.isAllowed(_user, true))
		{
			var top = UserPersistenceNumbers.getSortedEntries(Keys.TIME, { ascending: false });
			var out = "Folgende Spieler haben am Meisten gespielt:";
			top.forEach(function (entry)
			{
				out += "°#°" + entry.getRank() + " - " + entry.getUser().getProfileLink() + " - " + RPG.getTime(entry.getValue());
			});
			_user.sendPrivateMessage(out);
		}
		else
		{
			_user.sendPrivateMessage("Diese Funktion wurde deaktiviert.");
		}
	};

	this.updateTimeChannel = function (_user, _params)
	{
		if (Allowance.isDev(_user))
		{
			var params = _params.split(":");
			var channel = params[0];
			if (channel.length > 0 && params[1] && params[1].length > 0)
			{
				var time = parseInt(params[1]);
				RPGMode.updateTime(channel, time);
				_user.sendPrivateMessage(S.com.updated);
			}
			else
			{
				_user.sendPrivateMessage(S.com.usage("/updateTimeRPG ID:MILLIS"));
			}
		}
	};

	this.updateTimeRPG = function (_user, _params)
	{
		if (Allowance.isDev(_user))
		{
			var params = _params.split(":");
			var id = params[0];
			if (id.length > 0 && params[1] && params[1].length > 0)
			{
				var rpg = RPGS.getRPG(params[0]);
				if (rpg)
				{
					var time = parseInt(params[1]);
					rpg.time += time;
					RPG.save(rpg);
					rpg.players.forEach(function (uid)
					{
						var user = Users.getByUid(uid);
						Players.rpgUpdateTime(user, time);
					});
					_user.sendPrivateMessage(S.com.updated);
				}
				else
				{
					_user.sendPrivateMessage(S.com.rpg_wrongId(id));
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.usage("/updateTimeRPG ID:MILLIS"));
			}
		}
	};

	// MOD Funktionen

	this.addMod = function (_user, _mod)
	{
		if (Allowance.isAllowed(_user))
		{
			if (Config.moduleRPGMods())
			{
				if (_mod != "")
				{
					var mod = Users.getByNick(_user, _mod);
					if (mod)
					{
						Mods.addMod(_user, mod);
					}
				}
				else
				{
					_user.sendPrivateMessage(S.com.usage("/addMod NICK"));
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.notAvailable);
			}
		}
	};

	this.removeMod = function (_user, _mod)
	{
		if (Allowance.isAllowed(_user))
		{
			if (Config.moduleRPGMods())
			{
				if (_mod != "")
				{
					var mod = Users.getByNick(_user, _mod);
					if (mod)
					{
						Mods.removeMod(_user, mod);
					}
				}
				else
				{
					_user.sendPrivateMessage(S.com.usage("/removeMod NICK"));
				}
			}
		}
	};

	this.showMods = function (_user)
	{
		if (Allowance.isAllowed(_user))
		{
			if (Config.moduleRPGMods())
			{
				Mods.showMods(_user);
			}
			else
			{
				_user.sendPrivateMessage(S.com.notAvailable);
			}
		}
	};

	// CM Funktionen

	this.channelCover = function (_user)
	{
		if (Allowance.isAllowed(_user))
		{
			if (Config.moduleChannelCover())
			{
				ChannelCover.showList(_user);
			}
			else
			{
				_user.sendPrivateMessage(S.com.notAvailable);
			}
		}
	};

	this.groupMute = function (_user, _nicks)
	{
		if (Allowance.isAllowed(_user))
		{
			if (Config.moduleGroupMutes())
			{
				if (_nicks)
				{
					var remove = _nicks.startsWith("!");
					if (remove)
					{
						_nicks = _nicks.substr(1);
					}
					var nicks = _nicks.split(",");
					var users = [];
					nicks.forEach(function (nick)
					{
						var user = Users.getByNick(_user, nick.trim());
						if (user)
						{
							users.push(user);
						}
					});

					if (!remove)
					{
						if (users.length > 1)
						{
							Mutes.groupMute(_user, users);
						}
						else
						{
							_user.sendPrivateMessage(S.com.groupMute_minUsers);
						}
					}
					else if (users.length > 0)
					{
						Mutes.removeGroupMute(_user, users);
					}
				}
				else
				{
					Mutes.showGroupMutes(_user);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.notAvailable);
			}
		}
	};

	this.removeHtmlBox = function (_user, _nick)
	{
		if (Allowance.isDev(_user))
		{
			if (_nick != "")
			{
				var user = Users.getByNick(_user, _nick);
				if (user)
				{
					HtmlHandler.removeContent(user);
					_user.sendPrivateMessage(S.com.html_removed(user));
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.usage("/removeWindow NICK"));
			}
		}
	};

	this.sendBracketHint = function (_user, _nick)
	{
		if (Allowance.isAllowed(_user))
		{
			if (_nick != "")
			{
				var user = Users.getByNick(_user, _nick);
				if (user)
				{
					RS.sendPub(S.com.brackets(user));
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.usage("/klammern NICK"));
			}
		}
	};

	this.sendYouthProtectionHint = function (_user, _nick)
	{
		if (Allowance.isAllowed(_user))
		{
			if (_nick != "")
			{
				var user = Users.getByNick(_user, _nick);
				if (user)
				{
					user.sendPrivateMessage(S.com.juschu(user));
					_user.sendPrivateMessage(S.com.juschuConfirmation(user));
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.usage("/juschu NICK"));
			}
		}
	};

	this.showAppCommands = function (_user)
	{
		if (Allowance.isAllowed(_user))
		{
			_user.sendPrivateMessage(S.com.help);
		}
	};

	this.timeout = function (_user, _params)
	{
		if (Allowance.isAllowed(_user))
		{
			if (Config.moduleTimeouts())
			{
				if (_params)
				{
					var params = _params.split(":");
					var nick = params[0];
					var remove = nick.startsWith("!");
					if (remove)
					{
						nick = nick.substr(1);
					}
					var user = Users.getByNick(_user, nick);
					if (user)
					{
						if (remove)
						{
							Mutes.removeTimedMute(_user, user);
						}
						else
						{
							var time = params[1];
							if (!time)
							{
								time = Config.standardTimeout();
							}
							else
							{
								time = parseInt(time);
								if (isNaN(time))
								{
									time = Config.standardTimeout();
								}
							}
							Mutes.timedMute(_user, user, time);
						}
					}
				}
				else
				{
					Mutes.showTimedMutes(_user);
				}
			}
			else
			{
				_user.sendPrivateMessage(S.com.notAvailable);
			}
		}
	};

	// DEV Funktionen

	this.config = function (_user, _params)
	{
		if (Allowance.isDev(_user))
		{
			if (_params == "")
			{
				Config.show(_user);
			}
			else
			{
				var params = _params.split(":");
				if (Config.set(params[0], params[1]))
				{
					_user.sendPrivateMessage(S.com.conf_changed);
				}
				else
				{
					_user.sendPrivateMessage(S.com.conf_wrongParam);
				}
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.notAllowed);
		}
	};

	this.evaluateCode = function (_user, _code)
	{
		if (Allowance.isDev(_user))
		{
			eval(_code);
		}
		else
		{
			_user.sendPrivateMessage(S.com.notAllowed);
		}
	};

	this.restartApp = function (_user)
	{
		if (Allowance.isDev(_user))
		{
			KnuddelsServer.getAppAccess().getOwnInstance().getRootInstance().updateApp();//S.com.restart);
		}
		else
		{
			_user.sendPrivateMessage(S.com.notAllowed);
		}
	};

	this.say = function (_user, _msg)
	{
		if (Allowance.isDev(_user))
		{
			RS.sendPub(replaceHashtag(_msg));
		}
		else
		{
			_user.sendPrivateMessage(S.com.notAllowed);
		}
	};

	this.sendNewsletter = function (_user, _msg)
	{
		_msg = replaceHashtag(_msg);
		if (Allowance.isDev(_user))
		{
			Channel.getCMs().forEach(function (cm)
			{
				cm.sendPostMessage(S.com.news_topic, _msg);
			});
			Channel.getOwners().forEach(function (owner)
			{
				owner.sendPostMessage(S.com.news_topic, _msg);
			});
			_user.sendPrivateMessage(S.com.news_sent);
		}
		else
		{
			_user.sendPrivateMessage(S.com.notAllowed);
		}
	};

	this.showAppServerRevision = function (_user)
	{
		if (Allowance.isDev(_user))
		{
			_user.sendPrivateMessage(KnuddelsServer.getAppServerInfo().getRevision());
		}
		else
		{
			_user.sendPrivateMessage(S.com.notAllowed);
		}
	};

	this.welcome = function (_user, _param)
	{
		if (Allowance.isDev(_user))
		{
			if (_param == "")
			{
				Welcome.showList(_user);
			}
			else if (_param.charAt(0) == "!")
			{
				Welcome.remove(_user, _param.substr(1));
			}
			else if (_param.charAt(0) == "?")
			{
				Welcome.get(_user, _param.substr(1));
			}
			else
			{
				var index = _param.indexOf(":");
				if (index > -1)
				{
					var nick = _param.substr(0, index).trim();
					var text = _param.substr(index + 1).trim();
					Welcome.add(_user, nick, text)
				}
				else
				{
					_user.sendPrivateMessage(S.com.usage("/welcome NICK:TEXT"));
				}
			}
		}
		else
		{
			_user.sendPrivateMessage(S.com.notAllowed);
		}
	};

	this.update = function (_user)
	{
		if (Allowance.isDev(_user))
		{
			Mods.update(_user);
			RPGS.update(_user);
			Welcome.update(_user);
			Config.update(_user);
		}
		else
		{
			_user.sendPrivateMessage(S.com.notAllowed);
		}
	};
}());