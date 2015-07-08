var STRINGS = (new function () {
    this.APP_RESTART = "°>DB reset|/resetdb<°°#°°>App Restart|/apps restart knuddelsDEV.30559001.Rollenspiele<°";
    this.DB_DELETED = "Datenbanken gelöscht.";
    this.EXISTING_CHANS = "Folgende Channels existieren momentan:";
    this.I_ALREADY_PLAY = "Du spielst doch schon mit :)";
    this.I_ASK_PLAY = "Ich werde die Spieler gleich mal fragen, ob das stimmt :)";
    this.I_PLAY = "Du wurdest der Spielerliste hinzugefügt. Alle Nachrichten, die nicht das Spiel betreffen, solltest du natürlich trotzdem in Klammern setzen.";
    this.KNUDDEL_THANKS = "Mein Herr und Meister lässt dir seinen Dank ausrichten.";
    this.NO_PLAYERS = "Keine aktiven Spieler registriert.";
    this.NOT_ALLOWED = "Leider steht dir diese Funktion nicht zur Verfügung.";
    this.NOT_AVAILABLE = "Diese Funktion ist momentan nicht verfügbar.";
    this.RPG_OFF = "Der RPG Modus ist aus.";
    this.RPG_ON = "Der RPG Modus ist an.";
    this.RPG_PRV = "Hallo und Willkommen im Channel Rollenspiele."
        + "°#°Momentan läuft ein Rollenspiel, daher bitten wir alles was nicht zum Rollenspiel gehört in Klammern zu schreiben."
        + "°#°Gültige Klammern: ([{<>}])" + "°#°Weitere Informationen findest du in der °>/info|/info<°.";
    this.SWITCH_RPG_ON = "Es läuft jetzt ein Rollenspiel."
    + "°#°Um das Rollenspiel optisch von normalen Unterhaltungen zu trennen, möchten wir darum bitten, alles in Klammern zu schreiben, was nicht zum Rollenspiel gehört. "
    + "°#°Gültige Klammern sind: ([{<>}])" + "°#°Weitere Informationen findet ihr in der °>/info|/info<°.";
    this.SWITCH_RPG_OFF = "Das Rollenspiel wurde beendet, ihr könnt nun wieder alle ohne Klammern schreiben :)";


    this.activePlayerChange = function(nick, remove, onList) {
        if (remove && onList) {
            return nick + " wurde als aktiver Spieler gelöscht."
        } else if (remove) {
            return nick + " ist kein aktiver Spieler."
        } else if (!onList) {
            return nick + " wurde als aktiver Spieler hinzugefügt.";
        } else {
            return nick + " ist bereits aktiver Spieler.";
        }
    };
    this.activePlayers = function (players) {
        return "Aktive Spieler sind: " + players;
    };
    this.askRPG = function (start, end) {
        if (start) {
            return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden (auch hinter dem Text!) [°>/info|/info<°]" +
                "°#°Wenn du nicht am RPG teilnimmst, bitte beachte dies.°#°°>Ich spiele mit.|/iplay<°";
        } else if (end) {
            return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden (auch vor dem Text!) [°>/info|/info<°]" +
                "°#°Wenn du nicht am RPG teilnimmst, bitte beachte dies.°#°°>Ich spiele mit.|/iplay<°";
        } else {
            return "Es läuft grad ein RPG, darum sollten alle nicht dazugehörigen Texte in Klammern gesetzt werden [°>/info|/info<°]" +
                "°#°Wenn du nicht am RPG teilnimmst, bitte beachte dies.°#°°>Ich spiele mit.|/iplay<°";
        }
    };
    this.canPlay = function (nick) {
        return nick + " möchte am Spiel teilnehmen. Ist das ok? °>[JA]|/canplay " + nick.escapeKCode() + "<° (Wenn nicht, dann ignoriere diese Nachricht einfach)";
    };
    this.cantAccess = function (nick) {
        return "Ich kann auf " + nick + " nicht zugreifen. Er muss den Channel schon mal betreten haben.";
    };
    this.clReason = function (nick) {
        return "°>" + nick.escapeKCode() + " kicken|/cl " + nick.escapeKCode() + ":Hallo XYZ, da du durch eine öffentliche Anfrage aufgefallen bist, die wir als dubios betrachten, wirst du für heute aus diesen Channel ausgeschlossen. Bei Fragen wende dich an den Jugendschutz Administrator: DerNeuanfang . www.knuddels.de/jugendschutz<°";
    };
    this.currentMods = function (mods) {
        if (mods == "") {
            return "Aktuell berechtigte Spieler: Keine";
        } else {
            return "Aktuell berechtigte Spieler: " + mods;
        }
    };
    this.help = function (cm) {
        var out = "Funktionen:";
        out += "°#°/app - Ruft diese Hilfe auf.";
        if (cm) {
            out += "°#°/chans - Zeigt alle offenen RS Channel mit anwesenden CMs."
        }
        if (cm) {
            out += "°#°/juschu NICK - Ermahnt NICK, dass das sexuelle Anschreiben Jugendlicher zur Sperrung führen kann."
        }
        if (cm) {
            out += "°#°/klammern NICK - Ermahnt NICK Klammern um seine Texte zu setzen."
        }
        out += "°#°/player - Zeigt die aktiven Spieler.";
        out += "°#°/player NICK - Fügt NICK als Mitspieler im aktuellen RPG hinzu.";
        out += "°#°/player !NICK - Löscht NICK als Mitspieler im aktuellen RPG.";
        if (cm) {
            out += "°#°/removeWindow NICK - Entfernt das RPG Hinweisfenster bei NICK.";
        }
        out += "°#°/rpg - Zeigt an, ob der RPG Modus an oder aus ist.";
        out += "°#°/rpg on - aktiviert den RPG Modus.";
        out += "°#°/rpg off - deaktiviert den RPG Modus.";
        if (cm) {
            out += "°#°/srpg - wie /rpg, nur die öffentlichen Nachrichten zum aktivieren/deaktivieren werden nicht gezeigt.";
        }
        if (cm) {
            out += "°#°°#°Alle Funktionen in /Elrohir testbar.";
        }
        return out;
    };
    this.juschu = function (nick) {
        return "Hey " + nick + ". Bitte beachte, dass es sich um einen Channel für Rollenspiele (RPG) handelt. " +
            "Zum Ausleben deiner sexuellen Fantasien ist dies der falsche Ort. Die diesbezügliche Kontaktaufnahme zu Jugendlichen wird nicht geduldet und kann zur Sperrung des Nicknamen führen.";
    };
    this.klammern = function (nick) {
        return "Hallo " + nick + " schreib doch bitte in Klammern, da momentan ein Rollenspiel läuft & wir so normales Schreiben vom Rollenspiel trennen."
    };
    this.knuddelDonation = function (chan, sender, knuddelAmount, transferReason) {
        return "Spende von " + sender.getNick() + ": " + knuddelAmount.asNumber() + " Knuddels°#°Grund:°#°" + transferReason;
    };
    this.noCMs = function (chan) {
        return "Keine CMS °>[Channel betreten]|/go +" + chan.escapeKCode() + "<°";
    };
    this.pm = function (pm) {
        return "Whatever.";
    };
    this.removedAsPlayer = function(nick) {
        return "Du wurdest von " + nick + " als aktiver Spieler entfernt."
    };
    this.rpgModChange = function (nick, remove, change) {
        if (remove && change) {
            return nick + " darf den RPG Modus nun nicht mehr verändern.";
        } else if (remove) {
            return nick + " ist nicht für den RPG Modus freigeschaltet.";
        } else if (change) {
            return nick + " darf den RPG Modus nun verändern";
        } else {
            return nick + " ist bereits für den RPG Modus freigeschaltet.";
        }
    };
    this.welcome = function (nick) {
        if (nick == "Tjeri") {
            return "Willkommen, Herr und Meister!";
        } else if (nick == "Serpouis") {
            return "Ich wünsche dir einen wundervollen guten Tag werter wahnsinnig sympathischer Serpouis.";
        } else if (nick == "Vampir Missy") {
            return "Willkommen, Kätzchen!";
        }
    };
    this.wrongNick = function (nick) {
        return "Es gibt keinen User mit dem Nick " + nick;
    }
}());