$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    GetMarcas();
    GetGrid();

    $(function () {
        bsCustomFileInput.init();
    });
    
    var id = $("#IdCaja").val();
    $.ajax({
        type: "GET",
        url: server_key + "api/Caja/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var cajaData = data.respuesta;
            $('#txtNoEconomico').val(cajaData[0].noEconomico);
            $('#txtPlacas').val(cajaData[0].placas);
            $('#txtDimension').val(cajaData[0].dimensiones);
            $('#ddlMarca').val(cajaData[0].tblMarcaCajasId);
            $('#txtAnio').val(cajaData[0].anioModelo);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la caja. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la caja. Contacte al administrador.');
        }
    });

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

    $("#BtnEditaCaja").click(function () {
        if (valCaja.form()) {

            var _id = $('#IdCaja').val();
            var _noEconomico = $('#txtNoEconomico').val();
            var _placas = $('#txtPlacas').val();
            var _dimension = $('#txtDimension').val();
            var _marcaId = $('#ddlMarca').val();
            var _anio = $('#txtAnio').val();

            $.ajax({
                url: server_key + "api/Caja/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    noEconomico: _noEconomico,
                    placas: _placas,
                    anioModelo: _anio,
                    tblMarcaCajasId: _marcaId,
                    dimensiones: _dimension
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    AlertSuccess('La caja se actualizó correctamente.');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al actualizar la caja. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al actualizar la caja. Contacte al administrador.');
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
            var idCaja = $('#IdCaja').val();
            var idDocumento = $('#ddlDocumento').val();
            var name = idCaja + '_' + idDocumento;
            var fileData = new FormData();
            fileData.append("fileData", files[0]);
            fileData.append("name", name);

            $.ajax({
                type: "POST",
                url: "/Caja/UploadFiles",
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

function GetMarcas() {
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
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        }
    });

}


//-------------Documentos


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
        url: server_key + "api/Documento/SelectAll?idTipo=2",
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
    var _tblCajaId = $('#IdCaja').val();

    $.ajax({
        url: server_key + "api/CajaDocumentos/Add",
        type: "POST",
        data: JSON.stringify({
            id: 0,
            tblDocumentoId: _tblDocumentoId,
            tblCajasId: _tblCajaId,
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
    var id = $('#IdCaja').val();

    $.ajax({
        type: "GET",
        url: server_key + "api/CajaDocumentos/Select?idCaja=" + id,
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
    var url = '/Caja/GetPDF?fileName=' + ruta;
    window.open(url, '_blank');
}


function Delete(id) {
    $.ajax({
        url: server_key + "api/CajaDocumentos/Delete/" + id,
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