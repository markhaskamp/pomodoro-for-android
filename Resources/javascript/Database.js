
var PomodoroData = Class.create({
	initialize: function() {
						this.userPrefs = $H();
						this.initializeTable();
						this.readData();
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

								db.close();
						}
						catch(exc) {
								this.userPrefs.set('pomodoroMinutes', 'got an error somewhere');
								Titanium.API.log("error", exc);
						}
				}

	,readData: function() {
						try {
								db = Titanium.Database.open('pomodoroDB');

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

	,setPomodoroMinutes: function(value) {
						db = Titanium.Database.open('pomodoroDB');
						db.execute("UPDATE pomodoro SET pomodoroMinutes=" + value);
						db.close();
				}

	,setShortBreakMinutes: function(value) {
						db = Titanium.Database.open('pomodoroDB');
						db.execute("UPDATE pomodoro SET shortBreakMinutes=" + value);
						db.close();
				}

	,setLongBreakMinutes: function(value) {
						db = Titanium.Database.open('pomodoroDB');
						db.execute("UPDATE pomodoro SET longBreakMinutes=" + value);
						db.close();
				}

	,setBeepFlag: function(value) {
						db = Titanium.Database.open('pomodoroDB');
						dbValue = (value ? 1 : 0);
						db.execute("UPDATE pomodoro SET finishBeep=" + dbValue);
						db.close();
				}
						
	,setVibrateFlag: function(value) {
						db = Titanium.Database.open('pomodoroDB');
						db.execute("UPDATE pomodoro SET finishVibrate=" + value);
						db.close();
				}
						
	,setFlashFlag: function(value) {
						db = Titanium.Database.open('pomodoroDB');
						dbValue = (value == null ? 0 : 1);
						db.execute("UPDATE pomodoro SET finishFlash=" + dbValue);
						db.close();
				}

	,getUserPrefsForKey: function(key) {
						return this.getDBValue(key);
				}

  ,getDBValue: function(field) {
						var returnValue = "42";
						sqlStr = "SELECT " + field  + " AS fld FROM pomodoro;";

						db = Titanium.Database.open('pomodoroDB');
						var rs = db.execute(sqlStr);
						Titanium.API.log("debug", sqlStr);
						if (rs.isValidRow()) {
								returnValue = rs.fieldByName("fld");
								rs.close();
						}
						db.close();
						return returnValue;
				}

	,getPomodoroMinutes: function() {
						return this.getDBValue('pomodoroMinutes');
				}


    });
