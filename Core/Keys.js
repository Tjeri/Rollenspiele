var Keys = (new function () {
    // DB Keys
    this.CHANNEL = "CHANNEL_";              // Online CMs in Channel
    this.CHANNELS = "CHANNELS";             // List of active channels
    this.CONFIG = "CONFIG";                 // Config File
    this.MODERATORS = "MODERATORS";         // List of privileged users
    this.MAY_SHOW_PM = "MAY_SHOW_PM";       // Last shown Public Message with missing brackets
    this.RPG = "RPG_";                      // Prefix for RPGs (RPG_ID)
    this.RPG_COUNTER = "RPG_COUNTER";       // Counter for RPG IDs
    this.RPG_MODE = "RPG_MODE_";            // Indicator if RPG Mode is active
    this.RPGS_ALL = "ALL_RPGS";             // List of all RPGs
    this.TIME = "TIME";                     // User Playtime
    this.TIME_START = "TIME_START_";        // Time for Player Session Start per Player/Channel
    this.TIME_CHANNEL = "TIME_CHANNEL_";    // Time played in Channel
    this.WELCOME = "WELCOME";               // Prefix for welcome text (WELCOME_NICK)

    // Events
    this.INITIALIZE = "INIT";
    this.SHUTDOWN = "SHUTDOWN";
}());