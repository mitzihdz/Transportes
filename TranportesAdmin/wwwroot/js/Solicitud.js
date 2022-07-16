$(document).ready(function () {

    GetGrid();

});

function Delete(id) {
    $.ajax({
        url: server_key + "api/Solicitud/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            AlertSuccess('La solicitud se eliminó correctamente.');
            $("#tblSolicitud").DataTable().destroy();
            GetGrid();
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar la solicitud. Contacte al administrador.');
        },
        error: function (data) {
            debugger
            AlertError('Ocurrio un error al eliminar la solicitud. Contacte al administrador.');
        }
    });
}

function GetGrid() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Solicitud/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log('solicitudes', data.respuesta)
            $('#tblSolicitud > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var diaInicio = item.fechaInicio.substr(8, 2);
                var mesInicio = item.fechaInicio.substr(5, 2);
                var añoInicio = item.fechaInicio.substr(0, 4);
                var diaFin = '';
                var mesFin = '';
                var añoFin = '';

                if (item.fechaFin != null) {
                    diaFin = item.fechaFin.substr(8, 2);
                    mesFin = item.fechaFin.substr(5, 2);
                    añoFin = item.fechaFin.substr(0, 4);
                }

                var rows =
                    "<tr>" +
                    "<td>" + item.ordenServicio + "</td>" +
                    "<td>" + item.tblClientes.nombreCorto + "</td>" +
                    "<td>" + item.tblEstatus.estatus + "</td >" +
                    "<td>" + diaInicio + "/" + mesInicio + "/" + añoInicio + "-" + diaFin + "/" + mesFin + "/" + añoFin + "</td>" +
                    "<td class='text-center'><a class='nav_link' href='~/../Solicitud/Editar/" + item.id + "'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i style='' class='fa-solid fa-circle-trash'></i></a >" +
                    "</tr>";
                $('#tblSolicitud > tbody').append(rows);
            });
            console.log(data);

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