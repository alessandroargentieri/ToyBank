app.controller('DashCtrl', ['$dashService', '$profiloFactory', '$saldoFactory', function ($dashService, $profiloFactory, $saldoFactory) {
    var self = this;
    self.profilo = $profiloFactory;
    console.log(self.profilo);

    self.getSaldo = function () {
        $dashService.saldo().then(function (result) {
            self.saldoResponse = result.data;
            $saldoFactory.saldoContabile = self.saldoResponse.saldoContabile;
            $saldoFactory.saldoDisponibile = self.saldoResponse.saldoDisponibile;
            $saldoFactory.dataUltimoAccesso = self.saldoResponse.dataUltimoAccesso;
            console.log(self.saldoResponse);
        });
    }();
}]);