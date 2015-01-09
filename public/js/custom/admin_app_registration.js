/**
 * Created by Hesk on 14年8月18日.
 */

jQuery(function ($) {
    var slickoo = new SlickApplication,
        ios_searchbar = new IOSSearchAPI("search_app", slickoo),
        android_searchbar = new AndroidSearchAPI("android_search_app", slickoo),
        inputwidth = "700px",
        platform = $("#platform"),
        $registration_button = $("#registerthisapp"),
        store_id = $("#store_id").css("width", inputwidth),
        app_id = $("#app_id"),
        icon_id = $("#icon_url").css("width", inputwidth),
        secret = $("#secret"),
        textdesc = $("#desc_area").css("width", inputwidth),
        vcoin_amount = $("#vcoin_count"),
        vcoin_app_amount_field = $("#add_vcoin"),
        vcoin_msg = $("#extra_coin_msg"),
        switch_input = $(".switch-input"),
        appnamefield = $("#app_name").css("width", inputwidth),
        row_search_enable = $("#row_search_enable"),
        slideAddImageUrl = $("#add_image_url"),
        slideAddImageUrlButton = $("#add_image_url_button"),
        removeSlideSh = $("#remove_image_sh"),
        cost = $("#cost"),
        cost_msg = $("#cost_msg"),
        available_coin = 0,
        min_deposit = 100,
        updating_coin = false,
        api_domain = window.location.origin + "/api/";
    update_coin();
    attach_check_event(appnamefield);
    attach_check_event(store_id);
    attach_check_event(icon_id);
    attach_check_event(textdesc);
    attach_check_event(vcoin_app_amount_field);
    attach_check_event(cost);
    attach_check_event(platform);
    slideAddImageUrlButton.on("click", function (e) {
        slickoo.add_one(slideAddImageUrl.val());
        slideAddImageUrl.val("");
    });
    removeSlideSh.on("click", function (e) {
        slickoo.remove_one();
    });
    platform.on("change", function (e) {
        clear_input_val();
        if ($("option:selected", platform).val() == "ios") {
            row_search_enable.removeClass("hidden");
            ios_searchbar.enable(true);
            android_searchbar.enable(false);
            //   android_row_search_app.addClass("hidden");
            input_control(true);
        }
        else if ($("option:selected", platform).val() == "android") {
            row_search_enable.removeClass("hidden");
            //   android_row_search_app.removeClass("hidden");
            android_searchbar.enable(true);
            ios_searchbar.enable(false);
            input_control(true);
        }
        else {
            row_search_enable.addClass("hidden");
            // android_row_search_app.addClass("hidden");
            android_searchbar.enable(false);
            ios_searchbar.enable(false);
            input_control(true);
        }
    });

    switch_input.on("change", function (e) {
        clear_input_val();
        if (switch_input.is(':checked')) {
            if ($("option:selected", platform).val() == "ios") {
                //  ios_row_search_app.removeClass("hidden");
                ios_searchbar.enable(true);
            }
            else if ($("option:selected", platform).val() == "android") {
                //  android_row_search_app.removeClass("hidden");
                android_searchbar.enable(true);
            }
            input_control(true);
        }
        else {
            ios_searchbar.enable(false);
            android_searchbar.enable(false);
            // ios_row_search_app.addClass("hidden");
            //  android_row_search_app.addClass("hidden");
            input_control(false);
        }
    });

    ios_searchbar.setOnChange(function (e) {
        if (($("#select2-chosen-1").html() != "")) {
            input_control(false);
        } else {
            input_control(true);
        }
    });
    android_searchbar.setOnChange(function (e) {
        if (($("#select2-chosen-2").html() != "")) {
            input_control(false);
        } else {
            input_control(true);
        }
    });


    function clear_input_val() {
        store_id.val("");
        icon_id.val("");
        textdesc.val("");
        appnamefield.val("");
        vcoin_app_amount_field.val("");
        cost.val("");
        $("#select2-chosen-1").html("");
        $("#select2-chosen-2").html("");
    }

    function input_control(boolean) {
        MetaBoxSupport.InputControlSingle(store_id, boolean);
        MetaBoxSupport.InputControlSingle(icon_id, boolean);
        MetaBoxSupport.InputControlSingle(textdesc, boolean);
        MetaBoxSupport.InputControlSingle(vcoin_app_amount_field, boolean);
        MetaBoxSupport.InputControlSingle(cost, boolean);
        MetaBoxSupport.InputControlSingle(appnamefield, boolean);
    }

    function update_coin() {
        if (!updating_coin) {
            updating_coin = true;
            $.post(api_domain + "cms/available_coins/", {
                store_id: store_id.val()
            }).done(function (data) {
                if (data.result == "failure") {
                    alert("request failure.")
                } else {
                    if (data.result > 0) {
                        alert(data.msg);
                    } else {
                        available_coin = parseInt(data.obtain);
                        vcoin_amount.html(available_coin);
                    }
                }
                updating_coin = false;
            });
        }
    }

    function check_field_completion() {
        return (
            appnamefield.val() != ""
                && store_id.val() != ""
                && icon_id.val() != ""
                && textdesc.val() != ""
                && (Number(vcoin_app_amount_field.val()) > min_deposit)
                && (Number(cost.val()) >= 0
                && cost.val() != "")
                && Number(vcoin_app_amount_field.val()) > (Number(cost.val())))
    }

    function attach_check_event(field_obj) {
        if (field_obj === vcoin_app_amount_field) {
            field_obj.on("change keyup", function (e) {
                if (check_field_completion()) {
                    MetaBoxSupport.InputControlSingle($registration_button, false);
                } else MetaBoxSupport.InputControlSingle($registration_button, true);
                if (vcoin_app_amount_field.val() > available_coin) {
                    vcoin_msg.html("exceed available amount");
                } else {
                    vcoin_msg.html("");
                }
            });
        }
        else if (field_obj === cost) {
            field_obj.on("change keyup", function (e) {
                console.log("cost:" + cost.val());
                console.log("available_coin:" + available_coin);
                if (check_field_completion()) {
                    MetaBoxSupport.InputControlSingle($registration_button, false);
                } else MetaBoxSupport.InputControlSingle($registration_button, true);
                if (cost.val() > available_coin) {
                    cost_msg.html("Exceed available amount. Please assign again.");
                    cost_msg.css("color", "red");
                } else {
                    cost_msg.html("Cannot be bigger than the total amount of the coin.");
                    cost_msg.css("color", "black");
                }
            });
        }
        else if (field_obj === platform) {
            field_obj.on("change", function (e) {
                if (check_field_completion()) {
                    MetaBoxSupport.InputControlSingle($registration_button, false);
                } else MetaBoxSupport.InputControlSingle($registration_button, true);
            });
        }
        else {
            field_obj.on("keyup", function (e) {
                if (check_field_completion()) {
                    MetaBoxSupport.InputControlSingle($registration_button, false);
                } else MetaBoxSupport.InputControlSingle($registration_button, true);
            });
        }
    }

    $registration_button.on("click", function (e) {
        if (Number(vcoin_app_amount_field.val()) > (Number(cost.val()))
            && Number(vcoin_app_amount_field.val()) > min_deposit
            && vcoin_msg.html() == ""
            && available_coin > Number(cost.val())) {

            var widget_id = "registerthisapp",
                api_request = api_domain + "cms/register/",
                loader_component = new AJAXLoader(widget_id, "normal", "app_reg"),
                ajax = new JAXAPIsupport(api_request, {
                    store_id: store_id.val(),
                    platform: $("option:selected", platform).val(),
                    textdesc: textdesc.val(),
                    icon: icon_id.val(),
                    appname: appnamefield.val(),
                    total_vcoin: vcoin_app_amount_field.val(),
                    single_vcoin: cost.val(),
                    images: slickoo.getStringfiedContent()
                }, {}, function (that, json) {
                    if (json.result > 0) {
                        alert(json.msg);
                    } else {
                        secret.html(json.app_secret);
                        app_id.html(json.app_key);
                        $registration_button.val("success and go back");
                        $registration_button.off("click");
                        $registration_button.on("click", function (e) {
                            window.location = window.location.origin + "/wp-admin/admin.php?page=appreg";
                        });
                    }
                }, function (that, json_msg) {
                    alert(json_msg);
                });
            ajax.add_loader(loader_component);
            ajax.init();
        } else alert("Please assign valid number of coins.")
    });
})
