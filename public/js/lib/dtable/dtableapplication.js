/**
 * Created by hesk on 12/20/14.
 */
/**
 * Created by ryo on 14年10月23日.
 */
var DApp = {};
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}
jQuery(function ($) {
        "use strict";
        DApp = function (control_object) {
            var _default = {
                "table_id": "",
                "table_implementation": {},
                "_domain": window.location.origin + "/",
                "_interaction": "click tap touch"
            };
            this.f = $.extend(_default, control_object);
            this.$table = $("#" + this.f.table_id);
            this.domain = this.f._domain;
            this.interaction = this.f._interaction;
            this.init();
        };
        DApp.prototype = {
            init: function () {
                var d = this, implement = true;
                if (isEmpty(d.f.table_id)) {
                    implement = false;
                    console.error("Error: empty table configuration on :table_id");
                }
                if (isEmpty(d.f.table_implementation)) {
                    implement = false;
                    console.error("Error: empty table configuration on :table_implementation");
                }
                if (implement)d.$table.dataTable(d.f.table_implementation);
            },
            new_request: function (control_api) {
                var d = this;
                d.$table.fnReloadAjax(d.domain + control_api);
            }
        };
    }
);