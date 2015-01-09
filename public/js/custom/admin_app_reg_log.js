/**
 * Created by ryo on 14年9月2日.
 */
var approve = approve || {},
    reject = reject || {}, action_view_doc = action_view_doc || {};
var setting_ob = setting_ob || {};
jQuery(function ($) {
    (function (d, interaction, table) {
        var editor_module = null,
            $table = $(table),
            domain = window.location.origin + "/",
            actionsTemplate = Handlebars.compile($("#editor_details_template").html()),
            _reasons_of_rejections = {
                reason_1: "reason 1 - here",
                reason_2: "reason 2 - here",
                reason_3: "reason 3 - here",
                reason_4: "reason 4 - here"
            };

        var coin_history = new CoinHistory("coin_history");
        $("#coin_history_wrapper").addClass("hidden");

        if (setting_ob.role == "administrator") {
            var method = "app_reg_admin_processing", serverSideUse = true, sort_pending = "/?sort=pending";
        } else if (setting_ob.role == "developer") {
            var method = "app_reg_log", serverSideUse = false, sort_pending = "";
        } else console.log("wrong user - no permission to use this");
        var return_data = {
            successcb: function (that, data) {
                $table.fnReloadAjax(domain + "api/systemlog/" + method);
            }
        }
        var el_init = function ($el, cb_function, disable_this_button_on_press) {
            if ($el instanceof jQuery && typeof cb_function === "function") {
                if ($el.size() > 0) {
                    $el.off(interaction);
                    $el.on(interaction, function (e) {
                        e.preventDefault();
                        var d = $(this), id = d.attr("data-id");
                        if (disable_this_button_on_press) {
                            d.addClass("disabled").off(interaction);
                        }
                        cb_function(d, id);
                    });
                } else {
                    delete this;
                }
            } else {
                console.log("not in the right format");
                delete this;
            }
        }

        var coin_operation = function (that, $tr, id) {
            this.rowID = id;
            this.panel = $tr;
            this.bal = $("#balance_field");
            this.refresh = $("#refresh_bal");
            this.balance_field_deposit = $("#balance_field_deposit");
            this.button_coin_operation = $(".button.add_coin_balance", $tr);
            this.value_input = $("input.small-text.field", $tr);
            this.loader_start = new AJAXLoader(that, "normal", "app_reg");
            this.loader_coin = new AJAXLoader(this.button_coin_operation, "normal", "app_reg");
            this.button_coin_operation.on(interaction, {that: this}, this.update_coin);
            this.refresh.on(interaction, {that: this}, this.getBalance);
        }
        coin_operation.prototype = {
            getBalance: function (e) {
                var d = this;
                if (!(d instanceof coin_operation)) d = e.data.that;
                var enter = new JAXAPIsupport(domain + "api/cms/getappbalance", {
                    _id: d.rowID
                }, d, d.cb_bal);
                enter.add_loader(d.loader_start);
                enter.init();
            },
            update_coin: function (e) {
                var d = e.data.that,
                    current = Number(d.bal.html()),
                    field_coin = Number(d.value_input.val()) ,
                    next = field_coin + current,
                    zero_ch = field_coin != 0 && next < setting_ob.upper_beta_limit
                    ;
                if (zero_ch) {
                    var enter = new JAXAPIsupport(domain + "api/cms/cmsappbalanceoperate", {
                        _id: d.rowID, mt: d.value_input.val()
                    }, d, d.cb_value);
                    enter.add_loader(d.loader_coin);
                    enter.init();
                } else {
                    alert("please assign an number or the total needs to be more than " + setting_ob.upper_beta_limit + " in beta.");
                }
            },
            cb_value: function (that, data) {
                that.value_input.val("");
                that.getBalance();
            },
            cb_bal: function (that, data) {
                that.balance_field_deposit.html(data.deposit);
                that.bal.html(data.coin);
            }
        }
        var init_tiny_panel = function ($tr, data) {
            if (setting_ob.role == "developer") {

                new el_init($('.action_launch_application', $tr), function (that, id) {
                    var loader = new AJAXLoader(that, "normal", "app_reg");
                    that.addClass("disabled").off(interaction);
                    var enter = new JAXAPIsupport(domain + "api/cms/app_developer_launch_app", {
                        id: id, action: "finallyalive"
                    }, that, return_data.successcb);
                    enter.add_loader(loader);
                    enter.init();
                });

                new el_init($('.action_withdraw_application', $tr), function (that, id) {
                    var loader = new AJAXLoader(that, "normal", "app_reg");
                    var enter = new JAXAPIsupport(domain + "api/cms/remove_pending_app", {
                        id: id
                    }, that, return_data.successcb);
                    enter.add_loader(loader);
                    enter.init();
                }, true);

                new el_init($('.action_request_new_coin_limit', $tr), function (that, id) {
                    $(".new_coin_request_box").removeClass("hidden");
                }, true);
            }
            if (setting_ob.role == "administrator") {
                if (data.status == "pending") {
                    var slickoo = new SlickApplication();
                    var screenshots = data.image_urls.split(";_;");
                    slickoo.clear();
                    slickoo.append(screenshots);
                }

                new el_init($('.action_reject_confirm_application', $tr), function (that, id) {
                    var loader = new AJAXLoader(that, "normal", "app_reg");
                    var reason_choice = $("option:selected", $tr).val(),
                        written_reason = $("#otherreason", $tr).val();
                    if (!that.hasClass("disabled") && written_reason != "" && reason_choice != "") {
                        that.addClass("disabled").off(interaction);
                        MetaBoxSupport.InputControlSingle($(".action_approve_application"), true);
                        var enter = new JAXAPIsupport(domain + "api/cms/remove_pending_app", {
                            id: id,
                            written: written_reason,
                            choice: reason_choice
                        }, that, return_data.successcb);
                        enter.add_loader(loader);
                        enter.init();
                    } else {
                        console.log("withdraw failed.");
                        alert("Enter withdraw reason.");
                    }
                }, false);

                new el_init($('.action_approve_application', $tr), function (that, id) {
                    var loader = new AJAXLoader(that, "normal", "app_reg");
                    var enter = new JAXAPIsupport(domain + "api/cms/admin_approve_app", {
                        id: id, action: "approve", app_key: data.app_key
                    }, that, return_data.successcb);
                    enter.add_loader(loader);
                    enter.init();
                }, true);

                new el_init($('.action_reject_application', $tr), function (that, id) {
                    $(".action_approve_application").addClass("disabled").off(interaction);
                    $(".reason_display", that.parent().parent().parent()).show();
                    MetaBoxSupport.CreateSelection($("#commonreason", $tr), _reasons_of_rejections);
                }, true);

                new el_init($('.action_reveal_operation_panel', $tr), function (that, id) {
                    $(".action_reveal_operation_panel").addClass("disabled").off(interaction);
                    $(".new_coin_request_box", $tr).removeClass("hidden");
                    var coinop = new coin_operation(that, $tr, id);
                    coinop.getBalance();
                }, true);
            }

            new el_init($('.action_edit_app', $tr), function (that, id) {
                //  var button = $(".action_edit_app", $tr), uuid = button.attr("data-uuid");
                editor_module = new AppEditor("edit_app_table", data, $table, method);
            }, false);

            new el_init($('.action_view_coin_history', $tr), function (that, id) {
                var button = $(".action_view_coin_history", $tr), uuid = button.attr("data-uuid");
                $("#admin_page_app_reg_wrapper").addClass("hidden");
                $("#coin_history_wrapper").removeClass("hidden");
                $("#coin_history").removeClass("hidden");
                coin_history.refresh_table(setting_ob.role, uuid);
            }, false);

            new el_init($('.action_disable_application', $tr), function (that, id) {
                var loader = new AJAXLoader(that, "normal", "app_reg");
                var enter = new JAXAPIsupport(domain + "api/cms/app_alive_to_dead", {
                    post_id: id
                }, that, return_data.successcb);
                enter.add_loader(loader);
                enter.init();
            }, true);

            new el_init($('.action_remove_application', $tr), function (that, id) {
                var loader = new AJAXLoader(that, "normal", "app_reg");
                var enter = new JAXAPIsupport(domain + "api/cms/remove_dead_app", {
                    post_id: id
                }, that, return_data.successcb);
                enter.add_loader(loader);
                enter.init();
            }, true);

            new el_init($('.action_enable_application', $tr), function (that, id) {
                var loader = new AJAXLoader(that, "normal", "app_reg");
                var enter = new JAXAPIsupport(domain + "api/cms/app_dead_to_alive", {
                    post_id: id
                }, that, return_data.successcb);
                enter.add_loader(loader);
                enter.init();
            }, true);


        }

        var implement_panel = function (tr, row, data) {
            var comp_permission = Handlebars.compile($("#editor_control_admin").html());
            Handlebars.registerHelper("control_admin", function () {
                if (this.status == "pending") return new Handlebars.SafeString(comp_permission(this));
                else return "";
            });
            this.row = row;
            this.tr = tr;
            this.data = data;
        }
        implement_panel.prototype = {
            init_panel: function (template_name) {
                var d = this;
                //  console.log(template_name);
                d.template_name_final = template_name;
                d.complied = Handlebars.compile($(template_name).html());
                d.row.child(d.complied(d.data)).show();
                init_tiny_panel(d.tr.next(), d.data);
            }
        }
        var init_buttons = function (oSettings) {
            var $button = $('td.details_editor .view_actions', table);
            $button.off("cancel_reveal");
            $button.off(interaction);
            $button.on("cancel_reveal", function (e, param_id) {
                e.preventDefault();
                var tr = $(this).closest('tr'), row = $table.dataTable().api().row(tr), id = Number($(this).attr("data-id"));
                // console.log("id and param id... " + id + ":" + param_id);
                if (row.child.isShown() && id != param_id) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    // tr.next().html("");
                }
            });
            $button.on(interaction, function (e) {
                e.preventDefault();
                var tr = $(this).closest('tr'),
                    row = $table.dataTable().api().row(tr),
                    data = row.data(),
                    status = data.status;

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    //  tr.next().html("");
                } else {
                    var wood = new implement_panel(tr, row, data);
                    if (setting_ob.role == "developer") {
                        wood.init_panel("#editor_childrow_" + status);
                    } else if (setting_ob.role == "administrator") {
                        if (status == "beta")
                            wood.init_panel("#editor_childrow_admin_beta");
                        if (status == "pending")
                            wood.init_panel("#editor_childrow_admin_pending");
                        if (status == "dead")
                            wood.init_panel("#editor_childrow_dead");
                        if (status == "launched")
                            wood.init_panel("#editor_childrow_launched");
                    }
                    tr.addClass('shown');
                }
                $('td.details_editor .view_actions', table).trigger("cancel_reveal", [data.ID]);
            });
            $button.each(function (key, val) {
                var tr = $(this).closest('tr'), row = $table.dataTable().api().row(tr), data = row.data();
                //if (status == "beta" && setting_ob.role == "administrator") {
                // $(this).addClass("disabled").off(interaction);
                //}
            });
        }
        $table.dataTable({
            processing: true,
            serverSide: serverSideUse,
            iDisplayLength: 6,
            order: [ 1, 'desc' ],
            ajax: domain + "api/systemlog/" + method + sort_pending,
            columns: [
                {
                    class: "details_editor",
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return actionsTemplate(full);
                    }
                },
                { data: "ID" },
                { data: "devuser" },
                { data: "devname",
                    render: function (data, type, full, meta) {
                        if (setting_ob.role == "developer")
                            return "";
                        else if (setting_ob.role == "administrator")
                            return data;
                    }
                },
                { data: "status",
                    render: function (data, type, full, meta) {
                        return data;
                    }},
                { data: "store_id" },
                { data: "app_key" },
                { data: "app_secret" },
                { data: "platform" }
            ],
            dom: '<"sort_status">lfrtip',
            initComplete: function (settings, json) {
                if (setting_ob.role == "administrator") {
                    var sorting_button_template = Handlebars.compile($("#editor_btns").html());
                    var sorting = $("div.sort_status")
                    sorting.html(sorting_button_template);
                    sorting.css({"text-align": "center", "padding-top": "20px"});
                    sorting = $("div.sort_status");
                    var sorting_button = $("button", sorting);
                    sorting_button.each(function (index) {
                        $(this).on(interaction, function (e) {
                            $table.fnReloadAjax(domain + "api/systemlog/" + method + "/?sort=" + $(this).html().toLowerCase());
                        })
                    });
                }
                $table.css({
                    'text-align': 'center',
                    'font-size': '14px'
                });
                if (setting_ob.role == "developer") {
                    $table.DataTable().column(1).visible(false);
                    $table.DataTable().column(2).visible(false);
                    $table.DataTable().column(3).visible(false);
                }
            },
            fnDrawCallback: init_buttons
        });


    }(document, "click tap touch", "#admin_page_app_reg"));
});

