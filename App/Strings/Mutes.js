S.mu = {
	groupMute: function (_cm, _nicks)
	{
		var longNicks = _nicks.replaceAll(",", ", ");
		return _cm.getProfileLink() + " hat dich und " + longNicks + " gemutet. Bitte klärt eure Probleme privat und meldet euch dann bei " +
		       _cm.getProfileLink() + ", damit der Mute aufgehoben wird. °>[Privatgespräch öffnen]|/pp " + _nicks + "<°";
	},
	groupMuteDB: function (_cm, _nicks)
	{
		return "Klärt eure Probleme privat und meldet euch bei " + _cm.getProfileLink() + " zum Aufheben des Mutes. °>[Privatgespräch öffnen]|/pp " + _nicks +
		       "<°";
	},
	groupMuted: function (_users)
	{
		return _users + " werden nun gezwungen ihre Probleme privat zu klären.";
	},
	groupMutedUsers: function (_users)
	{
		if (_users.length == 0)
		{
			return "Momentan sind keine User gemutet.";
		}
		var users = "";
		var nicks = "";
		_users.forEach(function (user)
		{
			if (users)
			{
				users += ", ";
				nicks += ",";
			}
			var nick = user.getNick();
			users += "°>" + nick + "|/forceP !" + nick + "<°";
			nicks += nick;
		});
		return "Folgende User sind momentan gemuted:°#°" + users + "°#°Ein Klick auf den Nick hebt den Mute auf. °>[Alle entmuten]|/forcep !" + nicks + "<°";
	},
	groupMuteRemoved: function (_cm)
	{
		return _cm.getProfileLink() + " hat soeben deinen Mute aufgehoben.";
	},
	groupMuteRemovedConfirmation: function (_user)
	{
		return "Mute von " + _user.getProfileLink() + " aufgehoben."
	},
	noMute: function (_user)
	{
		return _user.getProfileLink() + " ist momentan nicht gemutet.";
	},
	noTimeout: function (_user)
	{
		return _user.getProfileLink() + " hat momentan keinen Timeout. Ist er vielleicht schon ausgelaufen?";
	},
	timedMute: function (_cm, _time)
	{
		return "Du hast von " + _cm.getProfileLink() + " einen Time-Out erhalten. In " + _time +
		       " Minuten kannst du wieder öffentlich schreiben. Nutze die Zeit um dich etwas zu beruhigen.";
	},
	timedMuteConfirmation: function (_mutedUser, _time)
	{
		return _mutedUser.getProfileLink() + " hat einen Time-Out erhalten. Er/Sie kann in " + _time + " Minuten wieder schreiben.";
	},
	timeMutedUsers: function (_users)
	{
		if (_users.length == 0)
		{
			return "Momentan hat kein User einen Time-Out.";
		}
		var users = "";
		var nicks = "";
		_users.forEach(function (entry)
		{
			if (users)
			{
				nicks += ",";
			}
			var nick = entry.user.getNick();
			var time = entry.time;
			var minutes = Math.floor(time / (60 * 1000));
			var seconds = Math.floor((time - (minutes * 60 * 1000)) / 1000);
			time = minutes < 10 ? "0" + minutes : minutes;
			time += ":";
			time += seconds < 10 ? "0" + seconds : seconds;
			users += "°#°°>" + nick + "|/timeout !" + nick + "<° (noch " + time + " Minuten)";
			nicks += nick;
		});
		return "Folgende User haben momentan Time-Out:°#°" + users + "°#°Ein Klick auf den Nick hebt den Time-Out auf.";
	},
	timedMuteEnded: "Die Zeit ist abgelaufen. Dein Time-Out wurde aufgehoben.",
	timedMuteEndedConfirmation: function (_user)
	{
		return "Die Zeit ist abgelaufen. Der Time-Out von " + _user.getProfileLink() + " wurde aufgehoben."
	},
	timedMuteRemoved: function (_cm)
	{
		return "Dein Time-Out wurde von " + _cm.getProfileLink() + " aufgehoben.";
	},
	timedMuteRemovedConfirmation: function (_mutedUser)
	{
		return "Der Time-Out von " + _mutedUser.getProfileLink() + " wurde aufgehoben.";
	},
	timedMuteStillActive: function (_timeLeft)
	{
		var minutesLeft = Math.floor(_timeLeft / (60 * 1000));
		var timeLeft = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
		var secondsLeft = Math.floor((_timeLeft - (minutesLeft * 60 * 1000)) / 1000);
		timeLeft += ":";
		timeLeft += secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
		return "Du kannst in " + timeLeft + " Minuten wieder schreiben.";
	}
};
