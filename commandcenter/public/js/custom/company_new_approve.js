var approve = approve || {},
    reject = reject || {},
    viewdoc = viewdoc || {};

jQuery(function ($) {
    (function (d, interaction, table) {
        var $table = $(table),
            actionsTemplateSource = $("#action_bar_buttons").html(),
            actionsTemplate = Handlebars.compile(actionsTemplateSource),
            templater_doc = $("#view_pdf_company_br").html(),
            docTemplate = Handlebars.compile(templater_doc),
            uploadDir = "http://onecallapp.imusictech.net/wp-content/uploads",
            pressed_default = function (ID) {
                var button_a = $("#action_approve-" + ID, $table);
                var button_i = $("#action_ignore-" + ID, $table);
                button_a.addClass("disabled").removeAttr("onclick");
                button_i.addClass("disabled").removeAttr("onclick");
            },
            booleanJax = function (ID, action_taken) {
                $.post(ajaxurl, {
                    action: "action_taken_company",
                    id: ID,
                    action_entry: action_taken
                },function (res) {
                    if (res.result == "success") {
                        console.log(res.timestamp);
                        alert(res.timestamp);
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
        viewdoc = function (ID) {
            var name_row = "#nm" + ID, t = $(name_row), row = $table.dataTable().api().row(t), json = row.data(), path = json.brpath;
            if (path != '#' && path != null) {
                window.open(uploadDir + path);
            }
            console.log(json);
        };
        $table.dataTable({
            processing: true,
            ajax: "http://onecallapp.imusictech.net/api/staffcontrol/get_pending_company_list_V2/",
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
                { class: "details-doc",
                    rderable: false,
                    render: function (data, type, full, meta) {
                        return docTemplate(full);
                    }
                },
                { data: "name" },
                { data: "cname" },
                { data: "cemail" },
                { data: "repc" },
                { data: "remark" },

            ],
            fnRowCallback: function (nRow, full, iDisplayIndex, iDisplayIndexFull) {
                var $row = $(nRow)

                //  console.log(d.template_used_data);
                //  console.log("fnRowCallback attr");
                $row.attr("id", 'nm' + full.lid);

                return nRow;
            }
        });
    }(document, "click tap touch", "#table_incoming_companoes"));
});