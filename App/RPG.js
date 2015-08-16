function RPG(_host, _id)
{
	this.start = Date.now();
	this.time = 0;
	this.lastPlayed = Date.now();

	this.id = _id;
	this.channel = Channel.getName();
	this.running = true;

	this.host = _host;
	this.hostUid = _host.getUserId();
	this.players = [_host.getUserId()];
	this.name = "";
	this.theme = "";
	this.desc = "";

	this.open = false;
	this.declined = [];
}

// Event Methods
RPG.eventAddPlayer = function (_user, _id, _uid)
{
	var rpg = RPGS.getRPG(_id);
	var player = Users.getByUid(_uid);
	if (rpg && player && !RPG.isPlaying(rpg, _uid))
	{
		rpg.players.push(_uid);
		RPG.save(rpg);

		if (rpg.running)
		{
			Players.rpgStart(player, rpg.id);
		}
		player.sendPrivateMessage(S.rpg.addedYou(_user, RPG.getName(rpg)));
		return true;
	}
	return false;
};
RPG.eventChangeHost = function (_user, _id, _uid)
{
	var rpg = RPGS.getRPG(_id);
	var host = Users.getByUid(_uid);
	if (rpg && host && RPG.isPlaying(rpg, _uid))
	{
		rpg.host = host;
		rpg.hostUid = _uid;
		RPG.save(rpg);
		host.sendPrivateMessage(S.rpg.host_You(_user, RPG.getName(rpg)));
		RPG.sendPlayers(rpg, S.rpg.host_New(_user, host, RPG.getName(rpg)), false);
		return true;
	}
	return false;
};
RPG.eventCreateRPG = function (_user, _id, _host)
{
	var rpg = new RPG(_host, _id);
	RPGS.addRPG(rpg);
	RPG.save(rpg);
	Players.rpgStart(_host, _id);
	RPGMode.startRPGMode(false);
};
RPG.eventEnd = function (_user, _id)
{
	var rpg = RPGS.getRPG(_id);
	if (rpg && rpg.running)
	{
		rpg.time += Date.now() - rpg.start;
		RPG.sendPlayers(rpg, S.rpg.ended(_user, RPG.getName(rpg)), true);
		rpg.running = false;
		rpg.lastPlayed = Date.now();
		RPG.save(rpg);
		Players.rpgEndAll(rpg);
		if (RPGS.getRunning(false).length == 0)
		{
			RPGMode.endRPGMode(false);
		}
		return true;
	}
	return false;
};
RPG.eventLeave = function (_user, _id)
{
	var rpg = RPGS.getRPG(_id);
	if (rpg)
	{
		var uid = _user.getUserId();
		var index = rpg.players.indexOf(uid);
		if (index > -1)
		{
			rpg.players.splice(index, 1);
			if (rpg.running)
			{
				Players.rpgEnd(_user, rpg.id);
			}
			if (rpg.players.length == 0)
			{
				RPGS.removeRPG(rpg);
			}
			else
			{
				if (RPG.isHost(rpg, _user))
				{
					RPG.hostLeft(rpg, _user, index);
				}
				else
				{
					RPG.sendPlayers(rpg, S.rpg.leave_Userleft(_user, RPG.getName(rpg)), true);
				}
			}
			RPG.save(rpg);
			return true;
		}
	}
	return false;
};
RPG.eventRemovePlayer = function (_user, _id, _uid)
{
	var rpg = RPGS.getRPG(_id);
	var player = Users.getByUid(_uid);
	if (rpg && player && _uid != _user.getUserId)
	{
		var index = rpg.players.indexOf(_uid);
		if (index > -1)
		{
			rpg.players.splice(index, 1);
			rpg.declined.push(_uid);
			if (rpg.running)
			{
				Players.rpgEnd(player, rpg.id);
			}
			if (rpg.players.length == 0)
			{
				RPGS.removeRPG(rpg);
			}
			else if (RPG.isHost(rpg, player))
			{
				RPG.hostLeft(rpg, player, index);
			}
			player.sendPrivateMessage(STRINGS.rpg_removePlayer_removedYou(_user, RPG.getName(rpg)));
			RPG.save(rpg);
			return true;
		}

	}
	return false;
};
RPG.eventSetDesc = function (_id, _desc)
{
	var rpg = RPGS.getRPG(_id);
	if (rpg)
	{
		rpg.desc = _desc;
		RPG.save(rpg);
		return true;
	}
	return false;
};
RPG.eventSetName = function (_id, _name)
{
	var rpg = RPGS.getRPG(_id);
	if (rpg)
	{
		rpg.name = _name;
		RPG.save(rpg);
		return true;
	}
	return false;
};
RPG.eventSetTheme = function (_id, _theme)
{
	var rpg = RPGS.getRPG(_id);
	if (rpg)
	{
		rpg.theme = _theme;
		RPG.save(rpg);
		return true;
	}
	return false;
};
RPG.eventStart = function (_user, _id)
{
	var rpg = RPGS.getRPG(_id);
	if (rpg && !rpg.running)
	{
		rpg.start = Date.now();
		rpg.channel = Channel.getName();
		RPG.sendPlayers(rpg, S.rpg.started, false);
		rpg.running = true;
		rpg.lastPlayed = Date.now();
		RPG.save(rpg);
		Players.rpgStartAll(rpg);
		RPGMode.startRPGMode(false);
		return true;
	}
	return false;
};

