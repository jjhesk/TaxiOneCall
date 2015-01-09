/**
 * Created by Hesk on 14年8月15日.
 */
var AppConfigWidget = AppConfigWidget || {};
jQuery(function ($) {
    "use strict";
    (function (d, adminajax, i18n, interaction) {
        AppConfigWidget = function (component_name) {
            var d = this;
            this.$container = $("#" + component_name);

            //   d.stage_1_action_bar = Handlebars.compile($("#action_stage_one", d.$container).html());
            //   d.stage_2_action_bar = Handlebars.compile($("#action_stage_two", d.$container).html());
            d.$spinner = $("#publishing-action .spinner", this.$container);
            this.$app_id = $("#app_id", this.$container);
            this.$app_secret = $("#app_secret", this.$container);
            this.$app_key = $("#app_key", this.$container);
            d.interaction = interaction;
            d.init();
        };
        AppConfigWidget.prototype = {
            init: function () {
                var d = this;
                MetaBoxSupport.InsertButtonNextTo(d.$app_id, "genIDbutton1", "gen ID 1", d.generateID);
                MetaBoxSupport.InsertButtonNextTo(d.$app_secret, "genIDbutton2", "gen ID 2", d.generateID);
                MetaBoxSupport.InsertButtonNextTo(d.$app_key, "genIDbutton3", "gen ID 3", d.generateID);
            },
            generateID: function (e) {
                var target = e.data.field_target, id = target.attr("id");
                if (id == "app_id") {
                    target.val(MetaBoxSupport.uuidGen());
                } else if (id == "app_secret") {
                    target.val(MetaBoxSupport.uuidGen());
                } else if (id == "app_key") {
                    target.val(MetaBoxSupport.uuidGen());
                }
            },
            check_all_complete: function () {

            }
        }
    }(document, ajaxurl, i18n_db_shortcodes, "click tap touch"));
});
