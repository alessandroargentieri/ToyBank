app.controller('BonificoCtrl', ['$bonificoService', '$state', 'WizardHandler', function ($bonificoService, $state, WizardHandler) {

    var self = this;

    self.richiestaBonificoCtrl = function () {
        $bonificoService.richiestaBonifico(self.nome, self.cognome, self.iban, self.importo, self.data, self.causale).then(function (result) {
            self.bonifico = result.data.bonifico;
            self.key = result.data.key;
            self.changeLabelAndGoNext();
            $state.go('bonifico.step2');
        }).catch(function (error) {
            console.log('errore nella richiesta del bonifico', error);
        });
    };


    self.confermaBonificoCtrl = function () {
        $bonificoService.confermaBonifico(self.otp, self.key).then(function (result) {
            self.changeLabelAndGoNext();
            $state.go('bonifico.step3');
        }).catch(function (error) {
            console.log('errore nella verifica del bonifico', error);
        });
    };

    self.changeLabelAndGoNext = function () {
        WizardHandler.wizard().next();
    };

}]);