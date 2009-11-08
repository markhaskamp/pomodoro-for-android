
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
		Titanium.API.log('debug', 'userPrefs.js. savePreferences. after new PomodoroData().');
		pomodoroData.setPomodoroMinutes(slPomodoro.value);
		pomodoroData.setShortBreakMinutes(slShortBreak.value);
		pomodoroData.setLongBreakMinutes(slLongBreak.value);
		pomodoroData.setBeepFlag(sw1.value);
		pomodoroData.setVibrateFlag(sl1.value);
		pomodoroData.setFlashFlag($F('chkFlash'));
}

function resetPreferences(e) {
    Titanium.API.log('debug', 'userPrefs.js. resetPreferences(). Enter');
		var pomodoroData = new PomodoroData();
    Titanium.API.log('debug', 'userPrefs.js. got to here.');
    pomodoroData.setToDefaultValues();
    Titanium.API.log('debug', 'userPrefs.js. resetPreferences(). Exit');
}

function getStoredValues(dbField) {
    try {
        var pomodoroData = new PomodoroData();
        var foo =  pomodoroData.getUserPrefsForKey(dbField);
        Titanium.API.log('debug', foo);
        return foo;
    }
    catch(exc) {
        Titanium.API.log('debug', '===> ERROR: ' + exc);
    }
    return 0;
}

// var pomodoroValue = getStoredValues('pomodoroMinutes');
// var shortBreakValue = getStoredValues('shortBreakMinutes');
// var longBreakValue = getStoredValues('longBreakMinutes');

var switchBeep = Titanium.UI.createSwitch({id:'switchBeep', value:true});
var switchVibrate = Titanium.UI.createSwitch({id:'switchVibrate', value:true});
var switchFlash = Titanium.UI.createSwitch({id:'switchFlash', value:true});

var slPomodoro = Titanium.UI.createSlider({ id:'pomodoroMinutesCtl' 
                                            ,min:1, max:35
                                            ,width: 200 
                                            ,value: getStoredValues('pomodoroMinutes')
                                            });

var slShortBreak = Titanium.UI.createSlider({ id:'shortBreakMinutesCtl'
                                              ,min:1, max:10
                                              ,width: 57 
                                              ,value: getStoredValues('shortBreakMinutes')
                                            });

var slLongBreak = Titanium.UI.createSlider({ id:'longBreakMinutesCtl'
                                             ,min:1, max:20
                                             ,width: 114
                                             ,value: getStoredValues('longBreakMinutes')
                                             });

