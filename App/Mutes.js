var Mutes = (new function ()
{

	this.groupMute = function (_user, _users)
	{

	};

	this.removeGroupMute = function (_user, _users)
	{

	};

	this.removeTimedMute = function (_user, _mutedUser)
	{
		UserDB.delNum(_mutedUser, Keys.MUTE_START);
		UserDB.delNum(_mutedUser, Keys.MUTE_DURATION);
		_mutedUser.sendPrivateMessage(S.mu.timedMuteRemoved(_user));
		_user.sendPrivateMessage(S.mu.timedMuteRemovedConfirmation(_mutedUser));
	};

	this.timedMute = function (_user, _muteUser, _time)
	{
		UserDB.saveNum(_muteUser, Keys.MUTE_START, Date.now());
		UserDB.saveNum(_muteUser, Keys.MUTE_DURATION, _time);

		_muteUser.sendPrivateMessage(S.mu.timedMute(_user, _time));
		_user.sendPrivateMessage(S.mu.timedMuteConfirmation(_muteUser, _time));
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