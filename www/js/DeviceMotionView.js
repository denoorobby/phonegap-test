var DeviceMotionView = function() {
    
    this.startMotionDetect = function(){
        function onSuccess(acceleration) {
            $(".motion-output").html('Acceleration X: ' + acceleration.x + '\n' +
              'Acceleration Y: ' + acceleration.y + '\n' +
              'Acceleration Z: ' + acceleration.z + '\n' +
              'Timestamp: '      + acceleration.timestamp + '\n');
        };

        function onError() {
            app.showAlert("Could not find device motion","Error!");
        };
        
        if(!navigator.accelerometer){
            app.showAlert("Could not find device motion","Error!");
            return false;
        }
        
        var options = { frequency: 3000 };  // Update every 3 seconds
        var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        
    }
    
    this.render = function() {
        this.el.html(DeviceMotionView.template());
        return this;
    };
    
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.startMotionDetect();
    };
 
    this.initialize();

}

DeviceMotionView.template = Handlebars.compile($("#device-motion-tpl").html());