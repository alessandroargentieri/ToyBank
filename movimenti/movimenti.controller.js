app.controller('MovimentiCtrl',['$dashService', '$saldoFactory', function($dashService, $saldoFactory){

    $dashService.saldo().then(function (result) {
                self.saldo = result.data;
                $saldoFactory.saldoContabile = self.saldo.saldoContabile;
                $saldoFactory.saldoDisponibile = self.saldo.saldoDisponibile;
                $saldoFactory.dataUltimoAccesso = self.saldo.dataUltimoAccesso;
    });
}]);