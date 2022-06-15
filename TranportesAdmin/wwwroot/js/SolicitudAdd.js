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
            CajaUno: {
                required: true
            },
            CajaDos: {
                required: false
            }
        },
        messages: {
            Cliente: "Seleccionar un cliente es requerido",
            Fecha: "Seleccionar una fecha es requerida",
            UbiDes: "Seleccionar una ubicación de destino es requerida",
            UbiOrigen: "Seleccionar una ubicación de origen es requerida",
            Operador: "Seleccionar un operador es requerido",
            Tractor: "Seleccionar un tractor es requerido",
            CajaUno: "Seleccionar una caja es requerido"
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
