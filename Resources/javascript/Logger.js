
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
				// console.log('this: [' + this +  ']');
				// for (var x in this) {
				// 		console.log(x);
				// 		console.log(typeof(eval('this.'+ x)));
				// }
				// console.log('------');
				if (this.titaniumDefined()) {
						return new TitaniumLogger();
				}
				else {
						return new TestLogger();
				}

    }
};

var TitaniumLogger = Class.create({
				toString: function() { return 'TitaniumLogger'; }

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
