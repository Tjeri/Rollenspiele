$(function ()
{
	var uid;
	var rpgs;
	var channel;
	var isAllowed;
	var isMod;
	var isDev;

	updatePageData(Client.pageData);

	var currentOverviewTab = '#selectorAll';
	rpgs.some(function (rpg)
	{
		if (rpg.running)
		{
			currentOverviewTab = '#selectorRunning';
			return true;
		}
	});
	var currentDetailsTab = '#selectorDetails';
	var currentRPG = Client.pageData.currentRPG;
	var currentPlayerNicks = [];

	var messageModal = $('#messageModal');
	var inputModal = $('#inputModal');
	var listModal = $('#listModal');
	var textareaModal = $('#textareaModal');
	var themeModal = $('#themeModal');

	if (currentRPG)
	{
		showRPGDetails();
	}
	else
	{
		showRPGOverview();
	}

	function updatePageData(pageData)
	{
		uid = pageData.uid;
		rpgs = [];
		pageData.rpgs.forEach(function(rpg){
			rpgs.push(decodeRPG(rpg));
		});
		channel = pageData.channel;
		if (channel.startsWith('/'))
		{
			channel = channel.substr(1);
		}
		isAllowed = pageData.isAllowed;
		isMod = pageData.isMod;
		isDev = pageData.isDev;

		if (!(isAllowed || isMod || isDev))
		{
			$('#footerRPGOverview').hide();
		}
	}

	Client.addEventListener('*', function (event)
	{
		var type = event.type;
		var data = event.data;

		switch (type)
		{
			case 'error':
				showMessageModal('Fehler', data.msg);
				break;
			case 'info':
				showMessageModal('Info', data.msg);
				break;
			case 'getPlayers':
				getPlayers(data.nicks);
				break;
			case 'tryAddPlayer':
				if (data.nicks.length == 0)
				{
					showMessageModal('Fehler:', 'Alle anwesenden Nutzer spielen bereits mit.')
				}
				else
				{
					showListModal('Spieler hinzufügen', 'Neuer Spieler:', data, 'addPlayer');
				}
				break;
			case 'tryCreateRPG':
				showListModal('RPG erstellen', 'Spielleiter:', data, 'createRPG');
				break;
			case 'updateRPG':
				updateRPG(data.pageData, data.rpg, data.playerNicks);
				break;
			case 'updateRPGs':
				updateRPGs(data.pageData, data.rpg);
				break;

		}
		setAnimationRefreshing(false);
	});

	/** EVENT HANDLER **/
	function updateRPG(pageData, rpg, playerNicks)
	{
		updatePageData(pageData);
		currentRPG = rpg;
		currentPlayerNicks = playerNicks;
		showRPGDetails();
		switchDetailsTab(currentDetailsTab);
	}

	function updateRPGs(pageData, rpg)
	{
		updatePageData(pageData);
		if (rpg)
		{
			currentRPG = rpg;
			showRPGDetails();
		}
		else
		{
			if (currentRPG == null)
			{
				switchOverviewTab(currentOverviewTab);
			}
			else
			{
				showRPGOverview();
			}
		}
	}

	function getPlayers(playerNicks)
	{
		currentPlayerNicks = playerNicks;
		if (currentDetailsTab == '#selectorPlayers' && currentRPG != null)
		{
			switchDetailsTab(currentDetailsTab);
		}
	}

	/** MODALS **/
	$('.modal').on('shown.bs.modal', function ()
	{
		$(this).find('[autofocus]').focus();
	});
	inputModal.keyup(function (event)
	{
		if (event.keyCode == 13)
		{
			$('#buttonInputModal').click();
		}
	});

	$('#buttonInputModal').on('click', function ()
	{
		var action = $(this).attr('action');
		if (action == 'setName')
		{
			Client.sendEvent('setName', { rpgId: currentRPG.id, name: $('#textInputModal').val() });
		}
	});
	$('#buttonThemeModal').on('click', function ()
	{
		var theme1 = $('#select1ThemeModal').find('option:selected').val();
		var theme2 = $('#select2ThemeModal').find('option:selected').val();
		var theme = theme1;
		if (theme1.length > 0 && theme2.length > 0)
		{
			theme += '/';
		}
		theme += theme2;
		Client.sendEvent('setTheme', { rpgId: currentRPG.id, theme: theme });
	});
	$('#buttonTextareaModal').on('click', function ()
	{
		var action = $(this).attr('action');
		var text = $('#textTextareaModal').val();
		if (action == 'setDesc')
		{
			Client.sendEvent('setDesc', { rpgId: currentRPG.id, desc: text });
		}
	});

	/** SELECTORS **/
	$('#selectorRunning').on('click', function ()
	{
		if (currentOverviewTab != '#selectorRunning')
		{
			switchOverviewTab('#selectorRunning');
		}
	});
	$('#selectorAll').on('click', function ()
	{
		if (currentOverviewTab != '#selectorAll')
		{
			switchOverviewTab('#selectorAll');
		}
	});
	$('#selectorOwn').on('click', function ()
	{
		if (currentOverviewTab != '#selectorOwn')
		{
			switchOverviewTab('#selectorOwn');
		}
	});

	$('#selectorDetails').on('click', function ()
	{
		if (currentDetailsTab != '#selectorDetails')
		{
			switchDetailsTab('#selectorDetails');
		}
	});
	$('#selectorPlayers').on('click', function ()
	{
		if (currentDetailsTab != '#selectorPlayers')
		{
			switchDetailsTab('#selectorPlayers');
		}
	});

	/** OVERVIEW **/
	$('#buttonRefreshRPGOverview').on('click', function ()
	{
		setAnimationRefreshing(true);
		Client.sendEvent('updateRPGs', {});
	});
	$(document).on('click', '._rowRPG', function ()
	{
		var rpgId = $(this).attr('rpgId');
		rpgs.some(function (rpg)
		{
			if (rpg.id == rpgId)
			{
				currentRPG = rpg;
				return true;
			}
			return false;
		});
		showRPGDetails();
	});
	$('#buttonCreateRPG').on('click', function ()
	{
		setAnimationRefreshing(true);
		Client.sendEvent('tryCreateRPG', {});
	});
	$(document).on('click', '.createRPG', function ()
	{
		Client.sendEvent('createRPG', { uid: $(this).attr('uid') });
	});

	/** DETAILS **/
	$('#containerBackRPGDetails').on('click', function ()
	{
		showRPGOverview();
	});
	$('#buttonRefreshRPGDetails').on('click', function ()
	{
		setAnimationRefreshing(true);
		Client.sendEvent('updateRPG', { rpgId: currentRPG.id });
	});
	$(document).on('click', '#linkEditName', function ()
	{
		showInputModal('Name ändern', 'Name:', 'Gib einen neuen Namen ein', currentRPG.name, 'Ändern', 'setName');
	});
	$(document).on('click', '#linkEditTheme', function ()
	{
		var theme = currentRPG.theme.trim();
		if (theme)
		{
			var themes = theme.split("/");
			var selected1 = '';
			var selected2 = '';

			themes.forEach(function (theme)
			{
				switch (theme)
				{
					case 'AZ':
						selected1 = 'AZ';
						break;
					case 'NZ':
						selected1 = 'NZ';
						break;
					case 'EZ':
						selected1 = 'EZ';
						break;
					case 'Fantasy':
						selected2 = 'Fantasy';
						break;
					case 'Anime':
						selected2 = 'Anime';
						break;
					case 'SciFi':
						selected2 = 'SciFi';
						break;
					case 'RL':
						selected2 = 'RL';
						break;
					default:
				}
			});
			$('#select1ThemeModal').val(selected1);
			$('#select2ThemeModal').val(selected2);
		} else {
			$('#select1ThemeModal').select('');
			$('#select2ThemeModal').select('');
		}
		$('#themeModal').modal();
	});
	$(document).on('click', '#linkEditDesc', function ()
	{
		showTextareaModal('Beschreibung ändern', 'Beschreibung:', 'Ändern', 'setDesc');
	});
	$('#linkToggleRunning').on('click', function ()
	{
		if (currentRPG.running)
		{
			Client.sendEvent('endRPG', { rpgId: currentRPG.id });
		}
		else
		{
			Client.sendEvent('startRPG', { rpgId: currentRPG.id });
		}
	});
	$('#linkChangeHost').on('click', function ()
	{
		if (currentPlayerNicks.length <= 1)
		{
			showMessageModal('Fehler:', 'Du bist allein in diesem RPG. Du kannst nur Mitspieler zum neuen Spielleiter ernennen.');
		}
		else
		{
			var uids = [];
			var nicks = [];
			for (var i = 0; i < currentPlayerNicks.length; ++i)
			{
				if (currentRPG.players[i] != currentRPG.hostUid)
				{
					uids.push(currentRPG.players[i]);
					nicks.push(currentPlayerNicks[i]);
				}
			}
			showListModal('Spielleiter ändern', 'Neuer Spielleiter:', { uids: uids, nicks: nicks }, 'changeHost')
		}
	});
	$(document).on('click', '.changeHost', function ()
	{
		setAnimationRefreshing(true);
		Client.sendEvent('changeHost', { rpgId: currentRPG.id, uid: $(this).attr('uid') });
	});
	$('#linkLeave').on('click', function ()
	{
		Client.sendEvent('leaveRPG', { rpgId: currentRPG.id });
	});
	$(document).on('click', '.nickLink', function ()
	{
		Client.executeSlashCommand('/w ' + $(this).attr('nick'));
	});
	$(document).on('click', '.removePlayer', function ()
	{
		Client.sendEvent('removePlayer', { rpgId: currentRPG.id, uid: $(this).attr('uid') });
	});
	$(document).on('click', '.leaveRPG', function ()
	{
		Client.sendEvent('leaveRPG', { rpgId: currentRPG.id });
	});
	$(document).on('click', '#addPlayer', function ()
	{
		setAnimationRefreshing(true);
		Client.sendEvent('tryAddPlayer', { rpg: currentRPG });
	});
	$(document).on('click', '.addPlayer', function ()
	{
		setAnimationRefreshing(true);
		Client.sendEvent('addPlayer', { rpgId: currentRPG.id, uid: $(this).attr('uid') });
	});

	function setAnimationRefreshing(refreshing)
	{
		if (refreshing)
		{
			$('#buttonRefreshRPGOverview').addClass('rotating');
			$('#buttonRefreshRPGDetails').addClass('rotating');
		}
		else
		{
			$('#buttonRefreshRPGOverview').removeClass('rotating');
			$('#buttonRefreshRPGDetails').removeClass('rotating');
		}
	}

	function showRPGOverview()
	{
		$('#containerRPGOverview').show();
		$('#containerRPGDetails').hide();

		currentRPG = null;

		switchOverviewTab(currentOverviewTab);
	}

	function switchOverviewTab(tab)
	{
		var container = $('#containerRPGOverviewContent');

		var template = $.trim($('#templateContentRPGOverview').html());
		Mustache.parse(template);

		$(currentOverviewTab).removeClass('active');
		$(tab).addClass('active');
		currentOverviewTab = tab;

		var running = false;
		var own = false;

		var textEmpty;
		switch (tab)
		{
			case '#selectorRunning':
				own = true;
				textEmpty = 'Momentan laufen leider keine RPGs';
				break;
			case '#selectorAll':
				running = true;
				own = true;
				textEmpty = 'Keine RPGs gespeichert.';
				break;
			case '#selectorOwn':
				running = true;
				textEmpty = 'Du bist bisher in keinem RPG';
				break;
		}

		container.empty();
		container.fadeOut(200, function ()
		{
			container.empty();
			var shownRPGs = [];

			for (var i = 0; i < rpgs.length; ++i)
			{
				var rpg = rpgs[i];
				if ((running || rpg.running) && (own || rpg.players.indexOf(uid) > -1))
				{
					shownRPGs.push(rpg);
				}
			}

			var tableData = {
				hasRPGs: shownRPGs.length > 0,
				rpgs: shownRPGs,
				dot: function ()
				{
					return this.running ? 'greenDot' : 'grayDot'
				},
				getName: function ()
				{
					return this.name ? this.name : 'Kein Name festgelegt';
				},
				getTheme: function ()
				{
					return this.theme ? this.theme : 'Kein Thema festgelegt'
				},
				textEmpty: textEmpty
			};
			container.append(Mustache.render(template, tableData));

			container.fadeIn(200);
		});
	}

	function showRPGDetails()
	{
		$('#containerRPGOverview').hide();
		$('#containerRPGDetails').show();

		$(currentDetailsTab).removeClass('active');
		currentDetailsTab = '#selectorDetails';
		$(currentDetailsTab).addClass('active');

		setAnimationRefreshing(true);
		Client.sendEvent('getPlayers', { uids: currentRPG.players });

		var statusDetails = $('#statusDetails');
		if (currentRPG.running)
		{
			statusDetails.removeClass('grayDot');
			statusDetails.addClass('greenDot');
		}
		else
		{
			statusDetails.removeClass('greenDot');
			statusDetails.addClass('grayDot');
		}

		setDisplayFooterVisibilities();

		switchDetailsTab(currentDetailsTab);
	}

	function setDisplayFooterVisibilities()
	{
		var isPlaying = currentRPG.players.indexOf(uid) > -1;
		var isHost = isDev || currentRPG.hostUid == uid;

		if (!isDev && !isPlaying)
		{
			$('#footerRPGDetails').hide();
		}
		else
		{
			$('#footerRPGDetails').show();
			if (currentRPG.running)
			{
				if (isHost || isAllowed)
				{
					$('#linkToggleRunning').show();
					$('#linkToggleRunningText').text('RPG beenden');
					$('#pipeHost').show();
					$('#linkChangeHost').show();
					if (isDev && !isPlaying)
					{
						$('#pipePlayer').hide();
						$('#linkLeave').hide();
					}
					else
					{
						$('#pipePlayer').show();
						$('#linkLeave').show();
					}
				}
				else
				{
					$('#linkToggleRunning').hide();
					$('#pipeHost').hide();
					$('#linkChangeHost').hide();
					$('#pipePlayer').hide();
					$('#linkLeave').show();
				}
			}
			else
			{
				if (isHost)
				{
					$('#linkToggleRunning').show();
					$('#linkToggleRunningText').text('RPG starten');
					$('#pipeHost').show();
					$('#linkChangeHost').show();
					if (isDev && !isPlaying)
					{
						$('#pipePlayer').hide();
						$('#linkLeave').hide();
					}
					else
					{
						$('#pipePlayer').show();
						$('#linkLeave').show();
					}
				}
				else
				{
					$('#linkToggleRunning').hide();
					$('#pipeHost').hide();
					$('#linkChangeHost').hide();
					$('#pipePlayer').hide();
					$('#linkLeave').show();
				}
			}
		}
	}

	function switchDetailsTab(tab)
	{
		var content = $('#containerMainContentRPGDetails');

		var templateDetails = $.trim($('#templateDetailsRPGDetails').html());
		Mustache.parse(templateDetails);
		var templatePlayers = $.trim($('#templatePlayersRPGDetails').html());
		Mustache.parse(templatePlayers);

		$(currentDetailsTab).removeClass('active');
		$(tab).addClass('active');
		currentDetailsTab = tab;

		content.empty();
		content.fadeOut(200, function ()
		{
			content.empty();
			switch (tab)
			{
				case '#selectorDetails':
					var rpgName = currentRPG.name ? currentRPG.name : 'Kein Name';
					var rpgTheme = currentRPG.theme ? currentRPG.theme : 'Kein Thema';
					var rpgDesc = currentRPG.desc ? currentRPG.desc : 'Keine Beschreibung';

					var details = {
						id: currentRPG.id,
						canManage: uid == currentRPG.hostUid || isDev,
						name: rpgName,
						theme: rpgTheme,
						desc: rpgDesc
					};
					content.append(Mustache.render(templateDetails, details));
					break;
				case '#selectorPlayers':
					var players = [];
					for (var i = 0; i < currentPlayerNicks.length; ++i)
					{
						players.push(i);
					}
					var playerData = {
						players: players,
						nick: function ()
						{
							return currentPlayerNicks[this];
						},
						isHost: function ()
						{
							return currentRPG.players[this] == currentRPG.hostUid;
						},
						self: function ()
						{
							return Client.getNick() == currentPlayerNicks[this];
						},
						uid: function ()
						{
							return currentRPG.players[this];
						},
						canManage: function ()
						{
							return uid == currentRPG.hostUid || isDev;
						}
					};
					content.append(Mustache.render(templatePlayers, playerData));
					break;
			}
			content.fadeIn(200);
		});
	}

	function showMessageModal(caption, text)
	{
		$('#messageModal').modal();
		$('#captionMessageModal').text(caption);
		$('#textMessageModal').text(text);
	}

	function showInputModal(caption, label, placeholder, text, buttonText, action)
	{
		inputModal.modal();
		$('#captionInputModal').text(caption);
		$('#labelInputModal').text(label);
		var input = $('#textInputModal');
		input.attr('placeholder', placeholder);
		input.val(text);
		var btn = $('#buttonInputModal');
		btn.text(buttonText);
		btn.attr('action', action);
	}

	function showListModal(caption, label, data, classForClick)
	{
		listModal.modal();
		$('#captionListModal').text(caption);
		$('#labelListModal').text(label);
		var output = [];
		$.each(data.uids, function (i, item)
		{
			output.push('<li class="' + classForClick + ' noStyle inline cursorPointer" data-dismiss="modal" uid="' + item + '"><a>' + data.nicks[i] +
			            '</a></li><br />');
		});
		$('#selectListModal').html(output.join(''));
	}

	function showTextareaModal(caption, label, buttonText, action)
	{
		$('#textareaModal').modal();
		$('#captionTextareaModal').text(caption);
		$('#labelTextareaModal').text(label);
		$('#textTextareaModal').val(currentRPG.desc);
		var btn = $('#buttonTextareaModal');
		btn.text(buttonText);
		btn.attr('action', action);
	}
});