RPG.hostLeft = function (_rpg, _user, _index)
{
	var nick = _user.getProfileLink();
	if (_index < _rpg.players.length)
	{
		_rpg.host = Users.getByUid(_rpg.players[_index]);
	}
	else
	{
		_rpg.host = Users.getByUid(_rpg.players[0]);
	}
	_rpg.hostUid = _rpg.host.getUserId();
	EventHandler.openRPG(_rpg.host, _rpg, S.rpg.leave_hostLeft_New(_user));
	RPG.sendPlayers(_rpg, S.rpg.leave_hostLeft(nick, _rpg.host, RPG.getName(_rpg)), false);
};

// COMMAND METHODS

RPG.acceptPlayer = function (_rpg, _user, _player)
{
	if (_rpg.open)
	{
		if (_rpg.running)
		{
			if (RPG.tryAddPlayer(_rpg, _user, _player))
			{
				var name = RPG.getName(_rpg);
				_player.sendPrivateMessage(S.rpg.acceptedYou(_user, name));
				_user.sendPrivateMessage(S.rpg.accepted(_player, name));
			}
			else
			{
				_user.sendPrivateMessage(S.rpg.alreadyPlaying(_player));
			}
		}
		else
		{
			_user.sendPrivateMessage(S.rpg.accept_notRunning);
		}
	}
	else
	{
		_user.sendPrivateMessage(S.rpg.accept_notOpen);
	}
};

RPG.addPlayer = function (_rpg, _user, _player)
{
	var silent = !RPG.isHost(_rpg, _user);
	if (RPG.tryAddPlayer(_rpg, _user, _player))
	{
		if (_rpg.running)
		{
			Players.rpgStart(_player, _rpg.id);
		}
		var name = RPG.getName(_rpg);
		if (!silent)
		{
			_player.sendPrivateMessage(S.rpg.addedYou(_user, name));
		}
		_user.sendPrivateMessage(S.rpg.added(_player, name));
	}
	else
	{
		_user.sendPrivateMessage(S.rpg.alreadyPlaying(_player));
	}
};

RPG.changeHost = function (_rpg, _user, _newHost)
{
	var uid = _newHost.getUserId();
	var nick = _newHost.getNick();
	if (RPG.isPlaying(_rpg, uid))
	{
		_rpg.host = _newHost;
		_rpg.hostUid = _newHost.getUserId();
		RPG.save(_rpg);
		_rpg.host.sendPrivateMessage(STRINGS.rpg_newHost(_user, RPG.getName(_rpg)) + STRINGS.rpgs_host(_rpg));
		RPG.sendPlayers(_rpg, STRINGS.rpg_newHost_players(nick, _user, RPG.getName(_rpg)), false);
	}
	else
	{
		_user.sendPrivateMessage(STRINGS.rpg_newHost_mustBePlayer(nick));
	}
};

RPG.create = function (_user, _host, _id)
{
	var rpg = new RPG(_host, _id);
	Players.rpgStart(_host, _id);
	RPGS.addRPG(rpg);
	RPG.save(rpg);
	_user.sendPrivateMessage(STRINGS.rpgs_created(_id, _host));
	_host.sendPrivateMessage(STRINGS.rpgs_start(_user) + STRINGS.rpgs_host(rpg));
	RPGMode.startRPGMode(false);
};

