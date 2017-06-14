app.controller('BonificoCtrl', ['$bonificoService'], function($bonificoService) {

    var self = this;
    self.bonifico = function() {
        $bonificoService.bonifico(self.nome, self.cognome, self.iban, self.importo,self.data, self.causale).then(function(result){
            /*in result c'è il bonifico completo e la key che servirà per verificare l'OTP*/
        });
    };

});