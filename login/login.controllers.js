app.controller('LoginCtrl', ['$loginService', '$profiloService', '$appFactory', '$state', '$scope', '$rootScope',
    function ($loginService, $profiloService, $appFactory, $state, $scope, $rootScope) {

        var self = this;
        self.profilo = $appFactory.profilo;
        self.loggato = $appFactory.loggato;

        self.login = function (username, password) {
            $loginService.logga(username, password).then(function (result) {
                localStorage.setItem('tokenJwt', result.data.token);
                $appFactory.loggato = true;
                $profiloService.profilo().then(function (result) {
                    $appFactory.profilo = result.data;
                });
                $rootScope.$broadcast('login');
                $state.go('dashboard');
            }).catch(function (error) {
                console.log('errore nel login: ', error);
            });
        };

    }]);