app.controller('BonificoCtrl', ['$bonificoService', '$state', function ($bonificoService, $state) {

    var self = this;

    self.richiestaBonificoCtrl = function () {
        $bonificoService.richiestaBonifico(self.nome, self.cognome, self.iban, self.importo, self.data, self.causale).then(function (result) {
            self.bonifico = result.data.bonifico;
            self.key = result.data.key;
            $state.go('bonifico.step2');
        }).catch(function (error) {
            console.log('errore nella richiesta del bonifico', error);
        });
    };


    self.confermaBonificoCtrl = function () {
        $bonificoService.confermaBonifico(self.otp, self.key).then(function (result) {

        }).catch(function (error) {
            console.log('errore nella verifica del bonifico', error);
        });
    };

}]);