$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    GetGrid();

    /*******/

    var valUsuario = $('#frmNewUser').validate({
        rules: {
            Usuario: {
                required: true
            },
            Password: {
                required: true,
                minlength: 5
            },
            ConfirmPassword: {
                required: true,
                minlength: 5,
                equalTo: "#txtPassword"
            }
        },
        messages: {
            Usuario: "El usuario es requerido",
            Password:
            {
                required: "La contraseña es requerida",
                minlength: "Ingrese al menos 5 caracteres"
            },
            ConfirmPassword:
            {
                required: "La contraseña es requerida",
                minlength: "Ingrese al menos 5 caracteres",
                equalTo: "Debe confirmar la contraseña"
            }
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

    $("#BtnNuevoUsuario").click(function () {
        if (valUsuario.form()) {

            var _usuario = $('#txtUsuario').val();
            var _contrasena = $('#txtPassword').val();          

            $.ajax({
                url: server_key + "api/Usuario/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    usuario: _usuario,
                    contrasena: _contrasena,
                    tblPerfilId: 0
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#tblUsuarios").DataTable().destroy();
                    GetGrid();
                    AlertSuccess(data.mensaje);
                    $('#modalUser').modal('toggle');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar el usuario. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar el usuario. Contacte al administrador.');
                }
            });
        }
    });



    var valEditUsuario = $('#frmEditUser').validate({
        rules: {
            UsuarioEdit: {
                required: true
            },
            PasswordEdit: {
                minlength: 5
            },
            ConfirmPasswordEdit: {
                minlength: 5,
                equalTo: "#txtPasswordEdit"
            }
        },
        messages: {
            UsuarioEdit: "El usuario es requerido",
            PasswordEdit:
            {
                minlength: "Ingrese al menos 5 caracteres"
            },
            ConfirmPasswordEdit:
            {
                minlength: "Ingrese al menos 5 caracteres",
                equalTo: "Debe confirmar la contraseña"
            }
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

    $("#BtnEditaUsuario").click(function () {
        if (valEditUsuario.form()) {

            var _id = $('#IdUsuario').val();
            var _usuario = $('#txtUsuarioEdit').val();
            var _contrasena = $('#txtPasswordEdit').val();

            $.ajax({
                url: server_key + "api/Usuario/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    usuario: _usuario,
                    contrasena: _contrasena,
                    tblPerfilId: 0
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#tblUsuarios").DataTable().destroy();
                    GetGrid();
                    AlertSuccess('El usuario se actualizó correctamente.');
                    $('#modalEditUser').modal('toggle');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al actualizar el usuario. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al actualizar el usuario. Contacte al administrador.');
                }
            });
        }
    });

});

function OpenNew() {
    $('#modalUser').modal('show');
    $('#txtUsuario').val('');
    $('#txtPassword').val('');
    $('#txtConfirmPassword').val('');
}

function OpenEdit(id) {
    $('#modalEditUser').modal('show');
    $('#IdUsuario').val(id);
    $.ajax({
        type: "GET",
        url: server_key + "api/Usuario/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var userData = data.respuesta;
            $('#txtUsuarioEdit').val(userData[0].usuario);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar el usuario. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar el usuario. Contacte al administrador.');
        }
    });   
}

function Delete(id) {
    $.ajax({
        url: server_key + "api/Usuario/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            AlertSuccess(result.mensaje);
            $("#tblUsuarios").DataTable().destroy();
            GetGrid();
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar el usuario. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al eliminar el usuario. Contacte al administrador.');
        }
    });
}

function GetGrid() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Usuario/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblUsuarios > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.usuario + "</td>" +
                    "<td>" + item.tblPerfil.perfil + "</td>" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='OpenEdit(" + item.id + ")'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='Delete(" + item.id + ")'><i class='fa-solid fa-circle-trash'></i></a >" +
                    "</tr>";
                $('#tblUsuarios > tbody').append(rows);
            });
            console.log(data);

            $("#tblUsuarios").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblUsuarios_wrapper .col-md-6:eq(0)');
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}
