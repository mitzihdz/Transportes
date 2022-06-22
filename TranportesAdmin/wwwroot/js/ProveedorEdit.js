$(document).ready(function () {

    $("form").attr('autocomplete', 'off');

    var id = $("#IdProveedor").val();
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Proveedor/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var proveedorData = data.respuesta;
            $('#txtClave').val(proveedorData[0].clave);
            $('#txtNombre').val(proveedorData[0].nombreOrazonSocial);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar el proveedor. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar el proveedor. Contacte al administrador.');
        }
    });

    GetGrid();

    var valProveedor = $('#fmProveedor').validate({
        rules: {
            Clave: {
                required: true
            },
            Nombre: {
                required: true
            }
        },
        messages: {
            Clave: "La Clave del proveedor es requerida",
            Nombre: "El Nombre o Razón Social es requerido"
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

    //Api
    $("#BtnEditaProveedor").click(function () {
        if (valProveedor.form()) {
            var _id = $('#IdProveedor').val();
            var _clave = $('#txtClave').val();
            var _nombreOrazonSocial = $('#txtNombre').val();

            $.ajax({
                url: "https://localhost:7259/api/Proveedor/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    nombreOrazonSocial: _nombreOrazonSocial,
                    clave: _clave
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function (result) {
                    AlertSuccessOk('El proveedor se actualizó correctamente.', '/Proveedor');
                    
                    //$('#cardDomicilio').removeClass('collapsed-card');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar al proveedor. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar al proveedor. Contacte al administrador.');
                }
            });

        }

    });

    //Cajas
    var valCaja = $('#fmNuevaCaja').validate({
        rules: {
            NoEconomico: {
                required: true,
                digits: true
            },
            Placas: {
                required: true
            },
            Dimension: {
                required: true
            },
            Marca: {
                required: true
            },
            Anio: {
                required: true,
                digits: true,
                maxlength: 4
            }   
        },
        messages: {
            NoEconomico:
            {
                required: "El número económico es requerido",
                digits: "Formato numérico"
            },
            Placas: "Las placas son requeridas",
            Dimension: "La dimension es requerida",
            Marca: "La marca es requerida",
            Anio:
            {
                required: "El año es requerido",
                digits: "Formato numérico",
                maxlength: "Máximo 4 digitos"
            }
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

    $("#BtnNuevaCaja").click(function () {
        if (valCaja.form()) {

            var _noEconomico = $('#txtNoEconomico').val();
            var _placas = $('#txtPlacas').val();
            var _dimension = $('#txtDimension').val();
            var _marcaId = $('#ddlMarca').val();
            var _anio = $('#txtAnio').val();
            var _proveedorId = $('#IdProveedor').val();

            $.ajax({
                url: "https://localhost:7259/api/Caja/Add",
                type: "POST",
                data: JSON.stringify({
                    id: 0,
                    noEconomico: _noEconomico,
                    placas: _placas,
                    anioModelo: _anio,
                    tblMarcaCajasId: _marcaId,
                    dimensiones: _dimension,
                    tblProveedoresCajas: [
                        {
                            id: 0,
                            tblProveedoresId: _proveedorId,
                            tblCajasId: 0
                        }
                    ]
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#tblCajas").DataTable().destroy();
                    GetGrid();
                    AlertSuccess('La caja se registró correctamente.');
                    $('#modalNewCaja').modal('toggle');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al guardar la caja. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al guardar la caja. Contacte al administrador.');
                }
            });
        }
    });



    var valEditCaja = $('#fmEditCaja').validate({
        rules: {
            NoEconomicoEdit: {
                required: true,
                digits: true
            },
            PlacasEdit: {
                required: true
            },
            DimensionEdit: {
                required: true
            },
            MarcaEdit: {
                required: true
            },
            AnioEdit: {
                required: true,
                digits: true,
                maxlength: 4
            }
        },
        messages: {
            NoEconomicoEdit:
            {
                required: "El número económico es requerido",
                digits: "Formato numérico"
            },
            PlacasEdit: "Las placas son requeridas",
            DimensionEdit: "La dimension es requerida",
            MarcaEdit: "La marca es requerida",
            AnioEdit:
            {
                required: "El año es requerido",
                digits: "Formato numérico",
                maxlength: "Máximo 4 digitos"
            }
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

    $("#BtnEditaCaja").click(function () {
        if (valEditCaja.form()) {

            var _id = $('#IdCaja').val();
            var _noEconomico = $('#txtNoEconomicoEdit').val();
            var _placas = $('#txtPlacasEdit').val();
            var _dimension = $('#txtDimensionEdit').val();
            var _marcaId = $('#ddlMarcaEdit').val();
            var _anio = $('#txtAnioEdit').val();

            $.ajax({
                url: "https://localhost:7259/api/Caja/Update",
                type: "POST",
                data: JSON.stringify({
                    id: _id,
                    noEconomico: _noEconomico,
                    placas: _placas,
                    anioModelo: _anio,
                    tblMarcaCajasId: _marcaId,
                    dimensiones: _dimension
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $("#tblCajas").DataTable().destroy();
                    GetGrid();
                    AlertSuccess('La caja se actualizó correctamente.');
                    $('#modalEditCaja').modal('toggle');
                },
                failure: function (data) {
                    AlertError('Ocurrio un error al actualizar la caja. Contacte al administrador.');
                },
                error: function (data) {
                    AlertError('Ocurrio un error al actualizar la caja. Contacte al administrador.');
                }
            });
        }
    });



});

function OpenNew() {
    $('#modalNewCaja').modal('show');
    $('#txtNoEconomico').val('');
    $('#txtPlacas').val('');
    $('#txtDimension').val('');
    $('#ddlMarca').val(0);
    $('#txtAnio').val('');
    GetMarcas();
}

function OpenEdit(id) {
    $('#modalEditCaja').modal('show');
    GetMarcas();
    $('#IdCaja').val(id);
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Caja/Select?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var cajaData = data.respuesta;
            $('#txtNoEconomicoEdit').val(cajaData[0].noEconomico);
            $('#txtPlacasEdit').val(cajaData[0].placas);
            $('#txtDimensionEdit').val(cajaData[0].dimensiones);
            $('#ddlMarcaEdit').val(cajaData[0].tblMarcaCajasId);
            $('#txtAnioEdit').val(cajaData[0].anioModelo);
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la caja. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la caja. Contacte al administrador.');
        }
    });
}

function GetMarcas() {
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Marca/Select",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var marcaData = data.respuesta;
            
            $('#ddlMarca').html('');
            $('#ddlMarca').append('<option value="">SELECCIONE</option>');
            $.each(marcaData, function (k, v) {
                $('#ddlMarca').append('<option value="' + v.id + '">' + v.marca + '</option>');
            });

            $('#ddlMarcaEdit').html('');
            $('#ddlMarcaEdit').append('<option value="">SELECCIONE</option>');
            $.each(marcaData, function (k, v) {
                $('#ddlMarcaEdit').append('<option value="' + v.id + '">' + v.marca + '</option>');
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


function GetGrid() {
    var idProveedor = $('#IdProveedor').val();
    $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/ProveedorCaja/Select?id=" + idProveedor,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblCajas > tbody').empty();
            $.each(data.respuesta, function (i, item) {
                var rows =
                    "<tr>" +
                    "<td>" + item.tblCajas.noEconomico + "</td>" +
                    "<td>" + item.tblCajas.placas + "</td>" +
                    "<td>" + item.tblCajas.tblMarcaCajas.marca + "</td>" +
                    "<td>" + item.tblCajas.anioModelo + "</td>" +
                    "<td>" + item.tblCajas.dimensiones + "</td>" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='OpenEdit(" + item.tblCajas.id + ")'><i class='nav-icon fas fa-edit'></i></a >" +
                    "<td class='text-center'><a class='nav_link' href='#' onclick='Delete(" + item.tblCajas.id + ")'><i  class='fa-solid fa-circle-trash'></i></a >" +
                    "</tr>";
                $('#tblCajas > tbody').append(rows);
            });

            $("#tblCajas").DataTable({
                "destroy": true,
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tblCajas_wrapper .col-md-6:eq(0)');
            //$('#tblCajas')[0].reset();
        },
        failure: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al consultar la información. Contacte al administrador.');
        }
    });
}

function Delete(id) {
    $.ajax({
        url: "https://localhost:7259/api/Caja/Delete/" + id,
        type: "DELETE",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (result) {
            $("#tblCajas").DataTable().destroy();
            GetGrid();
            AlertSuccess('La caja se eliminó correctamente.');
        },
        failure: function (data) {
            AlertError('Ocurrio un error al eliminar la caja. Contacte al administrador.');
        },
        error: function (data) {
            AlertError('Ocurrio un error al eliminar la caja. Contacte al administrador.');
        }
    });
}





