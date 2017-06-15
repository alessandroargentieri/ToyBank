app.service('$bonificoService', function ($http, baseURL) {

    this.richiestaBonifico = function (nome, cognome, iban, importo, data, causale) {
        return $http({
            method: 'POST',
            url: baseURL + '/verificaBonifico',
            data: {
                "nome": nome,
                "cognome": cognome,
                "iban": iban,
                "importo": importo,
                "data": data,
                "causale": causale
            },
            headers: {
                'X-JWT-Assertion': localStorage.getItem('tokenJwt')
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
            },
            headers: {
                'X-JWT-Assertion': localStorage.getItem('tokenJwt')
            }
        });

    };

});