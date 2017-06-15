app.service('$movimentiService',function($http,$scope,baseURL){
    this.$movimenti=function(){
        return $http({
            method:'GET',
            url:baseURL + '/movimenti',
            headers:{
                'X-JWT-Assertion':localStorage.getItem('tokenJwt')
            }
        });
    };
});