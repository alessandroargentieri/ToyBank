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
            $state.go('bonifico.step3');
        }).catch(function (error) {
            console.log('errore nella verifica del bonifico', error);
        });
    };

    self.data=new Date();

    while(self.data.getDay()===0 || self.data.getDay()===6){
        self.data.setDate(self.data.getDate()+1);
    }

    self.dateOptions={
        dateDisabled: disabled,
        minDate:new Date(),
        startingDay: 1
    };

    function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

    self.calendar={
        opened:false
    };

    self.openCalendar=function(){
        self.calendar.opened=true;
    };

}]);