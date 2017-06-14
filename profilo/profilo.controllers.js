app.controller('ProfiloCtrl', [ '$profiloService', '$state', function($profiloService, $state ){
    var self=this;
    self.profiloData= function(){
        $profiloService.profilo().then(function(result){
            self.profilo=result.data;
        })
    }
}]);