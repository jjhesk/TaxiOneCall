/**
 * Created by ryo on 14年10月23日.
 */

var CoinHistory = {};
jQuery(function ($) {
        CoinHistory = function (component) {
            this.$table = $("#" + component);
            this.domain = window.location.origin + "/";
            this.role = "";
            this.uuid = "";
            this.start_date = "";
            this.end_date = "";
            this.interaction = "click tap touch";
            this.tableInit();
        };

        CoinHistory.prototype = {
            tableInit: function () {
                var d = this;
                d.$table.dataTable({
                        processing: true,
                        "order": [ 1, 'desc' ],
                        ajax: "",
                        columns: [
                            { data: "transid"},
                            { data: "time"},
                            { data: "count"},
                            { data: "ref_code"}
                        ],
                        "dom": '<"back_to_reg_log"><"feature_button"><"datepicker">lfrtip',
                        "initComplete": function (settings, json) {
                            var back_button_template = Handlebars.compile($("#editor_back_btn").html());
                            var back = $("div.back_to_reg_log");
                            var feature_button_template = Handlebars.compile($("#editor_controller_bar").html());
                            var feature = $("div.feature_button");
                            back.html(back_button_template());
                            feature.html(feature_button_template());
                            feature.css({"text-align": "center", "padding-top": "20px"});
                            feature = $("div.feature_button");
                            var feature_button = $("button", feature), back_button = $("button", back);
                            feature_button.each(function (index) {
                                $(this).on(d.interaction, function (e) {
                                    var chosen = $(this).val();
                                    if (chosen != "custom") {
                                        d.$table.fnReloadAjax(d.domain +
                                            "api/cms/coin_history/?index=-1&feature=" + chosen + "&uuid="
                                            + d.uuid + "&" + d.role + "=1");
                                    }
                                    else {
                                        datepicker.removeClass("hidden");
                                        feature_button.addClass("hidden");
                                    }
                                })
                            });

                            var datepicker_template = Handlebars.compile($("#editor_datepicker").html());
                            var datepicker = $("div.datepicker");

                            back_button.on(d.interaction, function (e) {
                                $("#admin_page_app_reg_wrapper").removeClass("hidden");
                                $("#coin_history_wrapper").addClass("hidden");
                                feature.removeClass("hidden");
                                datepicker.addClass("hidden");
                            });
                            d.$table.css({
                                'text-align': 'center',
                                'font-size': '14px'
                            });

                            datepicker.html(datepicker_template);
                            $("#datepicker_start").datepicker({ dateFormat: 'yy-mm-dd',
                                onSelect: function (dateText, inst) {
                                    var min_date = $(this).datepicker('getDate');
                                    d.start_date = dateText;
                                    $("#datepicker_end").datepicker("option", "minDate", min_date);
                                }, maxDate: 0});

                            $("#datepicker_end").datepicker({ dateFormat: 'yy-mm-dd',
                                onSelect: function (dateText, inst) {
                                    var max_date = $(this).datepicker('getDate');
                                    d.start_date = dateText;
                                    $("#datepicker_start").datepicker("option", "maxDate", max_date);
                                }, maxDate: 0});
                            datepicker.css({"text-align": "center"});
                            datepicker.addClass("hidden");

                            $("#back_to_choice").on(d.interaction, function (e) {
                                datepicker.addClass("hidden");
                                feature_button.removeClass("hidden");
                            });

                            $("#confirm").on(d.interaction, function (e) {
                                d.$table.fnReloadAjax(d.domain +
                                    "api/cms/coin_history/?index=-1&feature=custom&start=" + d.start_date + "&end=" + d.end_date
                                    + "&uuid=" + d.uuid + "&" + d.role + "=1");
                            });
                        }
                    }
                );
            },
            refresh_table: function (role, uuid) {
                var d = this;
                d.role = role;
                d.uuid = uuid;
                d.$table.fnReloadAjax(d.domain + "api/cms/coin_history/?index=-1&feature=spot&uuid=" + d.uuid + "&" + d.role + "=1");
            }
        }
        ;
    }
)
;

