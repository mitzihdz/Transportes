$(document).ready(function () {
    $("form").attr('autocomplete', 'off');

    GetGrid();

    var valMarca = $('#fmNuevaMarca').validate({
        rules: {
            Marca: {
                required: true
            }
        },
        messages: {
            Marca: "El nombre de la marca es requerida"
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

    $("#BtnNuevaMarca").click(function () {
        if (valMarca.form()) {

            var _marca = $('#txtMarca').val();

            $.ajax({
                url: server_key + "api/Marca/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    marca: _marca
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#tblMarcas").DataTable().destroy();
                    GetGrid();
                    AlertSuccess('La marca se registró correctamente.');
                    $('#modalMarca').modal('toggle');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar la marca. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar la marca. Contacte al administrador.');
                }
            });
        }
    });



    var valEditMarca = $('#fmEditMarca').validate({
        rules: {
            MarcaEdit: {
                required: true
            }
        },
        messages: {
            MarcaEdit: "El nombre de la marca es requerido"
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

    $("#BtnEditaMarca").click(function () {
        if (valEditMarca.form()) {

            var _id = $('#IdMarca').val();
            var _marca = $('#txtEditMarca').val();

            $.ajax({
                url: server_key + "api/Marca/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    marca: _marca
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#tblMarcas").DataTable().destroy();
                    GetGrid();
                    AlertSuccess('La marca se actualizó correctamente.');
                    $('#modalEditMarca').modal('toggle');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al actualizar la marca. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al actualizar la marca. Contacte al administrador.');
                }
            });
        }
    });






});


function GetGrid() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Marca/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblMarcas > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.marca + "</td>" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='OpenEdit("  + item.id + ")'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='fa-solid fa-circle-trash'></i></a >" +
                    "</tr>";
                $('#tblMarcas > tbody').append(rows);
            });
            console.log(data);

            $("#tblMarcas").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblMarcas_wrapper .col-md-6:eq(0)');
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
    $('#modalMarca').modal('show');
    $('#txtMarca').val('');
}

function OpenEdit(id) {
    $('#modalEditMarca').modal('show');
    $('#IdMarca').val(id);
    $.ajax({
        type: "GET",
        url: server_key + "api/Marca/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var marcaData = data.respuesta;
            $('#txtEditMarca').val(marcaData[0].marca);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        }
    });    
}

function Delete(id) {
    $.ajax({
        url: server_key + "api/Marca/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            $("#tblMarcas").DataTable().destroy();
            GetGrid();
            AlertSuccess('La marca se eliminó correctamente.');     
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al eliminar la marca. Contacte al administrador.');
        }
    });
}





