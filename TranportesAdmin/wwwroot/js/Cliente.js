$(document).ready(function () {
    
    GetGrid();

});

function Delete(id) {
    $.ajax({
        url: "https://localhost:7259/api/Cliente/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            AlertSuccess('El cliente se eliminó correctamente.');
            GetGrid();
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el cliente. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al eliminar el cliente. Contacte al administrador.');
        }
    });
}

function GetGrid() {
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Cliente/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblClientes > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.razonSocial + "</td>" +
                    "<td>" + item.nombreCorto + "</td>" +
                    "<td>" + item.rfc + "</td>" +
                    "<td><a class='nav_link' href='~/../Cliente/Editar/" + item.id + "'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='far fa-times-circle'></i></a >" +
                    "</tr>";
                $('#tblClientes > tbody').append(rows);
            });
            console.log(data);

            $("#tblClientes").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblClientes_wrapper .col-md-6:eq(0)');
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}

