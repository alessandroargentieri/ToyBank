app.service('$loginService', function ($http, baseURL) {

    this.logga = function (username, password) {
        return $http({
            method: 'POST',
            url: baseURL + '/security/login',
            data: {
                "username": username,
                "password": password
            }
        });
    };
});