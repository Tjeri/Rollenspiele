var S = {};

var requireFile = function (_name)
{
	require("App/" + _name + ".js");
	require("App/Strings/" + _name + ".js");
};

var replaceHashtag = function (_str)
{
	return _str.replace("#", "°#°", "g");
};

var replaceLineBreak = function (_str)
{
	_str = _str.replace("\n", "°#°", "g");
	return _str.replace("\r", "", "g");
};