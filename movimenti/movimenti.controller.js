app.controller('MovimentiCtrl', ['$dashService', '$saldoFactory','$movimentiService', function ($dashService, $saldoFactory, $movimentiService) {
    var self = this;

    self.saldo = $saldoFactory;    
    self.movimenti=null;
    
    self.getMovimenti=function(){
        $movimentiService.$movimenti().then(function(result){
            self.movimenti=result.data;
        });
    }();
    
}]);