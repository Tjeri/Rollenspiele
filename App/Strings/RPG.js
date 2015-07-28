S.rpg = {
	accept_notOpen: "Diesem RPG kann man nicht beitreten. Bitte benutze /addPlayer ID:NICK um Spieler hinzuzufügen.",
	accept_notRunning: "Dieses RPG läuft grade nicht. Bitte starte es oder benutze /addPlayer ID:NICK um Spieler hinzuzufügen.",
	accepted: function (_player, _name)
	{
		return "Du hast " + _player.getProfileLink() + " als Mitspieler im RPG '" + _name + "' akzeptiert.";
	},
	acceptedYou: function (_host, _name)
	{
		return "Du wurdest von " + _host.getProfileLink() + " für das RPG '" + _name + "' als Mitspieler akzeptiert.";
	},
	added: function (_player, _name)
	{
		return _player.getNick() + " wurde als Spieler dem RPG '" + _name + "' hinzugefügt.";
	},
	addedYou: function (_user, _name)
	{
		return "Du wurdest von " + _user.getProfileLink() + " dem RPG '" + _name + "' hinzugefügt.";
	},
	alreadyPlaying: function (_player)
	{
		return _player.getProfileLink() + " spielt doch bereits mit.";
	},
	ended: function (_user, _name)
	{
		return _user.getProfileLink() + " hat das RPG '" + _name + "' beendet.";
	},
	leave_Userleft: function (_user, _name)
	{
		return _user.getProfileLink() + " hat das RPG '" + _name + "' verlassen.";
	},
	host_Links: function (_rpg)
	{
		var id = _rpg.id;
		var startEnd = _rpg.running ? "°#°Das °>[Spiel Beenden]|/end " + _rpg.id + "<°" : "°#° Das °>[Spiel Starten]|/start " + _rpg.id + "<°";
		var name = _rpg.name == "" ? "°#°°>Namen setzen|/tf-overridesb /setName " + id + ":[NAME]<° - Jedes RPG sollte einen Namen haben :)"
			: "°#°°>Namen ändern|/tf-overridesb /setName " + id + ":[NAME]<° - aktueller Name: " + _rpg.name;
		var theme = _rpg.theme == "" ? "°#°°>Thema setzen|/tf-overridesb /setTheme " + id + ":[THEMA]<° - Mögliche Themen sind z.B. AZ, NZ, EZ"
			: "°#°°>Thema ändern|/tf-overridesb /setTheme " + id + ":[THEMA]<° - aktuelles Thema: " + _rpg.theme;
		var desc = _rpg.desc == "" ?
				   "°#°°>Beschreibung setzen|/tf-overridesb /setDesc " + id + ":[BESCHREIBUNG]<° - Damit kannst du beschreiben, worum es in diesem RPG geht."
			: "°#°°>Beschreibung ändern|/tf-overridesb /setDesc " + id + ":[BESCHREIBUNG]<° - aktuelle Beschreibung: °#°" + _rpg.desc;
		var host = _rpg.players.length == 1 ? "" : "°#°°>Einen anderen zum Spielleiter machen|/tf-overridesb /changeHost " + id +
												   ":[NICK]<° - Eine andere Person hat dann die Möglichkeit dieses RPG zu verwalten, du verlierst das Recht. Du kannst nur einen Mitspieler zum Spielleiter machen.";
		return "°#°Als Spielleiter hast du folgende Möglichkeiten:" + startEnd
			   + "°#°°>Spieler hinzufügen|/tf-overridesb /addPlayer " + id + ":[NICK]<°"
			   + "°#°°>Spieler entfernen|/tf-overridesb /removePlayer " + id + ":[NICK]<°"
			   + name + theme + desc + host
			   + "°#°°>Die Gruppe verlassen|/leave " + id + "<°"
	},
	host_New: function (_user, _newHost, _name)
	{
		return _newHost.getProfileLink() + " wurde gerade von " + _user.getProfileLink() + " zum Spielleiter im RPG '" + _name + "' ernannt."
	},
	host_You: function (_user, _name)
	{
		return "Du wurdest von " + _user.getProfileLink() + " zum Spielleiter im RPG '" + _name + "' ernannt."
	},
	leave_hostLeft: function (_nick, _newHost, _name)
	{
		return _nick + " hat das RPG '" + _name + "' verlassen. " + _newHost.getProfileLink() + " wurde zum neuen Spielleiter ernannt.";
	},
	leave_hostLeft_New: function (_nick)
	{
		return _nick.getNick() + " hat das RPG verlassen. Du bist der neue Spielleiter und kannst das RPG in diesem Fenster verwalten.";
	},
	removed_You: function (_user, _name)
	{
		return _user.getProfileLink() + " hat dich aus dem RPG '" + _name + "' entfernt.";
	},
	started: function (_user, _name)
	{
		return _user.getProfileLink() + " hat das RPG '" + _name + "' gestartet.";
	}
};

