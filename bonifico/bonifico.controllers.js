app.controller('BonificoCtrl', ['$bonificoService'], function($bonificoService) {

    var self = this;
    self.bonifico = function() {
        $bonificoService.bonifico(self.nome, self.cognome, self.iban, self.importo,self.data, self.causale)
    }

});