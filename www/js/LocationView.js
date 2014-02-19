var LocationView = function(store) {
    
    this.showLocation = function() {
        
        var onSuccess = function(position) {
            var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            map  = new google.maps.Map(document.getElementById('maps'), {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: myLocation,
            zoom: 15
            }); 
            
            var marker = new google.maps.Marker({
              position: myLocation,
              map: map,
              title: 'You are here!'
          });
        };

        function onError(error) {
            app.showAlert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n',"Error");
        }
        var options = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true}; 
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        return false;
    };
    
    this.render = function() {
        this.el.html(LocationView.template());
        return this;
    };
    
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.showLocation();
    };
 
    this.initialize();

}

LocationView.template = Handlebars.compile($("#location-tpl").html());