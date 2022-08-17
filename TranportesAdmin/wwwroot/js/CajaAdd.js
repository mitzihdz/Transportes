$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    GetMarcas();

    var valCaja = $('#fmCaja').validate({
        rules: {
            NoEconomico: {
                required: true
            },
            Placas: {
                required: true
            },
            Dimension: {
                required: true
            },
            Marca: {
                required: true
            },
            Anio: {
                required: true,
                digits: true,
                maxlength: 4
            }
        },
        messages: {
            NumEconomico: "El número económico es requerido",
            Placas: "Las placas son requeridas",
            Dimension: "La dimension es requerida",
            Marca: "La marca es requerida",
            Anio:
            {
                required: "El año es requerido",
                digits: "Formato numérico",
                maxlength: "Máximo 4 digitos"
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

    $("#BtnNuevaCaja").click(function () {
        debugger
        if (valCaja.form()) {
            var _noEconomico = $('#txtNoEconomico').val();
            var _placas = $('#txtPlacas').val();
            var _dimension = $('#txtDimension').val();
            var _marcaId = $('#ddlMarca').val();
            var _anio = $('#txtAnio').val();
            var _proveedorId = $('#IdProveedor').val();

            $.ajax({
                url: server_key + "api/Caja/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    noEconomico: _noEconomico,
                    placas: _placas,
                    anioModelo: _anio,
                    tblMarcaCajasId: _marcaId,
                    dimensiones: _dimension,
                    tblProveedoresCajas: [
                        {
                            id: 0,
                            tblProveedoresId: _proveedorId,
                            tblCajasId: 0
                        }
                    ]
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    AlertSuccessOk('La caja se registró correctamente.', '/Caja/Editar/' + data.respuesta);
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar la caja. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar la caja. Contacte al administrador.');
                }
            });
        }
    });

});


function GetMarcas() {
    console.log('llego aqui');
    $.ajax({
        type: "GET",
        url: server_key + "api/Marca/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var marcaData = data.respuesta;

            $('#ddlMarca').html('');
            $('#ddlMarca').append('<option value="">SELECCIONE</option>');
            $.each(marcaData, function (k, v) {
                $('#ddlMarca').append('<option value="' + v.id + '">' + v.marca + '</option>');
            });

            $('#ddlMarcaEdit').html('');
            $('#ddlMarcaEdit').append('<option value="">SELECCIONE</option>');
            $.each(marcaData, function (k, v) {
                $('#ddlMarcaEdit').append('<option value="' + v.id + '">' + v.marca + '</option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        }
    });

}