var data;
var config;
var labelsPie;
var dataPie;
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Graph/SelectSolicitudesCliente",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log('Data pie ->', data.respuesta.labels);
            labelsPie = data.respuesta.labels;
            dataPie = data.respuesta.data;
            pie_initial(labelsPie, dataPie);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        }
    });

    
    var myChart = new Chart(document.getElementById('myChart'), config);
    bar_initial();
    var myChart = new Chart(document.getElementById('myChart2'), config);
    line_initial();
    var myChart = new Chart(document.getElementById('myChart3'), config);

});
/////////////////////////////////////////////////////////////////
function pie_initial(labels, data) {
    

    data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: data,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    config = {
        type: 'pie',
        data: data,
    };
    

}

/////////////////////////////////////////////////////////////////

function bar_initial() {
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Graph/SelectSolicitudesClienteRutas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log('Data barras ->', data.respuesta);
            data = {
                labels: data.respuesta.labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: data.respuesta.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
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
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
            };
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
        url: "https://localhost:7259/api/Graph/SelectProveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log('Data line ->', data.respuesta);
            data = {
                labels: data.respuesta.labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: data.respuesta.data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };

            config = {
                type: 'line',
                data: data,
            };
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la lista de clientes. Contacte al administrador.');
        }
    });
}