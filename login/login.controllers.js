app.controller('LoginCtrl', ['$loginService', '$state', '$scope', '$profiloService', '$dashService', '$appFactory', '$rootScope', function ($loginService, $state, $scope, $profiloService, $dashService, $appFactory, $rootScope) {
    var self = this;

    self.profilo = $appFactory.profilo;

    self.login = function (username, password) {
        $loginService.logga(username, password).then(function (result) {
            localStorage.setItem('tokenJwt', result.data.token);
            $appFactory.profilo = result.data.profilo;
            $appFactory.loggato = true;
            $rootScope.$broadcast('login');
            $state.go('dashboard');
            console.log('loggato nel login controller è: ' + $appFactory.loggato);
        }).catch(function (error) {
            console.log('errore nel login: ', error);
        });
    };
}]);