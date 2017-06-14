app.controller('DashCtrl', ['$dashService', '$state', '$scope', function ($dashService, $state, $scope) {
    var self = this;
    this.getSaldo = function() {
        $dashService.saldo().then(function (result){
            
        });
    };
}]);