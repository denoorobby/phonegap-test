var app = {
    registerEvents: function() {
    var self = this;
    $(window).on('hashchange', $.proxy(this.route, this));
    // Check of browser supports touch events...
    if (document.documentElement.hasOwnProperty('ontouchstart')) {
        // ... if yes: register touch event listener to change the "selected" state of the item
        $('body').on('touchstart', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('touchend', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    } else {
        // ... if not: register mouse events instead
        $('body').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    }
},

    route: function() {
    var hash = window.location.hash;
    var self = this;
    if (!hash) {
        $('body').html(new HomeView(this.store).render().el);
        //Setup the ViewNavigator
		new SlidingView( 'sidebar', 'content' );
        return;
    }
    var match = hash.match(app.detailsURL);
    if (match) {
        this.store.findById(Number(match[1]), function(employee) {
            $('body').html(new EmployeeView(employee).render().el);
            return;
        });
    }else if(hash.match(app.locationURL)){
        $('body').html(new LocationView().render().el);
        return;
    }else if(hash.match(app.cameraURL)){
        $('body').html(new CameraView().render().el);
        return;
    }else if(hash.match(app.deviceMotionURL)){
        $('body').html(new DeviceMotionView().render().el);
        return;
    }else if(hash.match(app.orientationURL)){
        $('body').html(new OrientationView().render().el);
        return;
    } else if (hash.match(app.calendarURL)) {
        $('body').html(new CalendarView().render().el);
        return;
    }
},
    
    showAlert: function (message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
},
    initialize: function() {
    var self = this;
    this.detailsURL = /^#employees\/(\d{1,})/;
    this.locationURL = /^#location/;
    this.cameraURL = /^#camera/;
    this.deviceMotionURL = /^#device-motion/;
    this.orientationURL = /^#orientation/;
    this.calendarURL = /^#calendar/;
    this.registerEvents();
    this.store = new MemoryStore(function() {
        self.route();
    });
}
};

$( document ).ready(function(){
     app.initialize();
});