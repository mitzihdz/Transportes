$(document).ready(function () {

    $('label.required').append('&nbsp;<strong>*</strong>&nbsp;');

    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        }
    );

    var valOperador = $('#fmOperador').validate({
        rules: {
            Clave: {
                required: true
            },
            Nombre: {
                required: true
            },
            Paterno: {
                required: true
            },
            RFC: {
                required: true,
                regex: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
            },
            Licencia: {
                required: true
            }
        },
        messages: {
            Clave: "La clave del operador es requerida",
            Nombre: "El nombre es requerido",
            Paterno: "El apellido paterno es requerido",
            Licencia: "La licencia es requerida",
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

    //Api
    $("#BtnNuevoOperador").click(function () {
        debugger;
        if (valOperador.form()) {

            var _idOperador = $('#txtClave').val();
            var _nombre = $('#txtNombre').val();
            var _apellidoMaterno = $('#txtPaterno').val();
            var _apellidoPaterno = $('#txtMaterno').val();
            var _rfc = $('#txtRFC').val();
            var _telefono = $('#txtTelefono').val();
            var _celular = $('#txtCelular').val();
            var _licencia = $('#txtLicencia').val();

            $.ajax({
                url: "https://localhost:7259/api/Operador/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    idOperador: _idOperador,
                    nombre: _nombre,
                    apellidoMaterno: _apellidoMaterno,
                    apellidoPaterno: _apellidoPaterno,
                    documentoActualizado: true,
                    rfc: _rfc,
                    activo: true,
                    comprobanteDomicilio: "",
                    telefono: _telefono,
                    celular: _celular,
                    licencia: _licencia,
                    inclusion: new Date(),
                    tblDomicilioOpers: []
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function (result) {
                    $('#txtOperadorId').val(result.respuesta);
                    AlertSuccess('El operador se registró correctamente.');
                    $('#cardOperador').addClass('collapsed-card');
                    $('#cardDomicilio').removeClass('collapsed-card');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar al operador. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar al operador. Contacte al administrador.');
                }
            });

        }

    });


    var valDomicilio = $('#fmDomicilio').validate({
        rules: {
            Calle: {
                required: true
            },
            NumExt: {
                required: true
            },
            CP: {
                required: true,
                digits: true,
                maxlength: 5
            },
            Entidad: {
                required: true
            },
            Municipio: {
                required: true
            },
            Colonia: {
                required: true
            }
        },
        messages: {
            Calle: "La calle es requerida",
            NumExt: "El número exterior es requerido",
            CP:
            {
                required: "El CP es requerido",
                digits: "Formato numérico",
                maxlength: "Capture máximo 5 caracteres"
            },
            Entidad: "La entidad es requerida",
            Municipio: "El municipio es requerido",
            Colonia: "La colonia es requerida"
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



    //Api
    $("#BtnNuevoDomicilio").click(function () {
        debugger;
        if (valDomicilio.form()) {
            var _tblOperadorId = $('#txtOperadorId').val();
            var _calle = $('#txtCalle').val();
            var _nexte = $('#txtNumExt').val();
            var _ninte = $('#txtNumInt').val();
            var _cp = $('#txtCP').val();
            var _entidadFed = $('#txtEntidad').val();
            var _municipio = $('#txtMunicipio').val();
            var _colonia = $('#txtColonia').val();
            var _referencias = $('#txtReferencia').val();

            $.ajax({
                url: "https://localhost:7259/api/OperadorDomicilio/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    tblOperadorId: _tblOperadorId,
                    calle: _calle,
                    ninte: _ninte,
                    nexte: _nexte,
                    cp: _cp,
                    entidadFed: _entidadFed,
                    municipio: _municipio,
                    colonia: _colonia,
                    referencias: _referencias,
                    inclusion: new Date()
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    AlertSuccessOk('El domicilio se registró correctamente.', '/Operador');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar el domicilio. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar el domicilio. Contacte al administrador.');
                }
            });

        }
        
    });




});





function Guardar() {
    $('#modalSuccess').modal('show');
}





