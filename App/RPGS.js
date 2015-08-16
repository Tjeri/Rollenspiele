var RPGS = (new function ()
{
	this.getRPG = function (_id)
	{
		return DB.getObj(Keys.RPG + _id, null);
	};

	this.addRPG = function (_rpg)
	{
		var rpgs = RPGS.getAllIDs();
		rpgs.push(_rpg.id);
		DB.saveObj(Keys.RPGS_ALL, rpgs);
	};

	this.removeRPG = function (_rpg)
	{
		var rpgs = RPGS.getAllIDs();
		var index = rpgs.indexOf(_rpg.id);
		rpgs.splice(index, 1);
		DB.saveObj(Keys.RPGS_ALL, rpgs);
		DB.delObj(Keys.RPG + _rpg.id);
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

	this.getRunning = function (_allChans)
	{
		var rpgs = RPGS.getAllIDs();
		var result = [];
		rpgs.forEach(function (id)
		{
			var rpg = RPGS.getRPG(id);
			if (rpg.running && (_allChans || rpg.channel == Channel.getName()))
			{
				result.push(rpg);
			}
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

	this.getPageData = function (_user, _forceSwitch, _openPage, _openRPG)
	{
		return {
			u: _user.getUserId(),
			c: Channel.getName(),
			ia: Allowance.isAllowed(_user, true),
			im: Mods.isMod(_user, true),
			id: Allowance.isDev(_user, true),
			fs: _forceSwitch,
			op: _openPage,
			r: RPGS.getRPGsData(),
			or: encodeRPG(_openRPG)
		};
	};

	this.getRPGsData = function () {
		var allRPGs = RPGS.getAllRPGs();
		var shortRPGs = [];

		allRPGs.sort(sorter);

		allRPGs.forEach(function (rpg) {
			shortRPGs.push(encodeRPG(rpg, true));
		});

		return shortRPGs;
	};

	function sorter(a, b)
	{
		return b.lastPlayed - a.lastPlayed;
	}

	this.update = function (_user)
	{
	};
}());