
var DataAccessFactory = {
		titaniumDefined: function() {
				try {
						Titanium;
						return true;
				}
				catch(exc) {
						return false;
				}
		}

    ,create: function() {
				if (this.titaniumDefined()) {
						return new PomodoroData();
				}
				else {
						return new TestDataAccess();
				}

    }
};

var TestDataAccess = Class.create({
				initialize: function() {
						this.userPrefs = $H();
						this.userPrefs.set('pomodoroMinutes', 25);
						this.userPrefs.set('shortBreakMinutes', 5);
						this.userPrefs.set('longBreakMinutes', 15);
				}

				,getUserPrefsForKey: function(key) {
						return this.userPrefs.get(key);
				}

		});

var DBFields = {
    POMODORO_MINUTES:     'pomodoroMinutes'
    ,SHORT_BREAK_MINUTES: 'shortBreakMinutes'
    ,LONG_BREAK_MINUTES:  'longBreakMinutes'
    ,FINISH_BEEP:         'finishBeep'
    ,FINISH_VIBRATE:      'finishVibrate'
}

var PomodoroData = Class.create({
	initialize: function() {
						this.logger = LoggerFactory.create();
            this.logger.log("debug", "PomodoroData. initialize(). Enter");
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
                        db.execute("INSERT INTO pomodoro (pomodoroMinutes, shortBreakMinutes, longBreakMinutes, finishFlash, finishBeep, finishVibrate) VALUES (25, 5, 15, 1, 1, 1);");
										}
										rs.close();
								}

								db.close();
						}
						catch(exc) {
								this.userPrefs.set('pomodoroMinutes', 'got an error somewhere');
								this.logger.log("error", exc);
						}
				}

	,readData: function() {
						try {
								db = Titanium.Database.open('pomodoroDB');

								var rsPrefs = db.execute("SELECT pomodoroMinutes, shortBreakMinutes, longBreakMinutes, finishFlash, finishBeep, finishVibrate FROM pomodoro");
								if (rsPrefs.isValidRow()) {
										this.userPrefs.set('pomodoroMinutes', rsPrefs.fieldByName(DBFields.POMODORO_MINUTES));
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
								this.logger.log("error", exc);
						}
				}

  ,setToDefaultValues: function() {
            this.logger.log('debug', "DataAccess. setToDefaultValues(). Enter");
            try {
						db = Titanium.Database.open('pomodoroDB');
            db.execute("DELETE FROM pomodoro");
            db.execute("INSERT INTO pomodoro (pomodoroMinutes, shortBreakMinutes, longBreakMinutes, finishFlash, finishBeep, finishVibrate) VALUES (25, 5, 15, 1, 1, 1);");
						db.close();

            }
            catch(exc) {
                this.logger.log('debug', "=== ERROR> " + exc);
            }

            this.logger.log('debug', "DataAccess. setTtoDefaultValues(). Exit");
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

	,setBeepFlag: function(switchValue) {
            try {
                db = Titanium.Database.open('pomodoroDB');
                dbValue = (switchValue ? 1 : 0);
                var sql = "UPDATE pomodoro SET finishBeep=" + dbValue;
                db.execute(sql);
                db.close();
            }
            catch(exc) {
                this.logger.log('debug', '===> ERROR: ' + exc);
            }
				}
						
	,setVibrateFlag: function(value) {
            try {
                db = Titanium.Database.open('pomodoroDB');
                dbValue = (switchValue ? 1 : 0);
                db.execute("UPDATE pomodoro SET finishVibrate=" + dbValue);
                db.close();
            }
            catch(exc) {
                this.logger.log('debug', '===> ERROR: ' + exc);
            }
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

            try {
                db = Titanium.Database.open('pomodoroDB');
                var rs = db.execute(sqlStr);
                this.logger.log("debug", "DataAccess. getDBValue(). sqlStr:" + sqlStr);
                if (rs.isValidRow()) {
                    returnValue = rs.fieldByName("fld");
                    rs.close();
                }
                db.close();
            }
            catch(exc) {
                this.logger.log('debug', '===> ERROR: ' + exc);
            }
						return returnValue;
				}

	,getPomodoroMinutes: function() {
						return this.getDBValue(DBFields.POMODORO_MINUTES);
				}


    });
