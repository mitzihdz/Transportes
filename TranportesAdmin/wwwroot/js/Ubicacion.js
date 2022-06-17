$(document).ready(function () {
    
    GetGrid();

    var valUbicacion = $('#fmNewUbicacion').validate({
        rules: {
            Planta: {
                required: true
            },
            Ruta: {
                required: true
            }
        },
        messages: {
            Planta: "El nombre de la planta es requerida",
            Ruta: "La ruta es requerida"
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

    $("#BtnNuevaUbicacion").click(function () {
        if (valUbicacion.form()) {

            var _planta = $('#txtPlanta').val();
            var _ruta = $('#txtRuta').val();

            $.ajax({
                url: "https://localhost:7259/api/Ubicacion/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    planta: _planta,
                    ruta: _ruta
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    GetGrid();
                    AlertSuccess(data.mensaje);
                    $('#modalUbicacion').modal('toggle');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar la ubicación. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar la ubicación. Contacte al administrador.');
                }
            });
        }
    });



    var valEditUbicacion = $('#fmEditUbicacion').validate({
        rules: {
            Planta: {
                required: true
            },
            Ruta: {
                required: true
            }
        },
        messages: {
            Planta: "El nombre de la planta es requerida",
            Ruta: "La ruta es requerida"
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

    $("#BtnEditaUbicacion").click(function () {
        if (valEditUbicacion.form()) {

            var _id = $('#IdUbicacion').val();
            var _planta = $('#txtPlantaEdit').val();
            var _ruta = $('#txtRutaEdit').val();

            $.ajax({
                url: "https://localhost:7259/api/Ubicacion/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    planta: _planta,
                    ruta: _ruta
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    GetGrid();
                    AlertSuccess(data.mensaje);
                    $('#modalEditUbicacion').modal('toggle');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al actualizar la ubicación. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al actualizar la ubicación. Contacte al administrador.');
                }
            });
        }
    });



});


function GetGrid() {
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Ubicacion/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblUbicaciones > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.planta + "</td>" +
                    "<td>" + item.ruta + "</td>" +
                    "<td><a class='nav_link' href='#' onclick='OpenEdit("  + item.id + ")'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='far fa-times-circle'></i></a >" +
                    "</tr>";
                $('#tblUbicaciones > tbody').append(rows);
            });

            $("#tblUbicaciones").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblUbicaciones_wrapper .col-md-6:eq(0)');
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}
function OpenNew() {
    $('#modalUbicacion').modal('show');
    $('#txtPlanta').val('');
    $('#txtRuta').val('');
}

function OpenEdit(id) {
    $('#modalEditUbicacion').modal('show');
    $('#IdUbicacion').val(id);
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Ubicacion/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var ubicacionData = data.respuesta;
            $('#txtPlantaEdit').val(ubicacionData[0].planta);
            $('#txtRutaEdit').val(ubicacionData[0].ruta);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar las ubicaciones. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar las ubicaciones. Contacte al administrador.');
        }
    });    
}

function Delete(id) {
    $.ajax({
        url: "https://localhost:7259/api/Ubicacion/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            GetGrid();
            AlertSuccess(result.mensaje);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el documento. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al eliminar el documento. Contacte al administrador.');
        }
    });
}





