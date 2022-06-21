var valDocumento;
var valEditDocumento;
$(document).ready(function () {
    $("form").attr('autocomplete', 'off');
    
    GetGrid();

    valDocumento = $('#fmNuevoDoc').validate({
        rules: {
            Nombre: {
                required: true
            }
        },
        messages: {
            Nombre: "El nombre del documento es requerido"
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
    valEditDocumento = $('#fmEditDoc').validate({
        rules: {
            NombreEdit: {
                required: true
            }
        },
        messages: {
            NombreEdit: "El nombre del documento es requerido"
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

});
$("#BtnEditaDocumento").click(function () {
    if (valEditDocumento.form()) {

        var _id = $('#IdDocumento').val();
        var _nombreDocumento = $('#txtEditDocumento').val();

        $.ajax({
            url: "https://localhost:7259/api/Documento/Update",
            type: "POST",
            data: JSON.stringify({
                id: _id,
                nombreDocumento: _nombreDocumento
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                AlertSuccess('El documento se actualizó correctamente.');
                $('#modalEditDocument').modal('toggle');
                $("#tblDocumentos").DataTable().destroy();
                GetGrid();
            },
            failure: function (data) {
                AlertError('Ocurrio un error al actualizar el documento. Contacte al administrador.');
            },
            error: function (data) {
                AlertError('Ocurrio un error al actualizar el documento. Contacte al administrador.');
            }
        });
    }
});
$("#BtnNuevoDocumento").click(function () {
    if (valDocumento.form()) {

        var _nombreDocumento = $('#txtDocumento').val();

        $.ajax({
            url: "https://localhost:7259/api/Documento/Add",
            type: "POST",
            data: JSON.stringify({
                id: 0,
                nombreDocumento: _nombreDocumento
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                AlertSuccess('El documento se registró correctamente.');
                $('#modalDocument').modal('toggle');
                $("#tblDocumentos").DataTable().destroy();
                GetGrid();
            },
            failure: function (data) {
                AlertError('Ocurrio un error al guardar el documento. Contacte al administrador.');
            },
            error: function (data) {
                AlertError('Ocurrio un error al guardar el documento. Contacte al administrador.');
            }
        });

    }
});

function GetGrid() {
    
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Documento/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblDocumentos > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.nombreDocumento + "</td>" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='OpenEdit("  + item.id + ")'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='fa-solid fa-circle-trash'></i></a >" +
                    "</tr>";
                $('#tblDocumentos > tbody').append(rows);
            });
            console.log(data);

            $("#tblDocumentos").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblDocumentos_wrapper .col-md-6:eq(0)');
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
    $('#modalDocument').modal('show');
    $('#txtDocumento').val('');
}

function OpenEdit(id) {
    $('#modalEditDocument').modal('show');
    $('#IdDocumento').val(id);
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Documento/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var documentData = data.respuesta;
            $('#txtEditDocumento').val(documentData[0].nombreDocumento);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar el documento. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar el documento. Contacte al administrador.');
        }
    });    
}

function Delete(id) {
    $.ajax({
        url: "https://localhost:7259/api/Documento/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            $("#tblDocumentos").DataTable().destroy();
            GetGrid();
            AlertSuccess('El documento se eliminó correctamente.');     
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el documento. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al eliminar el documento. Contacte al administrador.');
        }
    });
}





