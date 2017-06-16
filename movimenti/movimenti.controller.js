app.controller('MovimentiCtrl', ['$dashService', '$movimentiService', 'orderByFilter', function ($dashService, $movimentiService,orderBy) {
    var self = this;

    self.CampoOrdinamento=null;
    self.reverse=false;

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

    self.sortBy=function(CampoOrdinamento){
        if(self.CampoOrdinamento===null){
            self.reverse=true;
        }
        self.reverse=(self.CampoOrdinamento===CampoOrdinamento || CampoOrdinamento !== null) ? !self.reverse : false;
        self.CampoOrdinamento=CampoOrdinamento;
    };
}]);