﻿$(document).ready(function () {
    
    var id = $("#idTractor").val();
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Tractor/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var tractorData = data.respuesta;
            $('#txtClave').val(tractorData[0].idTracto);
            $('#txtNumEconomico').val(tractorData[0].noEconomico);
            $('#txtPlacas').val(tractorData[0].placas);
            $('#txtModelo').val(tractorData[0].modelo);
            $('#txtAnio').val(tractorData[0].anio);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar el tractor. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar el tractor. Contacte al administrador.');
        }
    });


    var valTractor = $('#fmTractor').validate({
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
            Clave: "La clave del tractor es requerida",
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


    $("#BtnEditaTracto").click(function () {
        if (valTractor.form()) {
            var _id = $("#idTractor").val();
            var _idTracto = $('#txtClave').val();
            var _noEconomico = $('#txtNumEconomico').val();
            var _placas = $('#txtPlacas').val();
            var _modelo = $('#txtModelo').val();
            var _anio = $('#txtAnio').val();

            $.ajax({
                url: "https://localhost:7259/api/Tractor/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    idTracto: _idTracto,
                    noEconomico: _noEconomico,
                    placas: _placas,
                    modelo: _modelo,
                    anio: _anio
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    AlertSuccessOk('El tractor se actualizó correctamente.', '/Tractor');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar el tractor. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar el tractor. Contacte al administrador.');
                }
            });

        }
    });

});

