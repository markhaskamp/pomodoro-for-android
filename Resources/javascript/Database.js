
var PomodoroData = Class.create({
	initialize: function() {
						this.userPrefs = $H();
						this.initializeTable();
				}

	,initializeTable: function() {
						try {
								db = Titanium.Database.open('pomodoroDB');
	 							db.execute("CREATE TABLE IF NOT EXISTS pomodoro (id INTEGER PRIMARY KEY AUTOINCREMENT, pomodoroMinutes int, shortBreakMinutes int, longBreakMinutes int, finishFlash int, finishBeep int, finishVibrate int)");

	 							var rs = db.execute("Select count('x') as 'count' from pomodoro");
								if (rs.isValidRow()) {
										if (rs.fieldByName("count") == 0) {
												db.execute("INSERT INTO pomodoro (pomodoroMinutes, shortBreakMinutes, longBreakMinutes) VALUES (25, 5, 15);");
												db.execute("INSERT INTO pomodoro (finishFlash, finishBeep, finishVibrate) VALUES (1, 1, 1);");
										}
										rs.close();
								}

								var rsPrefs = db.execute("SELECT pomodoroMinutes, shortBreakMinutes, longBreakMinutes, finishFlash, finishBeep, finishVibrate FROM pomodoro");
								if (rsPrefs.isValidRow()) {
										this.userPrefs.set('pomodoroMinutes', rsPrefs.fieldByName("pomodoroMinutes"));
										this.userPrefs.set('shortBreakMinutes', rsPrefs.fieldByName("shortBreakMinutes"));
										this.userPrefs.set('longBreakMinutes', rsPrefs.fieldByName("longBreakMinutes"));
										this.userPrefs.set('finishFlash', rsPrefs.fieldByName("finishFlash"));
										this.userPrefs.set('finishBeep', rsPrefs.fieldByName("finishBeep"));
										this.userPrefs.set('finishVibrate', rsPrefs.fieldByName("finishVibrate"));

										rsPrefs.close();
								}
								else {
										this.userPrefs.set('pomodoroMinutes', 'resPrefs.isValidRow == false');
								}

								db.close();
						}
						catch(exc) {
								this.userPrefs.set('pomodoroMinutes', 'got an error somewhere');
								Titanium.API.log("error", exc);
						}
				}

  ,getMinutes: function(timerType) {
						return this.userPrefs.get(timerType);
						if (this.userPrefs.get(timertype) == undefined) {
								return 1;
						}
				}

    });
