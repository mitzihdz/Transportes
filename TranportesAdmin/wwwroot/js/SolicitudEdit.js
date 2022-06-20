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
var z = 0;
var posRuta = 0;
var solicitud2 = {};
var tblSolicitudDetalles2 = [{}];
var tblSolicitudDetalleRuta2 = [{}];
$(document).ready(function () {
    path = (window.location.pathname).substring(18, (window.location.pathname).length);
    console.log('path', path);
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Solicitud/Select?id=" + path,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log('data->', data);
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

//$("#cargar").click(function () {
//    $("#txtCliente").val(solicitud.tblClientesId);
//});

function cargarDatos(solicitudData) {
    solicitud2 = solicitudData;
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
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta(" + i + ")'><i class='fa-solid fa-truck'></i></a >" +
                "<td class='text-center'><a class='nav_link' href='#'><i style='color: indianred;' class='fa-solid fa-trash'></i></a >" +
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
                "<td class='text-center'><a class='nav_link' href='#' onclick='abrirModalRuta("+ i + ")'><i class='fa-solid fa-truck'></i></a >" +
                "<td class='text-center'><a class='nav_link' href='#'><i style='color: indianred;' class='fa-solid fa-trash'></i></a >" +
                "</tr>";
            $('#otroOperador > tbody').append(rows);
        }
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
                    if (v.id == tblSolicitudDetalles2[i].tblOperadorId) {
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
                //console.log('Data tractos ->', data.respuesta);
                $('#tractor2').html('');
                $.each(clientesData, function (k, v) {
                    $('#tractor2').append('<option data-xyz="' + v.id + '" value="' + v.idTracto + '"></option>');
                    if (v.id == tblSolicitudDetalles2[i].tblTractoId) {
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
                //console.log('Data cajas ->', data.respuesta);
                $('#caja2').html('');
                $.each(clientesData, function (k, v) {
                    $('#caja2').append('<option data-xyz="' + v.id + '" value="' + v.noEconomico + '"></option>');
                    if (v.id == tblSolicitudDetalles2[i].tblCajasId) {
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
                //console.log('Data destinos ->', data.respuesta);
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
                if (v.id == solicitud2.tblClientesId) {
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
            //console.log('Data destinos ->', data.respuesta);
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
}

function abrirModalRuta(posicion) {
    $('#TimeLineContainerII2').html('');
    posRuta = posicion;
    console.log('posicion',posicion);
    $("#verRuta").modal('show');
    //Mostrar la ruta
    z = tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta.length;
    var cliente = $('#txtCliente').val();
    for (let i = 0; i < tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta.length; i++) {
        if (i % 2 != 0) {
            $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino2(' + i + ')">Eliminar <i style="color: indianred;" class="fa-solid fa-trash"></i></label></div></div>')
        }
        else {
            $('#TimeLineContainerII2').append('<div id="destinoIdModal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + tblSolicitudDetalles2[posicion].tblSolicitudDetalleRuta[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino2(' + i + ')">Eliminar <i style="color: indianred;" class="fa-solid fa-trash"></i></label></div></div>')
        }
    }
    console.log('abriendo modal', z);
}
$('#agregarDestino2').click(function () {
    //console.log('posRuta', posRuta);
    //console.log('dataSol ->', tblSolicitudDetalles2[posRuta].tblSolicitudDetalleRuta);
    tblSolicitudDetalleRuta2 = tblSolicitudDetalles2[posRuta].tblSolicitudDetalleRuta;
    //for (let i = 0; 1 < tblSolicitudDetalleRuta2.length; i++) {
    //    tblSolicitudDetalleRuta[i].id = 0;
    //    tblSolicitudDetalleRuta[i].tblUbicacionesId = tblSolicitudDetalleRuta2[i].tblUbicacionesId;
    //    tblSolicitudDetalleRuta[i].orden = i + 1;
    //    tblSolicitudDetalleRuta[i].destino = tblSolicitudDetalleRuta2[i].tblUbicaciones.planta;

    //}
    console.log('Ruta Enviar', tblSolicitudDetalleRuta2.length);
    if ($('#txtdestino2').val() != '') {
        var cliente = $('#txtcliente').val()
        var destinoid = $('#destino2 option').filter(function () {
            return this.value == $('#txtdestino2').val();
        }).data('xyz');
        var destinonombre = $('#txtdestino2').val();
        tblSolicitudDetalleRuta2.push({
            id: 0,
            tblubicacionesid: destinoid,
            tblestatusid: 0,
            destino: destinonombre
        });
        console.log('Ruta Enviar Push', tblSolicitudDetalleRuta2.length);
        $('#timelinecontainerii2').html('');
        for (let i = 0; i < tblSolicitudDetalleRuta2.length; i++) {
            tblSolicitudDetalleRuta2.orden = i + 1;
            if (i % 2 != 0) {
                $('#timelinecontainerii2').append('<div id="destinoidmodal' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + solicitud.tblSolicitudDetalles[posRuta].tblsolicituddetalleruta[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrardestino2(' + i + ')">eliminar <i style="color: indianred;" class="fa-solid fa-trash"></i></label></div></div>')
            }
            else {
                $('#timelinecontainerii2').append('<div id="destinoidmodal' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + solicitud.tblSolicitudDetalles[posRuta].tblsolicituddetalleruta[i].tblUbicaciones.planta + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrardestino2(' + i + ')">eliminar <i style="color: indianred;" class="fa-solid fa-trash"></i></label></div></div>')
            }
        }
        $('#txtdestino2').val('');
    }
    else {
        alerterror('agrega un destino');
    }
});
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
                $('#TimeLineContainerII2').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-right"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino(' + i + ')">Eliminar <i style="color: indianred;" class="fa-solid fa-trash"></i></label></div></div>')
            }
            else {
                $('#TimeLineContainerII2').append('<div id="destinoId' + i + '" class="timeline-block timeline-block-left"><div class="marker"></div><div class="timeline-content"><h3 style="color: white;">' + ruta.tblSolicitudDetalleRuta[i].destino + '</h3><p style="color: white;">' + cliente + '</p><label onclick="borrarDestino(' + i + ')">Eliminar <i style="color: indianred;" class="fa-solid fa-trash"></i></label></div></div>')
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