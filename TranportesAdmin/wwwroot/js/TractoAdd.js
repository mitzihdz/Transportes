$(document).ready(function () {

    var valTractor = $('#fmTracto').validate({
        rules: {
            Clave: {
                required: true
            },
            NumEconomico: {
                required: true,
                digits: true
            },
            Placas: {
                required: true
            },
            Modelo: {
                required: true
            },
            Anio: {
                required: true,
                digits: true,
                maxlength: 4
            }
        },
        messages: {
            Clave: "La clave del tracto es requerida",
            NumEconomico:
            {
                required: "El número económico es requerido",
                digits: "Formato numérico"
            },
            Placas: "Las placas son requeridas",
            Modelo: "El modelo es requerido",
            Anio:
            {
                required: "El año es requerido",
                digits: "Formato numérico",
                maxlength: "Máximo 5 digitos"
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


    $("#BtnNuevoTracto").click(function () {
        if (valTractor.form()) {

            var _idTracto = $('#txtClave').val();
            var _noEconomico = $('#txtNumEconomico').val();
            var _placas = $('#txtPlacas').val();
            var _modelo = $('#txtModelo').val();
            var _anio = $('#txtAnio').val();

            $.ajax({
                url: "https://localhost:7259/api/Tracto/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    idTracto: _idTracto,
                    noEconomico: _noEconomico,
                    placas: _placas,
                    modelo: _modelo,
                    anio: _anio
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    AlertSuccessOk('El tracto se registró correctamente.','/Tractor');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar el tracto. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar el tracto. Contacte al administrador.');
                }
            });

        }
    });

});

