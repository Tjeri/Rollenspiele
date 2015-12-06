requireFile("ChannelCover");
requireFile("CM Talk");
requireFile("Commands");
requireFile("EventHandler");
requireFile("HtmlHandler");
requireFile("Mutes");
requireFile("Players");
requireFile("RPG");
requireFile("RPGMode");
requireFile("RPGMods");
requireFile("RPGS");
requireFile("Welcome");
require("App/Strings.js");

var RS = (new function ()
{
	// Commands

	this.commands = {
		acceptPlayer: function (_user, _params)
		{
			Commands.acceptPlayer(_user, _params);
		},
		addMod: function (_user, _mod)
		{
			Commands.addMod(_user, _mod);
		},
		addPlayer: function (_user, _params)
		{
			Commands.addPlayer(_user, _params);
		},
		app: function (_user)
		{
			Commands.showAppCommands(_user);
		},
		changeHost: function (_user, _params)
		{
			Commands.changeRPGHost(_user, _params);
		},
		chans: function (_user)
		{
			Commands.channelCover(_user);
		},
		closeForJoin: function (_user, _id)
		{
			Commands.closeRPGForJoin(_user, _id);
		},
		config: function (_user, _params)
		{
			Commands.config(_user, _params);
		},
		create: function (_user, _nick)
		{
			Commands.createRPG(_user, _nick);
		},
		declinePlayer: function (_user, _params)
		{
			Commands.declinePlayer(_user, _params);
		},
		editRPG: function (_user, _id)
		{
			Commands.editRPG(_user, _id);
		},
		end: function (_user, _id)
		{
			Commands.endRPG(_user, _id);
		},
		eval: function (_user, _code)
		{
			Commands.evaluateCode(_user, _code);
		},
		forceP: function (_user, _nicks)
		{
			if (!Allowance.isDev(_user, true))
			{
				Log.use(_user,"/forceP " + _nicks);
			}
			Commands.groupMute(_user, _nicks);
		},
		join: function (_user, _id)
		{
			Commands.joinRPG(_user, _id);
		},
		juschu: function (_user, _nick)
		{
			Commands.sendYouthProtectionHint(_user, _nick);
		},
		klammern: function (_user, _nick)
		{
			Commands.sendBracketHint(_user, _nick);
		},
		leave: function (_user, _id)
		{
			Commands.leaveRPG(_user, _id);
		},
		openForJoin: function (_user, _id)
		{
			Commands.openRPGForJoin(_user, _id);
		},
		remove: function (_user, _id)
		{
			Commands.removeRPG(_user, _id);
		},
		removeMod: function (_user, _mod)
		{
			Commands.removeMod(_user, _mod);
		},
		removePlayer: function (_user, _params)
		{
			Commands.removePlayer(_user, _params);
		},
		removeWindow: function (_user, _nick)
		{
			Commands.removeHtmlBox(_user, _nick);
		},
		restart: function (_user)
		{
			Commands.restartApp(_user);
		},
		revision: function (_user)
		{
			Commands.showAppServerRevision(_user);
		},
		rpg: function (_user, _id)
		{
			Commands.showRPGOverview(_user, _id);
		},
		rpgList: function (_user, _param)
		{
			Commands.showRPGList(_user, _param);
		},
		sendNewsletter: function (_user, _msg)
		{
			Commands.sendNewsletter(_user, _msg);
		},
		say: function (_user, _msg)
		{
			Commands.say(_user, _msg);
		},
		setDesc: function (_user, _params)
		{
			Commands.setRPGDescription(_user, _params);
		},
		setDescription: function (_user, _params)
		{
			Commands.setRPGDescription(_user, _params);
		},
		setName: function (_user, _params)
		{
			Commands.setRPGName(_user, _params);
		},
		setTheme: function (_user, _params)
		{
			Commands.setRPGTheme(_user, _params);
		},
		showMods: function (_user)
		{
			Commands.showMods(_user);
		},
		showRPG: function (_user, _id)
		{
			Commands.showRPG(_user, _id)
		},
		start: function (_user, _id)
		{
			Commands.startRPG(_user, _id);
		},
		timeout: function (_user, _params)
		{
			if (!Allowance.isDev(_user, true))
			{
				Log.use(_user, "/timeout " + _params);
			}
			Commands.timeout(_user, _params);
		},
		topChannels: function (_user)
		{
			Commands.topChannel(_user);
		},
		topPlayers: function (_user)
		{
			Commands.topPlayer(_user);
		},
		welcome: function (_user, _param)
		{
			Commands.welcome(_user, _param);
		},
		update: function (_user)
		{
			Commands.update(_user);
		},
		updateTimeChannel: function (_user, _params)
		{
			Commands.updateTimeChannel(_user, _params);
		},
		updateTimeRPG: function (_user, _params)
		{
			Commands.updateTimeRPG(_user, _params);
		}
	};

	// Events

	this.mayShowPublicMessage = function (_user, _msg)
	{
		var result = true;
		if (Config.moduleRPGMode())
		{
			result = result && RPGMode.mayShowPublicMessage(_user, _msg);
		}
		result = result && Mutes.mayShowPublicMessage(_user);
		return result;
	};

	this.onAppEventReceived = function (appInstance, type, data)
	{
		//if (type == Keys.INITIALIZE) {
		//    if (Config.moduleChannelCover()) {
		//        ChannelCover.initialize();
		//    }
		//} else if (type == Keys.SHUTDOWN) {
		//    if (Config.moduleChannelCover()) {
		//        ChannelCover.onShutdown();
		//    }
		//}
	};

	this.onAppStart = function ()
	{
		RPGMode.onAppStart();
	};

	this.onEventReceived = function (_user, _type, _data)
	{
		EventHandler.onEventReceived(_user, _type, _data);
	};

	this.onKnuddelReceived = function (_sender, _receiver, _knuddelAmount, _transferReason)
	{
		_sender.sendPostMessage("", S.rs.knRecv_thanks);
		KnuddelsServer.getAppDeveloper().sendPostMessage("", S.rs.knRecv_notify(_sender, _knuddelAmount, _transferReason));
	};

	this.onPrivateMessage = function (_pm)
	{
		_pm.getAuthor().sendPrivateMessage(S.rs.pmRecv);
	};

	this.onPublicMessage = function (_user, _msg)
	{
		//if (Config.moduleRPGMode())
		//{
		//	RPGMode.onPublicMessage(_user, _msg);
		//}
	};

	this.onShutdown = function ()
	{

	};

	this.onUserJoined = function (_user)
	{
		if (Config.moduleRPGMode())
		{
			RPGMode.userJoined(_user);
		}
		if (Config.moduleHtml())
		{
			HtmlHandler.sendRPGHint(_user);
		}
		if (Config.moduleChannelCover())
		{
			ChannelCover.userJoined(_user);
		}
		if (Config.moduleCMTalk())
		{
			CMTalk.onUserJoined(_user);
		}
		Welcome.welcome(_user);
	};

	this.onUserLeft = function (_user)
	{
		if (Config.moduleRPGMode())
		{
			RPGMode.userLeft(_user);
		}
		if (Config.moduleChannelCover())
		{
			ChannelCover.userLeft(_user)
		}
		if (Config.moduleCMTalk())
		{
			CMTalk.onUserLeft(_user);
		}
	};

	// Methods

	this.sendPub = function (_msg)
	{
		if (Config.moduleRPGMode() && RPGMode.rpgModeActive())
		{
			_msg = "< " + _msg + " >";
		}
		Bot.pub(_msg);
	};
}());