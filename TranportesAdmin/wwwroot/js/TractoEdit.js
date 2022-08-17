$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    GetGrid();

    $(function () {
        bsCustomFileInput.init();
    });
    
    var id = $("#idTracto").val();
    $.ajax({
        type: "GET",
        url: server_key + "api/Tracto/Select?id=" + id,
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
            AlertError('Ocurrio un error al consultar el tracto. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar el tracto. Contacte al administrador.');
        }
    });


    var valTractor = $('#fmTracto').validate({
        rules: {
            Clave: {
                required: true
            },
            NumEconomico: {
                required: true
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
            NumEconomico: "El número económico es requerido",
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
            var _id = $("#idTracto").val();
            var _idTracto = $('#txtClave').val();
            var _noEconomico = $('#txtNumEconomico').val();
            var _placas = $('#txtPlacas').val();
            var _modelo = $('#txtModelo').val();
            var _anio = $('#txtAnio').val();

            $.ajax({
                url: server_key + "api/Tracto/Update",
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
                    AlertSuccessOk('El tracto se actualizó correctamente.', '/Tracto');
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
            var idTracto = $('#idTracto').val();
            var idDocumento = $('#ddlDocumento').val();
            var name = idTracto + '_' + idDocumento;
            var fileData = new FormData();
            fileData.append("fileData", files[0]);
            fileData.append("name", name);

            $.ajax({
                type: "POST",
                url: "/Tracto/UploadFiles",
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
        url: server_key + "api/Documento/Select?id=3",
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
    debugger
    var _tblDocumentoId = $('#ddlDocumento').val();
    var _tblTractoId = $('#idTracto').val();

    $.ajax({
        url: server_key + "api/TractoDocumentos/Add",
        type: "POST",
        data: JSON.stringify({
            id: 0,
            tblDocumentoId: _tblDocumentoId,
            tblTractoId: _tblTractoId,
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
    var id = $('#idTracto').val();

    $.ajax({
        type: "GET",
        url: server_key + "api/TractoDocumentos/Select?idTracto=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblDocumentos > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.tblDocumento.nombreDocumento + "</td>" +
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
    var url = '/Tracto/GetPDF?fileName=' + ruta;
    window.open(url, '_blank');
}


function Delete(id) {
    $.ajax({
        url: server_key + "api/TractoDocumentos/Delete/" + id,
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