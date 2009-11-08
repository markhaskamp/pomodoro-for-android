
function savePreferences(e) {
    logger = LoggerFactory.create();
		logger.log('debug', 'userPrefs.js. savePreferences. enter.');
		var a = Titanium.UI.createAlertDialog();
		a.setMessage(slPomodoro.value + ", " +
								 slShortBreak.value + ", " +
								 slLongBreak.value + ", " +
                 switchBeep.value + ", " + 
								 switchVibrate.value + ", " + 
								 switchFlash.value);
		a.show();

		logger.log('debug', 'userPrefs.js. savePreferences. before new PomodoroData().');
		var pomodoroData = new PomodoroData();
		logger.log('debug', 'userPrefs.js. savePreferences. after new PomodoroData().');
		pomodoroData.setPomodoroMinutes(slPomodoro.value);
		pomodoroData.setShortBreakMinutes(slShortBreak.value);
		pomodoroData.setLongBreakMinutes(slLongBreak.value);
		pomodoroData.setBeepFlag(sw1.value);
		pomodoroData.setVibrateFlag(sl1.value);
		pomodoroData.setFlashFlag($F('chkFlash'));
}

function resetPreferences(e) {
    logger = LoggerFactory.create();
    logger.log('debug', 'userPrefs.js. resetPreferences(). Enter');
		var pomodoroData = new PomodoroData();
    logger.log('debug', 'userPrefs.js. got to here.');
    pomodoroData.setToDefaultValues();
    logger.log('debug', 'userPrefs.js. resetPreferences(). Exit');
}

function getStoredValues(dbField) {
    try {
        logger = LoggerFactory.create();
        var pomodoroData = new PomodoroData();
        var foo =  pomodoroData.getUserPrefsForKey(dbField);
        logger.log('debug', foo);
        return foo;
    }
    catch(exc) {
        log.log('debug', '===> ERROR: ' + exc);
    }
    return 0;
}

var switchBeep = Titanium.UI.createSwitch({id:'switchBeep', value:true});
var switchVibrate = Titanium.UI.createSwitch({id:'switchVibrate', value:true});
var switchFlash = Titanium.UI.createSwitch({id:'switchFlash', value:true});

var slPomodoro = Titanium.UI.createSlider({ id:'pomodoroMinutesCtl' 
                                            ,min:20, max:35
                                            ,width: 225 
                                            ,value: getStoredValues('pomodoroMinutes')
                                            });

var slShortBreak = Titanium.UI.createSlider({ id:'shortBreakMinutesCtl'
                                              ,min:1, max:10
                                              ,width: 225 
                                              ,value: getStoredValues('shortBreakMinutes')
                                            });

var slLongBreak = Titanium.UI.createSlider({ id:'longBreakMinutesCtl'
                                             ,min:10, max:20
                                             ,width: 225
                                             ,value: getStoredValues('longBreakMinutes')
                                             });

