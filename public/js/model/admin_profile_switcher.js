/**
 * Created by ryo on 14年9月30日.
 */

var Switcher = Switcher || {};
jQuery(function ($) {
    Switcher = function ($el) {
        var d = this;
        d.$switch_field = $el;
        d.container = $el.next(".container");
        d.$switch_input = $(".switch-input", d.container);

        d.container.on("change", {that: d}, d.switch_status);
    }
    Switcher.prototype = {
        switch_status: function (e) {
            var d = e.data.that;

            if (d.$switch_input.is(':checked'))
                d.$switch_field.val("1");
            else
                d.$switch_field.val("0");
        }
    }
});