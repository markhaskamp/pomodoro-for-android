
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
						if (minutesRemaining <= 0 && secondsRemaining <= 0) {
								return true;
						}
						else {
								return (minutesRemaining == 0 && secondsRemaining <= 0);
						}
				}

        ,reactToTimerStopped: function() {

		      if (pomodoroData.getUserPrefsForKey(DBFields.FINISH_BEEP) == 1) {
            device.beep();
          }
		      // if (pomodoroData.getUserPrefsForKey(DBFields.FINISH_VIBRATE) == 1) {
              device.vibrate();
          // }
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

        , getLogDisplayForFirstLine: function(j) {
            var hLogDisplay = $H();
            hLogDisplay.set('pomodoroMinutes', 'Pomodoro');
            hLogDisplay.set('shortBreakMinutes', 'Short Break');
            hLogDisplay.set('longBreakMinutes', 'Long Break');

            return new Template("<div class='logEntry'><span class='logEntryTimeFirstLine'>#{startTime}</span><span class='logEntryMessageFirstLine'>#{message}</span></div>").evaluate({ "startTime": j.curTime, "message": hLogDisplay.get(j.timerType) });
        }

        , getLogDisplay: function(j) {
            var hLogDisplay = $H();
            hLogDisplay.set('pomodoroMinutes', 'Pomodoro');
            hLogDisplay.set('shortBreakMinutes', 'Short Break');
            hLogDisplay.set('longBreakMinutes', 'Long Break');

            var logTemplate = new Template("<div class='logEntry'><span class='logEntryTime'>#{startTime}</span><span class='logEntryMessage'>#{message}</span></div>");

            return logTemplate.evaluate( { "startTime": j.curTime, "message": hLogDisplay.get(j.timerType) });
        }

        , getCurrentHoursAndMinutes: function() {
            var hoursTemplate = new Template("#{hours}:#{minutes}");
            var d = new Date();
            return hoursTemplate.evaluate({ hours: d.getHours(), minutes: d.getMinutes().toPaddedString(2) });
        }

		});

function timeIntervalEvent(pe) {
		currentEpochSeconds = new Date().getTime();

		var j = pomodoroTimer.getElapsedMinutesAndSeconds(currentEpochSeconds);

    $('timerDisplay').innerHTML = pomodoroDisplay.displayTime(j.displayMinutes, j.displaySeconds);

		if (pomodoroTimer.timeExpired(j.displayMinutes, j.displaySeconds)) {
				// $('timerDisplay').innerHTML = pomodoroDisplay.showTimeExpired();
        pomodoroTimer.reactToTimerStopped();
				pe.stop();

				$$('.btnPomodoroActive').invoke('addClassName', 'btnPomodoro').invoke('removeClassName', 'btnPomodoroActive');
		}
}

function clearLog(e) {
    $('timerLog').innerHTML = '';
	  logEntries.clear();
    $('logHeadingClear').hide();
}

function startTimer(e, timerType) {
		logger.log("debug", "startTimer. Enter.");

		var ele = Event.element(e);
		setStylesForClickedButton(ele);

		seconds = 0;
		minutes = pomodoroData.getUserPrefsForKey(timerType);

    addStartToTimerLog(timerType);
		pomodoroTimer = new PomodoroTimer(minutes, seconds);
		new PeriodicalExecuter(timeIntervalEvent, 1);
}

function setStylesForClickedButton(ele) {
		$$('.btnPomodoroActive').invoke('addClassName', 'btnPomodoro').invoke('removeClassName', 'btnPomodoroActive');
    ele.addClassName('btnPomodoroActive');
}

function addStartToTimerLog(timerType) {
    curTime = pomodoroDisplay.getCurrentHoursAndMinutes();
    logEntries.unshift({ "timerType": timerType, "curTime": curTime });
    
    var htmlStr = pomodoroDisplay.getLogDisplayForFirstLine(logEntries[0]);
    // var currentHtml = $('timerLog').innerHTML;
    // $('timerLog').innerHTML = newLine + currentHtml;

    for (i=1; i<logEntries.size(); i++) {
        htmlStr += pomodoroDisplay.getLogDisplay(logEntries[i]);
    }

    $('timerLog').innerHTML = htmlStr;

    $('logHeadingClear').show();
}

var pomodoroDisplay;
var pomodoroTimer;
var pomodoroData;
var device;
var logger;

var logEntries = $A();

document.observe('dom:loaded', function() {
				logger = LoggerFactory.create();
				logger.log('debug', 'document.observe. enter');
				
				pomodoroDisplay = new PomodoroDisplay();
				pomodoroData = DataAccessFactory.create(); // PomodoroData();
        device = DeviceFactory.create();
        
				$('btnPomodoroPomodoro').observe('click', startTimer.bindAsEventListener(this, 'pomodoroMinutes'));
				$('btnPomodoroLongBreak').observe('click', startTimer.bindAsEventListener(this, 'longBreakMinutes'));
				$('btnPomodoroShortBreak').observe('click', startTimer.bindAsEventListener(this, 'shortBreakMinutes'));

        $('logHeadingClear').observe('click', clearLog.bind(this));

				$$('.btnPomodoro').each( function(e) {
								e.observe('mouseover', e.setStyle({ cursor: "pointer" }));
								e.observe('mouseout', e.setStyle({  curser: "auto"    }));
						});

        $$('.logHeadingClear').each( function(e) {
                e.observe('mouseover', e.setStyle({ cursor: "pointer" }));
                e.observe('mouseout', e.setStyle({  curser: "auto"    }));
            });
        
        $('logHeadingClear').hide();

});
