$(document).ready(function () {

    GetGrid();

});

function Delete(id) {
    $.ajax({
        url: "https://localhost:7259/api/Solicitud/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            AlertSuccess('La solicitud se eliminó correctamente.');
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
        url: "https://localhost:7259/api/Solicitud/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblSolicitud > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                
                var rows =
                    "<tr>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.tblClientes.nombreCorto + "</td>" +
                    "<td>" + item.tblEstatus.estatus +"</td >" +
                    "<td>" + item.fechaSolicitud + "</td>" +
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