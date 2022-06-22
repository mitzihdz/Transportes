$(document).ready(function () {

    GetGrid();

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
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.tblClientes.nombreCorto + "</td>" +
                    "<td>" + item.tblEstatus.estatus +"</td >" +
                    "<td>" + item.fechaSolicitud + "</td>" +
                    "<td class='text-center'><a class='nav_link' href='~/../SolicitudOperador/Editar/" + item.id + "'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
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