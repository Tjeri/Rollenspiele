S.rs = {
    knRecv_notify: function (_sender, _kn, _reason) {
        return "Spende von " + _sender.getProfileLink() + " in " + Channel.getName() + ": " + _kn.asNumber() + " Knuddels°#°Grund:°#°" + _reason;
    },
    knRecv_thanks: "Mein Herr und Meister lässt dir seinen Dank ausrichten.",
    pmRecv: "Whatever."
};