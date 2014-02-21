

var CalendarView = function () {

    this.addToCalendar = function () {
        // prep some variables
        var datetime = $("#start").val().split(" ");
        var date = datetime[0].split("/");
        var time = datetime[1].split(":");
        var startDate = new Date((date[2] - 0), (date[1].replace("0", "") - 1), (date[0] - 0), (time[0]-0), (time[1]-0), 0,0,0);

        datetime = $("#end").val().split(" ");
        date = datetime[0].split("/");
        time = datetime[1].split(":");

        var endDate = new Date((date[2] - 0), (date[1].replace("0", "") - 1), (date[0] - 0), (time[0] - 0), (time[1] - 0), 0, 0, 0);
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