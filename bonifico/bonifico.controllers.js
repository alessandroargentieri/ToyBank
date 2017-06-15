app.controller('BonificoCtrl', ['$bonificoService'], function ($bonificoService) {

    var self = this;

    self.richiestaBonificoCtrl = function () {
        $bonificoService.richiestaBonifico(self.nome, self.cognome, self.iban, self.importo, self.data, self.causale).then(function (result) {
            self.bonifico = result.data.bonifico;
            self.key = result.data.key;
        });
    }; 


    self.confermaBonificoCtrl = function(){
        $bonificoService.confermaBonifico(self.otp, self.key).then(function (result) {

    }).catch(function(errore){
        console.log('errore nella verifica del bonifico', error);
    });
};

});