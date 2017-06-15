app.controller('LoginCtrl', ['$loginService', '$state', '$scope', '$profiloService', '$profiloFactory', function ($loginService, $state, $scope, $profiloService, $profiloFactory) {
    var self = this;
    self.profilo = $profiloFactory;
    self.login = function (username, password) {
        $loginService.logga(username, password).then(function (result) {
            console.log(result.data);
            localStorage.setItem('tokenJwt', result.data.token);
            $profiloFactory = result.data.profilo;
            $state.go('dashboard');
        }).catch(function (error) {
            console.log('errore nel login: ', error);
        });
    };
}]);