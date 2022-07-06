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
            formData.append("url", server_key);
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
                        $(location).attr('href', 'Home');
                        //if (result.perfil == 1)
                        //    $(location).attr('href', 'Home');
                        //else
                        //    $(location).attr('href', 'SolicitudOperador');
                    }
                    else {
                        AlertError(result.mensaje);
                    }    
                },
                error: function (xhr, status, error) {
                    AlertError(status);
                }
            });

        }
    });



   






});




