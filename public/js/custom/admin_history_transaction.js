/**
 * Created by ryo on 14年9月2日.
 */
var approve = approve || {},
    reject = reject || {}, action_view_doc = action_view_doc || {};
var setting_ob = setting_ob || {};
jQuery(function ($) {
    (function (d, interaction, table) {
        var $table = $(table),
        //today = new Date(),
            domain = window.location.origin + "/",
            uuid = setting_ob.user_uuid,
            role = setting_ob.role,
            start_date = "",
            end_date = "";

        $table.dataTable({
            processing: true,
            "order": [ 1, 'desc' ],
            ajax: domain + "api/cms/coin_history/?index=-1&feature=spot&uuid=" + uuid + "&" + role + "=1",
            columns: [
                { data: "transid"},
                { data: "time"},
                { data: "count"},
                { data: "ref_code" }
            ],
            "dom": '<"feature_button"><"datepicker">lfrtip',
            "initComplete": function (settings, json) {
                var feature_button_template = Handlebars.compile($("#editor_controller_bar").html());
                var feature = $("div.feature_button")
                feature.html(feature_button_template);
                feature.css({"text-align": "center", "padding-top": "20px"});
                feature = $("div.feature_button");
                var feature_button = $("button", feature);


                var datepicker_template = Handlebars.compile($("#editor_datepicker").html());
                var datepicker = $("div.datepicker");
                datepicker.html(datepicker_template);
                $("#datepicker_start").datepicker({ dateFormat: 'yy-mm-dd',
                    onSelect: function (dateText, inst) {
                        var min_date = $(this).datepicker('getDate');
                        start_date = dateText;
                        $("#datepicker_end").datepicker("option", "minDate", min_date);
                    }, maxDate: 0});

                $("#datepicker_end").datepicker({ dateFormat: 'yy-mm-dd',
                    onSelect: function (dateText, inst) {
                        var max_date = $(this).datepicker('getDate');
                        start_date = dateText;
                        $("#datepicker_start").datepicker("option", "maxDate", max_date);
                    }, maxDate: 0});
                datepicker.css({"text-align": "center"});
                datepicker.addClass("hidden");
                $table.css({
                    'text-align': 'center',
                    'font-size': '14px'
                });

                feature_button.each(function (index) {
                    $(this).on("click tap touch", function (e) {
                        var chosen = $(this).val();
                        if (chosen != "custom") {
                            $table.fnReloadAjax(domain +
                                "api/cms/coin_history/?index=-1&feature=" + chosen + "&uuid="
                                + uuid + "&" + role + "=1");
                        }
                        else {
                            datepicker.removeClass("hidden");
                            feature_button.addClass("hidden");
                        }
                    })
                });
                $("#back_to_choice").on("click tap touch", function (e) {
                    datepicker.addClass("hidden");
                    feature_button.removeClass("hidden");
                });

                $("#confirm").on("click tap touch", function (e) {
                    console.log(domain +
                        "api/cms/coin_history/?index=-1&feature=custom&start=" + start_date + "&end=" + end_date
                        + "&uuid=" + uuid + "&" + role + "=1");
                    $table.fnReloadAjax(domain +
                        "api/cms/coin_history/?index=-1&feature=custom&start=" + start_date + "&end=" + end_date
                        + "&uuid=" + uuid + "&" + role + "=1");
                });
            }
        });


    }(document, "click tap touch", "#coin_history"));
});