RPG.declinePlayer = function (_rpg, _user, _player)
{
	var uid = _player.getUserId();
	var nick = _player.getNick();
	if (!RPG.isPlaying(_rpg, uid))
	{
		if (_rpg.open)
		{
			if (_rpg.declined.indexOf(uid) == -1)
			{
				_rpg.declined.push(uid);
				RPG.save(_rpg);
				_user.sendPrivateMessage(STRINGS.rpg_declined_user(nick, _rpg.id));
				_player.sendPrivateMessage(STRINGS.rpg_declined(_user));
			}
			else
			{
				_user.sendPrivateMessage("Diesem RPG kann man nicht beitreten. Du brauchst also auch keine Leute ablehnen.");
			}
		}
		else
		{
			_rpg.host.sendPrivateMessage(STRINGS.rpg_decline_alreadyDeclined(nick));
		}
	}
	else
	{
		_rpg.host.sendPrivateMessage(STRINGS.rpg_decline_alreadyPlaying(nick, _rpg.id));
	}
};

RPG.delete = function (_rpg, _user)
{
	RPG.sendPlayers(_rpg, STRINGS.rpg_end(_user), true);
	Players.rpgEndAll(_rpg);
	RPGS.removeRPG(_rpg);
	if (RPGS.getRunning(false).length == 0)
	{
		RPGMode.endRPGMode(false);
	}
};

RPG.edit = function (_rpg, _user)
{
	_user.sendPrivateMessage(STRINGS.rpgs_host(_rpg));
};

RPG.end = function (_rpg, _user)
{
	if (_rpg.running)
	{
		_rpg.time += Date.now() - _rpg.start;
		RPG.sendPlayers(_rpg, "Das RPG wurde beendet.", true);
		_rpg.running = false;
		_rpg.lastPlayed = Date.now();
		RPG.save(_rpg);
		Players.rpgEndAll(_rpg);
		if (RPGS.getRunning(false).length == 0)
		{
			RPGMode.endRPGMode(false);
		}
	}
	else
	{
		_user.sendPrivateMessage("Das RPG läuft momentan nicht.");
	}
};

RPG.join = function (_rpg, _user)
{
	if (_rpg.open)
	{
		if (_rpg.running)
		{
			var uid = _user.getUserId();
			if (!RPG.isPlaying(_rpg, uid))
			{
				if (_rpg.declined.indexOf(uid) == -1)
				{
					_rpg.host.sendPrivateMessage(STRINGS.rpg_join_question(_user.getNick(), _rpg.id));
					_user.sendPrivateMessage(STRINGS.rpg_join_ask(_rpg.host));
				}
				else
				{
					_user.sendPrivateMessage(STRINGS.rpg_join_alreadyDeclined);
				}
			}
			else
			{
				_user.sendPrivateMessage("Du spielst hier doch schon mit.");
			}
		}
		else
		{
			_user.sendPrivateMessage("Dieses RPG läuft grade nicht.");
		}
	}
	else
	{
		_user.sendPrivateMessage("Diesem RPG kann man nicht beitreten.");
	}
};

RPG.leave = function (_rpg, _user)
{
	var uid = _user.getUserId();
	var index = _rpg.players.indexOf(uid);
	if (index > -1)
	{
		_rpg.players.splice(index, 1);
		_user.sendPrivateMessage(STRINGS.rpg_leave);
		if (_rpg.running)
		{
			Players.rpgEnd(_user, _rpg.id);
		}
		if (_rpg.players.length == 0)
		{
			RPGS.removeRPG(_rpg);
		}
		else
		{
			if (RPG.isHost(_rpg, _user))
			{
				var nick = _user.getNick();
				if (index < _rpg.players.length)
				{
					_rpg.host = Users.getByUid(_rpg.players[index]);
				}
				else
				{
					_rpg.host = Users.getByUid(_rpg.players[0]);
				}
				_rpg.hostUid = _rpg.host.getUserId();
				_rpg.host.sendPrivateMessage(STRINGS.rpg_leave_userLeft(nick) + STRINGS.rpgs_host(_rpg));
				RPG.sendPlayers(_rpg, STRINGS.rpg_leave_newHost(nick, _rpg.host), false);
			}
			else
			{
				RPG.sendPlayers(_rpg, STRINGS.rpg_leave_userLeft(nick), true);
			}
			RPG.save(_rpg);
		}
	}
	else
	{
		_user.sendPrivateMessage(STRINGS.rpg_leave_notPlaying);
	}
};

