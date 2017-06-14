app.service('$dashService', function ($http, baseURL) {
    this.saldo = function () {
        return $http({
            method:'GET',
            url: baseURL + '/saldo',
            headers: {
                'X-JWT-Assertion': localStorage.getItem('tokenJwt')
            }
        });
    };
});