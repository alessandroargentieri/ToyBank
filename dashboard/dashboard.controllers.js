app.controller('DashCtrl', ['$dashService', '$profiloFactory', function ($dashService, $profiloFactory) {
    var self = this;
    self.profilo=$profiloFactory;
    console.log(self.profilo);
    self.getSaldo = function() {
        $dashService.saldo().then(function (result){
            self.saldoResponse = result.data;
            console.log(self.saldoResponse);
        });
    }();
}]);