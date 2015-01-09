/**
 * Created by ryo on 14年9月22日.
 */
var setting_ob = setting_ob || {};
jQuery(function ($) {
    'use strict'
    /**
     *
     * @param that
     * @param uid
     */
    var coin_operation = function (that, uid) {
        this.rowID = uid;
        this.bal = $("#balance_field");
        this.refresh = $("#refresh_bal");
        this.last_update = $("#last_update");
        this.button_coin_operation = $("#execute_coin_operation");
        this.value_input = $("#coin_input_val");
        this.loader_start = new AJAXLoader(that, "normal", "app_reg");
        this.loader_coin = new AJAXLoader(this.button_coin_operation, "normal", "app_reg");
        this.button_coin_operation.on(interactions, {that: this}, this.update_coin);
        this.refresh.on(interactions, {that: this}, this.getBalance);
    }
    coin_operation.prototype = {
        getBalance: function (e) {
            var d = this;
            if (!(d instanceof coin_operation)) d = e.data.that;
            var enter = new JAXAPIsupport(domain + "api/cms/getuserbalance", {
                _uid: d.rowID
            }, d, d.cb_bal);
            enter.add_loader(d.loader_start);
            enter.init();
        },
        update_coin: function (e) {
            var d = e.data.that,
                current = Number(d.bal.html()),
                field_coin = Number(d.value_input.val());

            var enter = new JAXAPIsupport(domain + "api/cms/cmsuserbalanceoperate", {
                _uid: d.rowID, mt: d.value_input.val()
            }, d, d.cb_value);
            enter.add_loader(d.loader_coin);
            enter.init();

        },
        cb_value: function (that, data) {
            that.value_input.val("");
            that.getBalance();
        },
        cb_bal: function (that, data) {
            that.last_update.html(data.update_time);
            that.bal.html(data.coin);
        }
    }


    $.each($(".hidden_field_switcher"), function (h) {
        new Switcher($(this));
    });

    var coinMangButtonTemplate = Handlebars.compile($("#coin_management_template").html());
    var coinHistoryTemplate = Handlebars.compile($("#coin_history_template").html());
    var coinBalanceTemplate = Handlebars.compile($("#coin_balance_template").html());
    var $coin_button = $(coinMangButtonTemplate()), $coin_history_table = $(coinHistoryTemplate()), $coin_balance_table = $(coinBalanceTemplate());
    var interactions = "click tap touch";
    var $profile_content = $("#profile-page");
    var domain = window.location.origin + "/";

    $('input[name=coin]').after($coin_button);
    $profile_content.after($coin_history_table);
    $($coin_history_table).after($coin_balance_table);

    var coin_history = new CoinHistory("coin_history");
    coin_history.refresh_table("administrator", setting_ob.uuid);
    new coin_operation($("#coin_bal_operation"), Number(setting_ob.user_id));

    var $table = $("#coin_history_wrapper"), $back = $("#back"), $coin_bal_operation = $("#coin_bal_operation"),
        $coin_panel = $("#v_coin_operation_panel");
    $table.addClass("hidden");
    $coin_balance_table.addClass("hidden");

    $coin_button.on(interactions, function (e) {
        e.preventDefault();
        $profile_content.addClass("hidden");
        $(this).addClass("hidden");
        $table.removeClass("hidden");
        $coin_balance_table.removeClass("hidden");
        return false;
    });

    $back.on(interactions, function (e) {
        e.preventDefault();
        $profile_content.removeClass("hidden");
        $coin_button.removeClass("hidden");
        $table.addClass("hidden");
        $coin_balance_table.addClass("hidden");
        $coin_panel.addClass("hidden");
    });

    $coin_bal_operation.on(interactions, function (e) {
        e.preventDefault();
        $coin_panel.removeClass("hidden");
    });


});