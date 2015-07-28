var DB = (new function () {
    var _db = KnuddelsServer.getPersistence();

	this.addNum = function (key, value) {
		return _db.addNumber(key, value);
	};
	
    this.delNum = function (key) {
        return _db.deleteNumber(key);
    };

    this.delObj = function (key) {
        return _db.deleteObject(key);
    };

    this.delStr = function (key) {
        return _db.deleteString(key);
    };

    this.getNum = function (key, defaultValue) {
        return _db.getNumber(key, defaultValue);
    };

    this.getObj = function (key, defaultValue) {
        return _db.getObject(key, defaultValue);
    };

    this.getStr = function (key, defaultValue) {
        return _db.getString(key, defaultValue);
    };

    this.hasNum = function (key) {
        return _db.hasNumber(key);
    };

    this.hasStr = function (key) {
        return _db.hasString(key);
    };

    this.saveNum = function (key, value) {
        return _db.setNumber(key, value);
    };

    this.saveObj = function (key, value) {
        return _db.setObject(key, value);
    };

    this.saveStr = function (key, value) {
        return _db.setString(key, value);
    }
}());

var UserDB = (new function () {

    this.addNum = function (user, key, value) {
        return user.getPersistence().addNumber(key, value);
    };

    this.delNum = function (user, key) {
        return user.getPersistence().deleteNumber(key);
    };

    this.delObj = function (user, key) {
        return user.getPersistence().deleteObject(key);
    };

    this.delStr = function (user, key) {
        return user.getPersistence().deleteString(key);
    };

    this.getNum = function (user, key, defaultValue) {
        return user.getPersistence().getNumber(key, defaultValue);
    };

    this.getObj = function (user, key, defaultValue) {
        return user.getPersistence().getObject(key, defaultValue);
    };

    this.getStr = function (user, key, defaultValue) {
        return user.getPersistence().getString(key, defaultValue);
    };

    this.hasNum = function (user, key) {
        return user.getPersistence().hasNumber(key);
    };

    this.hasStr = function (user, key) {
        return user.getPersistence().hasString(key);
    };

    this.saveNum = function (user, key, value) {
        return user.getPersistence().setNumber(key, value);
    };

    this.saveObj = function (user, key, value) {
        return user.getPersistence().setObject(key, value);
    };

    this.saveStr = function (user, key, value) {
        return user.getPersistence().setString(key, value);
    };
}());