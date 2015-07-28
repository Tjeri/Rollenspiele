S.mods = {
    added: function (_mod) {
        return _mod.getProfileLink() + " kann ab jetzt RPGs erstellen."
    },
    addedYou: function (_cm) {
        return _cm.getProfileLink() + " hat dir gerade im Channel " + Channel.getMainName() + " das Recht gegeben RPGs zu erstellen. " +
            "Du kannst nun mit /create NICK RPGs erstellen. NICK ist dabei der Spielleiter des erstellten RPG.";
    },
    alreadyMod: function (_mod) {
        return _mod.getProfileLink() + " hat schon das Recht RPGs zu erstellen.";
    },
    list: function (_mods) {
        if (_mods.length == 0) {
            return "Momentan haben keine User das Recht RPGs zu erstellen.";
        }
        var nicks = "";
        _mods.forEach(function (mod) {
            if (nicks != "") {
                nicks += ", ";
            }
            nicks += mod.getProfileLink();
        });
        return "Momentane RPG-Moderatoren: " + nicks;
    },
    notify_text_add: function (_cm, _mod) {
        return _mod.getProfileLink() + " wurde eben von " + _cm.getProfileLink() + " in " + Channel.getMainName() + " als RPG-Moderator hinzugefügt.";
    },
    notify_text_remove: function (_cm, _mod) {
        return _mod.getProfileLink() + " wurde eben von " + _cm.getProfileLink() + " in " + Channel.getMainName() + " als RPG-Moderator entfernt.";
    },
    notify_topic_add: "RPG-Mod hinzugefügt",
    notify_topic_remove: "RPG-Mod entfernt",
    notMod: function (_user) {
        return _user.getProfileLink() + " hat das Recht RPGs zu erstellen nicht.";
    },
    removed: function (_user) {
        return _user.getProfileLink() + " kann nun keine RPGs mehr erstellen.";
    },
    removedYou: function (_cm) {
        return _cm.getProfileLink() + " hat dir gerade im Channel " + Channel.getMainName() + " das Recht RPGs zu erstellen entzogen.";
    }
};