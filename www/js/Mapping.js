var rpgMapping =
{
	lp: 'lastPlayed',
	id: 'id',
	c: 'channel',
	r: 'running',
	hu: 'hostUid',
	p: 'players',
	n: 'name',
	th: 'theme',
	d: 'desc'
};

function encodeRPG(_rpg)
{
	var rpg = {};
	for (var shortForm in rpgMapping)
	{
		var longForm = rpgMapping[shortForm];
		if (typeof _rpg[longForm] != 'undefined')
		{
			if (!(longForm == 'running' && _rpg[longForm] === false))
			{
				rpg[shortForm] = _rpg[longForm];
			}
		}
	}
	return rpg;
}

function decodeRPG(_rpg)
{
	var rpg = {};
	for (var shortForm in rpgMapping)
	{
		var longForm = rpgMapping[shortForm];
		if (typeof _rpg[shortForm] != 'undefined')
		{
			rpg[longForm] = _rpg[shortForm];
		}
	}
	if (!_rpg.hasOwnProperty('running'))
	{
		rpg.ready = true;
	}
	return rpg;
}