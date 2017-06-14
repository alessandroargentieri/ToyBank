app.service('$bonificoService', function ($http, baseURL) {

    this.bonifico = function (nome, cognome, iban, importo, data, causale) {
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
            }
        });
    };
});