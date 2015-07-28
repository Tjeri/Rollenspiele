S.rpgm = {
	join: "Hallo und Willkommen im Channel " + Channel.getMainName() + "."
		  + "°#°Momentan läuft ein Rollenspiel, daher bitten wir alles was nicht zum Rollenspiel gehört in Klammern zu schreiben."
		  + "°#°Gültige Klammern: ([{<>}])" + "°#°Weitere Informationen findest du in der °>/info|/info<°.",
	off: "Das Rollenspiel wurde beendet, ihr könnt nun wieder alle ohne Klammern schreiben :)",
	on: "Es läuft jetzt ein Rollenspiel."
		+
		"°#°Um das Rollenspiel optisch von normalen Unterhaltungen zu trennen, möchten wir darum bitten, alles in Klammern zu schreiben, was nicht zum Rollenspiel gehört. "
		+ "°#°Gültige Klammern sind: ([{<>}])" + "°#°Weitere Informationen findet ihr in der °>/info|/info<°.",
	pub: function (_start, _end)
	{
		if (_start)
		{
			return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden (auch hinter dem Text!) [°>/info|/info<°]";
		}
		else if (_end)
		{
			return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden (auch vor dem Text!) [°>/info|/info<°]";
		}
		else
		{
			return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden [°>/info|/info<°]";
		}
	}
};
