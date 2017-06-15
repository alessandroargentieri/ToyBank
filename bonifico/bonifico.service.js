app.service('$bonificoService', function ($http, baseURL) {

    this.richiestaBonifico = function (nome, cognome, iban, importo, data, causale) {
        return $http({
            method: 'POST',
            url: baseURL + '/verificaBonifico',
            data: {
                "nome": nome,
                "cognome": cognome,
                "ibanRicevente": iban,
                "importo": importo,
                "data": data,
                "causale": causale
            }
        });
    };

    this.confermaBonifico = function (otp, key) {
        return $http({
            method: 'POST',
            url: baseURL + '/confermaBonifico',
            data: {
                "otp": otp,
                "key": key
            }
        });

    };

});