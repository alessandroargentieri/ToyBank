app.controller('BonificoCtrl', ['$bonificoService'], function($bonificoService) {

    var self = this;
    self.richiestaBonificoCtrl = function() {
        $bonificoService.richiestaBonifico(self.nome, self.cognome, self.iban, self.importo,self.data, self.causale).then(function(result){
            self.bonifico=result.data;
        });
    };

});