
var LoggerFactory = {
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
						return new TitaniumLogger();
				}
				else {
						return new TestLogger();
				}

    }
};

var TitaniumLogger = Class.create({
				toString: function() { return 'TestLogger'; }

				,log: function(level, message) {
						Titanium.API.log(level, message);
				}
    });

var TestLogger = Class.create({
				toString: function() { return 'TestLogger'; }

				,log: function(level, message) {
						// eat it
				}
		});
