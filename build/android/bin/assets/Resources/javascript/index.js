var pomodoroDisplay;
var pomodoroTimer;
var pomodoroData

var PomodoroTimer = Class.create({
				initialize: function(minutes, seconds) {
						this.startNewGoal(minutes, seconds)
				}

				,startNewGoal: function(minutes, seconds) {
						this.goalTimeInTotalSeconds = minutes * 60 + seconds;
						this.startSecondsSnapshot = new Date().getTime();
		    }

				,getElapsedMinutesAndSeconds: function(epochMicroSeconds) {
						elapsedEpochSeconds = ((epochMicroSeconds - this.startSecondsSnapshot) / 1000).round()
						pomodoroSecondsRemaining = this.goalTimeInTotalSeconds - elapsedEpochSeconds;
						displayMinutes = (pomodoroSecondsRemaining / 60).floor();
						displaySeconds = pomodoroSecondsRemaining % 60;

						return {"epochMicroSeconds": epochMicroSeconds,
                    "elapsedEpochSeconds": elapsedEpochSeconds, 
                    "pomodoroSecondsRemaining": pomodoroSecondsRemaining, 
                    "displayMinutes": displayMinutes, 
                    "displaySeconds": displaySeconds};
				}

				, timeExpired: function (minutesRemaining, secondsRemaining) {
						if (minutesRemaining < 0 || secondsRemaining < 0) {
								return true;
						}
						else {
								return (minutesRemaining == 0 && secondsRemaining <= 0);
						}
				}
		});

var PomodoroDisplay = Class.create({
				displayTime: function(m, s) {
						var tpl = new Template('#{minutes}:#{seconds}');
								
						return tpl.evaluate({ "minutes": m, "seconds": s.toPaddedString(2) });
				}

				, showTimeExpired: function() {
						return 'stop';
				}

		});

function timeIntervalEvent(pe) {
		currentEpochSeconds = new Date().getTime();

		var j = pomodoroTimer.getElapsedMinutesAndSeconds(currentEpochSeconds);

    $('timerDisplay').innerHTML = pomodoroDisplay.displayTime(j.displayMinutes, j.displaySeconds);

		if (pomodoroTimer.timeExpired(j.displayMinutes, j.displaySeconds)) {
				// $('timerDisplay').innerHTML = pomodoroDisplay.showTimeExpired();
				pe.stop();

				$$('.btnPomodoroActive').invoke('addClassName', 'btnPomodoro').invoke('removeClassName', 'btnPomodoroActive');
		}
}

function startTimer(e, timerType) {
		Titanium.API.log("debug", "startTimer. Enter.");
		Titanium.API.trace("startTimer. Enter.");
		var ele = Event.element(e);

		setStylesForClickedButton(ele);

		seconds = 0;
		minutes = pomodoroData.getMinutes(timerType);
		$('debugger').innerHTML = minutes;

		pomodoroTimer = new PomodoroTimer(minutes, seconds);
		new PeriodicalExecuter(timeIntervalEvent, 1);
}

function setStylesForClickedButton(ele) {
		$$('.btnPomodoroActive').invoke('addClassName', 'btnPomodoro').invoke('removeClassName', 'btnPomodoroActive');
    ele.addClassName('btnPomodoroActive');
}


document.observe('dom:loaded', function() {
				Titanium.API.debug('document.observe. enter');
				pomodoroDisplay = new PomodoroDisplay();
				pomodoroData = new PomodoroData();

				$('btnPomodoroPomodoro').observe('click', startTimer.bindAsEventListener(this, 'pomodoroMinutes'));
				$('btnPomodoroLongBreak').observe('click', startTimer.bindAsEventListener(this, 'longBreakMinutes'));
				$('btnPomodoroShortBreak').observe('click', startTimer.bindAsEventListener(this, 'shortBreakMinutes'));
				$('debugger').toggle();

				$$('.btnPomodoro').each( function(e) {
								e.observe('mouseover', e.setStyle({ cursor: "pointer" }));
								e.observe('mouseout', e.setStyle({  curser: "auto"    }));
						});

});