RPG.removePlayer = function (_rpg, _user, _player)
{
	var silent = !RPG.isHost(_rpg, _user);
	if (_player.getNick() == _user.getNick())
	{
		_user.sendPrivateMessage(STRINGS.rpg_removePlayer_leave(_rpg.id));
	}
	else
	{
		var uid = _player.getUserId();
		var index = _rpg.players.indexOf(uid);
		if (index > -1)
		{
			_rpg.players.splice(index, 1);
			_rpg.declined.push(uid);
			if (_rpg.running)
			{
				Players.rpgEnd(_user, _rpg.id);
			}
			if (_rpg.players.length == 0)
			{
				RPGS.removeRPG(_rpg);
			}
			else if (RPG.isHost(_rpg, _player))
			{
				var nick = _player.getNick();
				if (index < _rpg.players.length)
				{
					_rpg.host = Users.getByUid(_rpg.players[index]);
				}
				else
				{
					_rpg.host = Users.getByUid(_rpg.players[0]);
				}
				_rpg.hostUid = _rpg.host.getUserId();
				_rpg.host.sendPrivateMessage(STRINGS.rpg_leave_userLeft(nick) + STRINGS.rpgs_host(_rpg));
				RPG.sendPlayers(_rpg, STRINGS.rpg_leave_newHost(nick, _rpg.host), false);
			}
			RPG.save(_rpg);
			if (!silent)
			{
				_player.sendPrivateMessage(STRINGS.rpg_removePlayer_removedYou(_user, RPG.getName(_rpg)));
			}
			_user.sendPrivateMessage(STRINGS.rpg_removePlayer_removed(_player));
		}
		else
		{
			_user.sendPrivateMessage(STRINGS.rpg_removePlayer_notPlaying(_player));
		}
	}
};

RPG.setDesc = function (_rpg, _user, _desc)
{
	_user.sendPrivateMessage(STRINGS.rpg_desc_changed(_desc));
	_rpg.desc = _desc;
	RPG.save(_rpg);
};

RPG.setName = function (_rpg, _user, _name)
{
	RPG.sendPlayers(_rpg, STRINGS.rpg_name_changed(_user, RPG.getName(_rpg), _name), true);
	_rpg.name = _name;
	RPG.save(_rpg);
};

RPG.setTheme = function (_rpg, _user, _theme)
{
	if (_rpg.theme != "")
	{
		RPG.sendPlayers(_rpg, STRINGS.rpg_theme_changed(_user, RPG.getName(_rpg), _rpg.theme, _theme), true);
	}
	else
	{
		RPG.sendPlayers(_rpg, STRINGS.rpg_theme_set(_user, RPG.getName(_rpg), _theme), true);
	}
	_rpg.theme = _theme;
	RPG.save(_rpg);
};

RPG.showRPG = function (_rpg)
{
	var _name = _rpg.name == "" ? STRINGS.rpg_info_noName : _rpg.name;
	var _theme = _rpg.theme == "" ? STRINGS.rpg_info_noTheme : _rpg.theme;
	var _desc = _rpg.desc == "" ? STRINGS.rpg_info_noDesc : _rpg.desc;
	var _players = "";
	_rpg.players.forEach(function (player)
	{
		if (_players != "")
		{
			_players += ", ";
		}
		var user = Users.getByUid(player);
		if (RPG.isHost(_rpg, user))
		{
			_players += "_" + user.getProfileLink() + "_" + STRINGS.rpg_info_host;
		}
		else
		{
			_players += user.getProfileLink();
		}
	});
	var sessionTime = _rpg.running ? Date.now() - _rpg.start : 0;
	var gameTime = _rpg.time + sessionTime;
	return STRINGS.rpg_info(_rpg.id, _name, _theme, _desc, _players, RPG.getTime(sessionTime), RPG.getTime(gameTime));
};

