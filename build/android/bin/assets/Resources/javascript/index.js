var minutesAnchor;
var secondsAnchor;
var anchorTimeInTotalSeconds;
var pomodoroDisplay;
var pomodoroTimer;

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
				$('timerDisplay').innerHTML = pomodoroDisplay.showTimeExpired();
				pe.stop();
		}
}

function startTimer(e, minutes, seconds) {
		pomodoroTimer = new PomodoroTimer(minutes, seconds);
		new PeriodicalExecuter(timeIntervalEvent, 1);
}

document.observe('dom:loaded', function() {
				pomodoroDisplay = new PomodoroDisplay();

				$('btnPomodoro25').observe('click', startTimer.bindAsEventListener(this, 25, 0));
				$('btnPomodoro15').observe('click', startTimer.bindAsEventListener(this, 15, 0));
				$('btnPomodoro5').observe('click', startTimer.bindAsEventListener(this, 5,0));
				$('btnPomodoro005').observe('click', startTimer.bindAsEventListener(this, 0, 5));


				$$('.btnPomodoro').each( function(e) {
								e.observe('mouseover', e.setStyle({ cursor: "pointer" }));
								e.observe('mouseout', e.setStyle({  curser: "auto"    }));
						});

});
