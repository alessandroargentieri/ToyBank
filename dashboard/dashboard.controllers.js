app.controller('DashCtrl', ['$dashService', function ($dashService) {
    var self = this;
    self.getSaldo = function() {
        $dashService.saldo().then(function (result){
            self.saldoResponse = result.data;
            console.log(self.saldoResponse);
        });
    }();
}]);