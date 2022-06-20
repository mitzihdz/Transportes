var solicitud = {
    id: 0,
    tblClientesId: 0,
    tblEstatusId: 0,
    fechaSolicitud: 0,
    tblSolicitudDetalles: [{
        id: 0,
        tblTractoId: 0,
        tblCajasId: 0,
        tblOperadorId: 0,
        tblSolicitudDetalleRuta: [{
            id: 0,
            tblUbicacionesId: 0,
            orden: 0,
            tblEstatusRutaId: 0,
            destino: ''
        }]
    }]
}
var tblSolicitudDetalles = [{
    id: 0,
    tblTractoId: 0,
    tblCajasId: 0,
    tblOperadorId: 0,
    tblSolicitudDetalleRuta: [{
        id: 0,
        tblUbicacionesId: 0,
        orden: 0,
        tblEstatusRutaId: 0,
        destino: ''
    }]
}];
var tblSolicitudDetalleRuta = [{
    id: 0,
    tblUbicacionesId: 0,
    orden: 0,
    tblEstatusRutaId: 0,
    destino: ''
    
}];
var valSolicitud;
var x = 0;
var y = 0;
var z = 0;
var ruta = {};
$(document).ready(function () {
    
    $('label.required').append('&nbsp;<strong>*</strong>&nbsp;');
    tblSolicitudDetalles.shift();
    tblSolicitudDetalleRuta.shift();
    valSolicitud = $('#fmSolicitud').validate({
        rules: {
            Cliente: {
                required: true
            },
            Fecha: {
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
            console.log('Data clientes ->', data.respuesta);
            $('#clientes').html('');
            $.each(clientesData, function (k, v) {
                $('#clientes').append('<option  data-xyz="' + v.id + '" value="' + v.nombreCorto + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
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
            console.log('Data operadores ->', data.respuesta);
            $('#operador').html('');
            $.each(clientesData, function (k, v) {
                $('#operador').append('<option data-xyz="' + v.id + '" value="' + v.nombre + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de operadores. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de operadores. Contacte al administrador.');
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
            console.log('Data tractos ->', data.respuesta);
            $('#tractor').html('');
            $.each(clientesData, function (k, v) {
                $('#tractor').append('<option data-xyz="' + v.id + '" value="' + v.idTracto + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de tractos. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de tractos. Contacte al administrador.');
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
            console.log('Data cajas ->', data.respuesta);
            $('#caja').html('');
            $.each(clientesData, function (k, v) {
                $('#caja').append('<option data-xyz="' + v.id + '" value="' + v.noEconomico + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de cajas. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de cajas. Contacte al administrador.');
        }
    });
    //Get Destino
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Ubicacion/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data destinos ->', data.respuesta);
            $('#destino').html('');
            $.each(clientesData, function (k, v) {
                $('#destino').append('<option data-xyz="' + v.id + '" value="' + v.planta + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de destinos. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de destinos. Contacte al administrador.');
        }
    });
});
//guardar solicitud
$('#form1').click(function () {
    if (valSolicitud.form() && tblSolicitudDetalles.length != 0) {
        solicitud.id = 0;
        solicitud.tblEstatusId = 0;
        solicitud.tblClientesId = $('#clientes option').filter(function () {
            return this.value == $('#txtCliente').val();
        }).data('xyz');
        solicitud.fechaSolicitud = $("#txtFecha").val();
        for (let i = 0; i < tblSolicitudDetalles.length; i++) {
            solicitud.tblSolicitudDetalles[i] = tblSolicitudDetalles[i];
        }
        
        console.log('solicitud', solicitud);
        $.ajax({
            url: "https://localhost:7259/api/Solicitud/Add",
            type: "POST",
            data: JSON.stringify(solicitud),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                AlertSuccessOk('La solicitud se registró correctamente.', '/Solicitud');

            },
            failure: function (data) {
                AlertError('Ocurrio un error al guardar el cliente. Contacte al administrador.');
                $('#form1').attr('href', "~/Solicitud");
            },
            error: function (data) {
                AlertError('Ocurrio un error al guardar el cliente. Contacte al administrador.');
                $('#form1').attr('href', "~/Solicitud");
            }
        });
       
        console.log('obj', solicitud);
        
    }
    else {
        console.log("Aqui enviar tblSolicitudDetalles.length != 0");
    }
});
//agregar ruta
$('#guardarRuta').click(function () {
    console.log('ruta guardar', tblSolicitudDetalleRuta);
    if (valSolicitud.form()) {
        var operador = $('#operador option').filter(function () {
            return this.value == $('#txtOperador').val();
        }).data('xyz');
        var tractor = $('#tractor option').filter(function () {
            return this.value == $('#txtTractor').val();
        }).data('xyz');
        var caja = $('#caja option').filter(function () {
            return this.value == $('#txtCaja').val();
        }).data('xyz');
        var operadorDataTable = $("#txtOperador").val();
        var tractorDataTable = $("#txtTractor").val();
        var cajaDataTable = $("#txtCaja").val();
        if (tblSolicitudDetalles.length == 0) {
            tblSolicitudDetalles.push({
                id: 0,
                tblTractoId: tractor,
                tblCajasId: caja,
                tblOperadorId: operador,
                tblSolicitudDetalleRuta: tblSolicitudDetalleRuta
            });            
            var rows =
                "<tr class='text-center'>" +
                "<td class='text-center'>" + operadorDataTable + "</td>" +
                "<td class='text-center'>" + tractorDataTable + "</td>" +
                "<td class='text-center'>" + cajaDataTable + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + y + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='eliminarOperador(" + y + ")'><i style='' class='fa-solid fa-circle-trash'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
            $("#otroOperador").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#otroOperador_wrapper .col-md-6:eq(0)');
            console.log("Lego aqui");
            console.log('operadores length = 0', tblSolicitudDetalles);
            console.log('ruta guardar', tblSolicitudDetalleRuta);
            x = 0;
            y++;
        }
        else {
            tblSolicitudDetalles.push({
                id: 0,
                tblTractoId: tractor,
                tblCajasId: caja,
                tblOperadorId: operador,
                tblSolicitudDetalleRuta: tblSolicitudDetalleRuta
            });
            var rows =
                "<tr>" +
                "<td class='text-center'>" + operadorDataTable + "</td>" +
                "<td class='text-center'>" + tractorDataTable + "</td>" +
                "<td class='text-center'>" + cajaDataTable + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + y +")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
                "<td class='text-center'><a class='nav_link' href='#'><i style='' class='fa-solid fa-circle-trash'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
            console.log("Lego aqui");
            console.log('operadores length > 0', tblSolicitudDetalles);
            console.log('ruta guardar', tblSolicitudDetalleRuta);
            x = 0;
            y++;
        }
        $('#txtOperador').val('');
        $('#txtTractor').val('');
        $('#txtCaja').val('');
        $('#TimeLineContainerII').html('');
        AlertSuccess("Ruta Agregada");
        $("#ModalDestinos").modal('hide');
        console.log('antes de reiniciar', tblSolicitudDetalleRuta.length);
        tblSolicitudDetalleRuta = [{
            id: 0,
            tblUbicacionesId: 0,
            orden: 0,
            tblEstatusRutaId: 0,
            destino: ''
        }];
        console.log('despues de reiniciar', tblSolicitudDetalleRuta.length);
        tblSolicitudDetalleRuta.shift();
        console.log('despues de quitar primer elemento', tblSolicitudDetalleRuta.length);
        x = 0;
    }
    else {
        AlertError('Agrega los campos faltantes del formulario');
    }
    
});
function agregarDestino() {
    if ($('#txtDestino').val() != '') {
        x++;
        var cliente = $('#txtCliente').val()
        var destinoId = $('#destino option').filter(function () {
            return this.value == $('#txtDestino').val();
        }).data('xyz');
        var destinoNombre = $('#txtDestino').val();
        tblSolicitudDetalleRuta.push({
            id: 0,
            tblUbicacionesId: destinoId,
            tblEstatusId: 0,
            orden: x,
            destino: destinoNombre
        });
        if (x % 2 == 0) {
            $('#TimeLineContainerII').append('<div id="destinoId' + x + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + destinoNombre + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino(' + x + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII').append('<div id="destinoId' + x + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + destinoNombre + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino(' + x + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }

        $('#txtDestino').val('');
    }
    else {
        AlertError('Agrega un destino');
    }
}
//$('#agregarDestino').click(function () {
    
//});
function eliminarOperador(id) {
    console.log(id);
    console.log('antes de eliminar', tblSolicitudDetalles)
    tblSolicitudDetalles.splice(id, 1);
    console.log('despues de eliminar', tblSolicitudDetalles)
    //$('#otroOperador > tbody').html('');
    //for (let i = 0; i < tblSolicitudDetalles.length; i++) {
    //    var rows =
    //        "<tr class='text-center'>" +
    //        "<td class='text-center'>" + tblSolicitudDetalles[i].tblOperador.nombre + "</td>" +
    //        "<td class='text-center'>" + tblSolicitudDetalles[i].tblTracto.idTracto + "</td>" +
    //        "<td class='text-center'>" + tblSolicitudDetalles[i].tblCajas.noEconomico + "</td>" +
    //        "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + i + ")'><i class='fa-solid fa-truck'></i></a >" +
    //        "<td class='text-center'><a class='nav_link' href='#' onclick='eliminarOperador(" + i + ")'><i style='color: indianred;' class='fa-solid fa-circle-trash'></i></a >" +
    //        "</tr>";
    //    $('#otroOperador > tbody').append(rows);
    //}

}
function borrarDestino(id) {
    $('#TimeLineContainerII').html('');
    var cliente = $('#txtCliente').val();

    tblSolicitudDetalleRuta.splice(id - 1, 1);
    for (let i = 0; i < tblSolicitudDetalleRuta.length; i++) {
        tblSolicitudDetalleRuta[i].orden = i + i;
        if (i % 2 != 0) {
            $('#TimeLineContainerII').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
    }
    x--;
}
//abrir modal
function abrirModalRuta(y) {
    $("#verRuta").modal('show');
    $('#TimeLineContainerII2').html('');
    console.log('modal detalles', tblSolicitudDetalles[y]);
    ruta = tblSolicitudDetalles[y];
    console.log('pasando detalles', ruta);
    //Get Operadores
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Operador/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data operadores ->', data.respuesta);
            $('#operador2').html('');
            $.each(clientesData, function (k, v) {
                $('#operador2').append('<option data-xyz="' + v.id + '" value="' + v.nombre + '"></option>');
                if (v.id == ruta.tblOperadorId) {
                    $("#txtOperador2:text").val(v.nombre);
                }
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de operadores. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de operadores. Contacte al administrador.');
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
            console.log('Data tractos ->', data.respuesta);
            $('#tractor2').html('');
            $.each(clientesData, function (k, v) {
                $('#tractor2').append('<option data-xyz="' + v.id + '" value="' + v.idTracto + '"></option>');
                if (v.id == ruta.tblTractoId) {
                    $("#txtTractor2:text").val(v.idTracto);
                }
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de tractos. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de tractos. Contacte al administrador.');
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
            console.log('Data cajas ->', data.respuesta);
            $('#caja2').html('');
            $.each(clientesData, function (k, v) {
                $('#caja2').append('<option data-xyz="' + v.id + '" value="' + v.noEconomico + '"></option>');
                if (v.id == ruta.tblCajasId) {
                    $("#txtCaja2:text").val(v.noEconomico);
                }
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de cajas. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de cajas. Contacte al administrador.');
        }
    });
    //Get Destino
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Ubicacion/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data destinos ->', data.respuesta);
            $('#destino2').html('');
            $.each(clientesData, function (k, v) {
                $('#destino2').append('<option data-xyz="' + v.id + '" value="' + v.planta + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de destinos. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de destinos. Contacte al administrador.');
        }
    });
    //Mostrar la ruta
    z = ruta.tblSolicitudDetalleRuta.length;
    var cliente = $('#txtCliente').val();
    for (let i = 0; i < ruta.tblSolicitudDetalleRuta.length; i++) {
        if (i % 2 != 0) {
            $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
    }
    console.log('abriendo modal', z);
    
}
//Editar ruta en modal
function agregarDestino2() {
    if ($('#txtDestino2').val() != '') {
        var cliente = $('#txtCliente').val()
        var destinoId = $('#destino2 option').filter(function () {
            return this.value == $('#txtDestino2').val();
        }).data('xyz');
        var destinoNombre = $('#txtDestino2').val();
        ruta.tblSolicitudDetalleRuta.push({
            id: 0,
            tblUbicacionesId: destinoId,
            tblEstatusId: 0,
            orden: 0,
            destino: destinoNombre
        });
        $('#TimeLineContainerII2').html('');
        for (let i = 0; i < ruta.tblSolicitudDetalleRuta.length; i++) {
            ruta.tblSolicitudDetalleRuta[i].orden = i + 1;
            if (i % 2 != 0) {
                $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
            else {
                $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
        }
        $('#txtDestino2').val('');
    }
    else {
        AlertError('Agrega un destino');
    }
}
//$('#agregarDestino2').click(function () {
    
//});
function borrarDestino2(id) {
    if (ruta.tblSolicitudDetalleRuta.length == 1) {
        ruta.tblSolicitudDetalleRuta.pop();
        $('#TimeLineContainerII2').html('');
    }
    else {
        $('#TimeLineContainerII2').html('');
        var cliente = $('#txtCliente').val();

        ruta.tblSolicitudDetalleRuta.splice(id, 1);
        for (let i = 0; i < ruta.tblSolicitudDetalleRuta.length; i++) {
            ruta.tblSolicitudDetalleRuta[i].orden = i + 1;
            if (i % 2 != 0) {
                $('#TimeLineContainerII2').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
            else {
                $('#TimeLineContainerII2').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
        }
    }
}
$('#guardarRuta2').click(function () {
    console.log('clic', ruta.tblSolicitudDetalleRuta);
    console.log('detalle ruta', tblSolicitudDetalles);

    if (z == ruta.tblSolicitudDetalleRuta.length) {
        AlertError("Sin cambios para editar");
        $("#verRuta").modal('hide');
    }
    else {
        AlertSuccess("Ruta Editada");
        $("#verRuta").modal('hide');
    }
})


