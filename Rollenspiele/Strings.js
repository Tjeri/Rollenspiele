var STRINGS = (new function () {
    this.app_restart = "°>App Restart|/apps restart knuddelsDEV.30559001.Rollenspiele<°";
    this.channelCover_existingChannels = "Folgende Channels existieren momentan:";
    this.channelCover_noCMs = function (chan) {
        return "Keine CMS °>[Channel betreten]|/go +" + chan.escapeKCode() + "<°";
    };
    this.command_brackets = function (user) {
        return "Hallo " + user.getNick() + " schreib doch bitte in Klammern, da momentan ein Rollenspiel läuft & wir so normales Schreiben vom Rollenspiel trennen."
    };
    this.command_juschu = function (user) {
        return "Hey " + user.getNick() + ". Bitte beachte, dass es sich um einen Channel für Rollenspiele (RPG) handelt. " +
            "Zum Ausleben deiner sexuellen Fantasien ist dies der falsche Ort. Die diesbezügliche Kontaktaufnahme zu Jugendlichen wird nicht geduldet und kann zur Sperrung des Nicknamen führen.";
    };
    this.command_notAllowed = "Leider steht dir diese Funktion nicht zur Verfügung.";
    this.command_notAvailable = "Diese Funktion ist momentan nicht verfügbar.";
    this.command_usage = function (command) {
        return "Bitte nutze die Funktion folgendermaßen: " + command;
    };
    this.help = "Alle Funktionen findest du °>[HIER]|https://github.com/Tjeri/Rollenspiele/wiki/Befehle<°°#°°>[ChangeLog]|https://github.com/Tjeri/Rollenspiele/wiki/Changelog<°°#°Alle Funktionen in /Elrohir testbar.";

    this.html_removed = function (user) {
        return "Fenster bei " + user.getNick() + " entfernt.";
    };
    this.knuddel_donation = function (chan, sender, knuddelAmount, transferReason) {
        return "Spende von " + sender.getNick() + ": " + knuddelAmount.asNumber() + " Knuddels°#°Grund:°#°" + transferReason;
    };
    this.knuddel_thanks = "Mein Herr und Meister lässt dir seinen Dank ausrichten.";
    this.mod_added = function (nick) {
        return nick + " ist jetzt Mod.";
    };
    this.mod_already = function (nick) {
        return nick + " ist schon Mod.";
    };
    this.mod_list = function (nicks) {
        return "Momentane Mods: " + (nicks == "" ? "Keine" : nicks);
    };
    this.mod_isNot = function (nick) {
        return nick + " ist kein Mod.";
    };
    this.mod_removed = function (nick) {
        return nick + " ist jetzt nicht mehr Mod.";
    };
    this.private_answer = function (pm) {
        return "Whatever.";
    };
    this.rpg_added_you = function (user, name) {
        return "Du wurdest von " + user.getNick() + " dem RPG '" + name + "' hinzugefügt.";
    };
    this.rpg_added_user_confirmation = function (user) {
        return user.getNick() + " wurde als Spieler hinzugefügt.";
    };
    this.rpg_addPlayer_notAllowed = "Du kannst in diesem RPG keine Spieler hinzufügen.";
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
    this.rpg_desc_notAllowed = "Du bist nicht berechtigt die Beschreibung dieses RPG zu ändern.";
    this.rpg_end = function (user) {
        return user.getNick() + " hat das RPG beendet. Danke fürs Spielen! :)";
    };
    this.rpg_end_notAllowed = "Du bist nicht berechtigt dieses RPG zu beenden.";
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
    this.rpg_join_accepted = function (user) {
        return "Du wurdest von " + user.getNick() + " als Mitspieler akzeptiert.";
    };
    this.rpg_join_alreadyDeclined = "Der Beitritt für dieses RPG wurde bereits abgelehnt.";
    this.rpg_join_ask = function (user) {
        return "Ich werde " + user.getNick() + " gleich mal fragen :)";
    };
    this.rpg_join_question = function (nick, id) {
        return nick + " möchte an deinem RPG teilnehmen. °>[Annehmen]|/accept " + id + ":" + nick.escapeKCode() + "<° °>[Ablehnen]|/decline " + id + ":" + nick.escapeKCode() + "<°";
    };
    this.rpg_join_userAccepted = function (user) {
        return "Du hast " + user.getNick() + " als Mitspieler akzeptiert.";
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
    this.rpg_name_notAllowed = "Du bist nicht berechtigt den Namen dieses RPG zu ändern.";
    this.rpg_newHost = function (user, name) {
        return "Du wurdest von " + user.getNick() + " zum Spielleiter im RPG '" + name + "' ernannt."
    };
    this.rpg_newHost_mustBePlayer = function (nick) {
        return nick + " muss am Spiel teilnehmen, um den Spielleiterposten zu übernehmen.";
    };
    this.rpg_newHost_notAllowed = "Du kannst den Spielleiter in diesem RPG nicht ändern.";
    this.rpg_newHost_players = function (nick, user, name) {
        return nick + " wurde gerade von " + user.getNick() + " zum Spielleiter im RPG '" + name + "' ernannt."
    };
    this.rpg_removePlayer_leave = function (id) {
        return "Du kannst dich nicht selbst entfernen. Bitte nutze /leave ID zum Verlassen der Gruppe. °>[Gruppe verlassen]|>/leave " + id + "<°";
    };
    this.rpg_removePlayer_notAllowed = "Du kannst keine Spieler löschen.";
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
    this.rpg_theme_notAllowed = "Du bist nicht berechtigt das Thema dieses RPG zu ändern.";
    this.rpg_theme_set = function (user, name, theme) {
        return user.getNick() + " hat das Thema vom RPG '" + name + "' gerade auf '" + theme + "' festgelegt."
    };
    this.rpgs_alreadyPlaying = function (nick) {
        return nick + " spielt bereits.";
    };
    this.rpgs_create_notAllowed = "Du bist leider nicht berechtigt RPGs anzulegen. Bitte wende dich bei Fragen an " + KnuddelsServer.getAppDeveloper().getProfileLink();
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
    this.rpgs_noRunningRPGs = "Momentan laufen leider keine RPGs. Wenn du eins starten willst, frage bitte einen CM/HZA oder " + KnuddelsServer.getAppDeveloper().getProfileLink() + " um Hilfe.";
    this.rpgs_notPlaying = "Du nimmst gerade an keinem RPG teil.";
    this.rpgs_running = function (rpgs) {
        return "Folgende RPGs laufen gerade:" + rpgs;
    };
    this.rpgs_start = function (user) {
        return user.getNick() + " hat dir ein RPG gestartet.";
    };
    this.rpgs_user_alreadyPlaying = "Du spielst doch schon in einem RPG mit.";
    this.rpgMode_off = "Der RPG Modus ist aus.";
    this.rpgMode_on = "Der RPG Modus ist an.";
    this.rpgMode_publicMessage = function (start, end) {
        if (start) {
            return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden (auch hinter dem Text!) [°>/info|/info<°]";
        } else if (end) {
            return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden (auch vor dem Text!) [°>/info|/info<°]";
        } else {
            return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden [°>/info|/info<°]";
        }
    };
    this.rpgMode_userJoined = "Hallo und Willkommen im Channel Rollenspiele."
        + "°#°Momentan läuft ein Rollenspiel, daher bitten wir alles was nicht zum Rollenspiel gehört in Klammern zu schreiben."
        + "°#°Gültige Klammern: ([{<>}])" + "°#°Weitere Informationen findest du in der °>/info|/info<°.";
    this.rpgMode_switch_on = "Es läuft jetzt ein Rollenspiel."
        + "°#°Um das Rollenspiel optisch von normalen Unterhaltungen zu trennen, möchten wir darum bitten, alles in Klammern zu schreiben, was nicht zum Rollenspiel gehört. "
        + "°#°Gültige Klammern sind: ([{<>}])" + "°#°Weitere Informationen findet ihr in der °>/info|/info<°.";
    this.rpgMode_switch_off = "Das Rollenspiel wurde beendet, ihr könnt nun wieder alle ohne Klammern schreiben :)";
    this.user_cantAccess = function (nick) {
        return "Ich kann auf " + nick + " nicht zugreifen. Er muss den Channel schon mal betreten haben.";
    };
    this.user_wrongNick = function (nick) {
        return "Es gibt keinen User mit dem Nick " + nick;
    };
    this.welcome_list = function (nicks) {
        return "Folgende Leute haben gerade eine eigene Begrüßung: " + nicks == "" ? "Keine" : nicks;
    };
    this.welcome_message = function (nick, msg) {
        return nick + " hat folgende Nachricht zur Begrüßung: °#°" + msg;
    };
    this.welcome_newMessage = function (nick, msg) {
        return nick + " wird ab nun mit folgendem Text begrüßt: °#°" + msg;
    };
    this.welcome_notRegistered = function (nick) {
        return "Keine Begrüßung für " + nick + " registriert.";
    };
    this.welcome_removed = function (nick) {
        return nick + " hat nun keine eigene Begrüßung mehr."
    };
}());