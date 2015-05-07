var approve = approve || {},
    reject = reject || {};

jQuery(function ($) {
    (function (d, interaction, table) {
        var $table = $(table),
            actionsTemplateSource = $("#action_bar_buttons").html(),
            actionsTemplate = Handlebars.compile(actionsTemplateSource),
            pressed_default = function (ID) {
                var button_a = $("#action_approve-" + ID, $table);
                var button_i = $("#action_ignore-" + ID, $table);
                button_a.addClass("disabled").removeAttr("onclick");
                button_i.addClass("disabled").removeAttr("onclick");
            },
            booleanJax = function (ID, action_taken) {
                $.post(ajaxurl, {
                    action: "action_taken_cr",
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
        approve = function (ID) {
            booleanJax(ID, "approve");
            pressed_default(ID);
        }
        reject = function (ID) {
            booleanJax(ID, "reject");
            pressed_default(ID);
        }
        $table.dataTable({
            processing: true,
            ajax: "http://onecallapp.imusictech.net/api/staffcontrol/get_pending_cr_indie/",
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
                { data: "person_name" },
                { data: "person_phone" },
                { data: "login_email" },
                { data: "company" }
            ]
        });


    }(document, "click tap touch", "#table_incoming_cr"));
});