app.service('$profiloService', function($http, baseURL){
    this.profilo= function(){
        return $http({
            method: 'POST',
            url: baseURL +'/profilo',
            headers:{
                'X-JWT-Assertion':localStorage.getItem('tokenJwt')
            }
        });
    };
});