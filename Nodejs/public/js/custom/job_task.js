var ViewJob = ViewJob || {},
    reject = reject || {};

jQuery(function ($) {
    (function (d, interaction, table) {
        var $table = $(table),
            actionsTemplateSource = $("#action_bar_buttons").html(),
            actionsTemplate = Handlebars.compile(actionsTemplateSource),

            pressed_default = function (ID) {
                var button_a = $("#action_viewtask-" + ID, $table);
                button_a.addClass("disabled").removeAttr("onclick");
            },

            booleanJax = function (ID, action_taken) {
                $.post(ajaxurl, {
                    action: "cp_response_action",
                    id: ID,
                    action_entry: action_taken
                },function (res) {
                    if (res.result == "success") {
                        console.log(res.timestamp);
                    } else console.log(res);
                }, "json").fail(function () {
                    console.log("error");
                });
            }
        ViewJob = function (ID) {
           // booleanJax(ID, "approve");
            pressed_default(ID);
        }
        reject = function (ID) {
          //  booleanJax(ID, "reject");
            pressed_default(ID);
        }
        $table.dataTable({
            processing: true,
            ajax: "http://onecallapp.imusictech.net/api/appaccess/get_my_jobs_progress/",
            columns: [
                {
                    class: "details-control",
                    orderable: false,
                    //"data": "lid",
                    //"defaultContent": actionsTemplate,
                    render: function (data, type, full, meta) {
                        return actionsTemplate(full);
                    }
                },
                { data: "post_id" },
                { data: "project_id" },
                /* { class: "details-schedule",
                 data: "",
                 "defaultContent": ""},*/
                { data: "status" }
            ]
        });
    }(document, "click tap touch", "#table_job_task"));
});