app.service('$movimentiService',function($http,baseURL){
    this.$movimenti=function(){
        return $http({
            method:'GET',
            url:baseURL + '/movimenti',
            
        });
    };
});