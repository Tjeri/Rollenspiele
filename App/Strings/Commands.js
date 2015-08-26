S.com = {
    brackets: function (_user) {
        return "Hallo " + _user.getNick() + ", schreib doch bitte in Klammern, da momentan ein Rollenspiel läuft und wir so normales Schreiben vom Rollenspiel trennen."
    },
    conf_changed: "Done.",
    conf_wrongParam: "Parameter existiert nicht.",
    groupMute_minUsers: "Du musst mindestens 2 Nutzer angeben, die sich streiten. Das kann nicht einer allein tun.",
    help: "°>[Befehle]|https://github.com/Tjeri/Rollenspiele/wiki/Befehle<° | " +
    "°>[Bug Meldungen]|https://github.com/Tjeri/Rollenspiele/wiki/Bugs<° | " +
    "°>[ChangeLog]|https://github.com/Tjeri/Rollenspiele/wiki/Changelog<° | " +
    "°>[Wünsche]|https://github.com/Tjeri/Rollenspiele/wiki/W%C3%BCnsche<°" +
    "°#°Die neuste Version ist immer in °>/Elrohir|/go +/Elrohir<° testbar",
    juschu: function (_user) {
        return "Hey " + _user.getNick() + ". Bitte beachte, dass es sich um einen Channel für Rollenspiele (RPG) handelt. " +
            "Zum Ausleben deiner sexuellen Fantasien ist dies der falsche Ort. " +
            "Die diesbezügliche Kontaktaufnahme zu Jugendlichen wird nicht geduldet und kann zur Sperrung des Nicknamen führen.";
    },
	juschuConfirmation: function (_user) {
		return "Ich werde " + _user.getProfileLink() + " darauf hinweisen.";
	},
    notAllowed: "Leider steht dir diese Funktion nicht zur Verfügung.",
    notAvailable: "Diese Funktion ist momentan nicht verfügbar.",
    usage: function (_cmd) {
        return "Bitte nutze die Funktion folgendermaßen: " + _cmd;
    },
    html_removed: function (_user) {
        return "Die Hinweisbox wurde bei " + _user.getProfileLink() + " entfernt.";
    },
    news_sent: "Nachricht versendet.",
    news_topic: "RundMail",
    restart: "Der Bot wird kurz neu gestartet und ist sofort wieder für euch da.",
    rpg_noRunning: "Momentan laufen leider keine RPGs. Wenn du eins starten willst, frage bitte einen CM/HZA oder " + Instance.getDev().getProfileLink() + " um Hilfe.",
    rpg_wrongId: function (_id) {
        return "Ein RPG mit der ID " + _id + " existiert nicht.";
    },
    updated: "Update abgeschlossen."
};