S.mu = {
	timedMute: function (_cm, _time) {
		return "Du hast von " + _cm.getProfileLink() + " einen Time-Out erhalten. In " + _time + " Minuten kannst du wieder öffentlich schreiben. Nutze die Zeit um dich etwas zu beruhigen.";
	},
	timedMuteConfirmation: function (_mutedUser, _time) {
		return _mutedUser.getProfileLink() + " hat einen Time-Out erhalten. Er/Sie kann in " + _time + " Minuten wieder schreiben.";
	},
	timedMuteRemoved: function (_cm) {
		return "Dein Time-Out wurde von " + _cm.getProfileLink() + " aufgehoben.";
	},
	timedMuteRemovedConfirmation: function (_mutedUser) {
		return "Der Time-Out von " + _mutedUser.getProfileLink() + " wurde aufgehoben.";
	},
	timedMuteStillActive: function (_timeLeft) {
		var minutesLeft = Math.floor(_timeLeft / (60 * 1000));
		var timeLeft = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
		var secondsLeft = Math.floor((_timeLeft - (minutesLeft * 60 * 1000)) / 1000);
		timeLeft += ":";
		timeLeft += secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
		return "Du kannst in " + timeLeft + " Minuten wieder schreiben.";
	}
};
