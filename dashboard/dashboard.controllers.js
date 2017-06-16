app.controller('DashCtrl', ['$dashService', '$profiloService', '$appFactory', function ($dashService, $profiloService, $appFactory) {
    var self = this;

    self.getProfilo = function () {
        $profiloService.profilo().then(function (result) {
            self.profilo = result.data;
            $appFactory.profilo = self.profilo;
        });
    }();

    self.getSaldo = function () {
        $dashService.saldo().then(function (result) {
            self.saldo = result.data;
            $appFactory.saldo = self.saldo;
        });
    }();

    if (localStorage.getItem('tokenJwt') !== null) {
        $appFactory.loggato = true;
    }

}]);