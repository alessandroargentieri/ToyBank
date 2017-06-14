app.controller('LoginCtrl', ['$loginService', '$state', '$scope', '$profiloService', '$profiloFactory', function ($loginService, $state, $scope, $profiloService, $profiloFactory) {
    var self = this;
    self.login = function (username, password) {
        $loginService.logga(username, password).then(function (result) {
            self.loginToken = result.data.token;
            console.log(self.loginToken);
            localStorage.setItem('tokenJwt', self.loginToken);

            $profiloService.profilo().then(function (result) {
                self.profilo = result.data;
                $profiloFactory.nome = self.profilo.nome;
                $profiloFactory.cognome = self.profilo.cognome;
                $profiloFactory.dataUltimoAccesso = self.profilo.dataUltimoAccesso;
                $profiloFactory.codiceFiscale = self.profilo.codiceFiscale;
                $profiloFactory.indirizzo = self.profilo.indirizzo;
                $state.go('dashboard');
            });


        }).catch(function (error) {
            console.log('errore nel login: ', error);
        });
    };
}]);