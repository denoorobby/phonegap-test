var EmployeeView = function(employee) {
 
    this.addLocation = function(event) {
    event.preventDefault();
    console.log('addLocation');
        var onSuccess = function(position) {
            app.showAlert(position.coords.latitude +", " + position.coords.longitude,"Position");
};

    function onError(error) {
        app.showAlert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n',"Error");
    }
            var options = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true}; 
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            $(".location").html("Looking for location");
        return false;
    };
    
        this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };
    
    this.initialize = function() {
        
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
    };
 
    this.initialize();
 }
 
EmployeeView.template = Handlebars.compile($("#employee-tpl").html());