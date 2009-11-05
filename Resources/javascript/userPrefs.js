
function savePreferences(e) {
		Titanium.API.log('debug', 'userPrefs.js. savePreferences. enter.');
		var a = Titanium.UI.createAlertDialog();
		a.setMessage(slPomodoro.value + ", " +
								 slShortBreak.value + ", " +
								 slLongBreak.value + ", " +
                 switchBeep.value + ", " + 
								 switchVibrate.value + ", " + 
								 switchFlash.value);
		a.show();

		Titanium.API.log('debug', 'userPrefs.js. savePreferences. before new PomodoroData().');
		var pomodoroData = new PomodoroData();
		// var pomodoroData = DataAccessFactory.create();
		Titanium.API.log('debug', 'userPrefs.js. savePreferences. after new PomodoroData().');
		pomodoroData.setPomodoroMinutes(slPomodoro.value);
		pomodoroData.setShortBreakMinutes(slShortBreak.value);
		pomodoroData.setLongBreakMinutes(slLongBreak.value);
		pomodoroData.setBeepFlag(sw1.value);
		pomodoroData.setVibrateFlag(sl1.value);
		pomodoroData.setFlashFlag($F('chkFlash'));
}

// var ui = UIFactory.create();
var switchBeep = Titanium.UI.createSwitch({id:'switchBeep', value:true});
var switchVibrate = Titanium.UI.createSwitch({id:'switchVibrate', value:true});
var switchFlash = Titanium.UI.createSwitch({id:'switchFlash', value:true});
var slPomodoro = Titanium.UI.createSlider({ id:'pomodoroMinutesCtl', min:1, max:35, width: 200 });
var slShortBreak = Titanium.UI.createSlider({ id:'shortBreakMinutesCtl', min:1, max:10, width: 57 });
var slLongBreak = Titanium.UI.createSlider({ id:'longBreakMinutesCtl', min:1, max:20, width: 114 });

