var solicitud = {
    id: 0,
    tblClientesId: 0,
    tblEstatusId: 0,
    fechaSolicitud: 0,
    tblSolicitudRuta: [{
        id: 0,
        tblUbicacionesId: 0,
        orden: 0,
    }],
    tblSolicitudDetalles: []
}
var tblSolicitudDetalles = [{
    id: 0,
    tblTractoId: 0,
    tblCajasId: 0,
    tblOperadorId: 0
}];
var tblSolicitudRuta = [{
    id: 0,
    tblUbicacionesId: 0,
    orden: 0,
    destino: ''
}];
var valSolicitud;
var x = 0;
$(document).ready(function () {   
    path = (window.location.pathname).substr(-1);
    console.log('path', path);
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Solicitud/Select?id=" + path,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log('data->', data);
            solicitud = data.respuesta[0];
            console.log('solicitud', solicitud);
            var dia = solicitud.fechaSolicitud.substr(8, 2);
            var mes = solicitud.fechaSolicitud.substr(5, 2);
            var año = solicitud.fechaSolicitud.substr(0, 4);
            $("#txtFecha").attr("value", año + '-' + mes + '-' + dia);
            cargarDatos(solicitud);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
    
    
});

$("#cargar").click(function () {
    $("#txtCliente").val(solicitud.tblClientesId);
});

function cargarDatos(solicitud) {
    //Get Clientes
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Cliente/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var clientesData = data.respuesta;
            console.log('Data clientes ->', data.respuesta);
            $.each(clientesData, function (k, v) {
                $('#clientes').append('<option data-xyz="' + v.id + '" value="' + v.nombreCorto + '"></option>');
                if (v.id == solicitud.tblClientesId) {
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
}