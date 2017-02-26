//Inicia cuando el documento esta listo
//$(document).ready(function () {
//    GetAlumno()
//});
function GetAlumno(id_param) {
    $.ajax({
        url: urlGetData,
        type: 'GET',
        dataType: "json",
        data: { id: id_param },
        success: function (Data) {
            $('#id').text(Data.response.id);
            $('#txtnombre').val(Data.response.Nombre);
        },
        error: function (data) {
            //CrearAlerta("#AlertIniciaSesion", "¡Acción Fallida!", "Acción no efectuada. Intente de nuevo, si el problema persiste contacte al Administrador del sistema.", "alert alert-danger");
        },
        complete: function () {
            //  DesbloquearForm("#frmLogin");
        }
    });
}