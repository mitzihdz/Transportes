$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        }
    );

    var valTractor = $('#fmCliente').validate({
        rules: {
            RazonSocial: {
                required: true
            },
            Identificador: {
                required: true
            },
            RFC: {
                required: true,
                regex: /^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$/i
            }
        },
        messages: {
            RazonSocial: "La razon social es requerida",
            Identificador: "El identificador es requerido",
            RFC:
            {
                required: "El RFC es requerido",
                regex: "El formato del RFC no es correcto"
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });


    $("#BtnNuevoCliente").click(function () {
        if (valTractor.form()) {

            var _razonSocial = $('#txtRazonSocial').val();
            var _nombreCorto = $('#txtIdentificador').val();
            var _rfc = $('#txtRFC').val();

            $.ajax({
                url: server_key + "api/Cliente/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    razonSocial: _razonSocial,
                    nombreCorto: _nombreCorto,
                    rfc: _rfc
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    AlertSuccessOk('El cliente se registró correctamente.','/Cliente');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar el cliente. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar el cliente. Contacte al administrador.');
                }
            });

        }
    });

});

