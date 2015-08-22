$(function ()
{
	if (!Client.pageData) {
		$('#rpgRunningInfo').hide();
	}

	$(window).on('click', function ()
	{
		Client.sendEvent("openRPGOverview", {});
	});
});
