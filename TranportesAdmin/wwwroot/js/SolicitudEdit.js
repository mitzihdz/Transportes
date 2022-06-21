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
    tblUbicaciones: {
        id: 0,
        planta: '',
        ruta: ''
    },
    tblEstatusId: 0,
    orden: 0,
    destino: ''
}];
var valSolicitud;
var x = 0;
var y = 0;
var z = 0;
var posRuta = 0;
var solicitud2 = {};
var tblSolicitudDetalles2 = [{}];
var tblSolicitudDetalleRuta2 = [{}];
$(document).ready(function () {
    path = (window.location.pathname).substring(18, (window.location.pathname).length);
    console.log('path', path);
    tblSolicitudDetalleRuta.shift();
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Solicitud/Select?id=" + path,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log('data->', data);
            //console.log('solicitud', solicitud);
            var dia = data.respuesta[0].fechaSolicitud.substr(8, 2);
            var mes = data.respuesta[0].fechaSolicitud.substr(5, 2);
            var año = data.respuesta[0].fechaSolicitud.substr(0, 4);
            $("#txtFecha").attr("value", año + '-' + mes + '-' + dia);
            cargarDatos(data.respuesta[0]);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
    
    
});

function cargarDatos(solicitudData) {
    solicitud = solicitudData;
    console.log('sol en cargar datos', solicitudData);
    tblSolicitudDetalles2 = solicitudData.tblSolicitudDetalles
    console.log('detalles', tblSolicitudDetalles2);
    
    for (let i = 0; i < tblSolicitudDetalles2.length; i++) {
        if (tblSolicitudDetalles2.length == 0) {
            var rows =
                "<tr" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblOperador.nombre + "</td>" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblTracto.idTracto + "</td>" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblCajas.noEconomico + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + i + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='eliminarOperador(" + i + ")'><i style='color: indianred;' class='fa-solid fa-circle-trash'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
            $("#otroOperador").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#otroOperador_wrapper .col-md-6:eq(0)');
        }
        else {
            var rows =
                "<tr class='text-center'>" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblOperador.nombre + "</td>" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblTracto.idTracto + "</td>" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblCajas.noEconomico + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + i + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='eliminarOperador(" + i + ")'><i style='color: indianred;' class='fa-solid fa-circle-trash'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
        }
        
    }
    //Get Clientes
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Cliente/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            //console.log('Data clientes ->', data.respuesta);
            $.each(clientesData, function (k, v) {
                $('#clientes').append('<option data-xyz="' + v.id + '" value="' + v.nombreCorto + '"></option>');
                if (v.id == solicitudData.tblClientesId) {
                    $("#txtCliente").val(v.nombreCorto);
                }
                
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
            //console.log('Data operadores ->', data.respuesta);
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
            //console.log('Data tractos ->', data.respuesta);
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
            //console.log('Data cajas ->', data.respuesta);
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
            console.log('Destinos ->', data.respuesta);
            //console.log('Data destinos ->', data.respuesta);
            $('#destino').html('');
            $.each(clientesData, function (k, v) {
                $('#destino').append('<option data-xyz="' + v.id + "-" + v.ruta + '" value="' + v.planta + '"></option>');
            });
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de destinos. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de destinos. Contacte al administrador.');
        }
    });
}
//eliminar operador
function eliminarOperador(id) {
    console.log('antes de eliminar',tblSolicitudDetalles2)
    tblSolicitudDetalles2.splice(id, 1);
    console.log('despues de eliminar', tblSolicitudDetalles2)
    $('#otroOperador > tbody').html('');
    for (let i = 0; i < tblSolicitudDetalles2.length; i++) {
        var rows =
            "<tr class='text-center'>" +
            "<td class='text-center'>" + tblSolicitudDetalles2[i].tblOperador.nombre + "</td>" +
            "<td class='text-center'>" + tblSolicitudDetalles2[i].tblTracto.idTracto + "</td>" +
            "<td class='text-center'>" + tblSolicitudDetalles2[i].tblCajas.noEconomico + "</td>" +
            "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + i + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
            "<td class='text-center'><a class='nav_link' href='#' onclick='eliminarOperador(" + i + ")'><i style='color: indianred;' class='fa-solid fa-circle-trash'></i></a >" +
            "</tr>";
        $('#otroOperador > tbody').append(rows);
    }

}
//actualizar
$('#form1').click(function () {
    
    solicitud.tblClientesId = $('#clientes option').filter(function () {
        return this.value == $('#txtCliente').val();
    }).data('xyz');
    solicitud.fechaSolicitud = $("#txtFecha").val();
    for (let i = 0; i < tblSolicitudDetalles.length; i++) {
        solicitud.tblSolicitudDetalles[i] = tblSolicitudDetalles2[i];
    }

    console.log('solicitud', solicitud);
    $.ajax({
        url: "https://localhost:7259/api/Solicitud/Update",
        type: "POST",
        data: JSON.stringify(solicitud),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            AlertSuccessOk('La solicitud se edito correctamente.', '/Solicitud');

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
});
//abrir modal
function abrirModalRuta(posicion) {
    $('#TimeLineContainerII2').html('');
    posRuta = posicion;
    console.log('posicion',posicion);
    $("#verRuta").modal('show');
    //Get Operadores
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Operador/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            //console.log('Data operadores ->', data.respuesta);
            $('#operador2').html('');
            $.each(clientesData, function (k, v) {
                $('#operador2').append('<option data-xyz="' + v.id + '" value="' + v.nombre + '"></option>');
                if (v.id == tblSolicitudDetalles2[posicion].tblOperadorId) {
                    $("#txtOperador2").val(v.nombre);
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
            //console.log('Data tractos ->', data.respuesta);
            $('#tractor2').html('');
            $.each(clientesData, function (k, v) {
                $('#tractor2').append('<option data-xyz="' + v.id + '" value="' + v.idTracto + '"></option>');
                if (v.id == tblSolicitudDetalles2[posicion].tblTractoId) {
                    $("#txtTractor2").val(v.idTracto);
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
            //console.log('Data cajas ->', data.respuesta);
            $('#caja2').html('');
            $.each(clientesData, function (k, v) {
                $('#caja2').append('<option data-xyz="' + v.id + '" value="' + v.noEconomico + '"></option>');
                if (v.id == tblSolicitudDetalles2[posicion].tblCajasId) {
                    $("#txtCaja2").val(v.noEconomico);
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
            //console.log('Data destinos ->', data.respuesta);
            $('#destino2').html('');
            $.each(clientesData, function (k, v) {
                $('#destino2').append('<option data-xyz="' + v.id + "-" + v.ruta + '" value="' + v.planta +'"></option>');
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
    z = tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta.length;
    var cliente = $('#txtCliente').val();
    for (let i = 0; i < tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta.length; i++) {
        if (i % 2 != 0) {
            $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta[i].tblUbicaciones.ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="color: indianred;" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta[i].tblUbicaciones.ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="color: indianred;" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
    }
    console.log('abriendo modal', z);
    tblSolicitudDetalleRuta2 = tblSolicitudDetalles2[posRuta].tblSolicitudDetalleRuta;
    
}
function agregarDestino2() {
    console.log('clic', tblSolicitudDetalleRuta2)
    if ($('#txtDestino2').val() != '') {
        var cliente = $('#txtCliente').val()
        var destino = $('#destino2 option').filter(function () {
            return this.value == $('#txtDestino2').val();
        }).data('xyz');
        var destinoid = destino.substring(0, destino.indexOf("-"));
        var destinonombre = $('#txtDestino2').val();
        var destinoRuta = destino.substring(destino.indexOf("-") + 1, destino.length);
        console.log('ruta del destinoid', destinoRuta);
        tblSolicitudDetalleRuta2.push({
            id: 0,
            tblUbicacionesId: destinoid,
            tblEstatusId: 0,
            orden: tblSolicitudDetalleRuta2.length - 1,
            tblUbicaciones: {
                id: 0,
                planta: destinonombre,
                ruta: destinoRuta
            }
        });
        console.log('Ruta Enviar 2', tblSolicitudDetalleRuta2);
        console.log('Ruta Enviar Push', tblSolicitudDetalleRuta2.length);
        $('#TimeLineContainerII2').html('');
        for (let i = 0; i < tblSolicitudDetalleRuta2.length; i++) {
            if (i % 2 != 0) {
                $('#TimeLineContainerII2').append('<div id="destinoidmodal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta2[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + tblSolicitudDetalleRuta2[i].tblUbicaciones.ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">eliminar <i style="color: indianred;" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
            else {
                $('#TimeLineContainerII2').append('<div id="destinoidmodal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta2[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + tblSolicitudDetalleRuta2[i].tblUbicaciones.ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">eliminar <i style="color: indianred;" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
        }
        $('#txtDestino2').val('');
    }
    else {
        AlertError('agrega un destino');
    }
}
//$('#agregarDestino2').click(function () {
    
//});
function borrarDestino2(id) {
    if (tblSolicitudDetalleRuta2.length == 1) {
        tblSolicitudDetalleRuta2.pop();
        $('#TimeLineContainerII2').html('');
    }
    else {
        $('#TimeLineContainerII2').html('');
        var cliente = $('#txtCliente').val();

        tblSolicitudDetalleRuta2.splice(id, 1);
        for (let i = 0; i < tblSolicitudDetalleRuta2.length; i++) {
            if (i % 2 != 0) {
                $('#TimeLineContainerII2').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta2[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + tblSolicitudDetalleRuta2[i].tblUbicaciones.ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="color: indianred;" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
            else {
                $('#TimeLineContainerII2').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta2[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + tblSolicitudDetalleRuta2[i].tblUbicaciones.ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="color: indianred;" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
        }
    }
}
$('#guardarRuta2').click(function () {
    console.log('clic', tblSolicitudDetalles2[posRuta].tblSolicitudDetalleRuta);
    console.log('detalle ruta', tblSolicitudDetalleRuta2);
    tblSolicitudDetalles2[posRuta].tblOperadorId = $('#operador2 option').filter(function () {
        return this.value == $('#txtOperador2').val();
    }).data('xyz');
    tblSolicitudDetalles2[posRuta].tblTractoId = $('#tractor2 option').filter(function () {
        return this.value == $('#txtTractor2').val();
    }).data('xyz');
    tblSolicitudDetalles2[posRuta].tblCajaId = $('#caja2 option').filter(function () {
        return this.value == $('#txtCaja2').val();
    }).data('xyz');
    tblSolicitudDetalles2[posRuta].tblOperador.nombre = $('#txtOperador2').val();
    tblSolicitudDetalles2[posRuta].tblTracto.idTracto = $('#txtTractor2').val();
    tblSolicitudDetalles2[posRuta].tblCajas.noEconomico = $('#txtCaja2').val();
    console.log('ruta editada', tblSolicitudDetalles2[posRuta]);
    $("#verRuta").modal('hide');
    $('#otroOperador > tbody').html('');
    for (let i = 0; i < tblSolicitudDetalles2.length; i++) {
        var rows =
            "<tr>" +
            "<td class='text-center'>" + tblSolicitudDetalles2[i].tblOperador.nombre + "</td>" +
            "<td class='text-center'>" + tblSolicitudDetalles2[i].tblTracto.idTracto + "</td>" +
            "<td class='text-center'>" + tblSolicitudDetalles2[i].tblCajas.noEconomico + "</td>" +
            "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + i + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
            "<td class='text-center'><a class='nav_link' href='#'><i style='color: indianred;' class='fa-solid fa-trash'></i></a >" +
            "</tr>";
        $('#otroOperador > tbody').append(rows);
    }
})
//agregar ruta
$('#guardarRuta').click(function () {
    console.log('ruta guardar', tblSolicitudDetalleRuta);
    valSolicitud = $('#fmSolicitud').validate({
        rules: {
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
        tblSolicitudDetalles2.push({
            id: 0,
            tblTractoId: tractor,
            tblTracto: {
                idTracto: tractorDataTable
            },
            tblCajasId: caja,
            tblCajas: {
                noEconomico: cajaDataTable
            },
            tblOperadorId: operador,
            tblOperador: {
                nombre: operadorDataTable
            },
            tblSolicitudDetalleRuta: tblSolicitudDetalleRuta
        });
        $('#otroOperador > tbody').html('');
        for (let i = 0; i < tblSolicitudDetalles2.length; i++) {
            var rows =
                "<tr>" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblOperador.nombre + "</td>" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblTracto.idTracto + "</td>" +
                "<td class='text-center'>" + tblSolicitudDetalles2[i].tblCajas.noEconomico + "</td>" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + i + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
                "<td class='text-center'><a class='nav_link' href='#'><i style='color: indianred;' class='fa-solid fa-trash'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
        }
        console.log("Lego aqui");
        x = 0;
        y++;
        
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
            tblUbicaciones: {
                id: 0,
                planta: '',
                ruta: ''
            },
            tblEstatusId: 0,
            orden: 0,
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
        var destino = $('#destino option').filter(function () {
            return this.value == $('#txtDestino').val();
        }).data('xyz');
        var destinoid = destino.substring(0, destino.indexOf("-"));
        var destinoNombre = $('#txtDestino').val();
        var destinoRuta = destino.substring(destino.indexOf("-") + 1, destino.length);
        console.log('ruta del destinoid', destinoRuta);
        tblSolicitudDetalleRuta.push({
            id: 0,
            tblUbicacionesId: destinoid,
            tblEstatusId: 0,
            orden: x,
            tblUbicaciones: {
                id: 0,
                planta: destinoNombre,
                ruta: destinoRuta
            }
        });
        if (x % 2 == 0) {
            $('#TimeLineContainerII').append('<div id="destinoId' + x + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + destinoNombre + '</h3><p style="color: white;">' + destinoRuta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino(' + x + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII').append('<div id="destinoId' + x + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + destinoNombre + '</h3><p style="color: white;">' + destinoRuta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino(' + x + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }

        $('#txtDestino').val('');
    }
    else {
        AlertError('Agrega un destino');
    }
}
//$('#agregarDestino').click(function () {
    
//});

function borrarDestino(id) {
    $('#TimeLineContainerII').html('');
    var cliente = $('#txtCliente').val();

    tblSolicitudDetalleRuta.splice(id - 1, 1);
    for (let i = 0; i < tblSolicitudDetalleRuta.length; i++) {
        if (i % 2 != 0) {
            $('#TimeLineContainerII').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + tblSolicitudDetalleRuta[i].tblUbicaciones.ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + tblSolicitudDetalleRuta[i].tblUbicaciones.ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
    }
    x--;
}