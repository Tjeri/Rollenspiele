var Keys = (new function () {
	// Core Keys
	this.LOG_TIMEOUT = "LOG_TIMEOUT";               // Saves Timeout ID for manually getting Logs
	this.LOG_USAGE = "LOG_USAGE";                   // Saves Log Messages for Command Usage

    // DB Keys
    this.CHANNEL = "CHANNEL_";                      // Online CMs in Channel
    this.CHANNELS = "CHANNELS";                     // List of active channels
    this.CONFIG = "CONFIG";                         // Config File
    this.MAY_SHOW_PM = "MAY_SHOW_PM";               // Last shown Public Message with missing brackets
    this.MODERATORS = "MODERATORS";                 // List of privileged users
	this.MUTE_DURATION = "TIMED_MUTE_DURATION";     // Duration of Timed Mute
	this.MUTE_GROUP = "GROUP_MUTE";                 // User is Group Muted + Text
    this.MUTE_START = "TIMED_MUTE_START";           // Start Time of Timed Mute
    this.MUTE_TIMEOUT = "TIMEOUT_ID";               // ID of Timeout to clear if Time-Out is removed manually
    this.RPG = "RPG_";                              // Prefix for RPGs (RPG_ID)
	this.RPG_COUNTER = "RPG_COUNTER";               // Counter for RPG IDs
    this.RPG_MODE = "RPG_MODE_";                    // Indicator if RPG Mode is active
    this.RPGS_ALL = "ALL_RPGS";                     // List of all RPGs
    this.TIME = "TIME";                             // User Playtime
    this.TIME_START = "TIME_START_";                // Time for Player Session Start per Player/Channel
    this.TIME_CHANNEL = "TIME_CHANNEL_";            // Time played in Channel
    this.WELCOME = "WELCOME";                       // Prefix for welcome text (WELCOME_NICK)

    // Events
    this.INITIALIZE = "INIT";
    this.SHUTDOWN = "SHUTDOWN";
}());