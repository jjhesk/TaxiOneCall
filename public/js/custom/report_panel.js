/**
 *
 * Created by Hesk on 14年6月6日.
 *
 *
 */
var jp_status = jp_status || {};
var BOARDCAST_METABOX = BOARDCAST_METABOX || {};
var template_controller = template_controller || {};
var data_submit_list_controller = data_submit_list_controller || {};
var content_editor = content_editor || {};
var remove_current_template = {};
var edit_current_template ={};
var testhtml = {};
jQuery(function ($) {
    "use strict";
    (function (d, status, interaction) {
        var $select_step_1 = $("#report_job_id");
        var $jobbox = $("#post_report_basic_box"),
            $templatebox = $("#report_template_list"),
            loaded_job_id = $select_step_1.val(),
            total_pages = $("#total_pages").val(),
            loaded_submission_id = $("#report_revision"),
            monthyear = $("#report_month_year"),
            save_field = $("#save_report"),
            screen_option = new WPScreenOptionSupport(),
            publishbox = new PublishingSupport()
            ;
        //RES_YES
        screen_option.ALL(false);
        publishbox.previewVisable(false);
        //  console.log(screen_option.getData());
        //  ScreenOptionControl.offAll();
        if (status.page == 'post.php') {
            if (jp_status.hasOwnProperty("show_metabox")) {
                // ScreenOptionControl.offAll().on(jp_status.show_metabox.push("returned_data_list"));
                var f = jp_status.show_metabox.push("returned_data_list");
                screen_option.batch(jp_status.show_metabox, true);
            }
            template_controller = new ListTemplateControl(total_pages, {
                photoApp: 312,
                basemapApp: 212,
                recordReportApp: 321
            }, loaded_job_id, status.post_id);
            console.log(save_field.val());

            if (parseInt(loaded_job_id) > 0) {

                $select_step_1.prop("disabled", true).addClass("disabled");
                content_editor = new ReportContentEditor($("#report_book_content"), template_controller);
                publishbox.setTriggerOnSubmit(function (e, that) {
                    save_field.val(content_editor.getCurrentReportHTML());
                });
                remove_current_template =function(){
                    content_editor.removeTemplatecurrent();
                }
                edit_current_template=function(){
                    content_editor.edit_current_template();
                }
                /*
                 testhtml = function () {
                 var d = content_editor.getCurrentReportHTML();
                 console.log(d);
                 }
                 MetaBoxSupport.InsertHTMLFieldSelectNextTo("#report_month_year", "<input value='testing' onclick='testhtml()' type='button' class='button'/> ");*/

                content_editor.loadReports(save_field.val());
                if (parseInt(loaded_submission_id.val()) > 0) {
                    screen_option.ON('post_report_basic_box');
                    screen_option.OFF('returned_data_list');
                    loaded_submission_id.prop("readonly", true);
                    monthyear.prop("readonly", true);
                    screen_option.ON('report_book_content');
                    publishbox.PubLabel("Update Report");
                    publishbox.setTitle("Report Confirmation");

                } else {
                    screen_option.OFF('report_template_list');
                    screen_option.OFF('report_book_content');
                    screen_option.ON('returned_data_list');
                    data_submit_list_controller = new ListSubmission("returned_data_list", loaded_job_id, loaded_submission_id.val());
                    data_submit_list_controller.ev().on("set_submission_id", function (e, id, rowjson) {
                        loaded_submission_id.val(id);
                        monthyear.val(rowjson.upload_stamp);
                        publishbox.setPostTitle("Report Ref. Job ID " + $select_step_1.val() + ":" + id);
                    });
                    publishbox.PubLabel("Next step");
                    publishbox.setTitle("Confirm Revision Number");
                }


            } else {
                screen_option.OFF('report_book_content');
                screen_option.OFF('returned_data_list');
                screen_option.OFF('report_template_list');
                screen_option.ON('post_report_basic_box');
                publishbox.PubLabel("Next step");
                publishbox.setTitle("Confirm Job ID");

                $select_step_1.on("change",function () {
                    var h = parseInt($select_step_1.val()), i = h > -1;
                    publishbox.publishEnable(i);
                    if (i) {
                        publishbox.setPostTitle("Incomplete - Report Ref. Job ID " + h);
                    }

                }).trigger("change");
                //report_template_list
            }
            //bind the local function with the global function
        } else if (status.page == 'edit.php') {
            //this is the editing of the list
        } else if (status.page == 'post-new.php') {

            if (jp_status.hasOwnProperty("show_metabox")) {
//                ScreenOptionControl.offAll().on(jp_status.show_metabox);
                var f = jp_status.show_metabox.push("returned_data_list");
                screen_option.batch(jp_status.show_metabox, true);
            }
            screen_option.batch($jobbox, true);
//            ScreenOptionControl.on($jobbox);
            //submit button lock on here


            screen_option.OFF('report_book_content');
            screen_option.OFF('returned_data_list');
            screen_option.OFF('report_template_list');
            screen_option.ON('post_report_basic_box');
            publishbox.PubLabel("Next step");
            publishbox.setTitle("Confirm Job ID");

            $select_step_1.on("change",function () {
                publishbox.publishEnable(parseInt($select_step_1.val()) > -1);
                publishbox.setPostTitle("Incomplete - Report Ref. Job ID " + $select_step_1.val());
            }).trigger("change");

        }

    }(document, jp_status, "click tap touch"));
});
