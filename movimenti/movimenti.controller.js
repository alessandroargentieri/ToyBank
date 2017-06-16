app.controller('MovimentiCtrl', ['$dashService', '$movimentiService', function ($dashService, $movimentiService) {
    var self = this;

    self.getSaldo = function () {
        $dashService.saldo().then(function (result) {
            self.saldo = result.data;
        });
    }();

    self.getMovimenti = function () {
        $movimentiService.$movimenti().then(function (result) {
            self.movimenti = result.data.movimenti;
        });
    }();

}]);