app.controller('MovimentiCtrl', ['$dashService', '$saldoFactory', function ($dashService, $saldoFactory) {
    var self = this;

    self.saldo = $saldoFactory;    
    
}]);