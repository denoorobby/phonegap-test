var LocationView = function(store) {
    
    this.back = function(){
        history.go(-1);
        navigator.app.backHistory();
        return;
    }
    
    this.render = function() {
        this.el.html(LocationView.template());
        return this;
    };
    
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '.backbutton', this.back);
    };
 
    this.initialize();

}

LocationView.template = Handlebars.compile($("#location-tpl").html());