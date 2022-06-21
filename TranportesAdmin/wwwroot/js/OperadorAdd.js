$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    $(function () {
        bsCustomFileInput.init();
    });

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
                    $('#IdOperador').val(result.respuesta);
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


    //Documentos
    var valDocumento = $('#fmNewDocument').validate({
        rules: {
            Documento: {
                required: true
            },
            Archivo: {
                required: true
            }   
        },
        messages: {
            Documento: "Seleccione el tipo de documento a cargar",
            Archivo: "Seleccione un archivo",
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

    /*File Upload*/
    $("#fileButton").click(function () {
        if (valDocumento.form()) {

            var files = $("#fileInput").prop("files");
            var idOperador = $('#txtOperadorId').val();
            var idDocumento = $('#ddlDocumento').val();
            var name = idOperador + '_' + idDocumento;
            var fileData = new FormData();
            fileData.append("fileData", files[0]);
            fileData.append("name", name);

            $.ajax({
                type: "POST",
                url: "/Operador/UploadFiles",
                dataType: "json",
                contentType: false,
                processData: false,
                data: fileData,
                success: function (result, status, xhr) {
                    if (result.estatus) {
                        GuardaDocumento(result.file);
                    }
                    else
                        AlertError(result.mensaje);
                },
                error: function (xhr, status, error) {
                    AlertError(status);
                }
            });

            $("#fileInput").val("");
            $('#lblFileInput').text('');
        }
        
    });




});

function OpenNew() {
    $('#modalDocumento').modal('show');
    $('#ddlDocumento').val('');
    $('#fileInput').val('');
    $('#lblFileInput').text('');
    GetTipoDocumento();
}

function GetTipoDocumento() {
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Documento/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var marcaData = data.respuesta;
            $('#ddlDocumento').html('');
            $('#ddlDocumento').append('<option value="">SELECCIONE</option>');
            $.each(marcaData, function (k, v) {
                $('#ddlDocumento').append('<option value="' + v.id + '">' + v.nombreDocumento + '</option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar catálogo documentos. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar catálogo documentos. Contacte al administrador.');
        }
    });
}

function GuardaDocumento(name) {
    var _tblDocumentosId = $('#ddlDocumento').val();
    var _tblOperadorId = 1;//$('#txtOperadorId').val();
    
    $.ajax({
        url: "https://localhost:7259/api/OperadorDocumento/Add",
        type: "POST",
        data: JSON.stringify({
            id: 0,
            tblDocumentosId: _tblDocumentosId,
            tblOperadorId: _tblOperadorId,
            ruta: name
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            GetGrid();
            AlertSuccess(data.mensaje);
            $('#modalDocumento').modal('toggle');
        },
        failure: function (data) {
            AlertError('Ocurrio un error al guardar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al guardar la marca. Contacte al administrador.');
        }
    });
}


function GetGrid() {
    var id = 1;//$('#txtOperadorId').val();

    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/OperadorDocumento/Select?idOperador=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblDocumentos > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.tblDocumentos.nombreDocumento + "</td>" +
                    "<td><a class='nav_link' href='#' onclick='View(\"" + item.ruta + "\")'><i class='fas fa-eye'></i></a>" +
                    "<td><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='far fa-times-circle'></i></a>" +
                    "</tr>";
                $('#tblDocumentos > tbody').append(rows);
            });
            //console.log(data);

            //$("#tblDocumentos").DataTable({
            //    "destroy": true,
            //    "responsive": true, "lengthChange": false, "autoWidth": false,
            //    "buttons": ["copy", "csv", "excel", "pdf", "print"]
            //}).buttons().container().appendTo('#tblDocumentos_wrapper .col-md-6:eq(0)');
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}


function View(ruta) {
    var url = '/Operador/GetPDF?fileName=' + ruta;
    window.open(url, '_blank');
}


function Delete(id) {
    $.ajax({
        url: "https://localhost:7259/api/OperadorDocumento/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            GetGrid();
            AlertSuccess(result.mensaje);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el documento x. Contacte al administrador.');
        },
        error: function (data) {
            debugger
            AlertError('Ocurrio un error al eliminar el documento. Contacte al administrador.');
        }
    });
}

function Guardar() {
    $('#modalSuccess').modal('show');
}





