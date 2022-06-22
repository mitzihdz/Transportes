﻿$(document).ready(function () {

    GetGrid();


    $("#BtnEditaEstatus").click(function () {
        var _id = $('#IdSolicitudDetalle').val();
        var _estatus = $('#ddlEstatusRuta').val();

        $.ajax({
            url: "https://localhost:7259/api/SolicitudOperador/UpdateStatusRuta",
            type: "POST",
            data: JSON.stringify({
                id: _id,
                tblTractoId: 0,
                tblCajasId: 0,
                tblOperadorId: 0,
                tblEstatusRutaId: _estatus,
                tblSolicitudDetalleRuta: []
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $("#tblSolicitud").DataTable().destroy();
                GetGrid();
                AlertSuccess(data.mensaje);
                $('#modalRuta').modal('toggle');
            },
            failure: function (data) {
                AlertError('Ocurrio un error al guardar el estatus. Contacte al administrador.');
            },
            error: function (data) {
                AlertError('Ocurrio un error al guardar el estatus. Contacte al administrador.');
            }
        });
    });




});

function GetGrid() {
    var idOperador = $('#IdOperador').val();

    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/SolicitudOperador/Select?idOperador=" + idOperador,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblSolicitud > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.tblSolicitudId + "</td>" +
                    "<td>" + item.tblTracto.idTracto + "</td >" +
                    "<td>" + item.tblCajas.noEconomico + "</td >" +
                    "<td>" + item.tblEstatusRuta.estatus + "</td >" +
                    "<td class='text-center'><a class='nav_link'  href='#' onclick='OpenEdit(" + item.id + ", " + item.tblEstatusRutaId + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
                    "</tr>";
                $('#tblSolicitud > tbody').append(rows);
            });

            $("#tblSolicitud").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblSolicitud_wrapper .col-md-6:eq(0)');

        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}


function OpenEdit(id, idEstatus) {
    GetEstatus();
    $("#modalRuta").modal('show');
    //Obtener ruta
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/SolicitudOperador/SelectRuta?idDetalleSolicitud=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var rutaData = data.respuesta;
            $('#TimeLineContainer').html('');
            $.each(rutaData, function (i, rutaData) {
                if (i % 2 != 0) {
                    $('#TimeLineContainer').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + rutaData.tblUbicaciones.planta + '</h3><p style="color: white;">' + rutaData.tblUbicaciones.ruta + '</p></div></div>')
                }                                                                                                                                                                                                                                                                          
                else {                                                                                                                                                                                                                                                                     
                    $('#TimeLineContainer').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + rutaData.tblUbicaciones.planta + '</h3><p style="color: white;">' + rutaData.tblUbicaciones.ruta + '</p></div></div>')
                }
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la ruta. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la ruta. Contacte al administrador.');
        }
    });

    $('#IdSolicitudDetalle').val(id);
    //$('#ddlEstatusRuta').val(id);
    $("#ddlEstatusRuta option[value='"+idEstatus+"']").attr("selected", true);
}

function GetEstatus()
{
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/EstatusRuta/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var statusData = data.respuesta;
            $('#ddlEstatusRuta').html('');
            $.each(statusData, function (k, v) {
                $('#ddlEstatusRuta').append('<option value="' + v.id + '">' + v.estatus + '</option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar catálogo estatus. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar catálogo estatus. Contacte al administrador.');
        }
    });

}