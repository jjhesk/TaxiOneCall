/**
 * Created by hesk on 6/2/14.
 */
/**
 * Created by Hesk on 14年5月15日.
 */
var jp_status = jp_status || {};
var COMBOX = COMBOX || {};
jQuery(function ($) {
    (function (d, status, interaction) {
        console.log(jp_status);
//        ScreenOptionControl.offAll();
        var $table = $("#cpmarketstatusgrid"),
            screen_option = new WPScreenOptionSupport(),
            COMBOX = new PublishingSupport(),
            uploadDir = "http://onecallapp.imusictech.net/wp-content/uploads"
            ;
        screen_option.ALL(false);
        console.log(status);

        console.log("here to start");
        if (jp_status.hasOwnProperty("show_metabox")) {
            screen_option.batch(jp_status.show_metabox, true);
        }
        var field = $("#combrpdf"), doc_src = field.val(), deter = new String(doc_src).match(/\/br\/?/img);
        if (deter) {
            var newfield = MetaBoxSupport.InsertHTMLFieldSelectNextTo(field, '<a target="_BLANK" class="button" href="' + uploadDir + doc_src + '">Inspect Document</a>');
            MetaBoxSupport.InputControlSingle(field, true);
        }
        $table.dataTable({
            processing: true,
            ajax: "http://onecallapp.imusictech.net/api/staffcontrol/get_ordered_cps/?job_post_id=" + jp_status.post_id,
            columns: [
                {
                    class: "details-control",
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return "";
                    }
                },
                { data: "cp_id" },
                { data: "cpname" },
                { data: "status" }
            ]
        });

        setInterval(function () {
            $table.fnReloadAjax();
        }, 30000);


        // ==============NOT ABLE TO USE================================
        //  'use strict';
        // Use function construction to store map & DOM elements separately for each instance
        /* var buttonAction = function ($container) {
         this.$container = $container;
         };

         buttonAction.prototype = {
         jax: function () {

         }
         };
         $(function () {
         $('.rwmm').each(function () {
         var control = new buttonAction($(this));
         control.init();
         $(this).data('request_control', control);
         });
         });








         setInterval( function () {
         table.ajax.reload();
         }, 30000 );


         */
    }(document, jp_status, "click tap touch"));
});
