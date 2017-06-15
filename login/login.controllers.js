app.controller('LoginCtrl', ['$loginService', '$state', '$scope', '$profiloService', '$profiloFactory', '$dashService', '$appFactory', function ($loginService, $state, $scope, $profiloService, $profiloFactory, $dashService, $appFactory) {
    var self = this;
    self.profilo = $profiloFactory;
    self.login = function (username, password) {
        $loginService.logga(username, password).then(function (result) {
            console.log(result.data);
            localStorage.setItem('tokenJwt', result.data.token);
            $profiloFactory = result.data.profilo;
            $appFactory.loggato = true;
            $state.go('dashboard');
        }).catch(function (error) {
            console.log('errore nel login: ', error);
        });
    };
}]);