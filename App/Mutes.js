var Mutes = (new function ()
{

	this.groupMute = function (_user, _users)
	{
		var users = "";
		_users.forEach(function (user)
		{
			if (users)
			{
				users += ", ";
			}
			users += user.getProfileLink();
			var nicks = "";
			_users.forEach(function (user2)
			{
				if (!user.equals(user2))
				{
					if (nicks)
					{
						nicks += ",";
					}
					nicks += user2.getNick();
				}
			});
			user.sendPrivateMessage(S.mu.groupMute(_user, nicks));
			UserDB.saveNum(user, Keys.MUTE_GROUP, 1);
			UserDB.saveStr(user, Keys.MUTE_GROUP, S.mu.groupMuteDB(_user, nicks))
		});
		_user.sendPrivateMessage(S.mu.groupMuted(users));
	};

	this.removeGroupMute = function (_user, _users)
	{
		_users.forEach(function (user)
		{
			if (UserDB.hasNum(user, Keys.MUTE_GROUP))
			{
				UserDB.delNum(user, Keys.MUTE_GROUP);
				UserDB.delStr(user, Keys.MUTE_GROUP);
				user.sendPrivateMessage(S.mu.groupMuteRemoved(_user));
				_user.sendPrivateMessage(S.mu.groupMuteRemovedConfirmation(user));
			}
			else
			{
				_user.sendPrivateMessage(S.mu.noMute(user));
			}
		});
	};

	this.removeTimedMute = function (_user, _mutedUser)
	{
		if (UserDB.hasNum(_mutedUser, Keys.MUTE_START))
		{
			UserDB.delNum(_mutedUser, Keys.MUTE_START);
			UserDB.delNum(_mutedUser, Keys.MUTE_DURATION);
			_mutedUser.sendPrivateMessage(S.mu.timedMuteRemoved(_user));
			_user.sendPrivateMessage(S.mu.timedMuteRemovedConfirmation(_mutedUser));
		}
		else
		{
			_user.sendPrivateMessage(S.mu.noTimeout(_mutedUser));
		}
	};

	this.showGroupMutes = function (_user)
	{
		var users = [];
		UserPersistenceNumbers.getSortedEntries (Keys.MUTE_GROUP).forEach(function (entry)
		{
			users.push(entry.getUser());
		});
		_user.sendPrivateMessage(S.mu.groupMutedUsers(users));
	};

	this.showTimedMutes = function (_user) {
		var users = [];
		var time = Date.now();
		UserPersistenceNumbers.getSortedEntries (Keys.MUTE_START).forEach(function (entry)
		{
			var user = entry.getUser();
			users.push({
				user: user,
				time: (UserDB.getNum(user, Keys.MUTE_DURATION, 0) * 60 * 1000) - (time - entry.getValue())
			});
		});
		_user.sendPrivateMessage(S.mu.timeMutedUsers(users));
	};

	this.timedMute = function (_user, _muteUser, _time)
	{
		UserDB.saveNum(_muteUser, Keys.MUTE_START, Date.now());
		UserDB.saveNum(_muteUser, Keys.MUTE_DURATION, _time);

		_muteUser.sendPrivateMessage(S.mu.timedMute(_user, _time));
		_user.sendPrivateMessage(S.mu.timedMuteConfirmation(_muteUser, _time));

		setTimeout(function () {
			UserDB.delNum(_muteUser, Keys.MUTE_START);
			UserDB.delNum(_muteUser, Keys.MUTE_DURATION);
			_muteUser.sendPrivateMessage(S.mu.timedMuteEnded);
			_user.sendPrivateMessage(S.mu.timedMuteEndedConfirmation(_muteUser));
		}, _time * 60 * 1000);
	};

	this.mayShowPublicMessage = function (_user)
	{
		if (Config.moduleGroupMutes() && UserDB.hasNum(_user, Keys.MUTE_GROUP))
		{
			_user.sendPrivateMessage(UserDB.getStr(_user, Keys.MUTE_GROUP));
			return false;
		}
		else if (Config.moduleTimeouts() && UserDB.hasNum(_user, Keys.MUTE_START))
		{
			var duration = UserDB.getNum(_user, Keys.MUTE_DURATION) * 60 * 1000;
			var diff = Date.now() - UserDB.getNum(_user, Keys.MUTE_START);
			if (diff < duration)
			{
				_user.sendPrivateMessage(S.mu.timedMuteStillActive(duration - diff));
				return false;
			}
			UserDB.delNum(_user, Keys.MUTE_START);
			UserDB.delNum(_user, Keys.MUTE_DURATION);
			return true;
		}
		return true;
	};

}());