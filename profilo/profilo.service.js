app.service('$profiloService', function($http, baseURL){
    this.profilo= function(){
        return $http({
            method: 'POST',
            url: baseURL +'/profilo'
        });
    };
});