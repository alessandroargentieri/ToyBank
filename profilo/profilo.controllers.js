app.controller('ProfiloCtrl', ['$profiloFactory', '$profiloService', function ($profiloFactory, $profiloService) {
    var self = this;

    self.getProfilo = function () {
        $profiloService.profilo().then(function (result) {
            self.profilo = result.data;
            $appFactory.profilo.nome = self.profilo.nome;
            $appFactory.profilo.cognome = self.profilo.cognome;
            $appFactory.profilo.ultimoAccesso = self.profilo.ultimoAccesso;
            $appFactory.profilo.codiceFiscale = self.profilo.codiceFiscale;
            $appFactory.profilo.indirizzo = self.profilo.indirizzo;
        });
    };

    self.profiloData();
}]);