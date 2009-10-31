var minutesAnchor;
var secondsAnchor;
var anchorTimeInTotalSeconds;
var pomodoroTimerDisplay;

var Pomodoro = Class.create({
				displayTime: function(m, s) {
						var tpl = new Template('#{minutes}:#{seconds}');
						return tpl.evaluate({ minutes: displayMinutes.floor(), seconds: displaySeconds });
				}

				, timeExpired: function (minutesRemaining, secondsRemaining) {
						return (minutesRemaining == 0 && secondsRemaining == 0);
				}

		});

function updateTimerDisplay(pe) {
		currentSeconds = new Date().getTime();

		pomodoroElapsedSeconds = ((currentSeconds - secondsAnchor) / 1000).round();
		pomodoroDisplaySeconds = anchorTimeInTotalSeconds - pomodoroElapsedSeconds;
		displayMinutes = pomodoroDisplaySeconds / 60;
    displaySeconds = pomodoroDisplaySeconds % 60;

    $('timerDisplay').innerHTML = pomodoroTimerDisplay.displayTime(displayMinutes, displaySeconds);

		if (pomodoroTimerDisplay.timeExpired(displayMinutes, displaySeconds)) {
				$('timerDisplay').innerHTML = 'stop';
				pe.stop();
		}
}

function initTimer(seconds) {
		anchorTimeInTotalSeconds = seconds;
		secondsAnchor = new Date().getTime();
}

function startTimer(e, minutes, seconds) {
    initTimer((minutes * 60) + seconds);
		new PeriodicalExecuter(updateTimerDisplay, 1);
}

document.observe('dom:loaded', function() {
				pomodoroTimerDisplay = new Pomodoro();

				$('btnPomodoro25').observe('click', startTimer.bindAsEventListener(this, 25, 0));
				$('btnPomodoro15').observe('click', startTimer.bindAsEventListener(this, 15, 0));
				$('btnPomodoro5').observe('click', startTimer.bindAsEventListener(this, 5,0));
				$('btnPomodoro005').observe('click', startTimer.bindAsEventListener(this, 0, 5));
});
