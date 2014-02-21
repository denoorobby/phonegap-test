

var CalendarView = function () {

    this.addToCalendar = function () {
        // prep some variables
        var datetime = $("#start").val().split(" ");
        var startDate = new Date(2014, 1, 21, 18, 30, 0, 0, 0); // beware: month 0 = january, 11 = december
        var endDate = new Date(2014, 1, 21, 19, 30, 0, 0, 0);
        var title = "My nice event";
        var location = "Home";
        var notes = "Some notes about this event.";
        var success = function (message) { alert("Success: " + JSON.stringify(message)); };
        var error = function (message) { alert("Error: " + message); };

        // create an event silently (on Android < 4 an interactive dialog is shown)
        window.plugins.calendar.createEvent(title, location, notes, startDate, endDate, success, error);
    }
    
    this.render = function () {
        this.el.html(CalendarView.template());
        return this;
    };

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '.btn-add-calendar', this.addToCalendar);
    };

    this.initialize();

}

CalendarView.template = Handlebars.compile($("#calendar-tpl").html());