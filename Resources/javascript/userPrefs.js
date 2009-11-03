
function savePreferences(e) {
		var a = Titanium.UI.createAlertDialog();
		a.setMessage(slPomodoro.value + ", " +
								 slShortBreak.value + ", " +
								 slLongBreak.value + ", " +
                 sw1.value + ", " + 
								 sl1.value + ", " + 
								 $F('chkFlash'));
		a.show();

		var pomodoroData = new PomodoroData();
		pomodoroData.setPomodoroMinutes(slPomodoro.value);
		pomodoroData.setShortBreakMinutes(slShortBreak.value);
		pomodoroData.setLongBreakMinutes(slLongBreak.value);
		pomodoroData.setBeepFlag(sw1.value);
		pomodoroData.setVibrateFlag(sl1.value);
		pomodoroData.setFlashFlag($F('chkFlash'));
}

var sw1 = Titanium.UI.createSwitch({id:'switch1', value:true});
var sl1 = Titanium.UI.createSlider({id:'slider1', min:0, max:1, value:1, width:100});
var slPomodoro = Titanium.UI.createSlider({ id:'pomodoroMinutesCtl', min:20, max:35, width: 200 });
var slShortBreak = Titanium.UI.createSlider({ id:'shortBreakMinutesCtl', min:3, max:10, width: 100 });
var slLongBreak = Titanium.UI.createSlider({ id:'longBreakMinutesCtl', min:10, max:20, width: 130 });
