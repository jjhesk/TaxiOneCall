/**
 * Created by Hesk on 14年5月15日.
 */
var jp_status = jp_status || {};
var BOARDCAST_METABOX = BOARDCAST_METABOX || {};
jQuery(function ($) {
    "use strict";
    (function (d, status, interaction) {

        var cms_element_order = $("#postconfirmation"),
            cms_element_jobassign = $("#jobassignment"),
            cms_element_submission = $("#jobsubmission"),
            cms_element_cplist = $("#cp_applicant_list"),
            watch_status_doc = cms_element_submission.find("select"),
            watch_status_job = cms_element_jobassign.find("select"),
            watch_order_type = $("#odk_ordermetho", cms_element_order),
            val_doc_status = $("option:selected", watch_status_doc).val(),
            val_job_status = $("option:selected", watch_status_job).val(),
            val_order_status = $("option:selected", watch_order_type).val(),
            status_val = $("#work_status_virtual").val(),
            screen_option = new WPScreenOptionSupport(),
            status_support = new PublishingSupport(),
            postbox_handler = new PostBoxWatch(),
            order_confirmation = new OrderConfirmation("postconfirmation"),
            report_listing = null
            ;
        /*


         var MetaBoxControl = {

         order_confirmation_response: function (dataFull) {
         MetaBoxControl.MapLocation(dataFull);
         MetaBoxControl.fill_data_box(dataFull);
         MetaBoxSupport.doSelect("#odk_ordermetho", "online");
         },

         MapLocation: function (data) {
         console.log(data);
         if (data.loc == undefined) {
         MetaBoxControl.Map_hide_control(false);
         return false;
         } else
         MetaBoxControl.Map_hide_control(true);

         var mapController = $(".rwmb-map-field").data("mapController");

         var latLng = new google.maps.LatLng(data.loc.point.k, data.loc.point.A);
         mapController.map.setCenter(latLng);
         mapController.marker.setPosition(latLng);
         mapController.updateCoordinate(latLng);
         },

         Map_hide_control: function (bool) {
         var a = $(".rwmb-map-goto-address-button"),
         b = $(".rwmb-field.rwmb-text-wrapper:has(#odk_reference_loc)");
         if (bool) {
         a.hide();
         b.hide();
         } else {
         a.show();
         b.show();
         }
         },

         fill_data_box: function (data) {
         if (data.hasOwnProperty("address")) {
         var a = $("#odk_address");
         a.val(data.address);
         }
         if (data.hasOwnProperty("services")) {
         var a = $("#odk_phone_remarks");
         a.val(data.services);
         }
         if (data.hasOwnProperty("cr_id")) {
         var a = $("#odk_cr");
         a.val(data.cr_id);
         }
         },

         panelSwitchTotal: function ($metabox, bool) {
         if (!$metabox.hasClass("postbox"))
         console.log("wrong tag class location.. postbox class does not find");
         MetaBoxSupport.InputControlEach($('input,select,textarea,.button', $metabox), bool);
         },

         panelSwitch: function ($metabox, bool, $exception) {
         if (!$metabox.hasClass("postbox"))
         console.log("wrong tag class location.. postbox class does not find");
         MetaBoxSupport.InputControlEach($('input,select,textarea,.button', $metabox).not($exception), bool);
         },

         init_order_confirmation_box: function () {
         if (status.hasOwnProperty("tpm_normal_field")) {
         var $inputSelect = MetaBoxSupport.InsertHTMLFieldSelectAfter("#odk_ordermetho", status.tpm_normal_field);
         $inputSelect.on("change.orderref", function (e) {
         e.preventDefault();
         var $this = $(this),
         selected_val = $("option:selected", $this).val();
         if (selected_val > 0) {
         JAXSupport({
         action: "get_order_data",
         led_id: selected_val
         }, MetaBoxControl.order_confirmation_response);
         if (selected_val == undefined)
         MetaBoxControl.Map_hide_control(false);
         }
         });
         }
         }
         }


         var watch = {
         select: function (e) {
         e.preventDefault();
         var $this = $(this),
         type = $this.attr('type'),
         $parent = $this.parent(),
         selected = $this.is(':checked'),
         $others = $parent.siblings(),
         selected_val = $this.find("option:selected").val(),
         selected_html = $this.find("option:selected").html();
         var switchOff = selected_val == 'complete' || selected_val == 'submitted';
         MetaBoxControl.panelSwitch(e.data.target_element, switchOff, $this);
         },
         ordertype: function (e) {
         e.preventDefault();
         var $this = $(this),
         selected_val = $this.find("option:selected").val(),
         $select = $(".supporting-field", cms_element_order),
         $order_type_select = $("select", $select),
         $order_id_input = $("#ui_ref_order_id", cms_element_order),
         is_online = selected_val == 'online',
         is_call = selected_val == 'call',
         is_default = selected_val == '-1';

         if (is_online) {
         MetaBoxSupport.InputControlSingle($order_type_select, false);
         MetaBoxSupport.InputControlSingle($order_id_input, false);
         console.log("is_online");
         }
         if (is_call) {
         MetaBoxSupport.InputControlSingle($order_type_select, true);
         MetaBoxSupport.doSelect($order_id_input, '');
         MetaBoxSupport.InputControlSingle($order_id_input, true);
         // MetaBoxSupport.InputControlEach(e.data.target_element, true);
         console.log("is_call");
         }
         if (is_default) {
         MetaBoxSupport.doSelect($order_id_input, '');
         MetaBoxSupport.InputControlSingle($order_id_input, true);
         console.log("is_default");
         }
         },
         select_job: function (e) {
         e.preventDefault();
         var $this = $(this),
         type = $this.attr('type'),
         $parent = $this.parent(),
         selected = $this.is(':checked'),
         $others = $parent.siblings(),
         selected_val = $this.find("option:selected").val(),
         selected_html = $this.find("option:selected").html();
         var switchOff = false;
         if (selected_val == 'hired')
         switchOff = true;
         MetaBoxControl.panelSwitch(cms_element_order, switchOff, $this);
         MetaBoxSupport.InputControlEach($('#odk_cp_name,#odk_cp_cert,#odk_cp_rating', cms_element_jobassign), true);
         // MetaBoxControl.panelSwitch(cms_element_jobassign, switchOff, $this);
         }
         }
         */

        /*
         watch_status_doc.on('change.doc', {target_element: cms_element_submission }, watch.select).trigger('change.doc');
         watch_order_type.on('change.order', {
         target_element: $("#odk_client,#odk_cr,#odk_client", cms_element_order)
         }, watch.ordertype).trigger('change.order');
         */

        // watch_status_job.on('change.job', watch.select_job).trigger('change.job');

        // if (val_doc_status == "complete") {
        //  MetaBoxControl.panelSwitchTotal(cms_element_order, true);
        // }


        // order_confirmation.
        // ScreenOptionControl.offAll();
        // var $table = $("#cpmarketstatusgrid");
        screen_option.ALL(false);
        if (status.page == 'post.php') {
            /*  if (jp_status.hasOwnProperty("show_metabox")) {
             screen_option.batch(jp_status.show_metabox, true);
             }*/

            if (screen_option.getComponentStatus("measurement_report")) {
                report_listing = new JobReportList("measurement_report");
            }
            if (screen_option.getComponentStatus("marker_to_start")) {
                //PostBoxWatch
                //new PostBoxWatch();
                console.log("PostBoxWatch initialized");
            }
            /*if (screen_option.getComponentStatus("cp_applicant_list")) {
             BOARDCAST_METABOX = new CPManagement("cp_applicant_list", "jobassignment");
             BOARDCAST_METABOX.setInterval(300000);
             }*/
            screen_option.ON("postconfirmation");
            if (parseInt(status_val) === 0) {
                status_support.setTitle("Place and Confirm Order");
                status_support.PubLabel("Confirm Order");
                order_confirmation.init_order_by_field(status);
                order_confirmation.setTriggerOnCheck(function (e, bool) {
                    status_support.publishEnable(bool);
                });
                status_support.setTriggerOnSubmit(function (e, thatPublishingSupport) {
                    status_support.setPostTitle(order_confirmation.getOrderConfirmationTitle());
                });
                screen_option.Toggle("postconfirmation", true);
            }

            if (parseInt(status_val) > 0) {
                BOARDCAST_METABOX = new CPManagement("cp_applicant_list", "jobassignment");
                if (parseInt(status_val) == 1) {
                    screen_option.ON("cp_applicant_list");
                    status_support.setTitle("Hiring CP");
                    status_support.PubLabel("Assign CP");
                    BOARDCAST_METABOX.setInterval(300000);
                    BOARDCAST_METABOX.setDirectHireListener(function (e, id, row_data) {
                        status_support.setTitle("Hiring Process");
                        status_support.PubLabel("update");
                    });
                    screen_option.Toggle("postconfirmation", false);
                }
            }
            if (parseInt(status_val) == 2) {
                screen_option.ON("cp_applicant_list");
                screen_option.ON("jobassignment");
                screen_option.ON("job_cost_calculator");
                MetaBoxSupport.InputControlSingle($("#odk_jobstatus"), true);
                /*tatus_support.setTitle("Job Cost Calculation");
                 status_support.PubLabel("Confirm Cost");*/
                status_support.setTitle("Assign App Data");
                status_support.PubLabel("Assign Data");
                //rwmb-image_advanced-wrapper
                console.log("display out status val");
                status_support.setTriggerOnSubmit(function (a, that) {
                    var $box = $("#jobassignment .rwmb-field.rwmb-image_advanced-wrapper .rwmb-input ul li");
                    if ($box.size() > 0) {
                        $("#work_status_virtual").val(3);
                    }
                });
            }
            if (parseInt(status_val) == 3) {
                screen_option.ON("cp_applicant_list");
                screen_option.ON("measurement_report");
                screen_option.ON("jobsubmission");
                status_support.setTitle("Report Update");
                status_support.PubLabel("Revise");
            }
        } else if (status.page == 'edit.php') {
            //cpmarketstatusgrid
        } else if (status.page == 'post-new.php') {
            //MetaBoxControl.init_order_confirmation_box();
            screen_option.ON("postconfirmation");
            order_confirmation.init_order_by_field(status);

            status_support.setTriggerOnSubmit(function (e, thatPublishingSupport) {
                status_support.setPostTitle(order_confirmation.getOrderConfirmationTitle());
            });

            status_support.setTitle("Place Order");
            status_support.PubLabel("Confirm Order");

            order_confirmation.setTriggerOnCheck(function (e, bool) {
                status_support.publishEnable(bool);
            });
            console.log(status_support.$post_content_container);
            console.log("publish status_support done");
        }

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
