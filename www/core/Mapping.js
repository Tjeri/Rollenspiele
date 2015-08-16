var rpgMapping =
{
	id: { name: 'id', forList: true },
	c: { name: 'channel', forList: true },
	r: { name: 'running', forList: true },
	hu: { name: 'hostUid', forList: false },
	p: { name: 'players', forList: true },
	n: { name: 'name', forList: true },
	th: { name: 'theme', forList: true },
	d: { name: 'desc', forList: false }
};

function encodeRPG(_rpg, _forList)
{
	if (_rpg)
	{
		var rpg = {};
		for (var shortForm in rpgMapping)
		{
			var longForm = rpgMapping[shortForm];
			if (_forList && !longForm.forList)
			{
				continue;
			}
			if (typeof _rpg[longForm.name] != 'undefined')
			{
				if (!(longForm.name == 'running' && _rpg[longForm.name] === false))
				{
					rpg[shortForm] = _rpg[longForm.name];
				}
			}
		}
		return rpg;
	}
}

function decodeRPG(_rpg)
{
	if (_rpg)
	{
		var rpg = {};
		for (var shortForm in rpgMapping)
		{
			var longForm = rpgMapping[shortForm];
			if (typeof _rpg[shortForm] != 'undefined')
			{
				rpg[longForm.name] = _rpg[shortForm];
			}
		}
		if (!_rpg.hasOwnProperty('running'))
		{
			rpg.ready = true;
		}
		return rpg;
	}
}