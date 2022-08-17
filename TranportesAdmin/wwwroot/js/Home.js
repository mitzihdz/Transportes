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


    pie_initial();
    bar_initial();
    line_initial();
    
    //var myChart1 = new Chart(document.getElementById('myChart'), config);
    //bar_initial();
    //var myChart2 = new Chart(document.getElementById('myChart2'), config);
    //line_initial();
    //var myChart3 = new Chart(document.getElementById('myChart3'), config);

});
/////////////////////////////////////////////////////////////////
function pie_initial() {
    //$.ajax({
    //    type: "GET",
    //    url: server_key + "api/Graph/SelectSolicitudesCliente",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data, textStatus, jqXHR) {
    //        console.log('Data pie ->', data.respuesta);
    //        data = {
    //            labels: data.respuesta.labels,
    //            datasets: [{
                 
    //                data: data.respuesta.data,
    //                backgroundColor:desordenar(colors_),
    //                hoverOffset: 4
    //            }]
    //        };
    //        config = {
    //            type: 'pie',
    //            data: data,
    //            options: {
    //                plugins: {
    //                    legend: {
    //                        legend: false,
    //                        display: false

    //                    },
    //                    title: {
    //                        display: true,
    //                        text: 'NUMERO DE SOLICITUDES POR CLIENTE'
    //                    }
    //                }
    //            }
    //        };
    //        var myChart1 = new Chart(document.getElementById('myChart'), config);
    //    },
    //    failure: function (data) {
    //        AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
    //    },
    //    error: function (data) {
    //        AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
    //    }
    //});
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
            var myChart2 = new Chart(document.getElementById('myChart'), config);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        }
    });
}

/////////////////////////////////////////////////////////////////

function bar_initial() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Graph/SelectSolicitudesClienteRutas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log('Data barras ->', data.respuesta);
            data = {
                labels: data.respuesta.labels,
                datasets: [{
                    label: 'My First Dataset',
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
                            text: 'NUMERO DE RUTAS POR SOLICITUD / CLIENTE'
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
/////////////////////////////////////////////////////////////////

function line_initial() {
    $.ajax({
        type: "GET",
        url: server_key + "api/Graph/SelectProveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log('Data line ->', data.respuesta);
            data = {
                labels: data.respuesta.labels,
                datasets: [{
                  
                    data: data.respuesta.data,
                    fill: false,
                    backgroundColor: desordenar(colors_),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    
                }]
            };
            config = {
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y',
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        bar: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            legend: false,
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'CAJAS POR PROVEEDORES'
                        }
                    }
                },
            };
            actions = [
                {
                    name: 'Randomize',
                    handler(chart) {
                        chart.data.datasets.forEach(dataset => {
                            dataset.data = Utils.numbers({ count: chart.data.labels.length, min: -100, max: 100 });
                        });
                        chart.update();
                    }
                },
                {
                    name: 'Add Dataset',
                    handler(chart) {
                        const data = chart.data;
                        const dsColor = Utils.namedColor(chart.data.datasets.length);
                        const newDataset = {
                            label: 'Dataset ' + (data.datasets.length + 1),
                            backgroundColor: Utils.transparentize(dsColor, 0.5),
                            borderColor: dsColor,
                            borderWidth: 1,
                            data: Utils.numbers({ count: data.labels.length, min: -100, max: 100 }),
                        };
                        chart.data.datasets.push(newDataset);
                        chart.update();
                    }
                },
                {
                    name: 'Add Data',
                    handler(chart) {
                        const data = chart.data;
                        if (data.datasets.length > 0) {
                            data.labels = Utils.months({ count: data.labels.length + 1 });

                            for (let index = 0; index < data.datasets.length; ++index) {
                                data.datasets[index].data.push(Utils.rand(-100, 100));
                            }

                            chart.update();
                        }
                    }
                },
                {
                    name: 'Remove Dataset',
                    handler(chart) {
                        chart.data.datasets.pop();
                        chart.update();
                    }
                },
                {
                    name: 'Remove Data',
                    handler(chart) {
                        chart.data.labels.splice(-1, 1); // remove the label first

                        chart.data.datasets.forEach(dataset => {
                            dataset.data.pop();
                        });

                        chart.update();
                    }
                }
            ];
            var myChart3 = new Chart(document.getElementById('myChart3'), config);
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

 







