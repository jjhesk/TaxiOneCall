/**
 * Created by ryo on 14年8月29日.
 */

var CheckPointAdmin = {};
jQuery(function ($) {
    CheckPointAdmin = function (component_name, action_id) {
        this.$container = $("#" + component_name);
        this.$mission_table = $("#mission_table");
        this.action_id = action_id;
        this.domain =  window.location.origin +"/api/";
        this.TableInit();
    };
    CheckPointAdmin.prototype = {
        TableInit: function () {
            var d = this;
            d.$mission_table.dataTable({
                processing: true,
                ajax: d.domain + "systemlog/check_point_mission_log/?aid=" + d.action_id,
                columns: [
                    { data: "ID" },
                    { data: "user" },
                    { data: "triggered" },
                    { data: "reference" }
                ],
                "initComplete": function (settings, json) {
                    d.$mission_table.css({
                        'text-align': 'center',
                            'font-size': '14px'
                    });
                }
            });
        },
        refresh: function () {
        },
        //get the event object for binding post
        ev: function () {
            return this.$container;
        }
    }
});