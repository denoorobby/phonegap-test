

var BarcodeScannerView = function () {

    this.scanBarcode = function () {
        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");

        scanner.scan(
           function (result) {
               alert("We got a barcode\n" +
                     "Result: " + result.text + "\n" +
                     "Format: " + result.format + "\n" +
                     "Cancelled: " + result.cancelled);
           },
           function (error) {
               alert("Scanning failed: " + error);
           }
        );
    }
    
    this.render = function () {
        this.el.html(BarcodeScannerView.template());
        return this;
    };

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '.btn-scan-barcode', this.scanBarcode);
    };

    this.initialize();

}

BarcodeScannerView.template = Handlebars.compile($("#barcode-tpl").html());