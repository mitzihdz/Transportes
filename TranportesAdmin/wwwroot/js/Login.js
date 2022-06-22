$(document).ready(function () {
    $("form").attr('autocomplete', 'off');

    var valLogin = $('#frmLogin').validate({
        rules: {
            Usuario: { required: true },
            Password: { required: true }
        },
        messages: {
            Usuario: "El usuario es requerido",
            Password: "La contraseña es requerida"
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

    $("#BtnLogin").click(function () {
        if (valLogin.form()) {

            var _user = $('#txtUsuario').val();
            var _password = $('#txtPassword').val();
            var formData = new FormData();
            formData.append("user", _user);
            formData.append("password", _password);


            $.ajax({
                type: "POST",
                url: "/Login/Login",
                ddataType: "json",
                contentType: false,
                processData: false,
                data: formData,
                success: function (result, status, xhr) {
                    if (result.estatus) {
                        if (result.perfil == 1)
                            $(location).attr('href', 'Home');
                        else
                            $(location).attr('href', 'SolicitudOperador');
                    }
                    else {
                        AlertError(result.mensaje);
                    }    
                },
                error: function (xhr, status, error) {
                    AlertError(status);
                }
            });

            //$.ajax({
            //    url: "https://localhost:7259/api/Autenticacion/Select?user=" + _user + "&password=" + _password,
            //    type: "GET",
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (data) {
            //        if (data.estado) {
            //            AlertSuccess(data.mensaje);
            //        }
            //        else {
            //            AlertError(data.mensaje);
            //        }
            //    },
            //    failure: function (data) {
            //        AlertError('Ocurrio un error al autenticar el usuario. Contacte al administrador.');
            //    },
            //    error: function (data) {
            //        AlertError('Ocurrio un error al autenticar el usuario. Contacte al administrador.');
            //    }
            //});
        }
    });



   






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
                    "<td><a class='nav_link' href='#' onclick='OpenEdit("  + item.id + ")'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='far fa-times-circle'></i></a >" +
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





