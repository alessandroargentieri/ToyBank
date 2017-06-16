app.controller('DashCtrl', ['$dashService', '$profiloFactory', function ($dashService, $profiloFactory) {
    var self = this;

    self.profilo = $profiloFactory;

    self.getSaldo = function () {
        $dashService.saldo().then(function (result) {
            self.saldo = result.data;
        });
    }();
}]);