var STRINGS = (new function () {
    this.command_notAllowed = "Leider steht dir diese Funktion nicht zur Verfügung.";

    this.rpg_decline_alreadyDeclined = function (nick) {
        return nick + " wurde bereits abgelehnt.";
    };
    this.rpg_decline_alreadyPlaying = function (nick, id) {
        return nick + " wurde schon als Spieler hinzugefügt. Möchtest du ihn/sie löschen? °>[Löschen]|/removePlayer " + id + ":" + nick.escapeKCode() + "<°";
    };
    this.rpg_declined = function (user) {
        return "Deine Anfrage wurde von " + user.getNick() + " abgelehnt."
    };
    this.rpg_declined_user = function (nick, id) {
        return nick + " wurde abgelehnt. Er/Sie kann dem RPG nun nicht mehr beitreten. Du kannst ihn/sie aber immer noch als Spieler hinzufügen. °>[Hinzufügen]|/tryAddPlayer " + id + ":" + nick + "<°";
    };
    this.rpg_desc_changed = function (desc) {
        return "Die neue Beschreibung ist: °#°" + desc;
    };
    this.rpg_end = function (user) {
        return user.getNick() + " hat das RPG beendet. Danke fürs Spielen! :)";
    };
    this.rpg_info = function (id, name, theme, desc, players, playtime, time) {
        if (playtime == "00:00:00.000") {
            playtime = "Spiel läuft nicht";
        }
        return "°#°_ID_: " + id + "°#°_Name_: " + name + "°#°_Thema_: " + theme + "°#°_Beschreibung_: " + desc + "°#°_Spieler_: " + players + "°#°_Spielzeit_: " + playtime + "°#°_Gesamt Spielzeit_: " + time;
    };
    this.rpg_info_noName = "Kein Name festgelegt";
    this.rpg_info_noTheme = "Kein Thema festgelegt";
    this.rpg_info_noDesc = "Keine Beschreibung";
    this.rpg_info_host = " (Spielleiter)";
    this.rpg_join_alreadyDeclined = "Der Beitritt für dieses RPG wurde bereits abgelehnt.";
    this.rpg_join_ask = function (user) {
        return "Ich werde " + user.getNick() + " gleich mal fragen :)";
    };
    this.rpg_join_question = function (nick, id) {
        return nick + " möchte an deinem RPG teilnehmen. °>[Annehmen]|/accept " + id + ":" + nick.escapeKCode() + "<° °>[Ablehnen]|/decline " + id + ":" + nick.escapeKCode() + "<°";
    };
    this.rpg_leave = "Du hast das RPG verlassen.";
    this.rpg_leave_newHost = function (nick, user) {
        return nick + " hat das Spiel verlassen. " + user.getNick() + " ist nun neuer Spielleiter."
    };
    this.rpg_leave_notPlaying = "Du nimmst an diesem RPG nicht teil.";
    this.rpg_leave_userLeft = function (nick) {
        return nick + " hat das RPG verlassen.";
    };
    this.rpg_name_changed = function (user, oldName, newName) {
        return user.getNick() + " hat den Namen vom RPG '" + oldName + "' gerade auf '" + newName + "' geändert."
    };
    this.rpg_newHost = function (user, name) {
        return "Du wurdest von " + user.getNick() + " zum Spielleiter im RPG '" + name + "' ernannt."
    };
    this.rpg_newHost_mustBePlayer = function (nick) {
        return nick + " muss am Spiel teilnehmen, um den Spielleiterposten zu übernehmen.";
    };
    this.rpg_newHost_players = function (nick, user, name) {
        return nick + " wurde gerade von " + user.getNick() + " zum Spielleiter im RPG '" + name + "' ernannt."
    };
    this.rpg_removePlayer_leave = function (id) {
        return "Du kannst dich nicht selbst entfernen. Bitte nutze /leave ID zum Verlassen der Gruppe. °>[Gruppe verlassen]|>/leave " + id + "<°";
    };
    this.rpg_removePlayer_notPlaying = function (user) {
        return user.getNick() + " steht nicht auf der Spielerliste.";
    };
    this.rpg_removePlayer_removed = function (user) {
        return user.getNick() + " wurde von der Spielerliste entfernt.";
    };
    this.rpg_removePlayer_removedYou = function (user, name) {
        return user.getNick() + " hat dich aus dem RPG '" + name + "' entfernt.";
    };
    this.rpg_theme_changed = function (user, name, oldTheme, newTheme) {
        return user.getNick() + " hat das Thema vom RPG '" + name + "' gerade von '" + oldTheme + "' auf '" + newTheme + "' geändert."
    };
    this.rpg_theme_set = function (user, name, theme) {
        return user.getNick() + " hat das Thema vom RPG '" + name + "' gerade auf '" + theme + "' festgelegt."
    };
    this.rpgs_created = function (id, host) {
        return "Das RPG mit der ID " + id + " wurde gestartet. Als Spielleiter hast du " + host.getNick() + " festgelegt.";
    };
    this.rpgs_host = function (rpg) {
        var id = rpg.id;
        var startEnd = rpg.running ? "°#°Das °>[Spiel Beenden]|/end " + rpg.id + "<°" : "°#° Das °>[Spiel Starten]|/start " + rpg.id + "<°";
        var name = rpg.name == "" ? "°#°°>Namen setzen|/tf-overridesb /setName " + id + ":[NAME]<° - Jedes RPG sollte einen Namen haben :)"
            : "°#°°>Namen ändern|/tf-overridesb /setName " + id + ":[NAME]<° - aktueller Name: " + rpg.name;
        var theme = rpg.theme == "" ? "°#°°>Thema setzen|/tf-overridesb /setTheme " + id + ":[THEMA]<° - Mögliche Themen sind z.B. AZ, NZ, EZ"
            : "°#°°>Thema ändern|/tf-overridesb /setTheme " + id + ":[THEMA]<° - aktuelles Thema: " + rpg.theme;
        var desc = rpg.desc == "" ? "°#°°>Beschreibung setzen|/tf-overridesb /setDesc " + id + ":[BESCHREIBUNG]<° - Damit kannst du beschreiben, worum es in diesem RPG geht."
            : "°#°°>Beschreibung ändern|/tf-overridesb /setDesc " + id + ":[BESCHREIBUNG]<° - aktuelle Beschreibung: °#°" + rpg.desc;
        var host = rpg.players.length == 1 ? "" : "°#°°>Einen anderen zum Spielleiter machen|/tf-overridesb /changeHost " + id + ":[NICK]<° - Eine andere Person hat dann die Möglichkeit dieses RPG zu verwalten, du verlierst das Recht. Du kannst nur einen Mitspieler zum Spielleiter machen.";
        return "°#°Als Spielleiter hast du folgende Möglichkeiten:" + startEnd
            + "°#°°>Spieler hinzufügen|/tf-overridesb /addPlayer " + id + ":[NICK]<°"
            + "°#°°>Spieler entfernen|/tf-overridesb /removePlayer " + id + ":[NICK]<°"
            + name + theme + desc + host
            + "°#°°>Die Gruppe verlassen|/leave " + id + "<°"
    };
    this.rpgs_notExisting = function (id) {
        return "Ein RPG mit der ID " + id + " existiert nicht.";
    };
    this.rpgs_noRunningRPGs = "Momentan laufen leider keine RPGs. Wenn du eins starten willst, frage bitte einen CM/HZA oder " + Instance.getDev().getProfileLink() + " um Hilfe.";
    this.rpgs_notPlaying = "Du nimmst gerade an keinem RPG teil.";
    this.rpgs_running = function (rpgs) {
        return "Folgende RPGs laufen gerade:" + rpgs;
    };
    this.rpgs_start = function (user) {
        return user.getNick() + " hat dir ein RPG gestartet.";
    };
}());