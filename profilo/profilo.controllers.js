app.controller('ProfiloCtrl', [ '$profiloFactory','$profiloService', '$state', function($profiloFactory, $profiloService, $state ){
    var self=this;
    self.profiloData= function(){
        $profiloService.profilo().then(function(result){
            self.profilo=result.data;
            $profiloFactory.nome = self.profilo.nome;
            $profiloFactory.cognome = self.profilo.cognome;
            $profiloFactory.dataUltimoAccesso = self.profilo.dataUltimoAccesso;
            $profiloFactory.codiceFiscale = self.profilo.codiceFiscale;
            $profiloFactory.indirizzo = self.profilo.indirizzo;
        });
    };
}]);