RPG.start = function (_rpg, _user)
{
	if (!_rpg.running)
	{
		_rpg.start = Date.now();
		_rpg.channel = Channel.getName();
		RPG.sendPlayers(_rpg, "Das RPG wurde gestartet.", true);
		_rpg.running = true;
		_rpg.lastPlayed = Date.now();
		RPG.save(_rpg);
		Players.rpgStartAll(_rpg);
		RPGMode.startRPGMode(false);
	}
	else
	{
		_user.sendPrivateMessage("Das RPG läuft bereits.");
	}
};

// METHODS

RPG.getName = function (_rpg)
{
	if (_rpg.name == "")
	{
		return _rpg.id;
	}
	else
	{
		return _rpg.name;
	}
};

RPG.isAllowed = function (_rpg, _user, _hideMessage)
{
	var allowed = _user.isAppDeveloper() || Bot.isBot(_user) || RPG.isHost(_rpg, _user);
	if (!allowed && !_hideMessage)
	{
		_user.sendPrivateMessage(STRINGS.command_notAllowed);
	}
	return allowed;
};

RPG.isHost = function (_rpg, _user)
{
	return _rpg.host.getNick() == _user.getNick();
};

RPG.isPlaying = function (_rpg, _uid)
{
	return _rpg.players.indexOf(_uid) > -1;
};

RPG.save = function (_rpg)
{
	DB.saveObj(Keys.RPG + _rpg.id, _rpg);
};

RPG.sendPlayers = function (_rpg, _msg, _sendHost)
{
	_rpg.players.forEach(function (_uid)
	{
		if (_sendHost || _uid != _rpg.host.getUserId())
		{
			Users.getByUid(_uid).sendPrivateMessage(_msg);
		}
	});
};

RPG.getTime = function (_time)
{
	var msec = _time;
	var hh = Math.floor(msec / 1000 / 60 / 60);
	msec -= hh * 1000 * 60 * 60;
	if (hh < 10)
	{
		hh = "0" + hh;
	}
	var mm = Math.floor(msec / 1000 / 60);
	msec -= mm * 1000 * 60;
	if (mm < 10)
	{
		mm = "0" + mm;
	}
	var ss = Math.floor(msec / 1000);
	msec -= ss * 1000;
	if (ss < 10)
	{
		ss = "0" + ss;
	}
	if (msec < 10)
	{
		msec = "00" + msec;
	}
	else if (msec < 100)
	{
		msec = "0" + msec;
	}
	return hh + ":" + mm + ":" + ss;// + "." + msec;
};

RPG.tryAddPlayer = function (_rpg, _host, _player)
{
	var uid = _player.getUserId();
	if (_rpg.players.indexOf(uid) == -1)
	{
		_rpg.players.push(uid);
		var index = _rpg.declined.indexOf(uid);
		if (index > -1)
		{
			_rpg.declined.splice(index, 1);
		}
		RPG.save(_rpg);
		return true;
	}
	else
	{
		return false;
	}
};

RPG.toString = function (_rpg, _user)
{
	var out = _rpg.running ? '' : '"';
	out += _rpg.id;
	if (_rpg.name != "")
	{
		out += " - " + _rpg.name;
	}
	if (_rpg.theme != "")
	{
		out += " (" + _rpg.theme + ")";
	}
	out += " - ";
	var count = 0;
	_rpg.players.forEach(function (player)
	{
		if (count > 0)
		{
			out += ", ";
		}
		var user = Users.getByUid(player);
		if (RPG.isHost(_rpg, user))
		{
			out += "_" + user.getProfileLink() + "_" + STRINGS.rpg_info_host;
		}
		else
		{
			out += user.getProfileLink();
		}
		count++;
	});
	out += " - °>[Mehr]|/showrpg " + _rpg.id + "<°";
	if (_rpg.running && _rpg.channel != Channel.getName())
	{
		out += " - Channel " + _rpg.channel + " °>[Ansehen]|/go +" + _rpg.channel + "<°";
	}
	else if (RPG.isHost(_rpg, _user))
	{
		out += " - °>[Bearbeiten]|/editRPG " + _rpg.id + "<°";
		if (!_rpg.running)
		{
			out += " - °>[Starten]|/start " + _rpg.id + "<°";
		}
		else
		{
			out += " - °>[Beenden]|/end " + _rpg.id + "<°";
		}
	}
	if (!_rpg.running)
	{
		out += '"';
	}
	return out;
};