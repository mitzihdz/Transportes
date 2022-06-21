$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    GetGrid();

});

function Delete(id) {
    $.ajax({
        url: "https://localhost:7259/api/Operador/Delete/"+id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            AlertSuccess('El operador se eliminó correctamente.');
            $("#tblOperadores").DataTable().destroy();
            GetGrid();
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el operador. Contacte al administrador.');
        },
        error: function (data) {
            debugger
            AlertError('Ocurrio un error al eliminar el operador. Contacte al administrador.');
        }
    });
}

function GetGrid() {
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Operador/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblOperadores > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.idOperador + "</td>" +
                    "<td>" + item.nombre + "</td>" +
                    "<td>" + item.apellidoPaterno + "</td>" +
                    "<td>" + item.apellidoMaterno + "</td>" +
                    "<td>" + item.rfc + "</td>" +
                    "<td class='text-center'><a class='nav_link' href='~/../Operador/Editar/" + item.id + "'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='fa-solid fa-circle-trash'></i></a >" +
                    "</tr>";
                $('#tblOperadores > tbody').append(rows);
            });
            //console.log(data);

            $("#tblOperadores").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblOperadores_wrapper .col-md-6:eq(0)');

        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}

