$(document).ready(function () {
    $("form").attr('autocomplete', 'off');
    GetGrid();

});

function Delete(id) {
    $.ajax({
        url: server_key + "api/Proveedor/Delete/"+id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            AlertSuccess('El proveedor se eliminó correctamente.');
            $("#tblProveedores").DataTable().destroy();
            GetGrid();
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el proveedor. Contacte al administrador.');
        },
        error: function (data) {
            debugger
            AlertError('Ocurrio un error al eliminar el proveedor. Contacte al administrador.');
        }
    });
}

function GetGrid() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Proveedor/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblProveedores > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.clave + "</td>" +
                    "<td>" + item.nombreOrazonSocial + "</td>" + 
                    "<td class='text-center'><a class='nav_link' href='~/../Proveedor/Editar/" + item.id + "'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='fa-solid fa-circle-trash'></i></a >" +
                    "</tr>";
                $('#tblProveedores > tbody').append(rows);
            });
            //console.log(data);

            $("#tblProveedores").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblProveedores_wrapper .col-md-6:eq(0)');

        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}

