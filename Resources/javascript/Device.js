var DeviceFactory = {
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
            return new TitaniumDevice();
        }
        else {
            return new GenericDevice();
        }
    }
};

var TitaniumDevice = Class.create({
        beep: function() { return Titanium.Media.beep(); }
        ,vibrate: function() { return Titanium.Media.vibrate(); }
    });

var GenericDevice = Class.create({
        beep: function() { }
        ,vibrate: function() { }
    });
