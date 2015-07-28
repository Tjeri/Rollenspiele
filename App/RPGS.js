var RPGS = (new function ()
{
	this.addRPG = function (_rpg)
	{
		var rpgs = RPGS.getAllIDs();
		rpgs.push(_rpg.id);
		DB.saveObj(Keys.RPGS_ALL, rpgs);
	};

	this.getAllIDs = function ()
	{
		return DB.getObj(Keys.RPGS_ALL, []);
	};

	this.getAllRPGs = function ()
	{
		var rpgs = RPGS.getAllIDs();
		var result = [];
		rpgs.forEach(function (id)
		{
			result.push(RPGS.getRPG(id));
		});
		return result;
	};

	this.getForUser = function (_user)
	{
		var rpgs = RPGS.getAllIDs();
		var uid = _user.getUserId();
		var result = [];
		rpgs.forEach(function (id)
		{
			var rpg = RPGS.getRPG(id);
			if (RPG.isPlaying(rpg, uid))
			{
				result.push(rpg);
			}
		});
		return result;
	};

	this.getPageData = function (_user, _currentRpg)
	{
		var rpgs = RPGS.getAllRPGs();

		var n = rpgs.length;
		do {
			var newN = 0;
			for (var i = 1; i < n; ++i)
			{
				var j = i - 1;
				if (rpgs[j].lastPlayed < rpgs[i].lastPlayed)
				{
					var rpg = rpgs[j];
					rpgs[j] = rpgs[i];
					rpgs[i] = rpg;
					newN = i;
				}
			}
			n = newN;
		}
		while (n > 0);

		var currentRpg = _currentRpg ? _currentRpg : null;

		return {
			uid: _user.getUserId(),
			rpgs: rpgs,
			channel: Channel.getName(),
			isAllowed: Allowance.isAllowed(_user, true),
			isMod: Mods.isMod(_user, true),
			isDev: Allowance.isDev(_user, true),
			currentRPG: currentRpg
		};
	};

	this.getRPG = function (_id)
	{
		return DB.getObj(Keys.RPG + _id, null);
	};

	this.getRunning = function (allChans)
	{
		var rpgs = RPGS.getAllIDs();
		var result = [];
		rpgs.forEach(function (id)
		{
			var rpg = RPGS.getRPG(id);
			if (rpg.running && (allChans || rpg.channel == Channel.getName()))
			{
				result.push(rpg);
			}
		});
		return result;
	};

	this.removeRPG = function (_rpg)
	{
		var rpgs = RPGS.getAllIDs();
		var index = rpgs.indexOf(_rpg.id);
		rpgs.splice(index, 1);
		DB.saveObj(Keys.RPGS_ALL, rpgs);
		DB.delObj(Keys.RPG + _rpg.id);
	};

	this.update = function (_user)
	{
		RPGS.getAllRPGs().forEach(function (rpg)
		{
			rpg["hostUid"] = rpg.host.getUserId();
			if (!rpg["lastPlayed"])
			{
				rpg["lastPlayed"] = rpg.time;
			}
			RPG.save(rpg);
		});
		_user.sendPrivateMessage(S.rpgs.update);
	};
}());