$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    GetGrid();

    $(function () {
        bsCustomFileInput.init();
    });

    var id = $("#IdOperador").val();
    $.ajax({
        type: "GET",
        url: server_key + "api/Operador/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var operadorData = data.respuesta;
            $('#txtClave').val(operadorData[0].idOperador);
            $('#txtNombre').val(operadorData[0].nombre);
            $('#txtPaterno').val(operadorData[0].apellidoPaterno);
            $('#txtMaterno').val(operadorData[0].apellidoMaterno);
            $('#txtRFC').val(operadorData[0].rfc);
            $('#txtTelefono').val(operadorData[0].telefono);
            $('#txtCelular').val(operadorData[0].celular);
            $('#txtLicencia').val(operadorData[0].licencia);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar el operador. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar el operador. Contacte al administrador.');
        }
    });

    $.ajax({
        type: "GET",
        url: server_key + "api/OperadorDomicilio/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var domicilioData = data.respuesta;
            console.log(domicilioData);
            if (domicilioData.length > 0) {
                $('#txtCalle').val(domicilioData[0].calle);
                $('#txtNumExt').val(domicilioData[0].ninte);
                $('#txtNumInt').val(domicilioData[0].nexte);
                $('#txtCP').val(domicilioData[0].cp);
                $('#txtEntidad').val(domicilioData[0].entidadFed);
                $('#txtMunicipio').val(domicilioData[0].municipio);
                $('#txtColonia').val(domicilioData[0].colonia);
                $('#txtReferencias').val(domicilioData[0].referencias);
            }
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar el operador. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar el operador. Contacte al administrador.');
        }
    });

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
            //RFC: {
            //    required: true,
            //    regex: /^([A-ZÑ&]{3,4})?(?:-?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))?(?:-?)?([A-Z\d]{2})([A\d])$/i
            //},
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
    $("#BtnEditaOperador").click(function () {
        debugger;
        if (valOperador.form()) {
            var _id = $('#IdOperador').val();
            var _idOperador = $('#txtClave').val();
            var _nombre = $('#txtNombre').val();
            var _apellidoMaterno = $('#txtPaterno').val();
            var _apellidoPaterno = $('#txtMaterno').val();
            var _rfc = $('#txtRFC').val();
            var _telefono = $('#txtTelefono').val();
            var _celular = $('#txtCelular').val();
            var _licencia = $('#txtLicencia').val();

            $.ajax({
                url: server_key + "api/Operador/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    idOperador: _idOperador,
                    nombre: _nombre,
                    apellidoMaterno: _apellidoMaterno,
                    apellidoPaterno: _apellidoPaterno,
                    documentoActualizado: true,
                    rfc: _rfc,
                    comprobanteDomicilio: "",
                    telefono: _telefono,
                    celular: _celular,
                    licencia: _licencia
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function (result) {
                    Swal.fire({
                        title: 'El operador se actualizó correctamente. ¿Desea actualizar el domicilio?',
                        icon: 'success',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Sí',
                        cancelButtonText: 'No',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#cardOperador').addClass('collapsed-card');
                            $('#cardDomicilio').removeClass('collapsed-card');
                        } else if (result.isCanceled) {
                            $(location).attr('href', "/Operador");
                        }
                    })

                    //AlertSuccess('El operador se actualizó correctamente.');
                    
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
    $("#BtnEditaDomicilio").click(function () {
        
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
                url: server_key + "api/OperadorDomicilio/Update",
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
                    AlertSuccessOk('El domicilio se actualizó correctamente.', '/Operador');
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
            var idOperador = $('#IdOperador').val();
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
        url: server_key + "api/Documento/SelectAll?idTipo=1",
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
    var _tblOperadorId = $('#IdOperador').val();

    $.ajax({
        url: server_key + "api/OperadorDocumento/Add",
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
            AlertError('Ocurrio un error al guardar el documento. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al guardar el documento. Contacte al administrador.');
        }
    });
}


function GetGrid() {
    var id = $('#IdOperador').val();

    $.ajax({
        type: "GET",
        url: server_key + "api/OperadorDocumento/Select?idOperador=" + id,
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
        url: server_key + "api/OperadorDocumento/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            GetGrid();
            AlertSuccess(result.mensaje);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el documento. Contacte al administrador.');
        },
        error: function (data) {
            debugger
            AlertError('Ocurrio un error al eliminar el documento. Contacte al administrador.');
        }
    });
}





