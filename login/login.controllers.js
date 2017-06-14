app.controller('LoginCtrl', ['$loginService', '$state', '$scope', function ($loginService, $state, $scope) {
    var self = this;
    self.login = function (username, password) {
        $loginService.logga(username, password).then(function (result) {
            self.loginToken = result.data.token;
            console.log(self.loginToken);
            localStorage.setItem('tokenJwt', self.loginToken);
            $state.go('dashboard');
        }).catch(function (error) {
            console.log('errore nel login: ', error);
        });
    };
}]);