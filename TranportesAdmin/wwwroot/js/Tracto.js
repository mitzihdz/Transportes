﻿$(document).ready(function () {
    $("form").attr('autocomplete', 'off');
    
    GetGrid();

});

function Delete(id) {
    $.ajax({
        url: server_key + "api/Tracto/Delete/"+id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            AlertSuccess('El tracto se eliminó correctamente.');
            $("#tblTractos").DataTable().destroy();
            GetGrid();
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el tracto. Contacte al administrador.');
        },
        error: function (data) {
            debugger
            AlertError('Ocurrio un error al eliminar el tracto. Contacte al administrador.');
        }
    });
}

function GetGrid() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Tracto/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblTractos > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.idTracto + "</td>" +
                    "<td>" + item.noEconomico + "</td>" +
                    "<td>" + item.placas + "</td>" +
                    "<td>" + item.modelo + "</td>" +
                    "<td>" + item.anio + "</td>" +
                    "<td class='text-center'><a class='nav_link' href='~/../Tracto/Editar/" + item.id + "'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='fa-solid fa-circle-trash'></i></a >" +
                    "</tr>";
                $('#tblTractos > tbody').append(rows);
            });
            console.log(data);

            $("#tblTractos").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblTractos_wrapper .col-md-6:eq(0)');
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}

