var apply_new_job = apply_new_job || {},
    ignore_offer = ignore_offer || {},
    accept_appointment = accept_appointment || {};

jQuery(function ($) {
    (function (d, interaction, table) {
        apply_new_job = function (ID) {
            booleanJax(ID, "apply");
        }
        ignore_offer = function (ID) {
            booleanJax(ID, "reject");
        }
        accept_appointment = function (ID) {
            booleanJax(ID, "accept_offer");
        }
        Handlebars.registerHelper('tag', function () {
                var htmltext = "";
                var action_apply = '<input id="action_apply-' + this.job_id + '" type="button" class="button" value="Apply" onclick="apply_new_job(' + this.job_id + ');"/>';
                var action_accept = '<input id="action_accept-' + this.job_id + '" type="button" class="button" value="Accept" onclick="accept_appointment(' + this.job_id + ');"/>';
                var action_ignore = '<input id="action_ignore-' + this.job_id + '" type="button" class="button" value="Ignore" onclick="ignore_offer(' + this.job_id + ');"/>';

                if (this.jstatus == "CLOSE") {
                    htmltext = '<div class="tag job_status close">UNLISTED</div>';
                } else if (this.jstatus == "OFFERED") {
                    if (this.offer_you == "yes") {
                        htmltext = '<div class="tag job_status open">APPLY SUCCEEDED</div>';
                    } else if (this.offer_you == "no") {
                        htmltext = '<div class="tag job_status close">UNCHOSEN</div>';
                    } else
                        htmltext = '<div class="tag job_status close">OFFERED</div>';
                } else if (this.jstatus == "OPEN") {
                    if (this.cp_exp == "RES_NONE") {
                        htmltext = action_apply + '<div class="tag job_status open">OPEN</div>';
                    }
                    if (this.cp_exp == "RES_YES") {
                        htmltext = '<div class="tag job_status pending">APPLY PENDING</div>';
                    }
                } else if (this.jstatus == "APPOINT") {
                    if (this.cp_exp == "RES_NONE") {
                        htmltext = action_accept + action_ignore + '<div class="tag job_status open">APPOINTED</div>';
                    }
                    if (this.cp_exp == "RES_YES") {
                        htmltext = '<div class="tag job_status pending">APPLY PENDING</div>';
                    }
                    if (this.cp_exp == "RES_NO") {
                        htmltext = '<div class="tag job_status close">DENIED</div>';
                    }
                }
                return new Handlebars.SafeString(htmltext);
            }
        );

        var $table = $(table),
            tempAttr = "",
            actionsTemplateSource = $("#action_bar_buttons").html(),
            actionsTemplate = Handlebars.compile(actionsTemplateSource),
            post_action = function (ID, action_taken) {
                var button = $("#control-" + ID + " .button", $table);
                var tag = $("#control-" + ID + " .tag.job_status", $table);
                if (action_taken == "apply") {
                    class_manipulation(tag, "pending").html("APPLY PENDING");
                }
                if (action_taken == "reject") {
                    class_manipulation(tag, "close").html("DENIED");
                }
                if (action_taken == "accept_offer") {
                    class_manipulation(tag, "open").html("OFFER ACCEPTED");
                }
            },
            class_manipulation = function (el, keep) {
                el.removeClass("pending").removeClass("close").removeClass("open")
                el.addClass(keep);
                return el;
            },
            pre_action = function (ID, disabled) {
                var button = $("#control-" + ID + " .button", $table),
                    tempAttr = button.prop("onclick");
                if (disabled) {
                    button.addClass("disabled").removeAttr("onclick");
                    button.data("tempattr", tempAttr);
                } else {
                    tempAttr = button.data("tempattr");
                    button.removeClass("disabled").attr("onclick", tempAttr);
                }
            },
            booleanJax = function (ID, action_taken) {
                pre_action(ID, true);
                $.post(ajaxurl, {
                    action: "cp_response_action",
                    id: ID,
                    action_entry: action_taken
                },function (res) {
                    if (res.result == "success") {
                        console.log(res.timestamp);
                        post_action(ID, action_taken);
                    } else {
                        console.log(res);
                        pre_action(ID, false);
                    }
                }, "json").fail(function () {
                    console.log("error");
                });
            }

        $table.dataTable({
            processing: true,
            ajax: "http://onecallapp.imusictech.net/api/appaccess/get_my_jobs_market/",
            columns: [
                {
                    class: "details-control",
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return actionsTemplate(full);
                    }
                },
                { data: "job_id" },
                { data: "t" },
                /* { class: "details-schedule",
                 data: "",
                 "defaultContent": ""},*/
                { data: "loc" }
            ]
        });

        setInterval(function () {
            $table.fnReloadAjax();
        }, 30000);

    }(document, "click tap touch", "#table_job_application"));
});