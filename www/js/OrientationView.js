var OrientationView = function() {
    
    this.startOrientationDetect = function(){
        function onSuccess(heading) {
            $(".orientation-output").html(heading.magneticHeading);
            
        };

        function onError(compassError) {
            app.showAlert("Error finding orientation: " + compassError.code,"Error!");
        };

        if(!navigator.compass){
            app.showAlert("Could not load compass API!","Error!");
            return false;
        }
        
        var options = {
            frequency: 3000
        }; // Update every 3 seconds
        
        var watchID = navigator.compass.watchHeading(onSuccess, onError, options);
    }
    
    this.render = function() {
        this.el.html(OrientationView.template());
        return this;
    };
    
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.startOrientationDetect();
    };
 
    this.initialize();

}

OrientationView.template = Handlebars.compile($("#orientation-tpl").html());