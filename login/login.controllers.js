app.controller('LoginCtrl', ['$loginService', '$state', function ($loginService, $state) {
    var self = this;
    self.login = function (username, password) {
        $loginService.logga(username, password).then(function (result) {
            self.loginToken = result.data;
            $state.go('dashboard');
        }).catch(function (error) {
            console.log('errore nel login: ', error);
        });
    };
}]);