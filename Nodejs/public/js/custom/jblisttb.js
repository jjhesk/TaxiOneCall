/**
 * Created by Hesk on 14年5月22日.
 */
var db_url = jb_tablesource.tableurl;
jQuery(function ($) {
    (function (d, interaction, dbsource) {
/*        var dbParser = new kendo.data.DataSource(
            {
                type: "json",
                transport: {
                    read: db_url
                },
                schema: {
                    data: "obtain"
                }
            }
        );*/
        console.log(db_url);
        $("#grid").kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: db_url
                },
                schema: {
                    data: "obtain"
                }
            },
            height: 500,
            sortable: true,
            reorderable: true,
            groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [
                {
                    field: "job_id",
                    title: "Job ID",
                    locked: true,
                    lockable: false,
                    width: 90
                },
                {
                    field: "meta_value",
                    title: "Location",
                    width: 200
                },
                {
                    field: "job_status",
                    title: "Status",
                    width: 100
                }

            ]
        });
    }(document, "click tap touch", db_url));
});