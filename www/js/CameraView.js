var CameraView = function() {

         
    this.changePicture = function(event) {
        console.log('change picture');
        event.preventDefault();
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
        var options =   {   quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                            encodingType: 0     // 0=JPG 1=PNG
                        };

        navigator.camera.getPicture(
            function(imageData) {
                $('.image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
            },
            function() {
                app.showAlert('Error taking picture', 'Error');
            },
            options);

        return false;
    };
    
    this.render = function() {
        this.el.html(CameraView.template());
        return this;
    };
    
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '.btn-take-picture', this.changePicture);
    };
 
    this.initialize();

}

CameraView.template = Handlebars.compile($("#camera-tpl").html());