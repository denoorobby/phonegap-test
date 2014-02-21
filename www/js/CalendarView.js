

var CalendarView = function () {

    this.addToCalendar = function () {
        // prep some variables
        var startDate = Date.parse($("#start").val());
        var endDate = Date.parse($("#end").val());
        var title = $("#title").val();
        var location = $("#location").val();
        var notes = $("#notes").val();
        var success = function (message) { alert("Success: " + JSON.stringify(message)); };
        var error = function (message) { alert("Error: " + message); };

        // create an event silently (on Android < 4 an interactive dialog is shown)
        window.plugins.calendar.createEvent(title, location, notes, startDate, endDate, success, error);
    }
    
    this.render = function () {
        this.el.html(CalendarView.template());

        if (self.iscroll) {
            console.log('Refresh iScroll');
            self.iscroll.refresh();
        } else {
            console.log('New iScroll');
            self.iscroll = new iScroll($('.scroll', self.el)[0], { hScrollbar: false, vScrollbar: false });
        }

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