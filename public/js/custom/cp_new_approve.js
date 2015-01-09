var approve = approve || {},
    reject = reject || {}, action_view_doc = action_view_doc || {};

jQuery(function ($) {
    (function (d, interaction, table) {

        var displaysitephoto = function (row) {
            var h = "", d = row, id = row.lid;
            if (d.hasOwnProperty('gf_cp_attachments')) {
                if (d.gf_cp_attachments != null) {
                    $.each(d.gf_cp_attachments, function (i, val) {
                        /*         var data = {
                         attachmentid: val,
                         pointer_url: d.gf_cp_attachments + "?attachment_id=" + val
                         };*/
                        h += '<input id="action_view_doc-' + id + '' + i + '" type="button" class="button" value="doc-' + i + '" onclick="action_view_doc(' + id + ',' + i + ');"/>';
                    });
                }
            }
            return h;
        };

        Handlebars.registerHelper('buttonlist', function () {
            return new Handlebars.SafeString(displaysitephoto(this));
        });

        var $table = $(table),
            actionsTemplateSource = $("#action_bar_buttons").html(),
            actionsTemplate = Handlebars.compile(actionsTemplateSource),
            uploadDir = "http://onecallapp.imusictech.net/wp-content/uploads",
            pressed_default = function (ID) {
                var button_a = $("#action_approve-" + ID, $table);
                var button_i = $("#action_ignore-" + ID, $table);
                button_a.addClass("disabled").removeAttr("onclick");
                button_i.addClass("disabled").removeAttr("onclick");
            },
            booleanJax = function (ID, action_taken) {
                $.post(ajaxurl, {
                    action: "action_taken_cp",
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
            console.log("approve");
        }
        reject = function (ID) {
            booleanJax(ID, "reject");
            pressed_default(ID);
            console.log("reject");
        }
        action_view_doc = function (ID, i) {
            var name_row = "#nm" + ID, t = $(name_row), row = $table.dataTable().api().row(t), json = row.data(), path = json.gf_cp_attachments[i];
            console.log(uploadDir);
            console.log(path);
            window.open(uploadDir + path);

        }


        $table.dataTable({
            processing: true,
            ajax: "http://onecallapp.imusictech.net/api/staffcontrol/get_pending_cp_pending_list/",
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
                { data: "login_name" },
                { data: "license" },
                { data: "login_email" },
                { data: "person_phone" }
            ],
            fnRowCallback: function (nRow, full, iDisplayIndex, iDisplayIndexFull) {
                var $row = $(nRow)

                //  console.log(d.template_used_data);
                //  console.log("fnRowCallback attr");
                $row.attr("id", 'nm' + full.lid);

                return nRow;
            }
        });


    }(document, "click tap touch", "#table_incoming_cp"));
});