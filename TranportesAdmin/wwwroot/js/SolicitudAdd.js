var solicitud = {
    Cliente: '',
    Fecha: '',
    UbiDes: '',
    UbiOrigen: '',
    Operadores: []
}
var operadores = [{
    Operador: '',
    Tractor: '',
    Caja: ''
}];
var valSolicitud;

$(document).ready(function () {
    
    $('label.required').append('&nbsp;<strong>*</strong>&nbsp;');
    
    operadores.shift();
    valSolicitud = $('#fmSolicitud').validate({
        rules: {
            Cliente: {
                required: true
            },
            Fecha: {
                required: true
            },
            UbiDes: {
                required: true
            },
            UbiOrigen: {
                required: true
            },
            Operador: {
                required: true
            },
            Tractor: {
                required: true
            },
            Caja: {
                required: true
            }
        },
        messages: {
            Cliente: "Seleccionar un cliente es requerido",
            Fecha: "Seleccionar una fecha es requerida",
            UbiDes: "Seleccionar una ubicación de destino es requerida",
            UbiOrigen: "Seleccionar una ubicación de origen es requerida",
            Operador: "Seleccionar un operador es requerido",
            Tractor: "Seleccionar un tractor es requerido",
            Caja: "Seleccionar una caja es requerido"
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
    //Get Clientes
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Cliente/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data ->', data.respuesta);
            $('#clientes').html('');
            $.each(clientesData, function (k, v) {
                $('#clientes').append('<option data-value="' + v.id + '" value="' + v.nombreCorto + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        }
    });
    //Get Operadores
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Operador/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data ->', data.respuesta);
            $('#operador').html('');
            $.each(clientesData, function (k, v) {
                $('#operador').append('<option data-value="' + v.id + '" value="' + v.nombre + ' ' + v.apellidoPaterno + ' ' + v.apellidoMaterno + ' ' + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        }
    });
    //Get Tractos
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Tracto/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data ->', data.respuesta);
            $('#tractor').html('');
            $.each(clientesData, function (k, v) {
                $('#tractor').append('<option data-value="' + v.id + '" value="' + v.idTracto + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        }
    });
    //Get Caja
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Caja/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data ->', data.respuesta);
            $('#caja').html('');
            $.each(clientesData, function (k, v) {
                $('#caja').append('<option data-value="' + v.id + '" value="' + v.noEconomico + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        }
    });
    

    
});

$('#form1').click(function () {
    if (valSolicitud.form()) {
        solicitud.Cliente = $("#txtCliente").val();
        solicitud.Fecha = $("#txtFecha").val();
        solicitud.UbiDes = $("#txtUbiDes").val();
        solicitud.UbiOrigen = $("#txtUbiOrigen").val();
        for (let i = 0; i < operadores.length; i++) {
            solicitud.Operadores[i] = operadores[i];
        }
    }
    console.log('obj', solicitud);
});

$('#añadirOperador').click(function () {

    var operador = $("#txtOperador").val();
    var tractor = $("#txtTractor").val();
    var caja1 = $("#txtCajaUno").val();
    var caja2 = $("#txtCajaDos").val();

    if (operadores.length == 0) {
        if ($("#txtCajaDos").val() == '') {
            operadores.push({
                Operador: operador,
                Tractor: tractor,
                Caja: caja1
            });
            var rows =
                "<tr>" +
                "<td>" + operador + "</td>" +
                "<td>" + tractor + "</td>" +
                "<td>" + caja1 + "</td>" +
                "<td>" + "sin caja aginada" + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#'><i class='far fa-times-circle'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
            $("#otroOperador").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#otroOperador_wrapper .col-md-6:eq(0)');
        }
        else {
            operadores.push({
                Operador: operador,
                Tractor: tractor,
                Caja: caja1
            });
            operadores.push({
                Operador: operador,
                Tractor: tractor,
                Caja: caja2
            });
            var rows =
                "<tr>" +
                "<td>" + operador + "</td>" +
                "<td>" + tractor + "</td>" +
                "<td>" + caja1 + "</td>" +
                "<td>" + caja2 + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#'><i class='far fa-times-circle'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
            $("#otroOperador").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#otroOperador_wrapper .col-md-6:eq(0)');
        }        
    }
    else {
        if ($("#txtCajaDos").val() == '') {
            operadores.push({
                Operador: operador,
                Tractor: tractor,
                Caja: caja1
            });
            var rows =
                "<tr>" +
                "<td>" + operador + "</td>" +
                "<td>" + tractor + "</td>" +
                "<td>" + caja1 + "</td>" +
                "<td>" + "sin caja aginada" + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#'><i class='far fa-times-circle'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
        }
        else {
            operadores.push({
                Operador: operador,
                Tractor: tractor,
                Caja: caja1
            });
            operadores.push({
                Operador: operador,
                Tractor: tractor,
                Caja: caja2
            });
            var rows =
                "<tr>" +
                "<td>" + operador + "</td>" +
                "<td>" + tractor + "</td>" +
                "<td>" + caja1 + "</td>" +
                "<td>" + caja2 + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#'><i class='far fa-times-circle'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
        }
    }
    console.log("Lego aqui");
    console.log('operadores', operadores);
   
});


function getClientes() {
    console.log('llego aqui');
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Cliente/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data ->', data.respuesta);
            $('#txtCliente').html('');
            $('#txtCliente').append('<option value="0">SELECCIONE</option>');
            $.each(clientesData, function (k, v) {
                $('#txtCliente').append('<option value="' + v.id + '">' + v.nombreCorto + '</option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la marca. Contacte al administrador.');
        }
    });
}
