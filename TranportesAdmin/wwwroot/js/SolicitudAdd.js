﻿var solicitud = {
    id: 0,
    tblClientesId: 0,
    tblEstatusId: 0,
    fechaInicio: '',
    fechaFin: null,
    ordenServicio: '',
    tblSolicitudDetalles: [{
        id: 0,
        numeroViaje: '',
        tblTractoId: 0,
        tblCajasId: 0,
        tblOperadorId: 0,
        fechaInicio: '',
        fechaFin: null,
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
    numeroViaje: '',
    tblTractoId: 0,
    tblCajasId: 0,
    tblOperadorId: 0,
    fechaInicio: '',
    fechaFin: null,
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
    destino: '',
    ruta: ''    
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
            Viaje: {
                required: true
            },
            Orden: {
                required: true
            },
            FechaInicio: {
                required: true
            },
            //FechaFin: {
            //    required: true
            //},
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
            Viaje: "El número de viaje es requerido",
            Orden: "La orden de servicio es requerida",
            FechaInicio: "Seleccionar una fecha es requerida",
            //FechaFin: "Seleccionar una fecha es requerida",
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
        url: server_key + "api/Cliente/Select",
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
        url: server_key + "api/Operador/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            //console.log('Data operadores ->', data.respuesta);
            $('#operador').html('');
            $.each(clientesData, function (k, v) {
                $('#operador').append('<option data-xyz="' + v.id + '" value="' + v.apellidoPaterno + " " + v.apellidoMaterno + " " + v.nombre + '"></option>');
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
        url: server_key + "api/Tracto/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            //console.log('Data tractos ->', data.respuesta);
            $('#tractor').html('');
            $.each(clientesData, function (k, v) {
                $('#tractor').append('<option data-xyz="' + v.id + '" value="' + v.noEconomico + '"></option>');
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
        url: server_key + "api/Caja/Select",
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
        url: server_key + "api/Ubicacion/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data destinos ->', data.respuesta);
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
});
//Consultar disponibilidad
//function consultarDisponibilidad() {
//    if ($("#txtFechaInicioRuta").val().length != 0 && $("#txtFechaFinRuta").val().length != 0) {
//        if ($("#txtFechaFinRuta").val() >= $("#txtFechaInicioRuta").val()) {
//            console.log($("#txtFechaInicioRuta").val(), 'inicio');
//            console.log($("#txtFechaFinRuta").val(), 'fin');
//            //Get Operadores
//            $.ajax({
//                type: "GET",
//                url: server_key + "api/Operador/SelectCat?fechaInicio=" + $("#txtFechaInicioRuta").val() + "&fechaFin=" + $("#txtFechaFinRuta").val(),
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (data, textStatus, jqXHR) {
//                    var clientesData = data.respuesta;
//                    console.log('Data operadores ->', data.respuesta);
//                    $('#operador').html('');
//                    $.each(clientesData, function (k, v) {
//                        $('#operador').append('<option data-xyz="' + v.id + '" value="' + v.apellidoPaterno + " " + v.apellidoMaterno + " " + v.nombre + '"></option>');
//                    });
//                },
//                failure: function (data) {
//                    AlertError('Ocurrio un error al consultar la lista de operadores. Contacte al administrador.');
//                },
//                error: function (data) {
//                    AlertError('Ocurrio un error al consultar la lista de operadores. Contacte al administrador.');
//                }
//            });
//            //Get Tractos
//            $.ajax({
//                type: "GET",
//                url: server_key + "api/Tracto/SelectCat?fechaInicio=" + $("#txtFechaInicioRuta").val() + "&fechaFin=" + $("#txtFechaFinRuta").val(),
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (data, textStatus, jqXHR) {
//                    var clientesData = data.respuesta;
//                    console.log('Data tractos ->', data.respuesta);
//                    $('#tractor').html('');
//                    $.each(clientesData, function (k, v) {
//                        $('#tractor').append('<option data-xyz="' + v.id + '" value="' + v.noEconomico + '"></option>');
//                    });
//                },
//                failure: function (data) {
//                    AlertError('Ocurrio un error al consultar la lista de tractos. Contacte al administrador.');
//                },
//                error: function (data) {
//                    AlertError('Ocurrio un error al consultar la lista de tractos. Contacte al administrador.');
//                }
//            });
//            //Get Caja
//            $.ajax({
//                type: "GET",
//                url: server_key + "api/Caja/SelectCat?fechaInicio=" + $("#txtFechaInicioRuta").val() + "&fechaFin=" + $("#txtFechaFinRuta").val(),
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (data, textStatus, jqXHR) {
//                    var clientesData = data.respuesta;
//                    console.log('Data cajas ->', data.respuesta);
//                    $('#caja').html('');
//                    $.each(clientesData, function (k, v) {
//                        $('#caja').append('<option data-xyz="' + v.id + '" value="' + v.noEconomico + '"></option>');
//                    });
//                },
//                failure: function (data) {
//                    AlertError('Ocurrio un error al consultar la lista de cajas. Contacte al administrador.');
//                },
//                error: function (data) {
//                    AlertError('Ocurrio un error al consultar la lista de cajas. Contacte al administrador.');
//                }
//            });
//        }
//        else {
//            AlertWarning("la fecha de fin tiene que ser mayor a la fecha de inicio");
//            console.log('la fecha de fin tiene que ser mayor a la fecha de inicio');
//        }
//    }
//    else {
//        console.log('ingresa ambas fechas');
//    }
    
//}

//guardar solicitud
$('#form1').click(function () {
    if (valSolicitud.form() && tblSolicitudDetalles.length != 0) {
        solicitud.id = 0;
        solicitud.tblEstatusId = 0;
        solicitud.tblClientesId = $('#clientes option').filter(function () {
            return this.value == $('#txtCliente').val();
        }).data('xyz');
        solicitud.fechaInicio = $("#txtFechaInicio").val();

        if ($("#txtFechaFin").val() == '') {
            solicitud.fechaFin = null;
        }
        else {
            solicitud.fechaFin = $("#txtFechaFin").val();
        }
        
        solicitud.ordenServicio = $("#txtOrden").val();
        for (let i = 0; i < tblSolicitudDetalles.length; i++) {
            solicitud.tblSolicitudDetalles[i] = tblSolicitudDetalles[i];
        }
        
        console.log('solicitud', solicitud);
        $.ajax({
            url: server_key + "api/Solicitud/Add",
            type: "POST",
            data: JSON.stringify(solicitud),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log('respuesta del server', data);
                if (data.estado) {
                    AlertSuccessOk(data.mensaje, '/Solicitud');
                }
                else {
                    AlertError(data.mensaje);
                }
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

        var diaInicio = $("#txtFechaInicioRuta").val().substr(8, 2);
        var mesInicio = $("#txtFechaInicioRuta").val().substr(5, 2);
        var añoInicio = $("#txtFechaInicioRuta").val().substr(0, 4);
        var diaFin = $("#txtFechaFinRuta").val().substr(8, 2);
        var mesFin = $("#txtFechaFinRuta").val().substr(5, 2);
        var añoFin = $("#txtFechaFinRuta").val().substr(0, 4);
        //var operadorDataTable = $("#txtOperador").val();
        //var tractorDataTable = $("#txtTractor").val();
        //var cajaDataTable = $("#txtCaja").val();
        var fechaFinRuta;
        if ($("#txtFechaFinRuta").val() == '') {
            fechaFinRuta = null;
        }
        else {
            fechaFinRuta = $("#txtFechaFinRuta").val();
        }


        if (tblSolicitudDetalles.length == 0) {
            tblSolicitudDetalles.push({
                id: 0,
                numeroViaje: $("#txtViaje").val(),
                fechaInicio: $("#txtFechaInicioRuta").val(),
                fechaFin: fechaFinRuta, //$("#txtFechaFinRuta").val(),
                tblTractoId: tractor,
                tblCajasId: caja,
                tblOperadorId: operador,
                tblTracto: {
                    noEconomico: $("#txtTractor").val()
                },
                tblCajas: {
                    noEconomico: $("#txtCaja").val()
                },
                tblOperador: {
                    nombre: $("#txtOperador").val()
                },
                tblSolicitudDetalleRuta: tblSolicitudDetalleRuta
            });

            var rowRuta = "<ul>";
            $.each(tblSolicitudDetalleRuta, function (i, item) {
                rowRuta = rowRuta + "<li>" + item.destino + "</li>";
            });
            rowRuta = rowRuta + "</ul >";

            var rows =
                "<tr class='text-center'>" +
                "<td class='text-center'>" + rowRuta + "</td>" +
                "<td class='text-center'>" + $("#txtViaje").val() + "</td>" +
                "<td class='text-center'>" + $("#txtOperador").val() + "</td>" +
                "<td class='text-center'>" + $("#txtTractor").val() + "</td>" +
                "<td class='text-center'>" + $("#txtCaja").val() + "</td>" +
                "<td class='text-center'>" + diaInicio + "/" + mesInicio + "/" + añoInicio + "-" + diaFin + "/" + mesFin + "/" + añoFin + "</td>" +
                
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + y + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a></td>" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='eliminarOperador(" + y + ")'><i style='' class='fa-solid fa-circle-trash'></i></a></td>" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
            $("#otroOperador").DataTable({
                "destroy": true,
                "pageLength": 60,
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
                numeroViaje: $("#txtViaje").val(),
                fechaInicio: $("#txtFechaInicioRuta").val(),
                fechaFin: fechaFinRuta, //$("#txtFechaFinRuta").val(),
                tblTractoId: tractor,
                tblCajasId: caja,
                tblOperadorId: operador,
                tblTracto: {
                    noEconomico: $("#txtTractor").val()
                },
                tblCajas: {
                    noEconomico: $("#txtCaja").val()
                },
                tblOperador: {
                    nombre: $("#txtOperador").val()
                },
                tblSolicitudDetalleRuta: tblSolicitudDetalleRuta
            });
            var rowRuta = "<ul>";
            $.each(tblSolicitudDetalleRuta, function (i, item) {
                rowRuta = rowRuta + "<li>" + item.destino + "</li>";
            });
            rowRuta = rowRuta + "</ul >";

            var rows =
                "<tr>" +
                "<td class='text-center'>" + rowRuta + "</td>" +
                "<td class='text-center'>" + $("#txtViaje").val() + "</td>" +
                "<td class='text-center'>" + $("#txtOperador").val() + "</td>" +
                "<td class='text-center'>" + $("#txtTractor").val() + "</td>" +
                "<td class='text-center'>" + $("#txtCaja").val() + "</td>" +
                "<td class='text-center'>" + diaInicio + "/" + mesInicio + "/" + añoInicio + "-" + diaFin + "/" + mesFin + "/" + añoFin + "</td>" +
               
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + y + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a></td>" +
                "<td class='text-center'><a class='nav_link' href='#' onclick='eliminarOperador(" + y + ")'><i style='' class='fa-solid fa-circle-trash'></i></a></td>" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
            console.log("Lego aqui");
            console.log('operadores length > 0', tblSolicitudDetalles);
            console.log('ruta guardar', tblSolicitudDetalleRuta);
            x = 0;
            y++;
        }
        $('#txtViaje').val('');
        $('#txtOperador').val('');
        $('#txtTractor').val('');
        $('#txtCaja').val('');
        $("#txtFechaInicioRuta").val('');
        $("#txtFechaFinRuta").val('');
        $('#TimeLineContainerII').html('');
        AlertSuccess("Ruta Agregada");
        $("#ModalDestinos").modal('hide');
        console.log('antes de reiniciar', tblSolicitudDetalleRuta.length);
        tblSolicitudDetalleRuta = [{
            id: 0,
            numeroViaje:'',
            tblUbicacionesId: 0,
            orden: 0,
            tblEstatusRutaId: 0,
            destino: '',
            ruta: ''
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
        var destinoId = destino.substring(0, destino.indexOf("-"));
        var destinoNombre = $('#txtDestino').val();
        var destinoRuta = destino.substring(destino.indexOf("-") + 1, destino.length);
        console.log('ruta del destinoid', destinoRuta);
        tblSolicitudDetalleRuta.push({
            id: 0,
            tblUbicacionesId: destinoId,
            tblEstatusId: 0,
            orden: x,
            destino: destinoNombre,
            ruta: destinoRuta
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

function eliminarOperador(id) {
    console.log(id);
    console.log('antes de eliminar', tblSolicitudDetalles)
    tblSolicitudDetalles.splice(id, 1);
    console.log('despues de eliminar', tblSolicitudDetalles)
    $('#otroOperador > tbody').html('');
    for (let i = 0; i < tblSolicitudDetalles.length; i++) {
        var diaInicio = tblSolicitudDetalles[i].fechaInicio.substr(8, 2);
        var mesInicio = tblSolicitudDetalles[i].fechaInicio.substr(5, 2);
        var añoInicio = tblSolicitudDetalles[i].fechaInicio.substr(0, 4);
        var diaFin = tblSolicitudDetalles[i].fechaFin.substr(8, 2);
        var mesFin = tblSolicitudDetalles[i].fechaFin.substr(5, 2);
        var añoFin = tblSolicitudDetalles[i].fechaFin.substr(0, 4);

        var rowRuta = "<ul>";
        $.each(tblSolicitudDetalles[i].tblSolicitudDetalleRuta, function (i, item) {
            rowRuta = rowRuta + "<li>" + item.destino + "</li>";
        });
        rowRuta = rowRuta + "</ul >";

        var rows =
            "<tr class='text-center'>" +
            "<td class='text-center'>" + rowRuta + "</td>" +
            "<td class='text-center'>" + tblSolicitudDetalles[i].numeroViaje + "</td>" +
            "<td class='text-center'>" + tblSolicitudDetalles[i].tblOperador.nombre + "</td>" +
            "<td class='text-center'>" + tblSolicitudDetalles[i].tblTracto.noEconomico + "</td>" +
            "<td class='text-center'>" + tblSolicitudDetalles[i].tblCajas.noEconomico + "</td>" +
            "<td class='text-center'>" + diaInicio + "/" + mesInicio + "/" + añoInicio + "-" + diaFin + "/" + mesFin + "/" + añoFin + "</td>" +
            
            "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + i + ")'><i style='color: yellowgreen;' class='fa-solid fa-truck'></i></a >" +
            "<td class='text-center'><a class='nav_link' href='#' onclick='eliminarOperador(" + i + ")'><i style='color: indianred;' class='fa-solid fa-circle-trash'></i></a >" +
            "</tr>";
        $('#otroOperador > tbody').append(rows);
    }

}
function borrarDestino(id) {
    $('#TimeLineContainerII').html('');
    var cliente = $('#txtCliente').val();

    tblSolicitudDetalleRuta.splice(id - 1, 1);
    for (let i = 0; i < tblSolicitudDetalleRuta.length; i++) {
        tblSolicitudDetalleRuta[i].orden = i + i;
        if (i % 2 != 0) {
            $('#TimeLineContainerII').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + tblSolicitudDetalleRuta[i].ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + tblSolicitudDetalleRuta[i].ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
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
    var diaInicio = ruta.fechaInicio.substr(8, 2);
    var mesInicio = ruta.fechaInicio.substr(5, 2);
    var añoInicio = ruta.fechaInicio.substr(0, 4);
    var diaFin = ruta.fechaFin.substr(8, 2);
    var mesFin = ruta.fechaFin.substr(5, 2);
    var añoFin = ruta.fechaFin.substr(0, 4);
    $("#txtViaje2").attr("value", ruta.numeroViaje);
    $("#txtFechaInicioRuta2").attr("value", añoInicio + '-' + mesInicio + '-' + diaInicio);
    $("#txtFechaFinRuta2").attr("value", añoFin + '-' + mesFin + '-' + diaFin);
    $.ajax({
        type: "GET",
        url: server_key + "api/Operador/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data operadores ->', data.respuesta);
            $('#operador2').html('');
            $.each(clientesData, function (k, v) {
                $('#operador2').append('<option data-xyz="' + v.id + '" value="' + v.apellidoPaterno + " " + v.apellidoMaterno + " " + v.nombre + '"></option>');
                if (v.id == ruta.tblOperadorId) {
                    $("#txtOperador2:text").val(v.apellidoPaterno + " " + v.apellidoMaterno + " " + v.nombre);
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
        url: server_key + "api/Tracto/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data tractos ->', data.respuesta);
            $('#tractor2').html('');
            $.each(clientesData, function (k, v) {
                $('#tractor2').append('<option data-xyz="' + v.id + '" value="' + v.noEconomico + '"></option>');
                if (v.id == ruta.tblTractoId) {
                    $("#txtTractor2:text").val(v.noEconomico);
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
        url: server_key + "api/Caja/Select",
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
        url: server_key + "api/Ubicacion/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data destinos ->', data.respuesta);
            $('#destino2').html('');
            $.each(clientesData, function (k, v) {
                $('#destino2').append('<option data-xyz="' + v.id + "-" + v.ruta + '" value="' + v.planta + '"></option>');
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
            $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
        }
    }
    console.log('abriendo modal', z);
    
}
//Editar ruta en modal
function agregarDestino2() {
    if ($('#txtDestino2').val() != '') {
        var cliente = $('#txtCliente').val()
        var destino = $('#destino2 option').filter(function () {
            return this.value == $('#txtDestino2').val();
        }).data('xyz');
        var destinoId = destino.substring(0, destino.indexOf("-"));
        var destinoNombre = $('#txtDestino2').val();
        var destinoRuta = destino.substring(destino.indexOf("-") + 1, destino.length);
        ruta.tblSolicitudDetalleRuta.push({
            id: 0,
            tblUbicacionesId: destinoId,
            tblEstatusId: 0,
            orden: 0,
            destino: destinoNombre,
            ruta: destinoRuta
        });
        $('#TimeLineContainerII2').html('');
        for (let i = 0; i < ruta.tblSolicitudDetalleRuta.length; i++) {
            ruta.tblSolicitudDetalleRuta[i].orden = i + 1;
            if (i % 2 != 0) {
                $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
            else {
                $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
        }
        $('#txtDestino2').val('');
    }
    else {
        AlertError('Agrega un destino');
    }
}
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
                $('#TimeLineContainerII2').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
            }
            else {
                $('#TimeLineContainerII2').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].ruta + '</p> ' + '<p style="color: white;">' + cliente + '</p>' + '<label onclick="borrarDestino2(' + i + ')">Eliminar <i style="" class="fa-solid fa-circle-trash"></i></label></div></div>')
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


