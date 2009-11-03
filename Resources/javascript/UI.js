
var UIFactory = {
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
						return new TitaniumUI();
				}
				else {
						return new TestUI();
				}
    }
};

var TitaniumUI = Class.create({
				createSwitch: function(j) {
						return Titanium.UI.createSwitch(j);
				}

		});


