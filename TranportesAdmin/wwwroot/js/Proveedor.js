$(document).ready(function () {
    
    GetGrid();

});

function Delete(id) {
    $.ajax({
        url: "https://localhost:7259/api/Proveedor/Delete/"+id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            AlertSuccess('El proveedor se eliminó correctamente.');
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
        url: "https://localhost:7259/api/Proveedor/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblProveedores > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                debugger
                var rows =
                    "<tr>" +
                    "<td>" + item.clave + "</td>" +
                    "<td>" + item.nombreOrazonSocial + "</td>" + 
                    "<td><a class='nav_link' href='~/../Proveedor/Editar/" + item.id + "'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='far fa-times-circle'></i></a >" +
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

