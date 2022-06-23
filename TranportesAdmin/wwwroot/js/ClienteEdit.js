$(document).ready(function () {
    $("form").attr('autocomplete', 'off');
    
    var id = $("#idCliente").val();
    $.ajax({
        type: "GET",
        url: server_key + "api/Cliente/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clienteData = data.respuesta;
            $('#txtRazonSocial').val(clienteData[0].razonSocial);
            $('#txtIdentificador').val(clienteData[0].nombreCorto);
            $('#txtRFC').val(clienteData[0].rfc);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar el cliente. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar el cliente. Contacte al administrador.');
        }
    });



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
                required: true
                //regex: /^([A-ZÑ&]{3,4})?(?:-?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))?(?:-?)?([A-Z\d]{2})([A\d])$/
            }
        },
        messages: {
            RazonSocial: "La razon social es requerida",
            Identificador: "El identificador es requerido",
            RFC:
            {
                required: "El RFC es requerido"
                //regex: "El formato del RFC no es correcto"
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


    $("#BtnEditaCliente").click(function () {
        if (valTractor.form()) {
            var _id = $("#idCliente").val();
            var _razonSocial = $('#txtRazonSocial').val();
            var _nombreCorto = $('#txtIdentificador').val();
            var _rfc = $('#txtRFC').val();

            $.ajax({
                url: server_key + "api/Cliente/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    razonSocial: _razonSocial,
                    nombreCorto: _nombreCorto,
                    rfc: _rfc
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    AlertSuccessOk('El cliente se actualizó correctamente.', '/Cliente');
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

