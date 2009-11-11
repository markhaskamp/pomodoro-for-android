
function savePreferences(e) {
    logger = LoggerFactory.create();
		logger.log('debug', 'userPrefs.js. savePreferences. enter.');
		var a = Titanium.UI.createAlertDialog();
    a.setMessage("Saved");
		a.show();

		var pomodoroData = DataAccessFactory.create();
		pomodoroData.setPomodoroMinutes(slPomodoro.value);
		pomodoroData.setShortBreakMinutes(slShortBreak.value);
		pomodoroData.setLongBreakMinutes(slLongBreak.value);
	  pomodoroData.setBeepFlag(switchBeep.value);
		// pomodoroData.setVibrateFlag(switchVibrate.value);
}

function resetPreferences(e) {
    switchBeep.value = true;
    slPomodoro.value = 25;
    slShortBreak.value = 5;
    slLongBreak.value = 15;

		var pomodoroData = new PomodoroData();
    pomodoroData.setToDefaultValues();

		var a = Titanium.UI.createAlertDialog();
    a.setMessage("Reset and Saved");
		a.show();
}

function getStoredValues(dbField) {
    logger = LoggerFactory.create();
    try {
        var pomodoroData = new PomodoroData();
        return pomodoroData.getUserPrefsForKey(dbField);
    }
    catch(exc) {
        logger.log('debug', '===> ERROR: ' + exc);
    }
    return 0;
}

var tfHash = $H();
tfHash.set(0, false);
tfHash.set(1, true);

var switchBeep = Titanium.UI.createSwitch({id:'switchBeep', value:tfHash.get(getStoredValues('finishBeep')) });

var slPomodoro = Titanium.UI.createSlider({ id:'pomodoroMinutesCtl' 
                                            ,min:20, max:35
                                            ,width: 225 
                                            ,value: getStoredValues(DBFields.POMODORO_MINUTES)
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

var btnSave = Titanium.UI.createButton({ id:'saveCtl'
                                         ,height: 45
                                         ,width: 75
                                         ,title: 'Save'
                                      });

var btnReset = Titanium.UI.createButton({ id:'resetCtl'
                                         ,height: 45
                                         ,width: 75
                                         ,title: 'Reset'
                                      });


