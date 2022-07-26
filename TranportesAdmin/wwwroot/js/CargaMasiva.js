$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    $(function () {
        bsCustomFileInput.init();
    });

    //Documentos
    var valDocumento = $('#frmCarga').validate({
        rules: {
            Archivo: {
                required: true
            }
        },
        messages: {
            Archivo: "Seleccione un archivo"
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
            var fileData = new FormData();
            fileData.append("fileData", files[0]);
         

            $.ajax({
                type: "POST",
                url: "/CargaMasiva/UploadFiles",
                dataType: "json",
                contentType: false,
                processData: false,
                data: fileData,
                success: function (result, status, xhr) {
                    if (result.estatus) {
                        CargaInfo(result.list);
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

function CargaInfo(solicitudes) {
    console.log(solicitudes);
    //var _tblDocumentosId = $('#ddlDocumento').val();
    //var _tblOperadorId = 1;//$('#txtOperadorId').val();

    //$.ajax({
    //    url: server_key + "api/OperadorDocumento/Add",
    //    type: "POST",
    //    data: JSON.stringify({
    //        id: 0,
    //        tblDocumentosId: _tblDocumentosId,
    //        tblOperadorId: _tblOperadorId,
    //        ruta: name
    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    success: function (data) {
    //        GetGrid();
    //        AlertSuccess(data.mensaje);
    //        $('#modalDocumento').modal('toggle');
    //    },
    //    failure: function (data) {
    //        AlertError('Ocurrio un error al guardar la marca. Contacte al administrador.');
    //    },
    //    error: function (data) {
    //        AlertError('Ocurrio un error al guardar la marca. Contacte al administrador.');
    //    }
    //});

    $('#tblSolicitudes > tbody').empty();
    $.each(solicitudes, function (i, item) {
        var rows =
            "<tr>" +
            "<td>" + item.origenCarga + "</td>" +
            "<td>" + item.horaTurno + "</td>" +
            "<td>" + item.destino + "</td>" +
            "<td>" + item.numViaje + "</td>" +
            "<td>" + item.fechaCarga + "</td>" +
            "<td>" + item.fechaDescarga + "</td>" +
            "<td>" + item.configuracion + "</td>" +
            "<td>" + item.transportista + "</td>" +
            "</tr>";
        $('#tblSolicitudes > tbody').append(rows);
    });
}