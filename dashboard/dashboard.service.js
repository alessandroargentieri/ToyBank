app.service('$dashService', ['$http', 'baseUrl', '$scope', function ($http, baseURL, $scope) {
    this.saldo = function () {
        return $http({
            method:'GET',
            url: baseURL + '/saldo',
            header: {
                "X-JWT-Assertion": localStorage.getItem('tokenJwt')
            }
        });
    };
}]);