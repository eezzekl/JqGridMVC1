$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';

//Inicia cuando el documento esta listo
$(document).ready(function () {
    createGrid()
});

function exito(response) {
    createGrid(response);
}

function error(response) {
    alert('error');
}
function fallo(response) {
    alert('fallo');
}


function getList() {
    $.ajax({
        url: urlGetData,
        type: 'POST',
        dataType: "json",
        success: exito,
        error: error,
        failure: fallo
    });
}

///Crea el grid
function createGrid() {
    $("#jqGrid").jqGrid({
        url: urlGetData,
        // we set the changes to be made at client side using predefined word clientArray
        mtype: 'Get',
        datatype: "json",
        colNames: ['Id', 'Nombre', 'Apellido', 'Sexo', 'Fecha de Nacimiento', 'Optios'],
        colModel: [
            { key: true, name: 'id', index: 'id', editable: false },
            { key: false, name: 'Nombre', index: 'Nombre', editable: true },
            { key: false, name: 'Apellido', index: 'Apellido', editable: true },
            { key: false, name: 'Sexo', index: 'Sexo', width: 150, editable: true },
            { key: false, name: 'FechaNacimiento', index: 'FechaNacimiento', width: 150, editable: true },
            {
                name: "act", formatter: "actions", formatoptions: { editformbutton: true },
                width: 60, align: "center", fixed: true, hidedlg: true, resizable: false,
                sortable: false, search: false, editable: false, viewable: false
            }
        ],
        pager: "#jqGridPager",
        rowNum: 10,
        rowList: [10, 20, 30, 40],
        height: '100%',
        viewrecords: true,
        caption: 'Alumno',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        autowidth: true,
        multiselect: false,
        gridComplete: function () {
            var $self = $(this), rows = this.rows, i, iAction, tr,
                colModel = $self.jqGrid("getGridParam", "colModel"),
                idPrefix = $self.jqGrid("getGridParam", "idPrefix"),
                newOnClick = function (e) {
                    var rowid = $(this).closest(".jqgrow").attr("id");
                    e.stopPropagation();

                    // an example of redirection
                    window.location.href = "Home/Details/" +
                        encodeURIComponent($.jgrid.stripPref(idPrefix, rowid));
                };

            // find the index of the column with formatter: "actions"
            for (i = 0; i < colModel.length; i++) {
                if (colModel[i].formatter === "actions") {
                    iAction = i;
                    break;
                }
            }
            if (iAction === undefined) {
                return;
            }
            for (i = 0; i < rows.length; i++) {
                tr = rows[i];
                if ($(tr).hasClass("jqgrow")) {
                    $(tr.cells[iAction]).find(".ui-inline-edit")
                        .click(newOnClick)     // register new click event handler
                        .prop("onclick", null); // remove standard behavior of Edit button
                }
            }
        }
    });

    $('#jqGrid').navGrid('#jqGridPager',
        // the buttons to appear on the toolbar of the grid
        { edit: true, add: false, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
        // options for the Edit Dialog
        {
            zIndex: 100,
            url: Edit,
            closeOnEscape: true,
            closeAfterEdit: true,
            recreateForm: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            },
            errorTextFormat: function (data) {
                alert('Error Edit: ' + data.responseText);
                return 'Error: ' + data.responseText;
            }
        },
        // options for the Add Dialog
        {
            zIndex: 100,
            url: Create,
            closeOnEscape: true,
            closeAfterAdd: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            },
            errorTextFormat: function (data) {
                alert('Error Add: ' + data.responseText);
                return 'Error: ' + data.responseText;
            }
        },
        // options for the Delete Dailog
        {
            zIndex: 100,
            url: Delete,
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            msg: "Are you sure you want to delete this task?",
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            },
            errorTextFormat: function (data) {
                alert('Error Deleted: ' + data.responseText);
                return 'Error Deleted: ' + data.responseText;
            }
        });
}