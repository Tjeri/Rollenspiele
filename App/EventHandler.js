var EventHandler = (new function ()
{
	this.onEventReceived = function (_user, _type, _data)
	{
		//Log.dev("EventRecv: " + _type + " - " + _user);
		switch (_type)
		{
			case "addPlayer":
				addPlayer(_user, _data.rpgId, parseInt(_data.uid));
				break;
			case "changeHost":
				changeHost(_user, _data.rpgId, parseInt(_data.uid));
				break;
			case "createRPG":
				createRPG(_user, parseInt(_data));
				break;
			case "endRPG":
				endRPG(_user, _data);
				break;
			case "getRPG":
				getRPG(_user, _data);
				break;
			case "getPlayers":
				getPlayers(_user, _data);
				break;
			case "leaveRPG":
				leaveRPG(_user, _data);
				break;
			case "openRPGOverview":
				openRPGWindow(_user);
				break;
			case "removePlayer":
				removePlayer(_user, _data.rpgId, parseInt(_data.uid));
				break;
			case "setDesc":
				setDesc(_user, _data.rpgId, _data.desc);
				break;
			case "setName":
				setName(_user, _data.rpgId, _data.name);
				break;
			case "setTheme":
				setTheme(_user, _data.rpgId, _data.theme);
				break;
			case "startRPG":
				startRPG(_user, _data);
				break;
			case "tryAddPlayer":
				tryAddPlayer(_user, _data);
				break;
			case "tryCreateRPG":
				tryCreateRPG(_user);
				break;
			case "updateRPG":
				updateRPG(_user, _data);
				break;
			case "updateRPGs":
				updateRPGs(_user, false, null, null);
				break;
		}
	};

	// Event Funktionen
	function addPlayer(_user, _id, _uid)
	{
		if (RPG.eventAddPlayer(_user, _id, _uid))
		{
			updateRPG(_user, _id);
		}
		else
		{
			sendError(_user, S.eh.addPlayerFailed);
		}
	}

	function changeHost(_user, _id, _uid)
	{
		if (RPG.eventChangeHost(_user, _id, _uid))
		{
			updateRPG(_user, _id);
		}
		else
		{
			sendError(_user, S.eh.changeHostFailed);
		}
	}

	function createRPG(_user, _uid, _page)
	{
		var host = Users.getByUid(_uid);
		if (host)
		{
			var id = DB.addNum(Keys.RPG_COUNTER, 1);
			RPG.eventCreateRPG(_user, id, host);
			var rpg = RPGS.getRPG(id);
			getRPG(_user, id);
			HtmlHandler.sendEvent(_user, "updateRPGLists", RPGS.getRPGsData());
			if (!host.equals(_user))
			{
				EventHandler.openRPG(host, rpg, S.eh.createdRPG(_user));
			}
		}
		else
		{
			sendError(_user, S.eh.createRPGFailed);
		}
	}

	function endRPG(_user, _id)
	{
		if (RPG.eventEnd(_user, _id))
		{
			updateRPGs(_user, true, null, null);
			sendInfo(_user, S.eh.endRPGSucceeded);
		}
		else
		{
			sendError(_user, S.eh.endRPGFailed);
		}
	}

	function getRPG(_user, _id)
	{
		var rpg = RPGS.getRPG(_id);
		if (rpg)
		{
			HtmlHandler.sendEvent(_user, "getRPG", encodeRPG(rpg, false));
		}
		else
		{
			sendError(_user, S.eh.getRPGFailed);
		}
	}

	function getPlayers(_user, _uids)
	{
		HtmlHandler.sendEvent(_user, "getPlayers", getPlayerNicks(_uids));
	}

	function leaveRPG(_user, _id)
	{
		if (RPG.eventLeave(_user, _id))
		{
			updateRPGs(_user, true, null);
			sendInfo(_user, S.eh.leaveRPGSucceeded);
		}
		else
		{
			sendError(_user, S.eh.leaveRPGFailed);
		}
	}

	function openRPGWindow(_user)
	{
		HtmlHandler.sendRPGOverview(_user);
	}

	function removePlayer(_user, _id, _uid)
	{
		if (RPG.eventRemovePlayer(_user, _id, _uid))
		{
			updateRPG(_user, _id, false);
			sendInfo(_user, S.eh.removePlayerSucceeded);
		}
		else
		{
			sendError(_user, S.eh.removePlayerFailed);
		}
	}

	function setDesc(_user, _id, _desc)
	{
		if (RPG.eventSetDesc(_id, _desc))
		{
			updateRPG(_user, _id, true);
		}
		else
		{
			sendError(_user, S.eh.setDescFailed);
		}
	}

	function setName(_user, _id, _name)
	{
		if (RPG.eventSetName(_id, _name))
		{
			updateRPG(_user, _id, true);
		}
		else
		{
			sendError(_user, S.eh.setNameFailed);
		}
	}

	function setTheme(_user, _id, _theme)
	{
		if (RPG.eventSetTheme(_id, _theme))
		{
			updateRPG(_user, _id, true);
		}
		else
		{
			sendError(_user, S.eh.setThemeFailed);
		}
	}

	function startRPG(_user, _id)
	{
		if (RPG.eventStart(_user, _id))
		{
			updateRPG(_user, _id, true);
			sendInfo(_user, S.eh.startRPGSucceeded);
		}
		else
		{
			sendError(_user, S.eh.startRPGFailed);
		}
	}

	function tryAddPlayer(_user, _rpg)
	{
		var users = Channel.getUsers(UserType.Human);
		var uids = [];
		var nicks = [];
		users.forEach(function (user)
		{
			if (!RPG.isPlaying(_rpg, user.getUserId()))
			{
				uids.push(user.getUserId());
				nicks.push(user.getNick());
			}
		});
		HtmlHandler.sendEvent(_user, "tryAddPlayer", {
			uids: uids,
			nicks: nicks
		});
	}

	function tryCreateRPG(_user)
	{
		var users = Channel.getUsers(UserType.Human);
		var uids = [];
		var nicks = [];
		users.forEach(function (user)
		{
			uids.push(user.getUserId());
			nicks.push(user.getNick());
		});
		HtmlHandler.sendEvent(_user, "tryCreateRPG", {
			uids: uids,
			nicks: nicks
		});
	}

	// Hilfsfunktionen
	function getPlayerNicks(_uids)
	{
		var nicks = [];
		_uids.forEach(function (uid)
		{
			nicks.push(Users.getByUid(uid).getNick());
		});
		return nicks;
	}

	// Send Events

	function sendError(_user, _text)
	{
		HtmlHandler.sendEvent(_user, "error", _text);
	}

	function sendInfo(_user, _text)
	{
		HtmlHandler.sendEvent(_user, "info", _text);
	}

	function updateRPG(_user, _id, _updateList)
	{
		var rpg = RPGS.getRPG(_id);
		HtmlHandler.sendEvent(_user, "updateRPG", {
			rpg: encodeRPG(rpg, false),
			pn: getPlayerNicks(rpg.players)
		});
		if (_updateList)
		{
			HtmlHandler.sendEvent(_user, "updateRPGLists", RPGS.getRPGsData());
		}
	}

	function updateRPGs(_user, _forceSwitch, _page, _rpg)
	{
		HtmlHandler.sendEvent(_user, "updateRPGs", RPGS.getPageData(_user, _forceSwitch, _page, _rpg));
	}

	this.openRPG = function (_user, _rpg, text)
	{
		HtmlHandler.sendRPGDetails(_user, _rpg);
		setTimeout(function ()
		{
			sendInfo(_user, text);
		}, 500);
	};
}());