var data;
var config;
var labelsPie;
var dataPie;
var colors_ = ['rgba(250, 235, 215,0.5)',
    'rgba(0, 255, 255,0.5)',
    'rgba(127, 255, 212,0.5)',
    'rgba(0, 0, 255,0.5)',
    'rgba(165, 42, 42,0.5)',
    'rgba(222, 184, 135,0.5)',
    'rgba(127, 255, 0,0.5)',
    'rgba(210, 105, 30,0.5)',
    'rgba(100, 149, 237,0.5)',
    'rgba(220, 20, 60,0.5)',
    'rgba(0, 255, 255,0.5)',
    'rgba(169, 169, 169,0.5)',
    'rgba(255, 140, 0,0.5)',
    'rgba(153, 50, 204,0.5)',
    'rgba(0, 206, 209,0.5)',
    'rgba(255, 20, 147,0.5)',
    'rgba(105, 105, 105,0.5)',
    'rgba(178, 34, 34,0.5)',
    'rgba(255, 250, 240,0.5)',
    'rgba(34, 139, 34,0.5)',
    'rgba(255, 0, 255,0.5)',
    'rgba(255, 215, 0,0.5)',
    'rgba(128, 128, 128,0.5)',
    'rgba(173, 255, 47,0.5)',
    'rgba(205, 92, 92,0.5)',
    'rgba(240, 230, 140,0.5)',
    'rgba(124, 252, 0,0.5)',
    'rgba(173, 216, 230,0.5)',
    'rgba(240, 128, 128,0.5)',
    'rgba(255, 160, 122,0.5)',
    'rgba(32, 178, 170,0.5)',
    'rgba(135, 206, 250,0.5)',
    'rgba(119, 136, 153,0.5)',
    'rgba(0, 255, 0,0.5)',
    'rgba(255, 0, 255,0.5)',
    'rgba(128, 0, 0,0.5)',
    'rgba(102, 205, 170,0.5)',
    'rgba(0, 0, 205,0.5)',
    'rgba(186, 85, 211,0.5)',
    'rgba(72, 209, 204,0.5)',
    'rgba(199, 21, 133,0.5)',
    'rgba(255, 165, 0,0.5)',
    'rgba(255, 69, 0,0.5)',
    'rgba(218, 112, 214,0.5)',
    'rgba(152, 251, 152,0.5)',
    'rgba(219, 112, 147,0.5)',
    'rgba(255, 218, 185,0.5)',
    'rgba(205, 133, 63,0.5)',
    'rgba(221, 160, 221,0.5)',
    'rgba(176, 224, 230,0.5)',
    'rgba(128, 0, 128,0.5)',
    'rgba(255, 0, 0,0.5)',
    'rgba(188, 143, 143,0.5)',
    'rgba(65, 105, 225,0.5)',
    'rgba(139, 69, 19,0.5)',
    'rgba(250, 128, 114,0.5)',
    'rgba(244, 164, 96,0.5)',
    'rgba(46, 139, 87,0.5)',
    'rgba(160, 82, 45,0.5)',
    'rgba(135, 206, 235,0.5)',
    'rgba(0, 255, 127,0.5)',
    'rgba(70, 130, 180,0.5)',
    'rgba(210, 180, 140,0.5)',
    'rgba(216, 191, 216,0.5)',
    'rgba(255, 99, 71,0.5)',
    'rgba(64, 224, 208,0.5)',
    'rgba(238, 130, 238,0.5)',
    'rgba(255, 255, 0,0.5)'
]
$(document).ready(function () {
    GetGrid();
    bar_initial();

});
function bar_initial() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Graph/SelectReporteRutas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log('Data barras ->', data.respuesta);
            data = {
                labels: data.respuesta.labels,
                datasets: [{
                    label: 'CANTIDAD',
                    data: data.respuesta.data,
                    backgroundColor: desordenar(colors_),
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            };
            config = {
                type: 'bar',
                data: data,
                options: {
                    plugins: {
                        legend: {
                            legend: false,
                            display: false

                        },
                        title: {
                            display: true,
                            text: 'ESTATUS DE LAS RUTAS'
                        }
                    },
                    scales: {
                        y: {

                            beginAtZero: true
                        }
                    }
                },
            };
            var myChart2 = new Chart(document.getElementById('myChart2'), config);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        }
    });
}
function desordenar(unArray) {
    var t = unArray.sort(function (a, b) { return (Math.random() - 0.5) });
    return [...t];
}
function GetGrid() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Reporte/ReporteEstatusRutas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblReportes > tbody').empty();
            $.each(data.respuesta, function (i, item) {

                var rowRuta = "<ul>";
                $.each(item.tblSolicitudDetalleRuta, function (i, item) {
                    rowRuta = rowRuta + "<li>" + item.tblUbicaciones.planta + "</li>";
                });
                rowRuta = rowRuta + "</ul >";

                if (item.tblEstatusRuta.estatus == "Cargado") {
                    var rows =
                        "<tr>" +
                        "<td style='color: #49CC90'>" + item.numeroViaje + "</td>" +
                        "<td style='color: #49CC90'>" + item.tblSolicitud.ordenServicio + "</td>" +
                        "<td style='color: #49CC90'>" + item.tblSolicitud.tblClientes.nombreCorto + "</td>" +
                        "<td style='color: #49CC90'>" + item.tblOperador.apellidoPaterno + " " + item.tblOperador.apellidoMaterno + " " + item.tblOperador.nombre + "</td>" +
                        "<td style='color: #49CC90'>" + item.tblTracto.noEconomico + "</td>" +
                        "<td style='color: #49CC90'>" + item.tblCajas.noEconomico + "</td>" +
                        "<td style='color: #49CC90'>" + item.tblEstatusRuta.estatus + "</td>" +
                        "<td style='color: #49CC90'>" + rowRuta + "</td>" +
                        "</tr>";
                    $('#tblReportes > tbody').append(rows);
                }
                else {
                    var rows =
                        "<tr>" +
                        "<td>" + item.numeroViaje + "</td>" +
                        "<td>" + item.tblSolicitud.ordenServicio + "</td>" +
                        "<td>" + item.tblSolicitud.tblClientes.nombreCorto + "</td>" +
                        "<td>" + item.tblOperador.apellidoPaterno + " " + item.tblOperador.apellidoMaterno + " " + item.tblOperador.nombre + "</td>" +
                        "<td>" + item.tblTracto.noEconomico + "</td>" +
                        "<td>" + item.tblCajas.noEconomico + "</td>" +
                        "<td>" + item.tblEstatusRuta.estatus + "</td>" +
                        "<td>" + rowRuta + "</td>" +
                        "</tr>";
                    $('#tblReportes > tbody').append(rows);
                }
            });
            console.log(data);

            $("#tblReportes").DataTable({
                "destroy": true,
                "pageLength": 60,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblReportes_wrapper .col-md-6:eq(0)');
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}