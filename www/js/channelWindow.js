$(function ()
{
	$(window).on('click', function ()
	{
		Client.sendEvent("openRPGOverview", {});
	});
});
